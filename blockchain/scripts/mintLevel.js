const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractAddress = "0x75e68DD43648424C9ca4160E9dE6AF9144c171bE";
  const RentalNFT = await hre.ethers.getContractAt("RentalNFT", contractAddress);

  const recipient = deployer.address; // ou une autre adresse
  const levelId = 2; // 0: Bronze, 1: Argent, 2: Or, 3: Platine

  const tx = await RentalNFT.mint(recipient, levelId);
  await tx.wait();

  console.log(`✅ NFT niveau ${levelId} minté à ${recipient}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
