// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RentalNFT is ERC1155, Ownable {

    enum Level { Bronze, Argent, Or, Platine }

    event Minted(address indexed to, uint256 indexed levelId);
    event URIUpdated(string newURI);

    mapping(address => uint256) private _lastAssignedLevel;

    constructor()
        ERC1155("https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/{id}.json")
        Ownable(msg.sender)
    {}

    function mint(address to, uint256 levelId) external onlyOwner {
        require(levelId <= uint256(Level.Platine), "Niveau invalide");
        _mint(to, levelId, 1, "");
        _lastAssignedLevel[to] = levelId; 
        emit Minted(to, levelId);
    }

    function getLevel(address user) external view returns (uint256) {
        return _lastAssignedLevel[user];
    }

    function hasLevel(address user, uint256 levelId) public view returns (bool) {
        return balanceOf(user, levelId) > 0;
    }

    function setURI(string memory newURI) external onlyOwner {
        _setURI(newURI);
        emit URIUpdated(newURI);
    }
}
