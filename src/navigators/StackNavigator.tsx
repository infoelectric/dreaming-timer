import { createStackNavigator } from "@react-navigation/stack";
import SelectionScreen from "@screens/missons/SelectionScreen";
import TongueTwisterScreen from "@screens/missons/TongueTwisterScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      })}
    >
      <Stack.Screen name="미션선택" component={SelectionScreen} />
      <Stack.Screen name="잰말놀이" component={TongueTwisterScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
