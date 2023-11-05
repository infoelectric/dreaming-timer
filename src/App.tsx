/**
 * @format
 */

import { StatusBar } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "@navigators/BottomTabNavigator";

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
