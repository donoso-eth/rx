import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { readFileSync, writeFileSync } from "fs";

const INFURA_ID = '212d29e8e6d145d78a350b2971f326be' //process.env["INFURA_ID"]
const MORALIS_ID = '6e874b0f13667e6fd8583112'; //process.env["MORALIS_ID"] 

`https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/mainnet`
`https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/ropsten`
`https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/goerli`


const ALCHEMY_ID_MUMBAI=  'https://polygon-mumbai.g.alchemy.com/v2/P2lEQkjFdNjdN0M_mpZKB8r3fAa2M0vT' //process.env["ALCHEMY_ID_MUMBAI"]

dotenv.config();



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  "generate",
  "Create a mnemonic for builder deploys",
  async (_, { ethers }) => {
    const DEBUG = true;
    const bip39 = require("bip39")
    const { hdkey } = require('ethereumjs-wallet')
    const mnemonic = bip39.generateMnemonic();
    if (DEBUG) console.log("mnemonic", mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    if (DEBUG) console.log("seed", seed);
    const hdwallet = hdkey.fromMasterSeed(seed);
    console.log(hdwallet)
    const wallet_hdpath = "m/44'/60'/0'/0/";
    const account_index = 0;
    const fullPath = wallet_hdpath + account_index;
    if (DEBUG) console.log("fullPath", fullPath);
    const wallet = hdwallet.derivePath(fullPath).getWallet();
    console.log(wallet)
    console.log(JSON.stringify(wallet))
    const privateKey = "0x" + wallet.privateKey.toString("hex");
    if (DEBUG) console.log("privateKey", privateKey);
    console.log(privateKey)
    const EthUtil = require("ethereumjs-util");
    const address =
      "0x" + EthUtil.privateToAddress(wallet.privateKey).toString("hex");
    console.log(
      "🔐 Account Generated as " +
        address +
        " and set as mnemonic in packages/hardhat"
    );
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );

    writeFileSync("./" + address + ".txt", mnemonic.toString());
    writeFileSync("./mnemonic.txt", mnemonic.toString());
  }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const defaultNetwork = "localhost";

const mainnetGwei = 21;

const mnemonic = () => {
  try {
    return readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  paths: {
    artifacts: '../src/assets/artifacts'
  },
  defaultNetwork:'hardhat',
  // if you want to deploy to a testnet, mainnet, or xdai, you will need to configure:
  // 1. An Infura key (or similar)
  // 2. A private key for the deployer
  // DON'T PUSH THESE HERE!!!
  // An `example.env` has been provided in the Hardhat root. Copy it and rename it `.env`
  // Follow the directions, and uncomment the network you wish to deploy to.

  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      // `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/rinkeby`
      accounts: process.env["PRIVATE_KEY"] !== undefined ? [process.env["PRIVATE_KEY"]] : [],
      // accounts: {
      //   mnemonic: mnemonic(),
      // },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
    
      //   `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/kovan`
      
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
        
      gasPrice: mainnetGwei*1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",// <---- YOUR MORALIS ID! (not limited to infura)
      
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      
      //url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/goerli", // <---- YOUR MORALIS ID! (not limited to infura)
      
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: "https://rpc.xdaichain.com/",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    polygon: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet",// <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },     
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/polygon/mumbai`,// <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },    

    matic: {
      url: "https://rpc-mainnet.maticvigil.com/",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: process.env["ROPSTEN_URL"] || "",
      accounts: process.env["PRIVATE_KEY"] !== undefined ? [process.env["PRIVATE_KEY"]] : [],
    },
  },
  gasReporter: {
    enabled: process.env["REPORT_GAS"] !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env["ETHERSCAN_API_KEY"],
  },
};

export default config;
