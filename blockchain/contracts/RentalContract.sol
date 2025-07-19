// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// Importation des contrats externes
import "./RentalNFT.sol";
import "./FeeCalculator.sol";


contract RentalContract {

    enum StatutContrat { EN_ATTENTE_SIGNATURE, SIGNE, TERMINE }

    struct Rental {
        uint256 id;
        address locataire;
        address loueur;
        uint256 vehicleId;
        uint256 dateDebut;
        uint256 dateFin;
        StatutContrat statut;
        uint256 montantTotal;
        uint256 fraisAppliques;
    }

    uint256 private nextId;
    mapping(uint256 => Rental) public rentals;
    mapping(address => uint256[]) public rentalsParUtilisateur;
    RentalNFT public rentalNFT;
    FeeCalculator public feeCalculator;

    event ContratCree(uint256 indexed id, address locataire, address loueur);
    event ContratSigne(uint256 id);
    event ContratTermine(uint256 id);

    constructor(address _rentalNFT, address _feeCalculator) {
        rentalNFT = RentalNFT(_rentalNFT);
        feeCalculator = FeeCalculator(_feeCalculator);
    }

    function createContract(
        address locataire,
        address loueur,
        uint256 vehicleId,
        uint256 dateDebut,
        uint256 dateFin,
        uint256 montantBase
    ) external returns (uint256) {
        uint256 frais = feeCalculator.calculerFrais(locataire, montantBase);

        rentals[nextId] = Rental({
            id: nextId,
            locataire: locataire,
            loueur: loueur,
            vehicleId: vehicleId,
            dateDebut: dateDebut,
            dateFin: dateFin,
            statut: StatutContrat.EN_ATTENTE_SIGNATURE,
            montantTotal: montantBase,
            fraisAppliques: frais
        });

        rentalsParUtilisateur[locataire].push(nextId);
        rentalsParUtilisateur[loueur].push(nextId);

        emit ContratCree(nextId, locataire, loueur);
        nextId++;
        return nextId - 1;
    }

    function signerContrat(uint256 id) external {
        Rental storage r = rentals[id];
        require(msg.sender == r.locataire, "Seul le locataire peut signer");
        require(r.statut == StatutContrat.EN_ATTENTE_SIGNATURE, "Deja signe");
        r.statut = StatutContrat.SIGNE;

        emit ContratSigne(id);
    }

    function terminerContrat(uint256 id) external {
        Rental storage r = rentals[id];
        require(msg.sender == r.loueur, "Seul le loueur peut terminer");
        require(r.statut == StatutContrat.SIGNE, "Doit etre signe");
        r.statut = StatutContrat.TERMINE;

        emit ContratTermine(id);
    }

    function getContratsParUtilisateur(address user) external view
returns (uint256[] memory) {
        return rentalsParUtilisateur[user];
    }

    function getContrat(uint256 id) external view returns (Rental memory) {
        return rentals[id];
    }
}
