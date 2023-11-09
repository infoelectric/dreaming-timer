import { useEffect } from "react";

import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import WalkIcon from "@assets/icon/walk.svg";

import { RootState } from "@redux/reducers";
import { WakeUpDetection } from "@redux/slice/timerSlice";
import { accomplished } from "@redux/slice/missionRecordsSlice";

import trackDistance from "@utils/trackDistance";
import secondsToHMS from "@utils/secondsToHMS";

const WalkingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { elapsedTime, startTime } = useSelector(
    (state: RootState) => state.timer
  );

  // 함수 호출
  const unsubscribe = trackDistance((distance) => {
    if (distance > 100) {
      unsubscribe();
      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "미션 성공!", // 메시지 제목
        text2: "3초 후 타이머로 돌아갑니다!", // 메시지 내용
        visibilityTime: 3000, // 토스트 메시지 표시 시간 (밀리초)
      });
      const timeout = setTimeout(() => {
        dispatch(
          accomplished({
            time: startTime,
            missionName: "일정 거리 걷기",
            timesOfStudy: secondsToHMS(elapsedTime),
          })
        );
        dispatch(WakeUpDetection());
        navigation.popToTop();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  });

  useEffect(
    () =>
      Toast.show({
        type: "info",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "거리 측정 중입니다!", // 메시지 제목
        text2: "폰을 들고 일정 거리를 이동해주세요.", // 메시지 내용
        visibilityTime: 10000, // 토스트 메시지 표시 시간 (밀리초)
      }),
    []
  );

  // 컴포넌트 언마운트 시 구독 해제
  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, [unsubscribe]);

  return (
    <Container>
      <FirstText>{"일정 거리 걷기"}</FirstText>
      <SecondText>{`자리에서 일어나
일정 거리를 걸어주세요!`}</SecondText>

      <WalkIcon width={300} height={300} fill={"#0E273C"} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const FirstText = styled(BoldStyledText)`
  font-size: 36px;
  margin-top: 70px;
`;

const SecondText = styled(StyledText)`
  font-size: 24px;
  margin-top: 27px;
  margin-bottom: 55px;
`;

export default WalkingScreen;
