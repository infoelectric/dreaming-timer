import { useCallback, useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";
import axios from "axios";
import { drowsinesDetection } from "@redux/slice/timerSlice";
import { useDispatch } from "react-redux";

const Detecting = () => {
  const dispatch = useDispatch();

  const device = useCameraDevice("front");
  const camera = useRef<Camera>(null);
  const format = useCameraFormat(device, [
    { photoResolution: { width: 1280, height: 720 } },
  ]);

  const [detectCount, setDetectCount] = useState<number>(0);

  const fetchData = async (filePath: string) => {
    const url = "http://192.168.108.106:3000/api/drowsinessdetection";

    const formData = new FormData();
    formData.append("image", {
      uri: "file://" + filePath,
      type: "image/jpeg",
      name: "filename.jpg",
    });

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setDetectCount((prev) => (response.data.message ? prev : prev + 1));
    } catch (error) {
      console.error("이미지 전송 중 오류 발생:", error);
    }
  };

  const photograph = useCallback(async () => {
    try {
      const photo = await camera.current?.takePhoto({
        enableShutterSound: false,
      });

      fetchData(photo!.path);
      console.log(photo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    // 1초마다 photograph 함수를 호출
    const intervalId = setInterval(() => {
      photograph();
    }, 1000);

    // 컴포넌트 언마운트 시 clearInterval을 호출하여 interval을 정리
    return () => clearInterval(intervalId);
  }, [photograph]); // useEffect의 두 번째 인자로 빈 배열을 전달하여 한 번만 실행되도록 함

  useEffect(() => {
    if (detectCount > 7) {
      dispatch(drowsinesDetection());
    }
  }, [detectCount, dispatch]);

  return (
    <Camera
      ref={camera}
      style={{ width: "100%", height: "100%" }}
      device={device!}
      isActive={true}
      photo={true}
      format={format}
    />
  );
};

export default Detecting;
