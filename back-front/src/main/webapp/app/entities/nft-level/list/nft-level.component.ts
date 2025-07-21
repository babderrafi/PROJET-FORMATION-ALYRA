import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FeeCalculatorService } from 'app/fee-calculator/fee-calculator.service';
import Web3 from 'web3';

declare const bootstrap: any;

@Component({
  selector: 'jhi-nft-level',
  templateUrl: './nft-level.component.html',
})
export class NFTLevelComponent implements OnInit {
  adminAddress = '';
  nftLevels: { id: number; niveau: number }[] = [];
  tauxParNiveau: { [niveau: number]: number } = {};
  seuils: { [niveau: number]: number } = {
    0: 1,
    1: 3,
    2: 5,
    3: 10,
  };

  isLoading = false;

  modalType: 'taux' | 'seuil' = 'taux';
  modalNiveau = 0;
  valeurSaisie = 0;
  @ViewChild('editModal', { static: true }) editModalRef!: ElementRef;
  private web3 = new Web3((window as any).ethereum);

  constructor(private feeCalculatorService: FeeCalculatorService) {}

  async ngOnInit(): Promise<void> {
    await this.initialiserWeb3();
    await this.refresh();
  }

  async initialiserWeb3(): Promise<void> {
    const accounts = await this.web3.eth.requestAccounts();
    this.adminAddress = accounts[0];
  }



  async refresh(): Promise<void> {
    this.isLoading = true;
    this.nftLevels = this.creerNiveauxSimules();
    await this.chargerTauxDepuisBlockchain();
    this.isLoading = false;
  }

  async chargerTauxDepuisBlockchain(): Promise<void> {
    const promises = this.nftLevels.map(async lvl => {
      const taux = await this.feeCalculatorService.getFraisParNiveau(lvl.niveau);
      this.tauxParNiveau[lvl.niveau] = taux;
    });
    await Promise.all(promises);
  }

  creerNiveauxSimules(): { id: number; niveau: number }[] {
    return [
      { id: 1, niveau: 0 },
      { id: 2, niveau: 1 },
      { id: 3, niveau: 2 },
      { id: 4, niveau: 3 },
    ];
  }

  getLibelleForNiveau(niveau: number): string {
    switch (niveau) {
      case 0: return 'Bronze';
      case 1: return 'Argent';
      case 2: return 'Or';
      case 3: return 'Platine';
      default: return 'Inconnu';
    }
  }

  getClassForNiveau(niveau: number): string {
    switch (niveau) {
      case 0: return 'text-secondary';  // Gris (Bronze)
      case 1: return 'text-muted';      // Argent
      case 2: return 'text-warning';    // Or
      case 3: return 'text-info';       // Platine
      default: return '';
    }
  }



  openModal(type: 'taux' | 'seuil', niveau: number): void {
    this.modalType = type;
    this.modalNiveau = niveau;
    this.valeurSaisie = type === 'taux'
      ? this.tauxParNiveau[niveau]
      : this.seuils[niveau];

    const modalEl = this.editModalRef.nativeElement;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  validerModification(): void {
    if (this.modalType === 'taux') {
      this.feeCalculatorService.setFraisParNiveau(this.modalNiveau, this.valeurSaisie, this.adminAddress).then(() => {
        this.chargerTauxDepuisBlockchain();
      });
    } else {
      this.seuils[this.modalNiveau] = this.valeurSaisie;
    }

    const modal = bootstrap.Modal.getInstance(this.editModalRef.nativeElement);
    modal?.hide();
  }

}
