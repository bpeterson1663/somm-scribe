import { ActionIcon, Button, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./features/store";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import "./index.css";
import { UserProvider } from "@/context/user.context";

const theme = createTheme({
  fontFamily: "Lexend Deca",
  primaryColor: "primary",
  black: "#333",
  colors: {
    primary: [
      "#f5f5f5",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#575757",
    ],
    secondary: [
      "#f9f0f2",
      "#ebdfe2",
      "#dabbc1",
      "#ca95a0",
      "#bc7583",
      "#b46171",
      "#b15568",
      "#9c4658",
      "#8b3d4e",
      "#7b3242",
    ],
    red: ["#f9f0f2", "#ebdfe2", "#dabbc1", "#ca95a0", "#bc7583", "#b46171", "#b15568", "#9c4658", "#8b3d4e", "#7b3242"],
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "#7b3242",
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: "#7b3242",
      },
    }),
  },
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <UserProvider>
            <Notifications position="top-right" zIndex={1000} />
            <App />
          </UserProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
