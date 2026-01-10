
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { customersApi } from '../api/endpoints/customers.api';
import { setCustomers, setCustomersLoading, setCustomersError } from '../store/slices/customersSlice';
import { Customer } from '../types/customer.types';
import { toast } from 'sonner';

export const useCustomers = (searchQuery: string = '') => {
  const dispatch = useDispatch();
  const { list: customers, loading, error } = useSelector((state: RootState) => state.customers);

  const fetchCustomers = useCallback(async () => {
    dispatch(setCustomersLoading(true));
    try {
      const response = await customersApi.getAll();
      dispatch(setCustomers(response.data));
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to sync customer directory';
      dispatch(setCustomersError(msg));
      toast.error(msg);
    } finally {
      dispatch(setCustomersLoading(false));
    }
  }, [dispatch]);

  const addCustomer = async (data: any) => {
    try {
      const res = await customersApi.create(data);
      toast.success('New customer profile established');
      fetchCustomers();
      return res.data;
    } catch (err) {
      toast.error('Failed to create customer profile');
      throw err;
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await customersApi.delete(id);
      toast.success('Customer profile removed');
      fetchCustomers();
    } catch (err) {
      toast.error('Could not remove customer profile');
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const q = searchQuery.toLowerCase();
    return customers.filter(c => 
      `${c.user?.firstName} ${c.user?.lastName}`.toLowerCase().includes(q) ||
      c.user?.email.toLowerCase().includes(q) ||
      c.user?.phone.includes(q)
    );
  }, [customers, searchQuery]);

  return {
    customers: filteredCustomers,
    rawCustomers: customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    deleteCustomer
  };
};
