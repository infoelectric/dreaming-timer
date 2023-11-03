import { StyledText } from "@styles/GlobalStyles";
import styled from "styled-components/native";

const HomeScreen = () => {
  return (
    <Container>
      <StyledText>{"홈 화면"}</StyledText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
