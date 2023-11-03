import HomeScreen from "@screens/HomeScreen";
import RankingScreen from "@screens/RankingScreen";
import RecordScreen from "@screens/RecordScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from "@assets/icon/home.svg";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <HomeIcon width={36} height={36} fill={"#000000"} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="랭킹" component={RankingScreen} />
      <Tab.Screen name="기록" component={RecordScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
