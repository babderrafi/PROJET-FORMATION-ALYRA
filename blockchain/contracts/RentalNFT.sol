// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RentalNFT
 * @dev Contrat ERC1155 représentant différents niveaux d'utilisateurs sous forme de NFT.
 */
contract RentalNFT is ERC1155, Ownable {
    
    /// @notice Enumération des niveaux possibles
    enum Level { Bronze, Argent, Or, Platine }

    /// @notice Emis lorsqu'un NFT de niveau est minté
    event Minted(address indexed to, uint256 indexed levelId);

    /// @notice Emis lorsque l'URI de base est modifiée
    event URIUpdated(string newURI);

    /**
     * @dev Constructeur : initialise l'URI de base pour les metadata ERC1155.
     */
    constructor()
        ERC1155("https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/{id}.json")
        Ownable(msg.sender) 
    {}

    /**
     * @notice Mint un NFT correspondant à un niveau pour un utilisateur.
     * @dev Seul le propriétaire du contrat peut appeler cette fonction.
     * @param to Adresse du destinataire
     * @param levelId L'ID du niveau (0 = Bronze, 1 = Argent, etc.)
     */
    function mint(address to, uint256 levelId) external onlyOwner {
        require(levelId <= uint256(Level.Platine), "Niveau invalide");

        _mint(to, levelId, 1, "");

        emit Minted(to, levelId);
    }

    /**
     * @notice Retourne le niveau **réellement détenu** par un utilisateur.
     * Vérifie du niveau le plus haut au plus bas, et retourne le premier trouvé.
     * @param user L'adresse de l'utilisateur
     * @return L'ID du plus haut niveau détenu, ou 0 par défaut
     */
    function getLevel(address user) external view returns (uint256) {
        for (uint256 i = uint256(Level.Platine); i <= uint256(Level.Platine); i--) {
            if (balanceOf(user, i) > 0) {
                return i;
            }
            if (i == 0) break; // éviter underflow
        }
        return 0;
    }

    /**
     * @notice Vérifie si un utilisateur détient un NFT d'un certain niveau.
     * @param user L'adresse à vérifier
     * @param levelId Le niveau à vérifier
     * @return true si l'utilisateur détient au moins 1 NFT de ce niveau
     */
    function hasLevel(address user, uint256 levelId) public view returns (bool) {
        return balanceOf(user, levelId) > 0;
    }

    /**
     * @notice Permet au owner de modifier l'URI des metadata (optionnel).
     * @param newURI La nouvelle URI de base
     */
    function setURI(string memory newURI) external onlyOwner {
        _setURI(newURI);
        emit URIUpdated(newURI);
    }
}
