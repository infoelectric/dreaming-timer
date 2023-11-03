/**
 * @format
 */

import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import styled from "styled-components/native";

import Voice from "@assets/icon/voiceSelection.svg";

const App = () => {
  return (
    <Container>
      <FirstText>{"수행 할 미션 선택"}</FirstText>
      <MissionContainer>
        <Voice width={60} height={60} fill={"#0E273C"} />
        <AboutMission>
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

  border-radius: 20px;
  border-color: #4a306d;
  border-width: 1px;

  align-items: flex-start;
`;

const AboutMission = styled.View`
  justify-content: flex-start;
`;

const MissionName = styled(BoldStyledText)`
  font-size: 18px;
`;
const MissionContent = styled(StyledText)`
  font-size: 14px;
`;

export default App;
