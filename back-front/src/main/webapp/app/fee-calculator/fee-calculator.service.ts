import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Injectable } from '@angular/core';

const CONTRACT_ADDRESS = '0x343C65A9Af9091067Cd474eA9F2Ae4E2bE3eBb7B';
const ABI: AbiItem[] = [
  {
    inputs: [
      { internalType: 'address', name: 'locataire', type: 'address' },
      { internalType: 'uint256', name: 'montantBase', type: 'uint256' },
    ],
    name: 'calculerFrais',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'niveau', type: 'uint256' },
    ],
    name: 'getFraisParNiveau',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'niveau', type: 'uint256' },
      { internalType: 'uint256', name: 'taux', type: 'uint256' },
    ],
    name: 'setFraisParNiveau',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'niveau', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'nouveauTaux', type: 'uint256' },
    ],
    name: 'FraisMisAJour',
    type: 'event',
  },
];


@Injectable({ providedIn: 'root' })
export class FeeCalculatorService {
  private web3 = new Web3((window as any).ethereum);
  private contract = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  async calculerFrais(locataire: string, montantBase: number): Promise<number> {
    const frais = await this.contract.methods.calculerFrais(locataire, montantBase).call();
    return Number(frais);
  }

  async getFraisParNiveau(niveau: number): Promise<number> {
    const taux = await this.contract.methods.getFraisParNiveau(niveau).call();
    return Number(taux);
  }

  async setFraisParNiveau(niveau: number, taux: number, from: string): Promise<void> {
    await this.contract.methods.setFraisParNiveau(niveau, taux).send({ from });
  }
}
