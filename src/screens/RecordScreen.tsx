import { StyledText } from "@styles/GlobalStyles";
import styled from "styled-components/native";

const RecordScreen = () => {
  return (
    <Container>
      <StyledText>{"기록 화면"}</StyledText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default RecordScreen;
