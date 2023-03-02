import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { deepPurple, pink } from "@mui/material/colors";
import { WalletModalProvider as AntDesignWalletModalProvider } from "@solana/wallet-adapter-ant-design";
import type { Adapter, WalletError } from "@solana/wallet-adapter-base";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletDialogProvider as MaterialUIWalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { SnackbarProvider, useSnackbar } from "notistack";
import type { FC, ReactNode } from "react";
import React, { useCallback, useMemo } from "react";
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: pink[700],
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          justifyContent: "flex-start",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "12px 16px",
        },
        startIcon: {
          marginRight: 8,
        },
        endIcon: {
          marginLeft: 8,
        },
      },
    },
  },
});

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();

  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
    (error: WalletError, adapter?: Adapter) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: "error" }
      );
      console.error(error, adapter);
    },
    [enqueueSnackbar]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <MaterialUIWalletDialogProvider>
          <AntDesignWalletModalProvider>
            <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
          </AntDesignWalletModalProvider>
        </MaterialUIWalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <AutoConnectProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
          </AutoConnectProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
