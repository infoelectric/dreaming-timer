import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from "react-native-sensors";

type DistanceChangeCallback = (distance: number) => void;

const trackDistance = (onDistanceChange: DistanceChangeCallback) => {
  let velocity: Position = { x: 0, y: 0 };
  let position: Position = { x: 0, y: 0 };
  let initialTime: number = 0;

  // 가속도 센서 업데이트 주기 설정 (1초마다 값 업데이트)
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000);

  const subscription = accelerometer.subscribe(({ x, y }) => {
    if (!initialTime) {
      initialTime = new Date().getTime();
    }

    const deltaTime = 1; // 1초마다 가속도 업데이트

    velocity.x += x * deltaTime;
    velocity.y += y * deltaTime;
    position.x += velocity.x * deltaTime;
    position.y += velocity.y * deltaTime;

    const distance = Math.sqrt(position.x ** 2 + position.y ** 2);

    onDistanceChange(distance);
  });

  return () => {
    subscription.unsubscribe();
  };
};

export default trackDistance;
