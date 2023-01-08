// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import Image from "next/image";
import bonkers from "../../../public/images/bonkers.gif";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#4f9ff5] to-[#ffffff]">
          Bonkers Lab{" "}
        </h1>
        <div className="py-3 object-center">
          <Image
            src={bonkers}
            className="border rounded-full"
            width={300}
            height={300}
            alt="mainLogo"
          />
        </div>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <h2 className="text-2xl pb-2">
            999 Bonkers protecting Solana and Bonk from all the naysayers!
          </h2>
          <p className="text-center mx-40">
            A community-driven project focused on creating utilities for Bonk
            and Solana, with a focus on promoting a fun and enjoyable experience
            for all users.
          </p>
        </h4>
        <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {/* {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>} */}
        </div>
      </div>
    </div>
  );
};
