const hre = require("hardhat");

async function main() {
  // Remplace ici les adresses déjà déployées
  const rentalNFTAddress = "0xF84A8CfE750E07840CB2245D23F695c4db22e921";      // Adresse du contrat RentalNFT
  const feeCalculatorAddress = "0xEA93273A70413Cc76CA3b9a783b5B3F21886dCc3";  // Adresse du contrat FeeCalculator

  const RentalContract = await hre.ethers.getContractFactory("RentalContract");
  const rentalContract = await RentalContract.deploy(rentalNFTAddress, feeCalculatorAddress);

  await rentalContract.waitForDeployment();

  console.log(" RentalContract déployé à :", await rentalContract.getAddress());
}

main().catch((error) => {
  console.error("Erreur de déploiement :", error);
  process.exitCode = 1;
});
