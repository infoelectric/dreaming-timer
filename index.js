/**
 * @format
 */

import "react-native-gesture-handler";

import { AppRegistry, LogBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

import Toast from "react-native-toast-message";

import { Provider } from "react-redux";

import store from "@redux/store";

const RootComponent = () => {
  LogBox.ignoreLogs([
    "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
  ]);
  return (
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
