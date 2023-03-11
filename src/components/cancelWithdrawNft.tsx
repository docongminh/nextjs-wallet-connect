import { Button } from "@mui/material";
import type { TransactionSignature } from "@solana/web3.js";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";
import { cancelWithdrawToken } from "@/apis/withdrawToken";

export const CancelWithdrawNft: FC = () => {

  const notify = useNotify();

  const onClick = useCallback(async () => {
    let signature: TransactionSignature | undefined = undefined;
    try {
      const transactionId = "d8be69ab-2b2b-45d4-9c41-370ea0afaada";

      const data = await cancelWithdrawToken(transactionId);
      if (data) {
        notify("success", "cancel withdraw successful!");
      } else {
        notify("info", "cancel withdraw failure!");
      }
    } catch (error: any) {
      notify("error", `Transaction failed! ${error?.message}`, signature);
    }
  }, [notify]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
    >
      Cancel Withdrawals Nft
    </Button>
  );
};
