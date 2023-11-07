import React from "react";
import styled from "styled-components/native";
import { StyledText, BoldStyledText } from "@styles/GlobalStyles";

import MenuBook from "@assets/icon/menu_book.svg";
import { View } from "react-native";

interface PersonalInformationProps {
  rank: number;
  grade: string;
  name: string;
  time: string;
  barSize: number;
}

const PersonalInformation = ({
  rank,
  grade,
  name,
  time,
  barSize,
}: PersonalInformationProps) => {
  return (
    <ActualRankContainer>
      <View style={{ flexDirection: "row" }}>
        <Circle>
          <CircleText>{rank}</CircleText>
        </Circle>

        <PersonalInformationContainer>
          <PositionText>{grade}</PositionText>

          <RankContainer>
            <BlankContainer>
              <NameTimeContainer barSize={barSize}>
                <NameText>{name}</NameText>
                <TimeText>{time}</TimeText>
              </NameTimeContainer>
              <StudyingTimeBar barSize={barSize} />
            </BlankContainer>
          </RankContainer>
        </PersonalInformationContainer>
      </View>
      <MenuBook width={36} height={36} fill={"#A167A5"} />
    </ActualRankContainer>
  );
};

const BlankContainer = styled.View`
  margin-right: 26px;
`;

const RankContainer = styled.View`
  flex-direction: row;
`;

const TimeText = styled(StyledText)`
  font-size: 16px;
  color: #4a306d;
`;

const NameTimeContainer = styled.View<{ barSize: number }>`
  flex-direction: row;
  justify-content: space-between;
  width: ${(props) => props.barSize}px;
`;

const StudyingTimeBar = styled.View<{ barSize: number }>`
  width: ${(props) => props.barSize}px;
  border: 5px;
  border-radius: 6px;
  color: #4a306d;
`;

const PersonalInformationContainer = styled.View`
  margin-left: 13px;
`;
const NameText = styled(StyledText)`
  font-size: 13px;
  color: #0e273c;
`;

const PositionText = styled(StyledText)`
  font-size: 13px;
  color: #4a306d;
`;

const ActualRankContainer = styled.View`
  flex-direction: row;
  margin-top: 22px;
  justify-content: space-between;
`;

const Circle = styled.View`
  height: 34px;
  width: 34px;

  border-radius: 17px;
  border-color: #4a306d;
  border: 1px;

  justify-content: center;
  align-items: center;
`;

const CircleText = styled(BoldStyledText)`
  font-size: 15px;
  color: #0e273c;
`;

export default PersonalInformation;
