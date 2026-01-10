
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/order.types';

interface OrdersState {
  list: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  list: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateOrderInList: (state, action: PayloadAction<Order>) => {
      const index = state.list.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      if (state.selectedOrder?.id === action.payload.id) {
        state.selectedOrder = action.payload;
      }
    }
  },
});

export const { setOrders, setSelectedOrder, setLoading, setError, updateOrderInList } = ordersSlice.actions;
export default ordersSlice.reducer;
