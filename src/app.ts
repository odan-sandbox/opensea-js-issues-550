import "dotenv/config";

import Web3 from "web3";
import { Network, OpenSeaSDK } from "opensea-js";
import HDWalletProvider from "@truffle/hdwallet-provider";
import type { Asset } from "../node_modules/opensea-js/lib/types";

const RPC_URL = process.env["RPC_URL"]!;
const PRIVATE_KEY = process.env["PRIVATE_KEY"]!;

async function main(): Promise<void> {
  const provider = new HDWalletProvider({
    privateKeys: [PRIVATE_KEY],
    providerOrUrl: RPC_URL,
  });
  const openseaSDK = new OpenSeaSDK(provider, { networkName: Network.Rinkeby });

  const assets: Asset[] = [
    {
      tokenAddress: "0x344f2e83f4f6c5d85f3c3c0e1293c0b5c3b100f7",
      tokenId: "0",
    },
  ];

  const expirationTime = new Date("2022-07-31 23:59:59").getTime() / 1000;

  const web3 = new Web3(provider);
  const address = (await web3.eth.getAccounts())[0]!;

  await openseaSDK.createSellOrder({
    asset: assets[0]!,
    accountAddress: address,
    startAmount: 5,
    endAmount: 0.1,
    expirationTime,
  });
  console.log("done");
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
