import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPart } from './part.model';
import { ICar } from '../car/car.model';

@Component({
  selector: 'jhi-part-distribution-dialog',
  templateUrl: './part-distribution-dialog.component.html',
})
export class PartDistributionDialogComponent {
  @Input() car!: ICar;
  @Input() parts: IPart[] = [];

  constructor(public activeModal: NgbActiveModal) {}

  maskAddress(address?: string): string {
    if (!address) {
      return '';
    }
    return `${address.substring(0, 4)}****${address.substring(address.length - 4)}`;
  }



}
