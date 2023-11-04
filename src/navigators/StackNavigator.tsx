import { createStackNavigator } from "@react-navigation/stack";
import DrinkingScreen from "@screens/missons/DrinkingScreen";
import SelectionScreen from "@screens/missons/SelectionScreen";
import TongueTwisterScreen from "@screens/missons/TongueTwisterScreen";
import VentilatingScreen from "@screens/missons/VentilatingScreen";
import WalkingScreen from "@screens/missons/WalkingScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
      <Stack.Screen name="미션선택" component={SelectionScreen} />
      <Stack.Screen name="잰말놀이" component={TongueTwisterScreen} />
      <Stack.Screen name="물 마시기" component={DrinkingScreen} />
      <Stack.Screen name="환기하기" component={VentilatingScreen} />
      <Stack.Screen name="일정 거리 걷기" component={WalkingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
