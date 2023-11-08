import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import AudioRecord from "react-native-audio-record";
import { request, PERMISSIONS, Permission } from "react-native-permissions";
import RNFS from "react-native-fs";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import MicIcon from "@assets/icon/mic.svg";

import { WakeUpDetection } from "@redux/slice/timerSlice";
import { accomplished } from "@redux/slice/missionRecordsSlice";
import { RootState } from "@redux/reducers";
import secondsToHMS from "@utils/secondsToHMS";

const options = {
  sampleRate: 16000, // 샘플레이트, 기본값은 44100
  channels: 1, // 채널, 1 또는 2, 기본값은 1
  bitsPerSample: 16, // 비트레이트, 8 또는 16, 기본값은 16
  wavFile: "test.wav", // 파일 이름, 기본값은 audio.wav
};

AudioRecord.init(options);

const missionSentences = [
  "만점 만점에 만점을 맞으면 만점을 맞았으니 만점을 맞은 것이다.",
  "간 구하려 광고해 간구한 강가의 관광객들.",
];

const TongueTwisterScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { elapsedTime, startTime } = useSelector(
    (state: RootState) => state.timer
  );

  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<string>("");
  const [recognized, setRecognized] = useState<string>("");
  const [missionSentence, setMissionSentence] = useState<string>("잰말놀이");

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
        // 권한이 부여되어 녹음을 시작할 수 있음
        onStartRecord();
      } else {
        console.log(result);
        // 권한이 거부됨
        console.log("녹음 권한이 거부되었습니다.");
        // 권한 거부 시 처리기 추가
        if (permission! === PERMISSIONS.IOS.MICROPHONE) {
          console.log("마이크 권한이 거부되었습니다.");
          // 여기에 마이크 권한 거부 시 처리할 작업 추가
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onStartRecord = async () => {
    AudioRecord.start();
    setIsRecord(true);
  };

  const onStopRecord = async () => {
    const audioFile = await AudioRecord.stop();
    setIsRecord(false);
    convertAudioToBase64(audioFile);
  };

  const convertAudioToBase64 = async (audioFile: string) => {
    try {
      const convertedAudioData = await RNFS.readFile(audioFile, "base64");
      setAudioData(convertedAudioData);
    } catch (error) {
      console.error("base64 변환 오류:", error);
    }
  };

  const recording = () => {
    if (!isRecord) {
      requestRecordAudioPermission(); // 권한 요청 추가
    } else {
      onStopRecord();
    }
  };

  const fetchData = async (audio: string) => {
    try {
      const url = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
      const jsonData = {
        argument: {
          language_code: "korean",
          audio,
        },
      };

      const response = await axios.post(url, JSON.stringify(jsonData), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "e47b42e8-ae42-49fd-91b7-13da02eeaada",
        },
      });
      setRecognized(response.data.return_object.recognized);
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  };

  useEffect(
    () =>
      setMissionSentence(
        missionSentences[Math.floor(Math.random() * missionSentences.length)]
      ),
    []
  );

  useEffect(() => {
    fetchData(audioData);
  }, [audioData]);

  useEffect(() => {
    // 정규식 패턴: \s는 공백, \p{P}는 문장부호를 나타낸다.
    const pattern = /[\s\p{P}]/gu;

    // 정규식을 사용하여 문자열에서 띄어쓰기와 문장부호를 제거한다.
    if (
      missionSentence.replace(pattern, "") === recognized.replace(pattern, "")
    ) {
      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "미션 성공!", // 메시지 제목
        text2: "3초 후 타이머로 돌아갑니다!", // 메시지 내용
        visibilityTime: 3000, // 토스트 메시지 표시 시간 (밀리초)
      });
      const timeout = setTimeout(() => {
        setRecognized("");
        dispatch(
          accomplished({
            time: startTime,
            missionName: "잰말놀이",
            timesOfStudy: secondsToHMS(elapsedTime),
          })
        );
        dispatch(WakeUpDetection());
        navigation.popToTop();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [
    dispatch,
    elapsedTime,
    missionSentence,
    navigation,
    recognized,
    startTime,
  ]);

  return (
    <Container>
      <FirstText>{"잰말놀이"}</FirstText>
      <SecondText>{"아래 문장을 정확히 읽어주세요!"}</SecondText>
      <Rectangle>
        <Mission>{missionSentence}</Mission>
        {recognized && !recognized.includes("ERROR") ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <BoldStyledText style={{ fontSize: 20 }}>
              {"내 음성"}
            </BoldStyledText>
            <Mission>{recognized}</Mission>
          </View>
        ) : null}
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
  justify-content: center;
  align-items: center;
`;

const FirstText = styled(BoldStyledText)`
  font-size: 36px;
`;

const SecondText = styled(StyledText)`
  font-size: 24px;
  margin-top: 27px;
`;

const Rectangle = styled.View`
  gap: 10px;

  height: 252px;
  width: 80%;

  margin-top: 42px;
  padding: 20px;

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
