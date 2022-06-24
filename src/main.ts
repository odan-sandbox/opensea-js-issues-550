import "dotenv/config";

import * as ethers from "ethers";

import HDWalletProvider from "@truffle/hdwallet-provider";

const RPC_URL = process.env["RPC_URL"]!;
const PRIVATE_KEY = process.env["PRIVATE_KEY"]!;

async function main() {
  const hdWalletProvider = new HDWalletProvider({
    privateKeys: [PRIVATE_KEY],
    providerOrUrl: RPC_URL,
  });

  hdWalletProvider.engine["stop"]();

  const provider = new ethers.providers.Web3Provider(hdWalletProvider);
  const signer = provider.getSigner();
  const domain = {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  };

  // The data to sign
  const value = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  };

  const signature = await signer._signTypedData(domain, types, value);

  console.log(signature);
}

main();
