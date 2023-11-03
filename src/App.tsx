/**
 * @format
 */

import { StyledText } from "@styles/GlobalStyles";
import { Text } from "react-native";
import styled from "styled-components/native";

const App = () => {
  return (
    <Container>
      <DoubleText>{"테스트"}</DoubleText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DoubleText = styled(StyledText)`
  font-size: 100px;
`;

export default App;
