import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";
import Walk from "@assets/icon/walk.svg";

const WalkingScreen = ({ navigation }: any) => {
  return (
    <Container>
      <FirstText>{"일정 거리 걷기"}</FirstText>
      <SecondText>{`자리에서 일어나
3m를 걸어주세요!`}</SecondText>

      <Walk width={300} height={300} fill={"#0E273C"} />
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
