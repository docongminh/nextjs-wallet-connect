import { Button } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { TransactionSignature } from "@solana/web3.js";
import {
  Transaction,
} from "@solana/web3.js";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";
import { withdrawToken } from "@/apis/withdrawToken";

export const WithdrawToken: FC = () => {
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

      const transactionId = "762e23db-9c48-4a22-b871-828333300d3e"

      const { buffer } = await withdrawToken(transactionId);
      console.log({buffer})
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
      Withdrawals Token
    </Button>
  );
};
