/**
 * @format
 */

import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import changeNavigationBarColor from "react-native-navigation-bar-color";

import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "@navigators/BottomTabNavigator";

const App = () => {
  changeNavigationBarColor("transparent");
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <BottomTabNavigator />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
