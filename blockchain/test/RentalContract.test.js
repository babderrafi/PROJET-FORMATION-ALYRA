const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = require("ethers");

describe("RentalContract", function () {
  let owner, locataire, loueur;
  let rentalNFT, feeCalculator, rentalContract;

  beforeEach(async function () {
    [owner, locataire, loueur] = await ethers.getSigners();

    const RentalNFT = await ethers.getContractFactory("RentalNFT");
    rentalNFT = await RentalNFT.deploy();
    await rentalNFT.waitForDeployment();

    const FeeCalculator = await ethers.getContractFactory("FeeCalculator");
    feeCalculator = await FeeCalculator.deploy(await rentalNFT.getAddress());
    await feeCalculator.waitForDeployment();

    const RentalContract = await ethers.getContractFactory("RentalContract");
    rentalContract = await RentalContract.deploy(
      await rentalNFT.getAddress(),
      await feeCalculator.getAddress()
    );
    await rentalContract.waitForDeployment();
  });

  it("should create a rental contract and emit event", async function () {
    const montantBase = parseEther("100");
    const tx = await rentalContract.createContract(
      locataire.address,
      loueur.address,
      1,                // vehicleId
      1000000000,       // dateDebut
      1000003600,       // dateFin
      montantBase
    );

    const receipt = await tx.wait();
    const event = receipt.logs.find(log => log.fragment.name === "ContratCree");
    expect(event).to.not.be.undefined;
    expect(event.args.locataire).to.equal(locataire.address);
    expect(event.args.loueur).to.equal(loueur.address);

    const contrat = await rentalContract.getContrat(0);
    expect(contrat.montantTotal).to.equal(montantBase);
    expect(contrat.fraisAppliques).to.equal(parseEther("15")); 
    expect(contrat.statut).to.equal(0); // EN_ATTENTE_SIGNATURE
  });

  it("should allow locataire to sign the contract", async function () {
    await rentalContract.createContract(
      locataire.address,
      loueur.address,
      1,
      0,
      1000,
      parseEther("50")
    );

    await rentalContract.connect(locataire).signerContrat(0);

    const contrat = await rentalContract.getContrat(0);
    expect(contrat.statut).to.equal(1); // SIGNE
  });

  it("should not allow anyone else to sign the contract", async function () {
    await rentalContract.createContract(
      locataire.address,
      loueur.address,
      1,
      0,
      1000,
      parseEther("50")
    );

    await expect(
      rentalContract.connect(loueur).signerContrat(0)
    ).to.be.revertedWith("Seul le locataire peut signer");
  });

  it("should allow loueur to terminate the contract after signature", async function () {
    await rentalContract.createContract(
      locataire.address,
      loueur.address,
      1,
      0,
      1000,
      parseEther("75")
    );

    await rentalContract.connect(locataire).signerContrat(0);
    await rentalContract.connect(loueur).terminerContrat(0);

    const contrat = await rentalContract.getContrat(0);
    expect(contrat.statut).to.equal(2); // TERMINE
  });

  it("should not allow termination if not signed", async function () {
    await rentalContract.createContract(
      locataire.address,
      loueur.address,
      1,
      0,
      1000,
      parseEther("75")
    );

    await expect(
      rentalContract.connect(loueur).terminerContrat(0)
    ).to.be.revertedWith("Doit etre signe");
  });

  it("should return correct contracts for user", async function () {
    await rentalContract.createContract(
      locataire.address,
      loueur.address,
      1,
      0,
      1000,
      parseEther("75")
    );

    const locataireContrats = await rentalContract.getContratsParUtilisateur(locataire.address);
    const loueurContrats = await rentalContract.getContratsParUtilisateur(loueur.address);

    expect(locataireContrats).to.deep.equal([BigInt(0)]);
    expect(loueurContrats).to.deep.equal([BigInt(0)]);
  });
});
