
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { driversApi } from '../api/endpoints/drivers.api';
import { setDrivers, setDriversLoading, setDriversError, updateDriverInList } from '../store/slices/driversSlice';
import { AvailabilityStatus, Driver } from '../types/driver.types';
import { toast } from 'sonner';

export const useDrivers = (filters?: { status?: AvailabilityStatus | 'ALL'; search?: string }) => {
  const dispatch = useDispatch();
  const { list: drivers, loading, error } = useSelector((state: RootState) => state.drivers);

  const fetchDrivers = useCallback(async () => {
    dispatch(setDriversLoading(true));
    try {
      const response = await driversApi.getAll();
      dispatch(setDrivers(response.data));
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to sync fleet data';
      dispatch(setDriversError(msg));
      toast.error(msg);
    } finally {
      dispatch(setDriversLoading(false));
    }
  }, [dispatch]);

  const updateStatus = async (id: string, status: AvailabilityStatus) => {
    try {
      const response = await driversApi.updateAvailability(id, status);
      dispatch(updateDriverInList(response.data));
      toast.success(`Driver is now ${status.toLowerCase()}`);
    } catch (err) {
      toast.error('Failed to update driver status');
    }
  };

  const createDriver = async (data: any) => {
    try {
      const response = await driversApi.create(data);
      toast.success('Driver registered successfully');
      fetchDrivers();
      return response.data;
    } catch (err) {
      toast.error('Registration failed');
      throw err;
    }
  };

  // Client-side filtering for immediate feedback
  const filteredDrivers = drivers.filter(driver => {
    const matchesStatus = !filters?.status || filters.status === 'ALL' || driver.availabilityStatus === filters.status;
    const name = `${driver.user?.firstName} ${driver.user?.lastName}`.toLowerCase();
    const matchesSearch = !filters?.search || 
      name.includes(filters.search.toLowerCase()) ||
      driver.vehiclePlate.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return {
    drivers: filteredDrivers,
    rawDrivers: drivers,
    loading,
    error,
    fetchDrivers,
    updateStatus,
    createDriver
  };
};
