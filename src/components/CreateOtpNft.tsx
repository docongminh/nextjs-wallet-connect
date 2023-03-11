import { Button } from "@mui/material";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";
import { CreateOptNftParams, createOptNft } from "@/apis/withdrawNft";

export const CreateOtpNft: FC = () => {
  const notify = useNotify();

  const onClick = useCallback(async () => {
    try {
      const params: CreateOptNftParams = {
        id: "9530ffc0-cb32-49e3-b5db-ecde8674ebc2",
        walletAddress: "ykkvsfEtAhc7faxK3uJTYMPBmtrisGkU9Kv4SnuxzB7",
      };
      const response = await createOptNft(params);
      notify("info", `Create Otp ${response}`);
    } catch (error: any) {
      notify("error", `Transaction signing failed! ${error?.message}`);
    }
  }, [notify]);

  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      Create Otp Nft
    </Button>
  );
};
