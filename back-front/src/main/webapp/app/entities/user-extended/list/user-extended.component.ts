import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserExtended } from '../user-extended.model';
import { UserExtendedService } from '../service/user-extended.service';
import { UserExtendedDeleteDialogComponent } from '../delete/user-extended-delete-dialog.component';
import { NftService } from 'app/nft/nft.service';

declare const bootstrap: any;
@Component({
  selector: 'jhi-user-extended',
  templateUrl: './user-extended.component.html',
})
export class UserExtendedComponent implements OnInit {
  userExtendeds?: IUserExtended[];
  isLoading = false;
  adminAddress = '';
  currentAddress = '';
  selectedNftLevel = 2;
  isAdminConnected = false;
  currentUserExtended?: IUserExtended;

  constructor(
    private nftService: NftService,
    protected userExtendedService: UserExtendedService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.checkAdminConnection();
  }

  getMaskedAddress(address?: string): string {
    if (!address){
      return '';
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }



  loadAll(): void {
    this.isLoading = true;
    this.userExtendedService.query().subscribe({
      next: (res: HttpResponse<IUserExtended[]>) => {
        this.isLoading = false;
        this.userExtendeds = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  trackId(index: number, item: IUserExtended): number {
    return item.id!;
  }

  delete(userExtended: IUserExtended): void {
    const modalRef = this.modalService.open(UserExtendedDeleteDialogComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.userExtended = userExtended;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  voirNiveauNFT(address: string): void {
    this.currentAddress = address;
    this.nftService.getLevel(address).then(level => {
      this.selectedNftLevel = +level;
      const modal = new bootstrap.Modal(
        document.getElementById('nftLevelModal')!
      );
      modal.show();
    });
  }

  attribuerNFT(address: string, user: IUserExtended): void {
    this.currentAddress = address;
    this.currentUserExtended = user;
    const modal = new bootstrap.Modal(
      document.getElementById('attribuerNftModal')!
    );
    modal.show();
  }

  confirmerAttributionNFT(): void {
    if (
      !this.currentAddress ||
      !this.currentUserExtended ||
      this.currentUserExtended.id === undefined
    ) {
      alert('Erreur : utilisateur invalide.');
      return;
    }

    void this.nftService
      .mint(this.currentAddress, this.selectedNftLevel)
      .then(() => {
        alert('NFT attribué ok');
        this.loadAll();
        const modalElement = document.getElementById('attribuerNftModal');
        if (modalElement) {
          const instance = bootstrap.Modal.getInstance(modalElement);
          instance?.hide();
        }
      })
      .catch(() => {
        alert("Erreur lors de l’attribution du NFT ko");
      });
  }

  getNiveauLabel(id: number): string {
    switch (id) {
      case 0:
        return 'Bronze';
      case 1:
        return 'Argent';
      case 2:
        return 'Or';
      case 3:
        return 'Platine';
      default:
        return 'Inconnu';
    }
  }

  getNiveauBadgeClass(id: number): string {
    switch (id) {
      case 0:
        return 'badge bg-secondary';
      case 1:
        return 'badge bg-light text-dark';
      case 2:
        return 'badge bg-warning text-dark';
      case 3:
        return 'badge bg-primary';
      default:
        return 'badge bg-dark';
    }
  }

  private checkAdminConnection(): void {
    void Promise.all([
      this.nftService.getCurrentAccount(),
      this.nftService.getOwner()
    ])
      .then(([connectedAddress, contractOwner]) => {
        this.adminAddress = connectedAddress;
        this.isAdminConnected =
          connectedAddress.toLowerCase() === contractOwner.toLowerCase();
      })
      .catch(() => {
        this.adminAddress = '';
        this.isAdminConnected = false;
      });
  }
}
