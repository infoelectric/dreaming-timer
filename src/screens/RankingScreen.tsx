import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import { StyledText } from "@styles/GlobalStyles";

const RankingScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container marginTop={insets.top}>
      <TitleContainer>
        <TitleTextBack>{"<"}</TitleTextBack>
        <TitleText>{"학생 랭킹"}</TitleText>
        <TitleText>{"학생"}</TitleText>
      </TitleContainer>

      <DateContainer>
        <DateText>{"10월 30일"}</DateText>
      </DateContainer>
    </Container>
  );
};

const Container = styled.View<{ marginTop: number }>`
  flex: 1;

  align-items: center;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  gap: 138px;
`;

const TitleText = styled(StyledText)`
  font-size: 17px;
  color: #0e273c;
`;

const TitleTextBack = styled(StyledText)`
  font-size: 19px;
  color: #0e273c;
`;

const DateContainer = styled.View`
  width: 333px;
  height: 40px;
  border-radius: 10px;

  margin-top: 9px;
  background-color: #e8d7f1;

  flex-direction: row;
  justify-content: space-around;
`;

const DateText = styled(StyledText)`
  font-size: 23px;
  color: #0e273c;
`;

export default RankingScreen;
