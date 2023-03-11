import axios from "axios";
import {
  ACCESS_TOKEN,
  API_HOST,
  CREATE_OPT_TOKEN_ENDPOINT,
  CONFIRM_OTP_TOKEN_ENDPOINT,
  WITHDRAW_TOKEN_ENDPOINT,
  CANCEL_WITHDRAW_TOKEN_ENDPOINT,
} from "./constants";

export type CreateOptParams = {
  tokenId: string;
  walletAddress: string;
  amount: number;
};

export type ConfirmOtpResponse = {
  status: string;
  transactionId: string;
};

export const createOpt = async (params: CreateOptParams): Promise<string> => {
  const body = {
    amount: params.amount,
    token_id: params.tokenId,
    wallet_address: params.walletAddress,
  };
  const depositReponse = await axios.post(
    `${API_HOST}/${CREATE_OPT_TOKEN_ENDPOINT}`,
    body,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return depositReponse.data.data.transaction_id;
};

export const confirmOtp = async (
  transactionId: string,
  otp: string
): Promise<ConfirmOtpResponse> => {
  const body = {
    transaction_id: transactionId,
    otp: otp,
  };
  const confirmOtpResponse = await axios.post(
    `${API_HOST}/${CONFIRM_OTP_TOKEN_ENDPOINT}`,
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

export const withdrawToken = async (transactionId: string) => {
  const response = await axios.post(
    `${API_HOST}/${WITHDRAW_TOKEN_ENDPOINT}/${transactionId}`,
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

export const cancelWithdrawToken = async (
  transactionId: string
): Promise<boolean> => {
  const response = await axios.delete(
    `${API_HOST}/${CANCEL_WITHDRAW_TOKEN_ENDPOINT}/${transactionId}`,
    {
      headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return response.data.data;
};
