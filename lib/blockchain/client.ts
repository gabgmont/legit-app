import { createWalletClient, custom } from "viem";
import { anvil } from "viem/chains";

export const walletClient = createWalletClient({
    chain: anvil,
    transport: custom(window.ethereum),
});
