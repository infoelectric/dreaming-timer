import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/GlobalStyles";
import RecordList from "@components/RecordList";

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
        {sevenDays.map((day, index) => (
          <SevenDaysText key={index}>{day}</SevenDaysText>
        ))}
      </SevenDaysContainer>

      <SevenDaytsLine />

      <RecordList />
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
  gap: 34px;
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
  gap: 28px;
`;

const DayColor = styled(StyledText)`
  font-size: 24px;
  color: #d3bccc;
`;

const Container = styled.View<{ marginTop: number }>`
  flex: 1;
  align-items: center;
`;

export default RecordScreen;
