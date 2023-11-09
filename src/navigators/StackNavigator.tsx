import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@screens/HomeScreen";
import DrinkingScreen from "@screens/missons/DrinkingScreen";
import SelectionScreen from "@screens/missons/SelectionScreen";
import TongueTwisterScreen from "@screens/missons/TongueTwisterScreen";
import VentilatingScreen from "@screens/missons/VentilatingScreen";
import WashScreen from "@screens/missons/WashScreen";
import WalkingScreen from "@screens/missons/WalkingScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="미션선택" component={SelectionScreen} />
      <Stack.Screen name="잰말놀이" component={TongueTwisterScreen} />
      <Stack.Screen name="물 마시기" component={DrinkingScreen} />
      <Stack.Screen name="공부 환경 돌아보기" component={VentilatingScreen} />
      <Stack.Screen name="세수하기" component={WashScreen} />
      <Stack.Screen name="일정 거리 걷기" component={WalkingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
