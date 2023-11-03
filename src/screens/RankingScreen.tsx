import { StyledText } from "@styles/GlobalStyles";
import styled from "styled-components/native";

const RankingScreen = () => {
  return (
    <Container>
      <StyledText>{"랭킹 화면"}</StyledText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default RankingScreen;
