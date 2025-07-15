
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRentalContract } from '../rental-contract.model';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { RentalContractService } from '../service/rental-contract.service';
import { FeeCalculatorService } from 'app/fee-calculator/fee-calculator.service';
import { RentalSmartService }  from 'app/rental-contract/rental-smart.service';
import { RentalContractDeleteDialogComponent } from '../delete/rental-contract-delete-dialog.component';
import Web3 from 'web3';
import { NftService } from 'app/nft/nft.service';
declare const bootstrap: any;

@Component({
  selector: 'jhi-rental-contract',
  templateUrl: './rental-contract.component.html',
  styleUrls: ['./rental-contract.component.scss'],
})
export class RentalContractComponent implements OnInit {
  rentalContracts?: IRentalContract[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  niveauLocataire = 0;
  selectedContract?: IRentalContract;
  fraisCalcules = 0;
  adminAddress = '';
  isAdminConnected = false;
  private web3: Web3 | undefined;

  constructor(
    private nftService: NftService,
    protected rentalContractService: RentalContractService,
    protected feeCalculatorService: FeeCalculatorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private rentalSmartService: RentalSmartService
  ) {}

  ngOnInit(): void {
    this.handleNavigation();

    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.web3.eth.requestAccounts().then(accounts => {
        this.adminAddress = accounts[0];
      });
    }
  }
  getMaskedAddress(address: string): string {
    return address ? address.slice(0, 5) + '...' + address.slice(-5) : '';
  }
  trackId(index: number, item: IRentalContract): number {
    return item.id!;
  }

  ouvrirPopup(action: 'signer' | 'terminer' | 'voir-frais', contract: IRentalContract): void {
    this.selectedContract = contract;

    if (action === 'voir-frais') {
      if (contract.locataire?.ethereumAddress && contract.fraisAppliques !== undefined) {
        const ethAddress = contract.locataire.ethereumAddress;
        const montant = contract.fraisAppliques;

        this.nftService.getLevel(ethAddress).then(level => {
          this.niveauLocataire = level;

          return this.feeCalculatorService.calculerFrais(ethAddress, montant);
        })
          .then(frais => {
            this.fraisCalcules = frais;
            const modal = new bootstrap.Modal(document.getElementById('fraisModal'));
            modal.show();
          })
          .catch(error => {
            console.error('Erreur lors du calcul des frais :', error);
            alert("Erreur lors du calcul des frais ou de la récupération du niveau NFT.");
          });

      } else {
        alert('Adresse du locataire ou montant invalide.');
      }

    } else {
      const id = {
        signer: 'signerModal',
        terminer: 'terminerModal',
      }[action];

      const modal = new bootstrap.Modal(document.getElementById(id));
      modal.show();
    }
  }

  confirmerSignature(): void {
    if (!this.selectedContract || !this.selectedContract.id) {
      return;
    }

    const contratId = this.selectedContract.id;

    this.rentalSmartService.getCurrentAccount()
      .then(account => {
        if (account.toLowerCase() !== this.selectedContract?.locataire?.ethereumAddress?.toLowerCase()) {
          alert("Seul le locataire peut signer ce contrat.");
          return;
        }

        return this.rentalSmartService.signerContrat(contratId, account);
      })
      .then(() => {
        alert('Contrat signé avec succès');
        this.loadPage(); // Recharger la liste
        bootstrap.Modal.getInstance(document.getElementById('signerModal'))?.hide();
      })
      .catch(error => {
        if (error) {
          console.error('Erreur lors de la signature :', error);
          alert('Erreur lors de la signature du contrat.');
        }
      });
  }



  confirmerTerminaison(): void {
    if (!this.selectedContract || !this.selectedContract.id){
      return;
    }

    const contratId = this.selectedContract.id;

    this.rentalSmartService.getCurrentAccount()
      .then(account => {
        if (account.toLowerCase() !== this.selectedContract?.loueur?.ethereumAddress?.toLowerCase()) {
          alert("Seul le loueur peut terminer ce contrat.");
          return;
        }

        return this.rentalSmartService.terminerContrat(contratId, account);
      })
      .then(() => {
        alert('Contrat terminé avec succès');
        this.loadPage();
        bootstrap.Modal.getInstance(document.getElementById('terminerModal'))?.hide();
      })
      .catch(error => {
        if (error) {
          console.error('Erreur lors de la terminaison :', error);
          alert('Erreur lors de la terminaison du contrat.');
        }
      });
  }



  delete(rentalContract: IRentalContract): void {
    const modalRef = this.modalService.open(RentalContractDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rentalContract = rentalContract;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }
  formatEthAddress(address?: string): string {
    if (!address) {
      return 'Non défini';
    }
    return `${address.slice(0, 6)}...${address.slice(-5)}`;
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad = page ?? this.page ?? 1;

    this.rentalContractService
      .query({ page: pageToLoad - 1, size: this.itemsPerPage, sort: this.sort() })
      .subscribe({
        next: (res: HttpResponse<IRentalContract[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = +(params.get('page') ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.page = page;
      this.loadPage(page, true);
    });
  }

  protected onSuccess(data: IRentalContract[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.rentalContracts = data ?? [];
    this.ngbPaginationPage = page;
    if (navigate) {
      this.router.navigate(['/rental-contract'], {
        queryParams: {
          page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
  }
}
