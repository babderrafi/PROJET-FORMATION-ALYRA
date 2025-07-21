

import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { TransactionReceipt } from 'web3-core';
const CONTRACT_ADDRESS = '0x477E9ef62a9fE006A4f49d54Fef22Baf623011B1';
const ABI: AbiItem[] =
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_rentalNFT",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_feeCalculator",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "locataire",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "loueur",
          "type": "address"
        }
      ],
      "name": "ContratCree",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "ContratSigne",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "ContratTermine",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "locataire",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "loueur",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "vehicleId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dateDebut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dateFin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "montantBase",
          "type": "uint256"
        }
      ],
      "name": "createContract",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeCalculator",
      "outputs": [
        {
          "internalType": "contract FeeCalculator",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "getContrat",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "locataire",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "loueur",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "vehicleId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "dateDebut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "dateFin",
              "type": "uint256"
            },
            {
              "internalType": "enum RentalContract.StatutContrat",
              "name": "statut",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "montantTotal",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fraisAppliques",
              "type": "uint256"
            }
          ],
          "internalType": "struct RentalContract.Rental",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getContratsParUtilisateur",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rentalNFT",
      "outputs": [
        {
          "internalType": "contract RentalNFT",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rentals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "locataire",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "loueur",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "vehicleId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dateDebut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dateFin",
          "type": "uint256"
        },
        {
          "internalType": "enum RentalContract.StatutContrat",
          "name": "statut",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "montantTotal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fraisAppliques",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rentalsParUtilisateur",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "signerContrat",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "terminerContrat",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
;


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

  async signerContrat(id: number | undefined, from: string): Promise<void> {
    await this.contract.methods.signerContrat(id).send({ from });
  }


  async terminerContrat(id: number, from: string): Promise<void> {

    await this.contract.methods.terminerContrat(id).send({ from });
  }


  createContract(
    locataire: string,
    loueur: string,
    vehicleId: number,
    dateDebut: number,
    dateFin: number,
    montant: number,
    sender: string
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      this.contract.methods
        .createContract(locataire, loueur, vehicleId, dateDebut, dateFin, montant)
        .send({ from: sender })
        .on('receipt', (receipt: TransactionReceipt) => {
          try {
            // eslint-disable-next-line no-console
            console.log('RECEIPT ===>', receipt);

            const id = receipt.events?.ContratCree.returnValues?.id;

            if (!id) {
              reject(new Error('ID non trouvé dans l’événement ContratCree'));
              return;
            }

            resolve(Number(id));
          } catch (err) {
            console.error('Erreur parsing ContratCree:', err);
            reject(new Error('Erreur lors du parsing de ContratCree'));
          }
        })
        .on('error', (error: Error) => {
          console.error('Erreur transaction blockchain :', error);
          reject(error);
        });
    });
  }



}
