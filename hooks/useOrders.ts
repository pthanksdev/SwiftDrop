
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersApi } from '../api/endpoints/orders.api';
import { setOrders, setLoading, setError } from '../store/slices/ordersSlice';
import { RootState } from '../store';
import { toast } from 'sonner';
import { OrderStatus } from '../types/order.types';

export const useOrders = (filters?: { status?: OrderStatus | 'ALL'; search?: string }) => {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state: RootState) => state.orders);

  const fetchOrders = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await ordersApi.getAll();
      dispatch(setOrders(response.data));
    } catch (err: any) {
      const msg = err.message || 'Failed to fetch orders';
      dispatch(setError(msg));
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const createOrder = async (data: any) => {
    dispatch(setLoading(true));
    try {
      const response = await ordersApi.create(data);
      toast.success('Order created successfully');
      fetchOrders();
      return response.data;
    } catch (err: any) {
      toast.error('Failed to create order');
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelOrder = async (id: string) => {
    try {
      await ordersApi.updateStatus(id, OrderStatus.CANCELLED);
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to cancel order');
    }
  };

  // Client-side filtering
  const filteredOrders = orders.filter(order => {
    const matchesStatus = !filters?.status || filters.status === 'ALL' || order.status === filters.status;
    const matchesSearch = !filters?.search || 
      order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.recipientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return {
    orders: filteredOrders,
    rawOrders: orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    cancelOrder,
  };
};
