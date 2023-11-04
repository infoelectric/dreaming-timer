import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import Voice from "@assets/icon/voiceSelection.svg";
import Air from "@assets/icon/air.svg";
import Cup from "@assets/icon/cup.svg";
import Wash from "@assets/icon/wash.svg";
import Walk from "@assets/icon/walk.svg";

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

      <MissionContainer>
        <Cup width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("물 마시기")}>
          <MissionName>{"물 마시기"}</MissionName>
          <MissionContent>{`찬 물 마시고 정신 차리자!
물을 마신 뒤, 물컵을 찍는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <Air width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("환기하기")}>
          <MissionName>{"환기하기"}</MissionName>
          <MissionContent>{`답답한 공기를 내보내고 환기를 하자!
창문을 열고, 열린 창문을 찍는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <Wash width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("세수하기")}>
          <MissionName>{"세수하기"}</MissionName>
          <MissionContent>{`화장실 다녀오고 리프레시하자!
세수한 다음, 거울샷을 찍는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <Walk width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("일정 거리 걷기")}>
          <MissionName>{"일정 거리 걷기"}</MissionName>
          <MissionContent>{`자리에만 앉아있지 말고 좀 걷자!
일정거리를 걷는 미션`}</MissionContent>
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
