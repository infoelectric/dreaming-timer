import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/GlobalStyles";
import Voice from "@assets/icon/voiceSelection.svg";
import Wash from "@assets/icon/wash.svg";

const RecordScreen = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let sevenDays = [5, 6, 7, 8, 9, 10, 11];

  const insets = useSafeAreaInsets();

  return (
    <Container marginTop={insets.top}>
      <TitleContainer>
        <TitleBack>{"<"}</TitleBack>
        <Title>{"졸음 이력 기록"}</Title>
        <TitleBack>{}</TitleBack>
      </TitleContainer>
      <TitleLine />
      <DateContainer>
        <DateBack>{"<"}</DateBack>
        <Date>{"11월 둘째 주"}</Date>
        <DateGo>{">"}</DateGo>
      </DateContainer>

      <DayContainer>
        {week.map((day, index) => (
          <DayColor key={index}>{day}</DayColor>
        ))}
      </DayContainer>

      <SevenDaysContainer>
        {sevenDays.map((day) => (
          <SevenDaysText>{day}</SevenDaysText>
        ))}
      </SevenDaysContainer>

      <SevenDaytsLine />

      <ScrollView
        style={{ width: "80%" }}
        contentContainerStyle={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#4a306d",
        }}
      >
        <RecordContainer>
          <Time>{"10시 30분"}</Time>
          <MissionBox>
            <MissionDetail>{"미션:잰말 놀이"}</MissionDetail>
            <Wash width={30} height={30} fill={"#0E273C"} />
          </MissionBox>
          <MissionTime>{"미션 수행 시간: 15분"}</MissionTime>
        </RecordContainer>

        <RecordContainer>
          <Time>{"13시 40분"}</Time>
          <MissionBox>
            <MissionDetail>{"미션:세수하기"}</MissionDetail>
            <Voice width={30} height={30} fill={"#0E273C"} />
          </MissionBox>
          <MissionTime>{"미션 수행 시간: 10분"}</MissionTime>
        </RecordContainer>

        <RecordContainer>
          <Time>{"16시 17분"}</Time>
          <MissionBox>
            <MissionDetail>{"미션:세수하기"}</MissionDetail>
            <Voice width={30} height={30} fill={"#0E273C"} />
          </MissionBox>
          <MissionTime>{"미션 수행 시간: 10분"}</MissionTime>
        </RecordContainer>
      </ScrollView>
    </Container>
  );
};

const Title = styled(BoldStyledText)`
  font-size: 25px;
  color: #0e273c;
`;

const TitleBack = styled(StyledText)`
  font-size: 24px;
  color: #0e273c;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  gap: 50px;
`;

const TitleLine = styled.View`
  background-color: #efeded;
  width: 346px;
  height: 1px;

  margin-top: 7px;
  margin-bottom: 14px;
`;

const DateContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 27px;

  justify-content: space-around;
`;

const SevenDaysContainer = styled.View`
  flex-direction: row;
  gap: 24px;
`;

const SevenDaytsLine = styled.View`
  background-color: #efeded;
  width: 346px;
  height: 1px;

  margin-top: 29px;
  margin-bottom: 10px;
`;

const SevenDaysText = styled(StyledText)`
  font-size: 24px;
  color: #0e273c;
`;

const DateBack = styled(StyledText)`
  font-size: 24px;
  color: #0e273c;
`;

const DateGo = styled(StyledText)`
  font-size: 24px;
  color: #0e273c;
`;

const Date = styled(StyledText)`
  font-size: 24px;
  color: #0e273c;
`;

const DayContainer = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const DayColor = styled(StyledText)`
  font-size: 24px;
  color: #d3bccc;
`;

const Container = styled.View<{ marginTop: number }>`
  flex: 1;
  align-items: center;
`;

const RecordContainer = styled.View`
  height: 152px;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #4a306d;
`;

const Time = styled(StyledText)`
  color: #4a306d;
  font-size: 26px;
  text-decoration-line: underline;
  text-decoration-color: #4a306d;
`;

const MissionBox = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

const MissionDetail = styled(StyledText)`
  font-size: 18px;
  color: #0e273c;
`;

const MissionTime = styled(StyledText)`
  font-size: 18px;
  color: #0e273c;
  margin-top: 10px;
`;

export default RecordScreen;
