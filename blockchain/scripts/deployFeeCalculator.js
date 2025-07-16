const hre = require("hardhat");

async function main() {
  const rentalNFTAddress = "0x54177B172D43e0be74f1a6587744076CDB8a387C";

  const FeeCalculator = await hre.ethers.getContractFactory("FeeCalculator");
  const feeCalc = await FeeCalculator.deploy(rentalNFTAddress);

  await feeCalc.waitForDeployment();

  console.log("FeeCalculator déployé à :", await feeCalc.getAddress());
}

main().catch((error) => {
  console.error("Erreur :", error);
  process.exitCode = 1;
});
