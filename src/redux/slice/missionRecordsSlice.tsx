import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MissionRecord[] = [];

const missionRecordsSlice = createSlice({
  name: "missionRecords",
  initialState,
  reducers: {
    recordInitialization: (_, action: PayloadAction<MissionRecord[]>) =>
      action.payload,
    accomplished: (state, action: PayloadAction<MissionRecord>) => [
      ...state,
      action.payload,
    ],
  },
});

export const { accomplished } = missionRecordsSlice.actions;
export default missionRecordsSlice.reducer;
