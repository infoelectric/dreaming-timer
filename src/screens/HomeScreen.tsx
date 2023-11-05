import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Pressable, View } from "react-native";

import styled from "styled-components/native";

import { StyledText } from "@styles/GlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@redux/reducers";
import {
  pauseTimer,
  // resetTimer,
  startTimer,
  tick,
} from "@redux/slice/timerSlice";
import Detect from "@components/Home/Detect";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { isRunning, elapsedTime } = useSelector(
    (state: RootState) => state.timer
  );

  const dynamicHeight = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [isDetect, setIsDetect] = useState<boolean>(false);
  const [formattedTime, setFormattedTime] = useState("00:00:00");

  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const formattedDate = `${today.getMonth() + 1}. ${today.getDate()}. (${
    week[today.getDay()]
  })`;

  // 초를 mm:ss 형태로 변환하는 함수
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);

    Animated.timing(dynamicHeight, {
      toValue: expanded ? 0 : 1, // 확장되거나 축소될 때의 값
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false, // 네이티브 드라이버 사용 여부
    }).start();
  };

  const animatedStyle = {
    height: dynamicHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [200, SCREEN_HEIGHT], // 버튼의 높이를 확장하려면 이 값을 조절
    }),
  };

  // elapsedTime이 업데이트될 때마다 시간을 포맷하고 표시
  useEffect(() => {
    setFormattedTime(formatTime(elapsedTime));
  }, [elapsedTime]);

  useEffect(() => {
    if (expanded) {
      dispatch(startTimer());
    } else {
      dispatch(pauseTimer());
    }
  }, [dispatch, expanded]);

  // 타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPause) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, dispatch, isPause]);

  // 타이머 초기화 함수
  // const handleReset = () => {
  //   dispatch(resetTimer());
  // };

  useEffect(() => {
    if (elapsedTime > 10) {
      setIsPause(true);
      setIsDetect(true);
    }
  }, [elapsedTime]);

  return (
    <Container>
      {isDetect ? (
        <Detect timer={formattedTime} />
      ) : (
        <Pressable
          onPress={() => {
            if (!isRunning) {
              toggleExpand();
            }
          }}
        >
          <TimerContainer style={[animatedStyle]} paddingTop={insets.top}>
            <StyledText style={{ fontSize: 20 }}>
              {isRunning ? "오늘의 공부시간은..." : formattedDate}
            </StyledText>
            <StyledText style={{ fontSize: 50 }}>{formattedTime}</StyledText>
            {isRunning && (
              <View style={{ flexDirection: "row", gap: 30 }}>
                <StopButton
                  onPress={() => setIsPause((prev) => !prev)}
                  color={"#A167A5"}
                >
                  <ButtonText>{"일시정지"}</ButtonText>
                </StopButton>
                <StopButton
                  onPress={() => {
                    setIsPause(false);
                    toggleExpand();
                  }}
                  color={"#4A306D"}
                >
                  <ButtonText>{"타이머 종료"}</ButtonText>
                </StopButton>
              </View>
            )}
          </TimerContainer>
        </Pressable>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const TimerContainer = styled(Animated.View)<{ paddingTop: number }>`
  justify-content: center;
  align-items: center;
  gap: 30px;

  background-color: #e8d7f1;
`;

const StopButton = styled.TouchableOpacity<{ color: string }>`
  padding: 20px 25px;

  border-radius: 20px;

  background-color: ${(props) => props.color};
`;

const ButtonText = styled(StyledText)`
  font-size: 20px;
  color: white;
`;

export default HomeScreen;
