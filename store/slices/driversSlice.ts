
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Driver } from '../../types/driver.types';

interface DriversState {
  list: Driver[];
  loading: boolean;
  error: string | null;
}

const initialState: DriversState = {
  list: [],
  loading: false,
  error: null,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers: (state, action: PayloadAction<Driver[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDriversLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDriversError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateDriverInList: (state, action: PayloadAction<Driver>) => {
      const index = state.list.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    }
  },
});

export const { setDrivers, setDriversLoading, setDriversError, updateDriverInList } = driversSlice.actions;
export default driversSlice.reducer;
