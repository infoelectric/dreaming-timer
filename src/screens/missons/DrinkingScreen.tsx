import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";
import Camera from "@assets/icon/camera.svg";

const DrinkingScreen = ({ navigation }: any) => {
  return (
    <Container>
      <FirstText>{"물마시기"}</FirstText>
      <SecondText>{`카메라 버튼을 눌러
물컵을 찍어주세요!`}</SecondText>
      <Rectangle>
        <Mission>{"이미지 미리보기"}</Mission>
      </Rectangle>
      <Circle onPress={() => navigation.goBack()}>
        <Camera width={60} height={60} fill={"#0E273C"} />
      </Circle>
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
`;

const Rectangle = styled.View`
  height: 252px;
  width: 80%;

  margin-top: 42px;

  justify-content: center;
  align-items: center;

  border: 1px;
  border-color: #a167a5;
  border-radius: 20px;
`;

const Mission = styled(StyledText)`
  font-size: 32px;
  text-align: center;
`;

const Circle = styled.Pressable`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #e8d7f1;
  justify-content: center;
  align-items: center;

  margin-top: 88px;
`;

export default DrinkingScreen;
