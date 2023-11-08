import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
  isRunning: boolean;
  isPause: boolean;
  isDetect: boolean;
  elapsedTime: number;
}

const initialState: TimerState = {
  isRunning: false,
  isPause: false,
  isDetect: false,
  elapsedTime: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    pauseTimer: (state) => {
      state.isPause = true;
    },
    resumeTimer: (state) => {
      state.isPause = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.elapsedTime = 0;
    },
    drowsinesDetection: (state) => {
      state.isPause = true;
      state.isDetect = true;
    },
    WakeUpDetection: (state) => {
      state.isPause = false;
      state.isDetect = false;
    },
    tick: (state) => {
      if (state.isRunning) {
        state.elapsedTime += 1;
      }
    },
  },
});

export const {
  startTimer,
  stopTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
  drowsinesDetection,
  WakeUpDetection,
  tick,
} = timerSlice.actions;
export default timerSlice.reducer;
