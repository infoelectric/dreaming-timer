import { combineReducers, Reducer } from "@reduxjs/toolkit";
import timerReducer, { TimerState } from "./slice/timerSlice";

export interface RootState {
  timer: TimerState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  timer: timerReducer,
});

export default rootReducer;
