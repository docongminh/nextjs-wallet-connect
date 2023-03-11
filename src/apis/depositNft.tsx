import axios from "axios";

import { ACCESS_TOKEN, API_HOST, DEPOSIT_NFT_ENDPOINT } from "./constants";

export type DepositNftParams = {
  nftId: string;
  walletAddress: string;
};

export type DepositNftResponse = {
  transactionId: string;
  buffer: number[];
};

export const depositNft = async (
  params: DepositNftParams
): Promise<DepositNftResponse> => {
  const body = {
    nft_id: params.nftId,
    wallet_address: params.walletAddress,
  };
  const response = await axios.post(
    `${API_HOST}/${DEPOSIT_NFT_ENDPOINT}`,
    body,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  console.log({response})

  return {
    transactionId: response.data.transaction_id,
    buffer: response.data.data.buffer,
  };
};
