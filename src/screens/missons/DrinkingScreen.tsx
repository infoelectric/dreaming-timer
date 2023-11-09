import { useCallback, useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import RNFS from "react-native-fs";
import Toast from "react-native-toast-message";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import styled from "styled-components/native";

import { BoldStyledText, StyledText } from "@styles/GlobalStyles";

import CameraIcon from "@assets/icon/camera.svg";

import { accomplished } from "@redux/slice/missionRecordsSlice";
import { WakeUpDetection } from "@redux/slice/timerSlice";
import { RootState } from "@redux/reducers";

import secondsToHMS from "@utils/secondsToHMS";

const DrinkingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { elapsedTime, startTime } = useSelector(
    (state: RootState) => state.timer
  );

  const device = useCameraDevice("back");

  const camera = useRef<Camera>(null);

  const [photoPath, setPhotoPath] = useState<string>("");
  const [recognizedDatas, setRecognizedDatas] = useState<any[]>([]);

  const requestCameraPermission = useCallback(async () => {
    const status = await check(PERMISSIONS.ANDROID.CAMERA);

    if (status === RESULTS.GRANTED) {
      // 권한이 이미 허용되어 있음
      console.log("카메라 권한이 허용되었습니다.");
    } else {
      // 권한을 요청
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        console.log("카메라 권한이 허용되었습니다.");
      } else {
        console.log("카메라 권한이 거부되었습니다.");
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      await requestCameraPermission();
    })();
  }, [requestCameraPermission]);

  const fatchData = useCallback(async () => {
    try {
      const url = "http://aiopen.etri.re.kr:8000/ObjectDetect";

      const jsonData = {
        argument: {
          type: "jpg",
          file: await RNFS.readFile(photoPath, "base64"),
        },
      };

      const response = await axios.post(url, JSON.stringify(jsonData), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "e47b42e8-ae42-49fd-91b7-13da02eeaada",
        },
      });

      console.log(response.data.return_object.data);
      setRecognizedDatas(response.data.return_object.data);
    } catch (error) {
      console.error("네트워크 오류:", error);
      throw error;
    }
  }, [photoPath]);

  const photograph = async () => {
    try {
      const photo = await camera.current?.takePhoto({
        enableShutterSound: false,
      });

      Toast.show({
        type: "info",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "객체 인식 중입니다!", // 메시지 제목
        text2: "인식이 완료 될 동안 잠시 기다려주세요!", // 메시지 내용
        visibilityTime: 20000, // 토스트 메시지 표시 시간 (밀리초)
      });

      setPhotoPath(photo!.path);
      console.log(photo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (photoPath) (async () => fatchData())();
  }, [fatchData, photoPath]);

  useEffect(() => {
    if (recognizedDatas === undefined) {
      Toast.show({
        type: "error",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "객체 인식 실패!", // 메시지 제목
        text2: "카메라 버튼을 눌러 다시 촬영해주세요!", // 메시지 내용
        visibilityTime: 3000, // 토스트 메시지 표시 시간 (밀리초)
      });
      setPhotoPath("");
      return;
    }

    if (recognizedDatas.length === 0) return;

    // "class" 값을 추출하여 새로운 배열을 생성
    const classNames = recognizedDatas.map((item) => item.class);

    // "cup" 또는 "bottle" 중 하나라도 배열에 포함되어 있는지 확인
    const isCupOrBottlePresent =
      classNames.includes("cup") || classNames.includes("bottle");

    if (isCupOrBottlePresent) {
      Toast.show({
        type: "success",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "미션 성공!", // 메시지 제목
        text2: "3초 후 타이머로 돌아갑니다!", // 메시지 내용
        visibilityTime: 3000, // 토스트 메시지 표시 시간 (밀리초)
      });
      const timeout = setTimeout(() => {
        setRecognizedDatas([]);
        dispatch(
          accomplished({
            time: startTime,
            missionName: "물 마시기",
            timesOfStudy: secondsToHMS(elapsedTime),
          })
        );
        dispatch(WakeUpDetection());
        navigation.popToTop();
      }, 3000);

      return () => clearTimeout(timeout);
    } else if (recognizedDatas && photoPath) {
      Toast.show({
        type: "error",
        position: "bottom", // 토스트 메시지 위치 (top, bottom)
        text1: "컵 인식 실패!", // 메시지 제목
        text2: "카메라 버튼을 눌러 다시 촬영해주세요!", // 메시지 내용
        visibilityTime: 3000, // 토스트 메시지 표시 시간 (밀리초)
      });
      setPhotoPath("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, elapsedTime, navigation, recognizedDatas, startTime]);

  return (
    <Container>
      <FirstText>{"물 마시기"}</FirstText>
      <SecondText>{`카메라 버튼을 눌러
물 잔을 찍어주세요!`}</SecondText>
      <Rectangle>
        {device === null ? (
          <ErrorMessage>{"카메라가 존재하지 않습니다!"}</ErrorMessage>
        ) : photoPath ? (
          <Image
            source={{
              uri: `file://${photoPath}`,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Camera
            ref={camera}
            style={{ width: "100%", height: "100%" }}
            device={device!}
            isActive={true}
            photo={true}
          />
        )}
      </Rectangle>
      <Circle onPress={async () => await photograph()}>
        <CameraIcon width={60} height={60} fill={"#0E273C"} />
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
  height: 30%;
  width: 80%;

  padding: 10px;
  margin-top: 42px;

  justify-content: center;
  align-items: center;

  border: 1px;
  border-color: #a167a5;
  border-radius: 10px;
`;

const ErrorMessage = styled(StyledText)`
  font-size: 32px;
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

export default DrinkingScreen;
