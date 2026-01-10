
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types/customer.types';

interface CustomersState {
  list: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  list: [],
  loading: false,
  error: null,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCustomersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCustomersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const { setCustomers, setCustomersLoading, setCustomersError } = customersSlice.actions;
export default customersSlice.reducer;
