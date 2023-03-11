import { confirmOtpNft } from "@/apis/withdrawNft";
import { Button } from "@mui/material";
import type { FC } from "react";
import React, { useCallback } from "react";
import { useNotify } from "./notify";

export const ConfirmOtpNft: FC = () => {
  const notify = useNotify();

  const onClick = useCallback(async () => {
    try {
      const transactionId = "d8be69ab-2b2b-45d4-9c41-370ea0afaada";
      const otp = "584600";
      const response = await confirmOtpNft(transactionId, otp);
      notify("success", `${response.status}`);
    } catch (error: any) {
      notify("error", `Message signing failing: ${error?.message}`);
    }
  }, [ notify]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
    >
      Confirm OPT Nft
    </Button>
  );
};
