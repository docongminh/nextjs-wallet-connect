import { createOpt } from "@/apis/withdrawToken";
import { Button } from "@mui/material";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";

export const CreateOtpToken: FC = () => {
  const notify = useNotify();

  const onClick = useCallback(async () => {
    try {
      const params: any = {
        amount: 1,
        tokenId: "99f49de7-2229-4bc7-8bb8-21423f79cfa4",
        walletAddress: "ykkvsfEtAhc7faxK3uJTYMPBmtrisGkU9Kv4SnuxzB7",
      };
      const response = await createOpt(params);
      notify("info", `Create Otp ${response}`);
    } catch (error: any) {
      notify("error", `Transaction signing failed! ${error?.message}`);
    }
  }, [notify]);

  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      Create Otp Token
    </Button>
  );
};
