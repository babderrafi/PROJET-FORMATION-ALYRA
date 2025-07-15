import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ethers } from 'ethers';

import { ICar } from './car.model';
import { IPart } from '../part/part.model';
import { PartService } from '../part/service/part.service';

@Component({
  selector: 'jhi-buy-part-dialog',
  templateUrl: './buy-part-dialog.component.html',
})
export class BuyPartDialogComponent implements OnInit {
  @Input() car!: ICar;
  @Input() remaining!: number; // pourcentage de parts dispo

  ownerWallet = '';
  maskedAddress = '';
  isWalletConnected = false;

  ethBalanceNumber = 20; // 🔗 Simulé : 20 ETH
  ethBalance = this.ethBalanceNumber.toString();

  usdcBalanceNumber = 2000; // 🔗 Simulé : 2000 USDC
  usdcBalance = this.usdcBalanceNumber.toString();

  ethAmount = 0;
  usdcAmount = 0;

  quantity = 0; // parts calculées selon montant

  allParts: IPart[] = [];

  private provider?: ethers.BrowserProvider;

  constructor(
    protected partService: PartService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.partService.query().subscribe(response => {
      this.allParts = response.body ?? [];
    });
  }

  connectMetaMask(): void {
    // 🔗 Partie blockchain simulée pour l'instant
    this.ownerWallet = '0xAbCd1234Ef567890aBcD1234Ef567890ABcD1234';
    this.maskedAddress = this.getMaskedAddress(this.ownerWallet);
    this.isWalletConnected = true;

    // Ici, plus tard, tu remplaces par :
    // this.provider = new ethers.BrowserProvider((window as any).ethereum);
    // ...
  }


  disconnectMetaMask(): void {
    this.ownerWallet = '';
    this.maskedAddress = '';
    this.isWalletConnected = false;
    this.ethAmount = 0;
    this.usdcAmount = 0;
    this.quantity = 0;
  }

  getMaskedAddress(address: string): string {
    return `${address.substring(0, 4)}****${address.substring(address.length - 4)}`;
  }

  onEthInput(): void {
    if (this.ethAmount > 0) {
      this.usdcAmount = 0;
      const totalEuros = this.ethAmount * 2000; // 1 ETH = 2000 €
      this.quantity = Math.floor(totalEuros / (this.car.pricePerPart ?? 1));
    } else {
      this.quantity = 0;
    }
  }

  onUsdcInput(): void {
    if (this.usdcAmount > 0) {
      this.ethAmount = 0;
      const totalEuros = this.usdcAmount * 1; // 1 USDC = 1 €
      this.quantity = Math.floor(totalEuros / (this.car.pricePerPart ?? 1));
    } else {
      this.quantity = 0;
    }
  }

  confirm(): void {
    if (this.ethAmount > this.ethBalanceNumber) {
      alert("Montant ETH saisi > solde dispo !");
      return;
    }
    if (this.usdcAmount > this.usdcBalanceNumber) {
      alert("Montant USDC saisi > solde dispo !");
      return;
    }
    if (this.quantity > this.remaining) {
      alert(`Impossible : tu essaies d'acheter ${this.quantity} parts mais il n'en reste que ${this.remaining}.`);
      return;
    }
    if (this.quantity <= 0) {
      alert("Aucune part calculée à acheter !");
      return;
    }

    // Vérifie parts déjà existantes pour cet utilisateur
    const existingPart = this.allParts.find(
      part => part.car?.id === this.car.id && part.ownerWallet === this.ownerWallet
    );

    if (existingPart) {
      const updatedPart: IPart = {
        ...existingPart,
        percentage: (existingPart.percentage ?? 0) + this.quantity,
      };
      this.partService.update(updatedPart).subscribe(() => {
        this.activeModal.close('saved');
      });
    } else {
      const newPart: IPart = {
        ownerWallet: this.ownerWallet,
        percentage: this.quantity,
        car: this.car,
      };
      this.partService.create(newPart).subscribe(() => {
        this.activeModal.close('saved');
      });
    }
  }
}
