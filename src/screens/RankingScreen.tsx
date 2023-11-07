import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { StyledText } from "@styles/GlobalStyles";
import PersonalInformation from "@components/Ranking/PersonalInformation";

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
        <DataGoText>{"<"}</DataGoText>
        <DateText>{"10월 30일"}</DateText>
        <DataGoText>{">"}</DataGoText>
      </DateContainer>

      <MyRankContainer>
        <MyRankText>{"내 등수 1등"}</MyRankText>
        <MyRankText>{"상위 1%"}</MyRankText>
      </MyRankContainer>

      <AllContainer>
        <PersonalInformation
          rank={1}
          grade={"대학생"}
          name={"정전"}
          time={"8:13:08"}
          barSize={210}
        />

        <PersonalInformation
          rank={2}
          grade={"고등학생"}
          name={"레츠고"}
          time={"7:13:03"}
          barSize={199}
        />

        <PersonalInformation
          rank={3}
          grade={"고등학생"}
          name={"자발적 아싸"}
          time={"6:12:08"}
          barSize={189}
        />

        <PersonalInformation
          rank={4}
          grade={"고등학생"}
          name={"준희어 네이버"}
          time={"5:10:08"}
          barSize={180}
        />

        <PersonalInformation
          rank={5}
          grade={"대학생"}
          name={"클로버"}
          time={"5:04:04"}
          barSize={169}
        />

        <PersonalInformation
          rank={6}
          grade={"대학생"}
          name={"연탄"}
          time={"4:03:12"}
          barSize={164}
        />

        <PersonalInformation
          rank={7}
          grade={"대학생"}
          name={"민선공듀"}
          time={"4:01:43"}
          barSize={160}
        />

        <PersonalInformation
          rank={8}
          grade={"대학생"}
          name={"친환경승준"}
          time={"3:59:34"}
          barSize={155}
        />
      </AllContainer>
    </Container>
  );
};

const AllContainer = styled.View`
  justify-content: flex-start;
`;

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

const DataGoText = styled(StyledText)`
  font-size: 17px;
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
  align-items: center;
`;

const DateText = styled(StyledText)`
  font-size: 23px;
  color: #0e273c;
`;

const MyRankContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  margin-top: 22px;
`;

const MyRankText = styled(StyledText)`
  font-size: 24px;
  color: #0e273c;
`;

export default RankingScreen;
