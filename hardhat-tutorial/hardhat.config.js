require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks:{
    hardhatServer:{
      url:"http://127.0.0.1:8545/",
      chainId:1,
    },
    hardhat:{
      forking:{
        enabled:true,
        url:process.env.RPC_URL,
        accounts:[process.env.PRIVATE_KEY],
      },
      chainId:1,
    }
  }
};
