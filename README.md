# Projet NFTCarApp — Location de véhicules via Smart Contracts

## Objectif

Cette application permet de gérer des **contrats de location décentralisés** entre un **loueur** et un **locataire**, en intégrant des **frais dynamiques basés sur des NFTs de niveau**. Les frais sont **redistribués** ensuite via un système de "piscine".

---

## Technologies utilisées

### Frontend
- Angular
- Node.js v16.14.0
- npm v8.4.1

### Backend
- Java 17
- Spring Boot 2.6.3
- Maven 3.9.0
- JHipster 7.7.0

### Offchain / Blockchain
- Solidity 0.8.30
- Hardhat
- Réseau de test : **Sepolia**
- IPFS via **Pinata** (hébergement des métadonnées NFT)

---

## Fonctionnalités principales

-Gestion des comptes utilisateurs : inscription, validation de compte, authentification sécurisée.
-Création d'acteurs (loueur ou locataire) : enregistrement via l’adresse MetaMask, opérations CRUD, consultation du niveau NFT, attribution de NFTs de niveau (Bronze, Argent, Or, Platine).
-Gestion des véhicules : création et modification des fiches véhicule (CRUD).
-Gestion des contrats de location : création d’un contrat incluant le véhicule, les dates, le tarif, le loueur et le locataire ; consultation et modification (CRUD), signature par le locataire, clôture par le loueur.
-Calcul automatisé des frais de plateforme : frais dynamiques déterminés en fonction du niveau de NFT du locataire.
-Redistribution simulée des frais collectés : les frais sont ajoutés dans une "piscine" et redistribués selon une règle simple (mock).

---

## 🧠 Smart Contracts (3 au total)

### 1. **RentalNFT.sol**

-  Type : ERC1155
-  Déployé sur Sepolia
-  Fonction : Attribution de **NFTs de niveau** (Bronze, Argent, Or, Platine)
-  Méthodes :
    - `mint(to, levelId)` : mint un NFT pour un utilisateur
    - `getLevel(address)` : retourne le dernier niveau attribué
    - `hasLevel(address, levelId)` : vérifie si l'utilisateur détient un certain niveau

**URI utilisée (hébergée sur IPFS via Pinata)** :
https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/{id}.json

**Exemples de metadata :**
- Niveau 0 – Bronze : `0.json`
- Niveau 1 – Argent : `1.json`
- Niveau 2 – Or : `2.json`
- Niveau 3 – Platine : `3.json`

---

### 2. **FeeCalculator.sol**

-  Déployé sur Sepolia
-  Utilise RentalNFT pour lire le niveau du locataire
-  Fonction : Calcul automatique des **frais** selon le NFT du locataire
-  Méthodes :
    - `setFraisParNiveau(niveau, taux)` : modifier les taux de frais
    - `calculerFrais(locataire, montantBase)` : retourne le montant des frais appliqués

**Exemples de taux configurés :** Modifiable par ihm via smartContrat
- Bronze : 15%
- Argent : 10%
- Or : 5%
- Platine : 2%

---

### 3. **RentalContract.sol**

-  Déployé sur Sepolia
-  Gère les **contrats de location**
-  Méthodes principales :
    - `createContract(...)` : crée un contrat entre loueur et locataire
    - `signerContrat(id)` : le locataire signe le contrat
    - `terminerContrat(id)` : le loueur termine le contrat
    - `getContratsParUtilisateur(address)` : récupère les IDs d’un utilisateur
    - `getContrat(id)` : détails d’un contrat donné

**Dépendances** :
- Appelle `FeeCalculator` pour les frais
- Émet des événements pour chaque étape du contrat (`ContratCree`, `ContratSigne`, `ContratTermine`)

---

## NFT : hébergement des métadonnées

**Fichiers JSON uploadés sur IPFS via Pinata :**

- CID : `bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui`
- Accessible via :
    - [0.json (Bronze)](https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/0.json)
    - [1.json (Argent)](https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/1.json)
    - [2.json (Or)](https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/2.json)
    - [3.json (Platine)](https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/3.json)

---

## Tests & Déploiement

- Hardhat utilisé pour le test et déploiement
- Tests unitaires (via Remix & Hardhat)
- Contrats visibles sur [Etherscan Sepolia](https://sepolia.etherscan.io)

---

## Résumé rapide des smart contracts

| Contrat         | Fonction principale                               | Méthodes clés                                       | Adresse (Sepolia)                      |
|----------------|----------------------------------------------------|----------------------------------------------------|----------------------------------------|
| RentalNFT      | Gestion des NFTs de niveau                         | `mint`, `getLevel`, `hasLevel`                     |             |
| FeeCalculator  | Calcul dynamique des frais selon le NFT            | `setFraisParNiveau`, `calculerFrais`               |           |
| RentalContract | Création et gestion des contrats de location       | `createContract`, `signerContrat`, `terminerContrat` |              |


---


