const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RentalNFT", function () {
let rentalNFT;
let owner;
let addr1;

const initialURI = "https://gateway.pinata.cloud/ipfs/bafybeia774myuwismh6664smqvrswvmwqolb7icmym4duweiy5zcb3mqui/{id}.json";

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const RentalNFTFactory = await ethers.getContractFactory("RentalNFT");
    rentalNFT = await RentalNFTFactory.deploy();
  });

  it("should deploy with correct default URI", async function () {
    expect(await rentalNFT.uri(0)).to.equal(initialURI);
  });

  it("should allow owner to mint a valid level", async function () {
    await expect(rentalNFT.mint(addr1.address, 2)) 
      .to.emit(rentalNFT, "Minted")
      .withArgs(addr1.address, 2);

    expect(await rentalNFT.balanceOf(addr1.address, 2)).to.equal(1);
  });

  it("should revert if non-owner tries to mint", async function () {
  let failed = false;
  try {
    await rentalNFT.connect(addr1).mint(addr1.address, 1);
  } catch (error) {
    failed = true;
  }
  expect(failed).to.be.true;
  });

  it("should revert if levelId is invalid", async function () {
    await expect(rentalNFT.mint(addr1.address, 10)).to.be.revertedWith("Niveau invalide");
  });

  it("should return true for hasLevel if user owns that level", async function () {
    await rentalNFT.mint(addr1.address, 1);
    expect(await rentalNFT.hasLevel(addr1.address, 1)).to.be.true;
    expect(await rentalNFT.hasLevel(addr1.address, 2)).to.be.false;
  });

  it("should return highest level from getLevel", async function () {
    await rentalNFT.mint(addr1.address, 1); 
    await rentalNFT.mint(addr1.address, 3); 
    expect(await rentalNFT.getLevel(addr1.address)).to.equal(3); 
  });

  it("should allow owner to update URI", async function () {
    const newURI = "https://new.uri/{id}.json";
    await expect(rentalNFT.setURI(newURI))
      .to.emit(rentalNFT, "URIUpdated")
      .withArgs(newURI);
  });
  
  it("should revert if non-owner tries to set URI", async function () {
  let failed = false;
  try {
    await rentalNFT.connect(addr1).setURI("https://unauthorized.com");
  } catch (error) {
    failed = true;
  }
  expect(failed).to.be.true;
});

});
