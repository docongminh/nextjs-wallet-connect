import { Button } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";

export const GetNfts: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const notify = useNotify();

  const onClick = useCallback(async () => {
    try {
      if (!publicKey) throw new Error("Wallet not connected!");
      const { value: accounts } =
        await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });
      console.log(accounts);
      // filter account is not sure NFT
      const nfts: Array<{ mintAddress: string; amount: string }> = accounts
        .filter((item: any) => {
          const amount = item.account.data?.parsed?.info?.tokenAmount?.amount;
          const decimals =
            item.account.data?.parsed?.info?.tokenAmount?.decimals;
          return amount > 0 && decimals === 0;
        })
        .map((item: any) => {
          const mintAddress = item.account.data?.parsed?.info?.mint;
          const amount = item.account.data?.parsed?.info?.tokenAmount?.amount;
          return {
            mintAddress: mintAddress,
            amount: amount,
          };
        });
      if (nfts.length > 50) {
        notify("error", `Number of nfts too large`);
      }
      console.log(nfts);
      notify("success", `${nfts.length} nfts found`);
    } catch (error: any) {
      notify("error", `Fail fetch nfts ${error?.message}`);
    }
  }, [publicKey, connection, notify]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Get nfts
    </Button>
  );
};
