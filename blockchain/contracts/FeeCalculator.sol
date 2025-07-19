// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./RentalNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeeCalculator is Ownable {
    RentalNFT public rentalNFT;

    mapping(uint256 => uint256) public fraisParNiveau;

    event FraisMisAJour(uint256 niveau, uint256 nouveauTaux);

    constructor(address _rentalNFT) Ownable(msg.sender) {
        rentalNFT = RentalNFT(_rentalNFT);

        fraisParNiveau[0] = 15; 
        fraisParNiveau[1] = 10; 
        fraisParNiveau[2] = 5;  
        fraisParNiveau[3] = 2; 
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
        return (montantBase * taux) / 100;
    }
}