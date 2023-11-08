import { combineReducers, Reducer } from "@reduxjs/toolkit";
import timerReducer, { TimerState } from "./slice/timerSlice";
import missionRecordsReducer from "./slice/missionRecordsSlice";

export interface RootState {
  timer: TimerState;
  missionRecords: MissionRecord[];
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  timer: timerReducer,
  missionRecords: missionRecordsReducer,
});

export default rootReducer;
