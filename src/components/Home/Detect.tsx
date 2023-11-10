import { useEffect } from "react";
import { Vibration } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

interface DetectProps {
  timer: string;
}

const Detect = ({ timer }: DetectProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    // 진동 패턴 생성 함수
    const generateVibrationPattern: () => number[] = () => {
      const pattern = [];
      for (let i = 0; i < 100; i++) {
        pattern.push(1000, 500);
      }
      return pattern;
    };

    Vibration.vibrate(generateVibrationPattern());

    return () => {
      Vibration.cancel();
    };
  }, []);

  const handleVibrate = () => {
    Vibration.cancel();
    navigation.navigate("미션선택" as never);
  };

  return (
    <Container>
      <BoldStyledText style={{ fontSize: 36 }}>{"졸음 감지!"}</BoldStyledText>
      <StyledText style={{ fontSize: 48 }}>{timer}</StyledText>
      <StyledText
        style={{ fontSize: 20, textAlign: "center" }}
      >{`타이머가 일시정지되었습니다!
미션을 수행해 졸음 알림을 멈추세요!`}</StyledText>
      <StopButton onPress={() => handleVibrate()} color={"#4A306D"}>
        <ButtonText>{"졸음 알림 멈춤"}</ButtonText>
      </StopButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
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

export default Detect;
