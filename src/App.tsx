/**
 * @format
 */

import { Text } from "react-native";
import styled from "styled-components/native";

const App = () => {
  return (
    <Container>
      <Text>{"테스트"}</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default App;
