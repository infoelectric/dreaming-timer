import HomeScreen from "@screens/HomeScreen";
import RankingScreen from "@screens/RankingScreen";
import RecordScreen from "@screens/RecordScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from "@assets/icon/home.svg";
import TongueTwisterScreen from "@screens/missons/TongueTwisterScreen";

const Tab = createBottomTabNavigator();

const tabBarIcon = ({ color }: { color: string }) => {
  return <HomeIcon width={36} height={36} fill={color} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIcon,
        tabBarActiveTintColor: "#A167A5",
        tabBarInactiveTintColor: "#0E273C",
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="랭킹" component={RankingScreen} />
      <Tab.Screen name="기록" component={RecordScreen} />
      {/* 미션은 추후 삭제해야 됨! */}
      <Tab.Screen name="미션" component={TongueTwisterScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
