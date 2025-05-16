import { Address, getContract, WalletClient } from "viem";
import { walletClient } from "../client";
import { legitContract } from "@/app/abi/legit-contract-abi";
import { provider } from "../server";
import { ethers } from "ethers";

async function contractClient(wallet: WalletClient) {
  const [signer] = await walletClient.requestAddresses();

  return [
    getContract({
      address: legitContract.address as Address,
      abi: legitContract.abi,
      client: {
        public: provider,
        wallet,
        signer,
      },
    }),
    signer,
  ];
}

export async function registerAsset(
  wallet: WalletClient,
  assetKey: string,
  totalSupply: number
) {
  const bytes = ethers.toUtf8Bytes(assetKey);
  const [contract, account] = await contractClient(wallet);

  console.log("Account:", account);
  const tx = await contract.write.registerAsset([ethers.hexlify(bytes), totalSupply], {account});
  console.log("Transaction sent:", tx);

  const receipt = await provider.waitForTransactionReceipt({ hash: tx });
  console.log("Transaction confirmed:", receipt);

  return receipt.transactionHash;
}

export async function mint(
  wallet: WalletClient,
  assetKey: string,
  tokenId: number
) {
  const bytes = ethers.toUtf8Bytes(assetKey);
  const [contract, account] = await contractClient(wallet);

  console.log("Account:", account);
  const tx = await contract.write.mint([ethers.hexlify(bytes), tokenId], {account});
  console.log("Transaction sent:", tx);

  const receipt = await provider.waitForTransactionReceipt({ hash: tx });
  console.log("Transaction confirmed:", receipt);

  return receipt.transactionHash;
}

export async function getAssetTotalSupply(
  wallet: WalletClient,
  assetKey: string
) {
  const bytes = ethers.toUtf8Bytes(assetKey);
  const [contract, account] = await contractClient(wallet);

  const totalSupply = await contract.read.getAssetTotalSupply([ethers.hexlify(bytes)], {account});
  console.log("Asset total supply:", totalSupply);

  return totalSupply;
}

export async function getOwnerOf(
  wallet: WalletClient,
  assetKey: string,
  tokenId: number
) {
  const bytes = ethers.toUtf8Bytes(assetKey);
  const [contract, account] = await contractClient(wallet);

  const owner = await contract.read.getOwnerOf([ethers.hexlify(bytes), tokenId], {account});
  console.log("Owner of token:", owner);

  return owner;
}
