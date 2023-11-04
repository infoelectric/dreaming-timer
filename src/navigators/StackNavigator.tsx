import { createStackNavigator } from "@react-navigation/stack";
import DrinkingScreen from "@screens/missons/DrinkingScreen";
import SelectionScreen from "@screens/missons/SelectionScreen";
import TongueTwisterScreen from "@screens/missons/TongueTwisterScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
      <Stack.Screen name="미션선택" component={SelectionScreen} />
      <Stack.Screen name="잰말놀이" component={TongueTwisterScreen} />
      <Stack.Screen name="물 마시기" component={DrinkingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
