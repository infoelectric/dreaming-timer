import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RankingScreen from "@screens/RankingScreen";
import RecordScreen from "@screens/RecordScreen";

import StackNavigator from "./StackNavigator";
import CustomTabBar from "@components/navigation/CustomTabBar";

const Tab = createBottomTabNavigator();

const tabBar = (props: any) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={tabBar}
      sceneContainerStyle={{ backgroundColor: "white" }}
      initialRouteName="홈"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="홈" component={StackNavigator} />
      <Tab.Screen name="랭킹" component={RankingScreen} />
      <Tab.Screen name="기록" component={RecordScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
