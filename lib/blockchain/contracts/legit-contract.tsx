import {
  Account,
  Address,
  formatEther,
  getContract,
  http,
  keccak256,
  stringToBytes,
  toHex,
  TransactionReceipt,
} from "viem";
import { legitContractSepoliaV3 } from "@/app/abi/legit-contract-abi";
import { provider } from "../server";
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
    address: legitContractSepoliaV3.address as Address,
    abi: legitContractSepoliaV3.abi,
    client: {
      public: provider,
      wallet: walletClient,
      account,
    },
  });
}

export const ContractRoles = {
  ADMIN: keccak256(stringToBytes("ROLE_ADMIN")),
  CREATOR: keccak256(stringToBytes("ROLE_CREATOR")),
  USER: keccak256(stringToBytes("ROLE_USER")),
} as const;

export async function grantRole(
  address: string,
  role: typeof ContractRoles[keyof typeof ContractRoles],
) {
  if (!process.env.ENCRYPTED_MAIN_PRIVATE_KEY) return;

  const signerKey = decrypt(process.env.ENCRYPTED_MAIN_PRIVATE_KEY);
  const signerAccount = privateKeyToAccount(signerKey);

  const contract = await contractClient(signerAccount);

  console.log("Account:", address);
  const tx = await contract.write.grantRole([address, role], {
    signerAccount,
  });
  console.log("Transaction sent:", tx);

  const receipt = await provider.waitForTransactionReceipt({ hash: tx });
  console.log("Transaction confirmed:", receipt);

  return receipt;
}

export async function revokeRole(
  address: string,
  role: typeof ContractRoles[keyof typeof ContractRoles],
) {
  if (!process.env.ENCRYPTED_MAIN_PRIVATE_KEY) return;

  const signerKey = decrypt(process.env.ENCRYPTED_MAIN_PRIVATE_KEY);
  const signerAccount = privateKeyToAccount(signerKey);

  const contract = await contractClient(signerAccount);

  console.log("Account:", address);
  const tx = await contract.write.revokeRole([address, role], {
    signerAccount,
  });
  console.log("Transaction sent:", tx);

  const receipt = await provider.waitForTransactionReceipt({ hash: tx });
  console.log("Transaction confirmed:", receipt);

  return receipt;
}

export async function estimateGasToRegisterAsset(
  encryptedPrivateKey: string,
  assetKey: string,
  totalSupply: number
) {
  const privateKey = decrypt(encryptedPrivateKey);
  const account = privateKeyToAccount(privateKey);

  const bytes = stringToBytes(assetKey);
  const contract = await contractClient(account);

  console.log("Account:", account);
  const gasEstimate = await contract.estimateGas.registerAsset([toHex(bytes), totalSupply], {account});
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
  const account = privateKeyToAccount(privateKey);

  const bytes = stringToBytes(assetKey);
  const contract = await contractClient(account);

  console.log("Account:", account);
  const tx = await contract.write.registerAsset(
    [toHex(bytes), totalSupply],
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
  
  const signerKey = decrypt(process.env.ENCRYPTED_MAIN_PRIVATE_KEY ?? encryptedPrivateKey);
  const signerAccount = privateKeyToAccount(signerKey);

  const privateKey = decrypt(encryptedPrivateKey);
  const minterAccount = privateKeyToAccount(privateKey);

  const bytes = stringToBytes(assetKey);
  const contract = await contractClient(signerAccount);

  console.log("Account:", minterAccount);
  const gasEstimate = await contract.estimateGas.mint([minterAccount.address, toHex(bytes), tokenId]);
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
  const signerKey = decrypt(process.env.ENCRYPTED_MAIN_PRIVATE_KEY ?? encryptedPrivateKey);
  const signerAccount = privateKeyToAccount(signerKey);

  const privateKey = decrypt(encryptedPrivateKey);
  const minterAccount = privateKeyToAccount(privateKey);

  const bytes = stringToBytes(assetKey);
  const contract = await contractClient(signerAccount);

  console.log("Account:", minterAccount);
  const tx = await contract.write.mint([minterAccount.address, toHex(bytes), tokenId], {
    signerAccount,
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

  const bytes = stringToBytes(assetKey);
  const contract = await contractClient(account);

  const totalSupply = await contract.read.getAssetTotalSupply(
    [toHex(bytes)],
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

  const bytes = stringToBytes(assetKey);
  const contract = await contractClient(account);

  const owner = await contract.read.getOwnerOf(
    [toHex(bytes), tokenId],
    { account }
  );
  console.log("Owner of token:", owner);

  return owner;
}
