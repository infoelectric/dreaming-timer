import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { request, PERMISSIONS, Permission } from "react-native-permissions";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import MicIcon from "@assets/icon/mic.svg";

const audioRecorderPlayer = new AudioRecorderPlayer();

const TongueTwisterScreen = ({ navigation }: any) => {
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState("");
  const [isRecord, setIsRecord] = useState(false);

  useEffect(() => {
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });

    return () => {
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);

  // 권한 요청 함수
  const requestRecordAudioPermission = async () => {
    let permission: Permission;
    if (Platform.OS === "ios") {
      permission = PERMISSIONS.IOS.MICROPHONE;
    } else if (Platform.OS === "android") {
      permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
    }

    try {
      const result = await request(permission!);
      if (result === "granted") {
        // 권한이 부여됨, 녹음을 시작할 수 있음
        onStartRecord();
      } else {
        // 권한이 거부됨
        console.log("녹음 권한이 거부되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onStartRecord = async () => {
    await audioRecorderPlayer.startRecorder();
    setIsRecord(true);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    console.log(result);
    setIsRecord(false);
  };

  const recording = () => {
    requestRecordAudioPermission(); // 권한 요청 추가

    setTimeout(() => {
      if (isRecord) {
        onStopRecord();
        console.log(recordTime);
        console.log(recordSecs);
        navigation.goBack();
      }
    }, 3000);
  };

  return (
    <Container>
      <FirstText>{"잰말놀이"}</FirstText>
      <SecondText>{"아래 문장을 정확히 읽어주세요!"}</SecondText>
      <Rectangle>
        <Mission>{`만점 만점에 만점을 맞으면
만점을 맞았으니 만점을 맞은 것이다.`}</Mission>
      </Rectangle>
      <Circle onPress={() => recording()}>
        <MicIcon
          width={60}
          height={60}
          fill={isRecord ? "tomato" : "#0E273C"}
        />
      </Circle>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const FirstText = styled(BoldStyledText)`
  font-size: 36px;
  margin-top: 70px;
`;

const SecondText = styled(StyledText)`
  font-size: 24px;
  margin-top: 27px;
`;

const Rectangle = styled.View`
  height: 252px;
  width: 80%;

  margin-top: 42px;

  justify-content: center;
  align-items: center;

  border: 1px;
  border-color: #a167a5;
  border-radius: 20px;
`;

const Mission = styled(StyledText)`
  font-size: 18px;
  text-align: center;
`;

const Circle = styled.Pressable`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #e8d7f1;
  justify-content: center;
  align-items: center;

  margin-top: 88px;
`;

export default TongueTwisterScreen;
