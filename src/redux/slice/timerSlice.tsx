import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
}

const initialState: TimerState = {
  isRunning: false,
  elapsedTime: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.elapsedTime = 0;
    },
    tick: (state) => {
      if (state.isRunning) {
        state.elapsedTime += 1;
      }
    },
  },
});

export const { startTimer, pauseTimer, resetTimer, tick } = timerSlice.actions;
export default timerSlice.reducer;
