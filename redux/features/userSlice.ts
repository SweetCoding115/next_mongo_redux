import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  _id: string;
  name: string;
  email: string;
  image: string;
  plan: string;
  accessCount: number;
  payedAt: Date;
  expired: boolean;
  createdAt: Date;
};

const initialState = {
	plan: 'free',
	accessCount: 1,
	expired: true,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.email = action.payload.email
      state.image = action.payload.image
      state.plan = action.payload.plan
      state.payedAt = action.payload.payedAt
      state.accessCount = action.payload.accessCount
      state.expired = action.payload.expired
      state.createdAt = action.payload.createdAt
    },
  },
});

export const {
	setUser,
  reset,
} = user.actions;
export default user.reducer;
