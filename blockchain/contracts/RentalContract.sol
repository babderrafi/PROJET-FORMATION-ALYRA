// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

// Importation des contrats externes
import "./RentalNFT.sol";
import "./FeeCalculator.sol";

/**
 * @title RentalContract
 * @dev Contrat de gestion des contrats de location de véhicules
 */
contract RentalContract {

    /// @notice Statuts possibles d'un contrat de location
    enum StatutContrat { EN_ATTENTE_SIGNATURE, SIGNE, TERMINE }

    /// @notice Structure représentant un contrat de location
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

    /// @notice Mapping de l'id vers le contrat de location
    mapping(uint256 => Rental) public rentals;

    /// @notice Liste des contrats associés à une adresse
    mapping(address => uint256[]) public rentalsParUtilisateur;

    /// @notice Références vers les contrats externes
    RentalNFT public rentalNFT;
    FeeCalculator public feeCalculator;

    /// @notice Events pour le suivi des états
    event ContratCree(uint256 indexed id, address locataire, address loueur);
    event ContratSigne(uint256 id);
    event ContratTermine(uint256 id);

    /**
     * @notice Constructeur, initialise les dépendances
     * @param _rentalNFT adresse du contrat RentalNFT
     * @param _feeCalculator adresse du contrat de calcul de frais
     */
    constructor(address _rentalNFT, address _feeCalculator) {
        rentalNFT = RentalNFT(_rentalNFT);
        feeCalculator = FeeCalculator(_feeCalculator);
    }

    /**
     * @notice Création d'un contrat de location
     */
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

        // Enregistre le contrat pour chaque partie
        rentalsParUtilisateur[locataire].push(nextId);
        rentalsParUtilisateur[loueur].push(nextId);

        emit ContratCree(nextId, locataire, loueur);
        nextId++;
        return nextId - 1;
    }

    /**
     * @notice Signature du contrat par le locataire
     */
    function signerContrat(uint256 id) external {
        Rental storage r = rentals[id];
        require(msg.sender == r.locataire, "Seul le locataire peut signer");
        require(r.statut == StatutContrat.EN_ATTENTE_SIGNATURE, "Deja signe");
        r.statut = StatutContrat.SIGNE;

        emit ContratSigne(id);
    }

    /**
     * @notice Terminaison du contrat par le loueur
     */
    function terminerContrat(uint256 id) external {
        Rental storage r = rentals[id];
        require(msg.sender == r.loueur, "Seul le loueur peut terminer");
        require(r.statut == StatutContrat.SIGNE, "Doit etre signe");
        r.statut = StatutContrat.TERMINE;

        emit ContratTermine(id);
    }

    /// @notice Obtenir les contrats d’un utilisateur
    function getContratsParUtilisateur(address user) external view
returns (uint256[] memory) {
        return rentalsParUtilisateur[user];
    }

    /// @notice Obtenir les détails d’un contrat
    function getContrat(uint256 id) external view returns (Rental memory) {
        return rentals[id];
    }
}
