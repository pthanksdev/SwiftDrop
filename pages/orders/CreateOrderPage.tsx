
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  User, 
  MapPin, 
  Package, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Clock, 
  ShieldCheck,
  CreditCard,
  Plus
} from 'lucide-react';
import OrderForm from '../../components/orders/OrderForm';
import { ordersApi } from '../../api/endpoints/orders.api';
import { customersApi } from '../../api/endpoints/customers.api';
import { Customer } from '../../types/customer.types';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../utils/formatters';

const STEPS = [
  { id: 1, name: 'Customer', icon: User, desc: 'Select or create customer' },
  { id: 2, name: 'Pickup', icon: MapPin, desc: 'Origin and timing' },
  { id: 3, name: 'Delivery', icon: Package, desc: 'Destination and items' },
  { id: 4, name: 'Review', icon: Check, desc: 'Verify and dispatch' }
];

const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orderData, setOrderData] = useState<any>({});
  const [calculatedPrice, setCalculatedPrice] = useState({
    base: 15.00,
    distance: 0,
    weight: 0,
    total: 15.00
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await customersApi.getAll();
        setCustomers(res.data);
      } catch (err) {
        // Fallback for demo
        setCustomers([
          { id: 'c1', user: { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', phone: '555-0101' }, totalOrders: 5, createdAt: '', updatedAt: '', userId: '' },
          { id: 'c2', user: { firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', phone: '555-0102' }, totalOrders: 2, createdAt: '', updatedAt: '', userId: '' }
        ]);
      }
    };
    fetchCustomers();
  }, []);

  const handleStepSubmit = (stepData: any) => {
    const newData = { ...orderData, ...stepData };
    setOrderData(newData);
    
    // Calculate price logic when moving from step 3 to 4
    if (currentStep === 3) {
      const weight = parseFloat(newData.packageWeight) || 1;
      const weightCharge = weight * 2.5;
      // Mock distance charge (random between 5 and 20 for demo)
      const distanceCharge = 12.50;
      const total = 15.00 + weightCharge + distanceCharge;
      
      setCalculatedPrice({
        base: 15.00,
        distance: distanceCharge,
        weight: weightCharge,
        total: total
      });
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      finalizeOrder(newData);
    }
  };

  const finalizeOrder = async (finalData: any) => {
    setLoading(true);
    try {
      await ordersApi.create({
        ...finalData,
        totalAmount: calculatedPrice.total,
        orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`
      });
      toast.success('Order dispatched successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dispatch Shipment</h1>
          <p className="text-slate-500 font-medium">Create and route a new delivery request.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-400">
          <span>Step {currentStep} of 4</span>
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-blue-600 transition-all duration-500 ease-out" 
               style={{ width: `${(currentStep / 4) * 100}%` }}
             ></div>
          </div>
        </div>
      </div>

      {/* Navigation Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STEPS.map((step) => (
          <div 
            key={step.id}
            className={cn(
              "p-4 rounded-[1.5rem] border-2 transition-all relative overflow-hidden",
              currentStep === step.id 
                ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20" 
                : currentStep > step.id 
                  ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                  : "bg-white border-slate-100 text-slate-400"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                currentStep === step.id ? "bg-white/20" : currentStep > step.id ? "bg-emerald-500 text-white" : "bg-slate-100"
              )}>
                {currentStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest leading-none mb-1 opacity-70">Step 0{step.id}</p>
                <p className="font-bold leading-none">{step.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm 
            step={currentStep} 
            onSubmit={handleStepSubmit} 
            onBack={() => setCurrentStep(prev => prev - 1)}
            initialData={orderData}
            isLoading={loading}
            customers={customers}
            calculatedPrice={calculatedPrice}
          />
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
               <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Live Summary</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              {!orderData.customerId && (
                <div className="text-center py-10 opacity-40">
                  <User size={40} className="mx-auto mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest">No customer selected</p>
                </div>
              )}

              {orderData.customerId && (
                <div className="space-y-4">
                   <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                         <User size={18} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Customer</p>
                         <p className="text-sm font-bold text-slate-900">
                           {customers.find(c => c.id === orderData.customerId)?.user?.firstName} {customers.find(c => c.id === orderData.customerId)?.user?.lastName}
                         </p>
                      </div>
                   </div>

                   {orderData.pickupAddress && (
                     <div className="space-y-3">
                        <div className="flex items-start gap-3">
                           <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center mt-0.5"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div></div>
                           <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Pickup</p>
                              <p className="text-xs font-medium text-slate-700 truncate">{orderData.pickupAddress}</p>
                           </div>
                        </div>
                        {orderData.deliveryAddress && (
                           <div className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div></div>
                              <div className="min-w-0 flex-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Delivery</p>
                                 <p className="text-xs font-medium text-slate-700 truncate">{orderData.deliveryAddress}</p>
                              </div>
                           </div>
                        )}
                     </div>
                   )}
                </div>
              )}

              <div className="pt-6 border-t border-slate-100">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-black">Estimate</Badge>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                       <span>Base Fare</span>
                       <span>{formatCurrency(calculatedPrice.base)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                       <span>Distance (est.)</span>
                       <span>{formatCurrency(calculatedPrice.distance)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                       <span>Weight Surcharge</span>
                       <span>{formatCurrency(calculatedPrice.weight)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                       <span className="text-sm font-black text-slate-900">Total Amount</span>
                       <span className="text-xl font-black text-blue-600">{formatCurrency(calculatedPrice.total)}</span>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-600 rounded-[2rem] p-6 text-white space-y-4">
             <div className="flex items-center gap-3">
                <ShieldCheck size={24} />
                <h4 className="font-bold">Dispatch Guarantee</h4>
             </div>
             <p className="text-xs text-blue-100 leading-relaxed">
                Every shipment created via SwiftDrop is automatically insured up to $500.00 and tracked via our real-time GPS network.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
