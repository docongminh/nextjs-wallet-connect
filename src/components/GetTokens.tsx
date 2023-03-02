import { Button } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import chunks from "lodash.chunk";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";

export const GetTokens: FC = () => {
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
      if (!accounts) {
        throw new Error(`Parsing token account error. No value return`);
      }
      // closure
      const parse = (
        accounts: any[]
      ): Array<{ mintAddress: string; balance: string }> => {
        const tokens = [];
        for (const accountInfo of accounts) {
          const mintAddress = accountInfo.account.data?.parsed?.info?.mint;
          const amount =
            accountInfo.account.data?.parsed?.info?.tokenAmount?.amount;
          const decimals =
            accountInfo.account.data?.parsed?.info?.tokenAmount?.decimals;
          if (amount > 0 && decimals > 0) {
            tokens.push({
              mintAddress: mintAddress,
              balance: amount,
            });
          }
        }
        return tokens;
      };
      const tokens = chunks(accounts, 99).flatMap((items: any) => {
        return parse(items);
      });
      console.log(tokens)
      notify("success", `${tokens.length} tokens found`);
    } catch (error: any) {
      notify("error", `Fail fetch token ${error?.message}`);
    }
  }, [publicKey, connection, notify]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Get tokens
    </Button>
  );
};
