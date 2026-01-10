
import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Plus, Filter, 
  Download, MoreVertical, Shield, 
  Trash2, Edit, CheckCircle, XCircle,
  ArrowUpDown, ChevronLeft, ChevronRight,
  RefreshCw, X
} from 'lucide-react';
import { adminApi } from '../../api/endpoints/admin.api';
import { User } from '../../types/auth.types';
import { UserRole } from '../../types/api.types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import { formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import UserForm from '../../components/admin/UserForm';
import UserDetailsDialog from '../../components/admin/UserDetailsDialog';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers();
      // Handling potential paginated structure or array
      setUsers((res as any).data?.content || (res as any).data || []);
    } catch (err) {
      // Mock for demo
      setUsers([
        { id: '1', firstName: 'Alice', lastName: 'Admin', email: 'alice@swiftdrop.io', phone: '555-0100', role: UserRole.ADMIN, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '2', firstName: 'Bob', lastName: 'Dispatcher', email: 'bob@swiftdrop.io', phone: '555-0101', role: UserRole.DISPATCHER, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '3', firstName: 'Charlie', lastName: 'Driver', email: 'charlie@swiftdrop.io', phone: '555-0102', role: UserRole.DRIVER, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '4', firstName: 'Diana', lastName: 'Customer', email: 'diana@example.com', phone: '555-0103', role: UserRole.CUSTOMER, isActive: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    try {
      await adminApi.updateUserStatus(id, isActive);
      toast.success(`User ${isActive ? 'activated' : 'deactivated'}`);
      fetchUsers();
      setIsDetailsOpen(false);
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you absolutely sure? This action is irreversible.')) return;
    try {
      await adminApi.deleteUser(id);
      toast.success('User permanently deleted');
      fetchUsers();
      setIsDetailsOpen(false);
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    const matchesSearch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || (statusFilter === 'ACTIVE' ? u.isActive : !u.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Operations</h1>
          <p className="text-slate-500 font-medium">Manage cross-platform identities and permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-12 border-slate-200">
            <Download size={16} className="mr-2" /> Export Roster
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl h-12 px-6 bg-blue-600 shadow-lg shadow-blue-500/20 font-bold">
            <Plus size={18} className="mr-2" /> New Account
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <Input 
              placeholder="Search by name, email or hash..." 
              className="pl-12 py-7 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="ALL">All Roles</option>
              {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Deactivated</option>
            </select>
            <Button variant="ghost" onClick={fetchUsers} className="rounded-2xl h-12 w-12 border border-slate-100 bg-white">
              <RefreshCw size={18} className={cn(loading && "animate-spin")} />
            </Button>
          </div>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-8 py-5">User Profile</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Last Activity</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group cursor-pointer" onClick={() => { setSelectedUser(u); setIsDetailsOpen(true); }}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-xs text-slate-500">
                          {u.firstName.charAt(0)}{u.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{u.firstName} {u.lastName}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[9px] font-black uppercase tracking-widest">{u.role}</Badge>
                    </td>
                    <td className="px-8 py-6">
                      <Badge className={cn(
                        "font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest",
                        u.isActive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      )}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-slate-500 font-bold">{formatDate(u.updatedAt)}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm">
                        <MoreVertical size={18} className="text-slate-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none">Account Configuration</h3>
                  <p className="text-sm text-slate-500 mt-2">Grant or modify system-wide privileges.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)} className="rounded-full">
                  <X size={20} />
                </Button>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <UserForm onSubmit={(data) => { toast.success('Account provisioned'); setIsFormOpen(false); }} />
              </div>
           </div>
        </div>
      )}

      {isDetailsOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
              <UserDetailsDialog 
                user={selectedUser} 
                onClose={() => setIsDetailsOpen(false)}
                onUpdateStatus={(val) => handleUpdateStatus(selectedUser.id, val)}
                onDelete={() => handleDeleteUser(selectedUser.id)}
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
