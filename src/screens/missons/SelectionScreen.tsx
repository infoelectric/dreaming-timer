import { useEffect } from "react";

import { useDispatch } from "react-redux";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import VoiceIcon from "@assets/icon/voiceSelection.svg";
import VentIcon from "@assets/icon/vent.svg";
import CupIcon from "@assets/icon/cup.svg";
import WashIcon from "@assets/icon/wash.svg";
import WalkIcon from "@assets/icon/walk.svg";

import { pauseTimer } from "@redux/slice/timerSlice";

const SelectionScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pauseTimer());
  }, [dispatch]);

  return (
    <Container>
      <FirstText>{"수행 할 미션 선택"}</FirstText>

      <MissionContainer>
        <VoiceIcon width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("잰말놀이")}>
          <MissionName>{"잰말놀이"}</MissionName>
          <MissionContent>{`텅 트위스트 좋아해?
발음하기 어려운 문장을 읽는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <CupIcon width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("물 마시기")}>
          <MissionName>{"물 마시기"}</MissionName>
          <MissionContent>{`찬 물 마시고 정신 차리자!
물을 마신 뒤, 물컵을 찍는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <VentIcon width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("공부 환경 돌아보기")}>
          <MissionName>{"공부 환경 돌아보기"}</MissionName>
          <MissionContent>{`자리에서 일어나 주의를 환기시키자!
앉아있던 자리의 의자를 찍는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <WashIcon width={60} height={60} fill={"#0E273C"} />
        <AboutMission onPress={() => navigation.navigate("세수하기")}>
          <MissionName>{"세수하기"}</MissionName>
          <MissionContent>{`화장실 다녀오고 리프레시하자!
세수한 다음, 거울샷을 찍는 미션`}</MissionContent>
        </AboutMission>
      </MissionContainer>

      <MissionContainer>
        <WalkIcon width={60} height={60} fill={"#0E273C"} />
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
