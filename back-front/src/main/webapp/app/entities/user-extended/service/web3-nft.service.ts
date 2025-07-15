import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
declare global {
  interface Window {
    ethereum?: any;
  }
}
@Injectable({
  providedIn: 'root'
})
export class Web3NftService {
  private provider: ethers.BrowserProvider | undefined;
  private signer: ethers.Signer | undefined;
  private contract: ethers.Contract | undefined;


  private readonly CONTRACT_ADDRESS = '0x75e68DD43648424C9ca4160E9dE6AF9144c171bE';
  private readonly ABI = [
    {
      inputs: [
        { internalType: 'address', name: 'utilisateur', type: 'address' },
        { internalType: 'uint256', name: 'niveau', type: 'uint256' }
      ],
      name: 'attribuerNft',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'utilisateur', type: 'address' }
      ],
      name: 'hasNft',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  async initContract(): Promise<void> {
    if (this.contract !== undefined && this.signer !== undefined && this.provider !== undefined) {
      return;
    }

    if (!window.ethereum) {
      throw new Error('MetaMask non détecté !');
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = await this.provider.getSigner();
    this.contract = new ethers.Contract(this.CONTRACT_ADDRESS, this.ABI, this.signer);
  }



  async attribuerNft(address: string, niveau: number): Promise<ethers.TransactionResponse> {
    await this.initContract(); // ✅ Une seule fois au début
    const tx = await this.contract!.attribuerNft(address, niveau, {
      gasLimit: 100_000
    });
    return tx as ethers.TransactionResponse;
  }

  async hasNft(address: string): Promise<boolean> {
    await this.initContract();
    const result = await this.contract!.hasNft(address);
    return result as boolean;
  }
  async getSignerAddress(): Promise<string> {
    await this.initContract();
    return await this.signer!.getAddress();
  }
}
