/**
 * @format
 */

import "react-native-gesture-handler";

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

import Toast from "react-native-toast-message";

import { Provider } from "react-redux";

import store from "@redux/store";

const RootComponent = () => (
  <Provider store={store}>
    <App />
    <Toast />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
