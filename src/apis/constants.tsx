export const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJkMGU5MGJlMS1hMTgyLTQyYTEtOTZlMC1kOTcwZTdhOTIwMTMiLCJpYXQiOjE2Nzg0MjIwNDYzMDYsInNjb3BlIjoieCIsImV4cCI6MTY3OTAyNjg0NjMwNiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozNDAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMzMzIiwic3ViIjoiM2RhZmQ0ZDktYjg1Ni00YTc3LTlhMzYtMjhiNDc4MjIyMjgwIiwianRpIjoiM2VjM2M1ODEtYjAxNS00NTVhLTgwN2YtOTVjZGVmODFmZmU2In0.h71TZRw_gQR_eJ2hyPWNGrd4rpW3o68CVLDNwAe1c2I`;
export const VERSION = "v1";
export const API_HOST = `http://localhost:${
  process.env.PORT || 3400
}/api/${VERSION}`;


// TOKEN
export const DEPOSIT_TOKEN_ENDPOINT = `tokens/deposit-token/create`;
export const CREATE_OPT_TOKEN_ENDPOINT = `tokens/withdraw-token/create-otp`;
export const CONFIRM_OTP_TOKEN_ENDPOINT = `tokens/withdraw-token/confirm-otp`;
export const WITHDRAW_TOKEN_ENDPOINT = `tokens/withdraw-token/buffer`;
export const CANCEL_WITHDRAW_TOKEN_ENDPOINT = `tokens/withdraw-token/cancel`;


// NFT
export const DEPOSIT_NFT_ENDPOINT = `nfts/deposit-nft/create`;
export const CREATE_OPT_NFT_ENDPOINT = `nfts/withdraw-nft/create-otp`;
export const CONFIRM_OTP_NFT_ENDPOINT = `nfts/withdraw-nft/confirm-otp`;
export const WITHDRAW_NFT_ENDPOINT = `nfts/withdraw-nft/buffer`;
export const CANCEL_WITHDRAW_NFT_ENDPOINT = `nfts/withdraw-nft/cancel`;

