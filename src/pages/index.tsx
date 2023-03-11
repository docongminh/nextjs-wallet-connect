import {
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import pkg from "../../package.json";
import { useAutoConnect } from "../components/AutoConnectProvider";

const AntDesignWalletConnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-ant-design")).WalletConnectButton,
  { ssr: false }
);
const AntDesignWalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-ant-design")).WalletDisconnectButton,
  { ssr: false }
);
const AntDesignWalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-ant-design")).WalletMultiButton,
  { ssr: false }
);
const AntDesignWalletModalButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-ant-design")).WalletModalButton,
  { ssr: false }
);

const MaterialUIWalletConnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-material-ui")).WalletConnectButton,
  { ssr: false }
);
const MaterialUIWalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-material-ui")).WalletDisconnectButton,
  { ssr: false }
);
const MaterialUIWalletDialogButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-material-ui")).WalletDialogButton,
  { ssr: false }
);
const MaterialUIWalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-material-ui")).WalletMultiButton,
  { ssr: false }
);

const ReactUIWalletConnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletConnectButton,
  { ssr: false }
);
const ReactUIWalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);
const ReactUIWalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const ReactUIWalletModalButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalButton,
  { ssr: false }
);

const WithdrawTokenDynamic = dynamic(
  async () => (await import("../components/withdrawToken")).WithdrawToken,
  {
    ssr: false,
  }
);

const WithdrawNftDynamic = dynamic(
  async () => (await import("../components/withdrawNft")).WithdrawNft,
  {
    ssr: false,
  }
);

const CancelWithdrawTokenDynamic = dynamic(
  async () =>
    (await import("../components/cancelWithdrawToken")).CancelWithdrawToken,
  {
    ssr: false,
  }
);

const CancelWithdrawNftDynamic = dynamic(
  async () =>
    (await import("../components/cancelWithdrawNft")).CancelWithdrawNft,
  {
    ssr: false,
  }
);

const DepositNftDynamic = dynamic(
  async () =>
    (await import("../components/depositNft")).DepositNft,
  { ssr: false }
);
const DepositTokenDynamic = dynamic(
  async () => (await import("../components/depositToken")).DepositToken,
  {
    ssr: false,
  }
);

const GetTokenDynamic = dynamic(
  async () => (await import("../components/GetTokens")).GetTokens,
  {
    ssr: false,
  }
);

const GetNftDynamic = dynamic(
  async () => (await import("../components/GetNfts")).GetNfts,
  {
    ssr: false,
  }
);

const CreateOtpNftDynamic = dynamic(
  async () =>
    (await import("../components/CreateOtpNft")).CreateOtpNft,
  { ssr: false }
);

const CreateOtpTokenDynamic = dynamic(
  async () => (await import("../components/CreateOtpToken")).CreateOtpToken,
  {
    ssr: false,
  }
);

const ConfirmOtpTokenDynamic = dynamic(
  async () => (await import("../components/ConfirmOtpToken")).ConfirmOtpToken,
  { ssr: false }
);

const ConfirmOtpNftDynamic = dynamic(
  async () => (await import("../components/ConfirmOtpNft")).ConfirmOtpNft,
  { ssr: false }
);


const Index: NextPage = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={240}>Component</TableCell>
            <TableCell width={240}>Material UI</TableCell>
            <TableCell width={240}>Ant Design</TableCell>
            <TableCell width={240}>React UI</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Connect Button</TableCell>
            <TableCell>
              <MaterialUIWalletConnectButtonDynamic />
            </TableCell>
            <TableCell>
              <AntDesignWalletConnectButtonDynamic />
            </TableCell>
            <TableCell>
              <ReactUIWalletConnectButtonDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Disconnect Button</TableCell>
            <TableCell>
              <MaterialUIWalletDisconnectButtonDynamic />
            </TableCell>
            <TableCell>
              <AntDesignWalletDisconnectButtonDynamic />
            </TableCell>
            <TableCell>
              <ReactUIWalletDisconnectButtonDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dialog/Modal Button</TableCell>
            <TableCell>
              <MaterialUIWalletDialogButtonDynamic />
            </TableCell>
            <TableCell>
              <AntDesignWalletModalButtonDynamic />
            </TableCell>
            <TableCell>
              <ReactUIWalletModalButtonDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Multi Button</TableCell>
            <TableCell>
              <MaterialUIWalletMultiButtonDynamic />
            </TableCell>
            <TableCell>
              <AntDesignWalletMultiButtonDynamic />
            </TableCell>
            <TableCell>
              <ReactUIWalletMultiButtonDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={240}>Example v{pkg.version}</TableCell>
            <TableCell width={240}></TableCell>
            <TableCell width={240}></TableCell>
            <TableCell width={240}></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        DEPOSIT TOKEN & NFT
        <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <DepositTokenDynamic />
            </TableCell>
            <TableCell>
              <DepositNftDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>

          WITHDRAW TOKEN
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>
              <CreateOtpTokenDynamic />
            </TableCell>
            <TableCell>
              <ConfirmOtpTokenDynamic />
            </TableCell>
            <TableCell>
              <WithdrawTokenDynamic />
            </TableCell>

            <TableCell>
              <CancelWithdrawTokenDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>

          WITHDRAW NFT
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>
              <CreateOtpNftDynamic />
            </TableCell>
            <TableCell>
              <ConfirmOtpNftDynamic />
            </TableCell>
            <TableCell>
              <WithdrawNftDynamic />
            </TableCell>
            <TableCell>
              <CancelWithdrawNftDynamic />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
         
        </TableBody>
      </Table>
    </>
  );
};

export default Index;
