

import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const CONTRACT_ADDRESS = '0xaeE7F098d0123BCDc0F79986F6bd4094F4A34783';

const ABI: AbiItem[] = [
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'signerContrat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'terminerContrat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

@Injectable({ providedIn: 'root' })
export class RentalSmartService {
  private web3: Web3;
  private contract: any;

  constructor() {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.contract = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    } else {
      throw new Error('Web3 non disponible. Assurez-vous que MetaMask est installé.');
    }
  }

  async getCurrentAccount(): Promise<string> {
    const accounts = await this.web3.eth.requestAccounts();
    return accounts[0];
  }

  async signerContrat(id: number, from: string): Promise<void> {
    await this.contract.methods.signerContrat(id).send({ from });
  }


  async terminerContrat(id: number, from: string): Promise<void> {

    await this.contract.methods.terminerContrat(id).send({ from });
  }
}
