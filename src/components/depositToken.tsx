import { Button } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { TransactionSignature } from "@solana/web3.js";
import {
  Transaction,
} from "@solana/web3.js";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";
import { depositToken, DepositTokenParams } from "@/apis/depositToken";

export const DepositToken: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const notify = useNotify();

  const onClick = useCallback(async () => {
    let signature: TransactionSignature | undefined = undefined;
    try {
      if (!publicKey) throw new Error("Wallet not connected!");

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      // fixed value
      // will remove next edition
      const params: DepositTokenParams = {
        amount: 1,
        tokenId: "99f49de7-2229-4bc7-8bb8-21423f79cfa4",
        walletAddress: "ykkvsfEtAhc7faxK3uJTYMPBmtrisGkU9Kv4SnuxzB7",
      };

      const { buffer } = await depositToken(params);

      const transaction = Transaction.from(Buffer.from(buffer));

      signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });
      notify("info", "Transaction sent:", signature);

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
      notify("success", "Transaction successful!", signature);
    } catch (error: any) {
      notify("error", `Transaction failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, sendTransaction, notify]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Deposit Token
    </Button>
  );
};
