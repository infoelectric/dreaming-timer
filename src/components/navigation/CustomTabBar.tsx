import { cloneElement, useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSelector } from "react-redux";

import { TabNavigationState, ParamListBase } from "@react-navigation/native";

import styled from "styled-components/native";

import { RootState } from "@redux/reducers";

import { StyledText } from "@styles/GlobalStyles";

import HomeIcon from "@assets/icon/home.svg";
import RankingIcon from "@assets/icon/ranking.svg";
import RecordIcon from "@assets/icon/record.svg";

interface TabNavigationProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
}

const tabConfig = [
  {
    name: "홈",
    icon: <HomeIcon width={36} height={36} fill="#0E273C" />,
  },
  {
    name: "랭킹",
    icon: <RankingIcon width={36} height={36} fill="#0E273C" />,
  },
  {
    name: "기록",
    icon: <RecordIcon width={30} height={30} fill="#0E273C" />,
  },
];

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: TabNavigationProps) => {
  const insets = useSafeAreaInsets();

  const { isRunning, isDetect } = useSelector(
    (rootState: RootState) => rootState.timer
  );

  const translateY = useRef(new Animated.Value(0)).current;
  const [currentY, setCurrentY] = useState<number>(0);

  useEffect(() => {
    const id = translateY.addListener(({ value }) => {
      setCurrentY(value);
    });

    // 메모리 누수 방지를 위해 다 쓴 리스너는 삭제
    return () => {
      translateY.removeListener(id);
    };
  }, [translateY]);

  useEffect(() => {
    if (isRunning && !isDetect) {
      Animated.timing(translateY, {
        toValue: currentY + (70 + insets.bottom),
        duration: 300, // 애니메이션 지속 시간 (밀리초)
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
    } else if (currentY !== 0) {
      Animated.timing(translateY, {
        toValue: currentY - (70 + insets.bottom),
        duration: 300, // 애니메이션 지속 시간 (밀리초)
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isDetect, insets]);

  return (
    <Container isRunning={isRunning && !isDetect}>
      <TabContainer
        marginBottom={insets.bottom}
        style={{ transform: [{ translateY }] }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;
          const isFocused = state.index === index;
          const tabItem = tabConfig.find((item) => item.name === route.name);

          const onPress = () => {
            // setExpanded(true);
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabItemContainer key={route.key} onPress={onPress}>
              {tabItem &&
                cloneElement(tabItem.icon, {
                  fill: isFocused ? "#A167A5" : "#0E273C",
                })}
              <StyledText style={{ fontSize: 11 }}>{label}</StyledText>
            </TabItemContainer>
          );
        })}
      </TabContainer>
    </Container>
  );
};

const Container = styled.View<{ isRunning: boolean }>`
  background-color: ${(props) => (props.isRunning ? "#e8d7f1" : "#ffffff")};
`;

const TabContainer = styled(Animated.View)<{ marginBottom: number }>`
  flex-direction: row;

  height: 70px;

  border-top-width: 1px;
  border-top-color: #a167a580;

  background-color: transparent;
`;

const TabItemContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export default CustomTabBar;
