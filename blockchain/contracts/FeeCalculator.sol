// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./RentalNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeCalculator is Ownable {
    RentalNFT public rentalNFT;

    // Taux en pourcentages, par exemple 15 = 15%
    mapping(uint256 => uint256) public fraisParNiveau;

    event FraisMisAJour(uint256 niveau, uint256 nouveauTaux);

    constructor(address _rentalNFT) Ownable(msg.sender) {
        rentalNFT = RentalNFT(_rentalNFT);

        // Valeurs par défaut
        fraisParNiveau[0] = 15; // Bronze
        fraisParNiveau[1] = 10; // Argent
        fraisParNiveau[2] = 5;  // Or
        fraisParNiveau[3] = 2;  // Platine
    }

    function setFraisParNiveau(uint256 niveau, uint256 taux) external
onlyOwner {
        require(niveau <= 3, "Niveau invalide");
        require(taux <= 100, "Taux maximum 100%");
        fraisParNiveau[niveau] = taux;
        emit FraisMisAJour(niveau, taux);
    }

    function getFraisParNiveau(uint256 niveau) external view returns (uint256) {
        return fraisParNiveau[niveau];
    }

    function calculerFrais(address locataire, uint256 montantBase)
external view returns (uint256) {
        uint256 niveau = rentalNFT.getLevel(locataire);
        uint256 taux = fraisParNiveau[niveau];

        // Exemple : 10% sur 1 ETH = 0.1 ETH
        return (montantBase * taux) / 100;
    }
}