require('@typechain/hardhat');
require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
const keys = require('./keys');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${keys.ALCHEMY_API_KEY}`,
      accounts: [`${keys.ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
