import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";
// setup i18n
import "./translations/i18n";
import "@rainbow-me/rainbowkit/styles.css";
import {
    getDefaultConfig,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import {
    mainnet, sepolia
} from "wagmi/chains";
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-datepicker/dist/react-datepicker.css";

// Configuring the sepolia Network Chain
const config = getDefaultConfig({
    appName: "DTCC",
    projectId: `${import.meta.env.VITE_PROJECT_ID}`,
    chains: [sepolia, mainnet],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },

});
const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        primary: {
            main: "#004A92"
        },
        secondary: {
            main: "#77ADDF"
        }
    },
    typography: {
        button: {
            textTransform: "none"
        }
    },
    components: {
        MuiInputLabel: {
            defaultProps: {
                sx: { bgcolor: "#fff" }
            }
        }
    }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider >
                <React.StrictMode>
                    <Provider store={store}>
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <App />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </Provider>
                    <ToastContainer />

                </React.StrictMode>

            </RainbowKitProvider>
        </QueryClientProvider>

    </WagmiProvider >
);
