import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components/native";

import { StyledText } from "@styles/GlobalStyles";

import VoiceIcon from "@assets/icon/voiceSelection.svg";
import CupIcon from "@assets/icon/cup.svg";
import WashIcon from "@assets/icon/wash.svg";
import WalkIcon from "@assets/icon/walk.svg";

import { RootState } from "@redux/reducers";
import { accomplished } from "@redux/slice/missionRecordsSlice";

const Records: MissionRecord[] = [
  {
    time: "10시 30분",
    missionName: "물 마시기",
    timesOfStudy: "1시간 15분",
  },
  {
    time: "12시 13분",
    missionName: "일정 거리 걷기",
    timesOfStudy: "34분",
  },
  {
    time: "14시 17분",
    missionName: "세수하기",
    timesOfStudy: "21분",
  },
];

const iconConfig = [
  {
    name: "잰말놀이",
    icon: <VoiceIcon width={24} height={24} fill="#0E273C" />,
  },
  {
    name: "물 마시기",
    icon: <CupIcon width={24} height={24} fill="#0E273C" />,
  },
  {
    name: "세수하기",
    icon: <WashIcon width={24} height={24} fill="#0E273C" />,
  },
  {
    name: "일정 거리 걷기",
    icon: <WalkIcon width={24} height={24} fill="#0E273C" />,
  },
];

const RecordList = () => {
  const dispatch = useDispatch();

  const missionRecords = useSelector(
    (state: RootState) => state.missionRecords
  );

  const renderLoopListItem = useCallback(
    ({ item }: { item: MissionRecord }) => {
      const missionIcon = iconConfig.find(
        (icon) => icon.name === item.missionName
      );
      return (
        <RecordContainer>
          <Time>{item.time}</Time>
          <MissionBox>
            <MissionDetail>{`미션: ${item.missionName}`}</MissionDetail>
            {missionIcon?.icon}
          </MissionBox>
          <MissionTime>{`공부 시간: ${item.timesOfStudy}`}</MissionTime>
        </RecordContainer>
      );
    },
    []
  );

  const randerSeparator = useCallback(() => <Separator />, []);

  useEffect(() => {
    // 중복된 미션을 제거하여 새로운 배열 생성
    const uniqueMissionRecords = Records.filter((missionRecord) => {
      return !missionRecords.some(
        (record) => record.missionName === missionRecord.missionName
      );
    });

    uniqueMissionRecords.forEach((missionRecord) =>
      dispatch(accomplished(missionRecord))
    );
  }, [dispatch, missionRecords]);

  return (
    <FlatList
      style={{
        width: "80%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#4a306d",
      }}
      data={missionRecords}
      renderItem={renderLoopListItem}
      ItemSeparatorComponent={randerSeparator}
    />
  );
};

const RecordContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
  gap: 6px;

  padding: 20px;
`;

const Time = styled(StyledText)`
  color: #4a306d;
  font-size: 26px;
  text-decoration-line: underline;
  text-decoration-color: #4a306d;
`;

const MissionBox = styled.View`
  flex-direction: row;
  gap: 3px;
`;

const MissionDetail = styled(StyledText)`
  font-size: 18px;
  color: #0e273c;
`;

const MissionTime = styled(StyledText)`
  font-size: 18px;
  color: #0e273c;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #4a306d;
`;

export default RecordList;
