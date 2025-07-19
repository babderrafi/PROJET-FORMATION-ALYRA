const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("FeeCalculator", function () {

  let owner, user1, user2;
  let rentalNFT, feeCalculator;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const RentalNFT = await ethers.getContractFactory("RentalNFT");
    rentalNFT = await RentalNFT.deploy();
    await rentalNFT.waitForDeployment();
    const rentalNFTAddress = await rentalNFT.getAddress();
    const FeeCalculator = await ethers.getContractFactory("FeeCalculator");
    feeCalculator = await FeeCalculator.deploy(rentalNFTAddress);
    await feeCalculator.waitForDeployment();
  });

  it("should deploy with initial fee rates", async function () {
    expect(await feeCalculator.getFraisParNiveau(0)).to.equal(15);
    expect(await feeCalculator.getFraisParNiveau(1)).to.equal(10);
    expect(await feeCalculator.getFraisParNiveau(2)).to.equal(5);
    expect(await feeCalculator.getFraisParNiveau(3)).to.equal(2);
  });

  it("should calculate correct fee for user with no NFT (niveau 0)", async function () {
    const montantBase = parseEther("100");
    const frais = await feeCalculator.calculerFrais(user1.address, montantBase);
    expect(frais).to.equal(parseEther("15"));
  });

  it("should calculate correct fee for user with NFT niveau 2", async function () {
    await rentalNFT.mint(user1.address, 2);
    const montantBase = parseEther("100");
    const frais = await feeCalculator.calculerFrais(user1.address, montantBase);
    expect(frais).to.equal(parseEther("5"));
  });

  it("should update fee rate only by owner", async function () {
    await feeCalculator.setFraisParNiveau(1, 20);
    expect(await feeCalculator.getFraisParNiveau(1)).to.equal(20);
  });

  it("should revert if non-owner tries to set fee", async function () {
    await expect(
      feeCalculator.connect(user1).setFraisParNiveau(1, 99)
    )
      .to.be.revertedWithCustomError(feeCalculator, "OwnableUnauthorizedAccount")
      .withArgs(user1.address);
  });

  it("should revert if level is invalid", async function () {
    await expect(
      feeCalculator.setFraisParNiveau(5, 10)
    ).to.be.revertedWith("Niveau invalide");
  });

  it("should revert if fee > 100", async function () {
    await expect(
      feeCalculator.setFraisParNiveau(2, 150)
    ).to.be.revertedWith("Taux maximum 100%");
  });
});
