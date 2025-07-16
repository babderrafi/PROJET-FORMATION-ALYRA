require("@nomicfoundation/hardhat-toolbox"); // ce plugin inclut déjà hardhat-ethers
require("dotenv").config();



module.exports = {
  solidity: "0.8.30",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
