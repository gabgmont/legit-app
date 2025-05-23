import {
  Account,
  Address,
  formatEther,
  getContract,
  http,
  TransactionReceipt,
} from "viem";
import { legitContractSepolia } from "@/app/abi/legit-contract-abi";
import { provider } from "../server";
import { ethers } from "ethers";
import { createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { decrypt } from "@/utils/encryption";

async function contractClient(account: Account) {
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });

  return getContract({
    address: legitContractSepolia.address as Address,
    abi: legitContractSepolia.abi,
    client: {
      public: provider,
      wallet: walletClient,
      account,
    },
  });
}


export async function estimateGasToRegisterAsset(
  encryptedPrivateKey: string,
  assetKey: string,
  totalSupply: number
) {
  const privateKey = decrypt(encryptedPrivateKey);
  console.log("Private key:", privateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = ethers.toUtf8Bytes(assetKey);
  const contract = await contractClient(account);

  console.log("Account:", account);
  const gasEstimate = await contract.estimateGas.registerAsset([ethers.hexlify(bytes), totalSupply], {account});
  console.log("Gas estimate:", gasEstimate);

  const gasPrice = await provider.getGasPrice();
  console.log("Gas price:", gasPrice);

  return gasEstimate * gasPrice;
}

export async function registerAsset(
  encryptedPrivateKey: string,
  assetKey: string,
  totalSupply: number
): Promise<TransactionReceipt> {
  const privateKey = decrypt(encryptedPrivateKey);
  console.log("Private key:", privateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = ethers.toUtf8Bytes(assetKey);
  const contract = await contractClient(account);

  console.log("Account:", account);
  const tx = await contract.write.registerAsset(
    [ethers.hexlify(bytes), totalSupply],
    { account }
  );
  console.log("Transaction sent:", tx);

  const receipt = await provider.waitForTransactionReceipt({ hash: tx });
  console.log("Transaction confirmed:", receipt);

  return receipt;
}

export async function estimateGasToMint(
  encryptedPrivateKey: string,
  assetKey: string,
  tokenId: number
) {
  const privateKey = decrypt(encryptedPrivateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = ethers.toUtf8Bytes(assetKey);
  const contract = await contractClient(account);

  console.log("Account:", account);
  const gasEstimate = await contract.estimateGas.mint([ethers.hexlify(bytes), tokenId], {
    account,
  });
  console.log("Gas estimate:", gasEstimate);

  const gasPrice = await provider.getGasPrice();
  console.log("Gas price:", gasPrice);

  return formatEther(gasEstimate * gasPrice);
}

export async function mint(
  encryptedPrivateKey: string,
  assetKey: string,
  tokenId: number
): Promise<TransactionReceipt> {
  const privateKey = decrypt(encryptedPrivateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = ethers.toUtf8Bytes(assetKey);
  const contract = await contractClient(account);

  console.log("Account:", account);
  const tx = await contract.write.mint([ethers.hexlify(bytes), tokenId], {
    account,
  });
  console.log("Transaction sent:", tx);

  const receipt = await provider.waitForTransactionReceipt({ hash: tx });
  console.log("Transaction confirmed:", receipt);

  return receipt;
}

export async function getAssetTotalSupply(
  encryptedPrivateKey: string,
  assetKey: string
) {
  const privateKey = decrypt(encryptedPrivateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = ethers.toUtf8Bytes(assetKey);
  const contract = await contractClient(account);

  const totalSupply = await contract.read.getAssetTotalSupply(
    [ethers.hexlify(bytes)],
    { account }
  );
  console.log("Asset total supply:", totalSupply);

  return totalSupply;
}

export async function getOwnerOf(
  encryptedPrivateKey: string,
  assetKey: string,
  tokenId: number
) {
  const privateKey = decrypt(encryptedPrivateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = ethers.toUtf8Bytes(assetKey);
  const contract = await contractClient(account);

  const owner = await contract.read.getOwnerOf(
    [ethers.hexlify(bytes), tokenId],
    { account }
  );
  console.log("Owner of token:", owner);

  return owner;
}
