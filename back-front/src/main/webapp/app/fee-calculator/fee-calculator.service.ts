import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Injectable } from '@angular/core';

const CONTRACT_ADDRESS = '0x66c91fD98F3d317737009c8625E36E3c5Debea19';
const ABI: AbiItem[] = [
  {
    "inputs": [
      { "internalType": "address", "name": "locataire", "type": "address" },
      { "internalType": "uint256", "name": "montantBase", "type": "uint256" }
    ],
    "name": "calculerFrais",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "niveau", "type": "uint256" }
    ],
    "name": "getFraisParNiveau",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "niveau", "type": "uint256" },
      { "internalType": "uint256", "name": "taux", "type": "uint256" }
    ],
    "name": "setFraisParNiveau",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rentalNFT",
    "outputs": [
      { "internalType": "contract RentalNFT", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "fraisParNiveau",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "niveau", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "nouveauTaux", "type": "uint256" }
    ],
    "name": "FraisMisAJour",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  }
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
