import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";

import { StyledText } from "@styles/GlobalStyles";

const RankingScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container marginTop={insets.top}>
      <StyledText>{"랭킹 화면"}</StyledText>
    </Container>
  );
};

const Container = styled.View<{ marginTop: number }>`
  flex: 1;
`;

export default RankingScreen;
