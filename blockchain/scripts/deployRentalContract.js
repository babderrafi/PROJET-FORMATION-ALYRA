const hre = require("hardhat");

async function main() {
  // Remplace ici les adresses déjà déployées
  const rentalNFTAddress = "0x54177B172D43e0be74f1a6587744076CDB8a387C";      // Adresse du contrat RentalNFT
  const feeCalculatorAddress = "0x343C65A9Af9091067Cd474eA9F2Ae4E2bE3eBb7B";  // Adresse du contrat FeeCalculator

  const RentalContract = await hre.ethers.getContractFactory("RentalContract");
  const rentalContract = await RentalContract.deploy(rentalNFTAddress, feeCalculatorAddress);

  await rentalContract.waitForDeployment();

  console.log(" RentalContract déployé à :", await rentalContract.getAddress());
}

main().catch((error) => {
  console.error("Erreur de déploiement :", error);
  process.exitCode = 1;
});
