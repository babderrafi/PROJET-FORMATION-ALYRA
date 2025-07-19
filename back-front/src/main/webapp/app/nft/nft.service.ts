import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const CONTRACT_ADDRESS = '0x679d02c4779c0a6DEf956978c0C9C0Ed78E3fD16';

const ABI: AbiItem[] = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'levelId', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getLevel',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'levelId', type: 'uint256' }
    ],
    name: 'hasLevel',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  }
];

@Injectable({ providedIn: 'root' })
export class NftService {
  private web3: Web3;
  private contract: any;

  constructor() {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.contract = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    } else {
      throw new Error('MetaMask n’est pas disponible');
    }
  }

  async getCurrentAccount(): Promise<string> {
    const accounts: string[] = await this.web3.eth.requestAccounts();
    return accounts[0];

  }

  async getLevel(address: string): Promise<number> {
    const level: string = await this.contract.methods.getLevel(address).call();
    return parseInt(level, 10);
  }



  getHasLevel(address: string, levelId: number): Promise<boolean> {
    return this.contract.methods.hasLevel(address, levelId).call() as Promise<boolean>;
  }

  async mint(to: string, levelId: number): Promise<void> {
    const from = await this.getCurrentAccount();
    await this.contract.methods.mint(to, levelId).send({ from });
  }

  getOwner(): Promise<string> {
    return this.contract.methods.owner().call() as Promise<string>;
  }
}
