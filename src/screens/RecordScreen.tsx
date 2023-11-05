import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import { StyledText } from "@styles/GlobalStyles";

const RecordScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container marginTop={insets.top}>
      <StyledText>{"기록 화면"}</StyledText>
    </Container>
  );
};

const Container = styled.View<{ marginTop: number }>`
  flex: 1;
`;

export default RecordScreen;
