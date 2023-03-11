import axios from "axios";
import {
  ACCESS_TOKEN,
  API_HOST,
  CREATE_OPT_NFT_ENDPOINT,
  CONFIRM_OTP_NFT_ENDPOINT,
  WITHDRAW_NFT_ENDPOINT,
  CANCEL_WITHDRAW_NFT_ENDPOINT,
} from "./constants";

export type CreateOptNftParams = {
  id: string;
  walletAddress: string;
};

export type ConfirmOtpResponse = {
  status: string;
  transactionId: string;
};

export const createOptNft = async (
  params: CreateOptNftParams
): Promise<string> => {
  const body = {
    id: params.id,
    wallet_address: params.walletAddress,
  };
  const response = await axios.post(
    `${API_HOST}/${CREATE_OPT_NFT_ENDPOINT}`,
    body,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  console.log({response})
  return response.data.data.transaction_id;
};

export const confirmOtpNft = async (
  transactionId: string,
  otp: string
): Promise<ConfirmOtpResponse> => {
  const body = {
    transaction_id: transactionId,
    wallet_address: "D5sGL6rCYzWKfZj6eP4SwyV8xQ2PozLY5J76ovnwVw4y",
    mint_address: "D5sGL6rCYzWKfZj6eP4SwyV8xQ2PozLY5J76ovnwVw4y",
    otp: otp,
  };

  const confirmOtpResponse = await axios.post(
    `${API_HOST}/${CONFIRM_OTP_NFT_ENDPOINT}`,
    body,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return {
    status: confirmOtpResponse.data.status,
    transactionId: confirmOtpResponse.data.transaction_id,
  };
};

export const withdrawNft = async (transactionId: string) => {
  const response = await axios.post(
    `${API_HOST}/${WITHDRAW_NFT_ENDPOINT}/${transactionId}`,
    {},
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return {
    transactionId: response.data.data.transaction_id,
    buffer: response.data.data.buffer,
  };
};

export const cancelWithdrawNft = async (
  transactionId: string
): Promise<boolean> => {
  const response = await axios.delete(
    `${API_HOST}/${CANCEL_WITHDRAW_NFT_ENDPOINT}/${transactionId}`,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return response.data.data;
};
