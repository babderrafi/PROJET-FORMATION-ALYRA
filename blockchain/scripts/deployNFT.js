const hre = require("hardhat");

async function main() {
  const RentalNFT = await hre.ethers.getContractFactory("RentalNFT");
  const rentalNFT = await RentalNFT.deploy();

  
  await rentalNFT.waitForDeployment();

  console.log(" RentalNFT déployé à l'adresse :", await rentalNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
