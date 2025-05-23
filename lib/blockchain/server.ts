import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

export const provider = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export function createWallet() {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);

  return { account, privateKey };
}
