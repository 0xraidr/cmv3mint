import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from "../stores/useUserSOLBalanceStore";
import { Metaplex } from "@metaplex-foundation/js";
import { walletAdapterIdentity } from "@metaplex-foundation/js";
import { PublicKey } from "@metaplex-foundation/js";

export const RequestAirdrop: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  let walletAdapter = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log("error", "Wallet not connected!");
      notify({
        type: "error",
        message: "error",
        description: "Wallet not connected!",
      });
      return;
    }
    console.log("click");

    let signature: TransactionSignature = "";
    let METAPLEX = Metaplex.make(connection).use(
      walletAdapterIdentity(walletAdapter)
    );
    let candyMachine = await METAPLEX.candyMachines().findByAddress({
      address: new PublicKey("DGfwDSvBxYncPj17vpre7rSJwxjyRJs25KzST7Jyiius"),
    });
    try {
      const txBuilder = await METAPLEX.candyMachines()
        .builders()
        .mint({
          candyMachine,
          collectionUpdateAuthority: new PublicKey(
            "DTN9aYrsmuz1k9zTRXW56qLpfcn4gc2vzSJyvU11ae3C"
          ),
        });
      const blockhash = await METAPLEX.rpc().getLatestBlockhash();
      let tx = txBuilder.toTransaction(blockhash);
      let { signature, confirmResponse } =
        await METAPLEX.rpc().sendAndConfirmTransaction(txBuilder, {
          commitment: "finalized",
        });
      notify({
        type: "success",
        message: "Airdrop successful!",
        txid: signature,
      });
    } catch (error: any) {
      console.log(error);
    }
  }, [publicKey, connection, getUserSOLBalance]);

  return (
    <div>
      <button
        className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={onClick}
      >
        <span>Airdrop 1 </span>
      </button>
    </div>
  );
};
