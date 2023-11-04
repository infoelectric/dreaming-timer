import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import Voice from "@assets/icon/voiceSelection.svg";

const SelectionScreen = ({ navigation }: any) => {
  return (
    <Container>
      <FirstText>{"수행 할 미션 선택"}</FirstText>
      <MissionContainer>
        <Voice width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("잰말놀이")}>
          <MissionName>{"잰말놀이"}</MissionName>
          <MissionContent>{`텅 트위스트 좋아해?
발음하기 어려운 문장을 읽는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 40px;
`;

const FirstText = styled(BoldStyledText)`
  font-size: 36px;
  margin-top: 70px;
`;

const MissionContainer = styled.View`
  height: 90px;
  margin-top: 26px;
  width: 100%;
  padding-left: 15px;

  border-radius: 20px;
  border-color: #4a306d;
  border-width: 1px;

  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const AboutMission = styled.Pressable`
  align-items: flex-start;
`;

const MissionName = styled(BoldStyledText)`
  font-size: 18px;
`;
const MissionContent = styled(StyledText)`
  font-size: 14px;
`;

export default SelectionScreen;
