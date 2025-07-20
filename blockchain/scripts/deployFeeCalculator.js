const hre = require("hardhat");

async function main() {
  const rentalNFTAddress = "0xF84A8CfE750E07840CB2245D23F695c4db22e921";

  const FeeCalculator = await hre.ethers.getContractFactory("FeeCalculator");
  const feeCalc = await FeeCalculator.deploy(rentalNFTAddress);

  await feeCalc.waitForDeployment();

  console.log("FeeCalculator déployé à :", await feeCalc.getAddress());
}

main().catch((error) => {
  console.error("Erreur :", error);
  process.exitCode = 1;
});
