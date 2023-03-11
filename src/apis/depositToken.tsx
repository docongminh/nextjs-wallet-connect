import axios from "axios";

import { ACCESS_TOKEN, API_HOST, DEPOSIT_TOKEN_ENDPOINT } from "./constants";

export type DepositTokenParams = {
  tokenId: string;
  walletAddress: string;
  amount: number;
};

export type DepositTokenResponse = {
  transactionId: string;
  buffer: number[];
};

export const depositToken = async (
  params: DepositTokenParams
): Promise<DepositTokenResponse> => {
  const body = {
    amount: params.amount,
    token_id: params.tokenId,
    wallet_address: params.walletAddress,
  };
  const depositReponse = await axios.post(
    `${API_HOST}/${DEPOSIT_TOKEN_ENDPOINT}`,
    body,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return {
    transactionId: depositReponse.data.transaction_id,
    buffer: depositReponse.data.data.buffer,
  };
};
