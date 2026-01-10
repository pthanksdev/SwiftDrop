
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Order } from '../../types/order.types';
import { cn } from '../../lib/utils';
import { Navigation, Target, Maximize2 } from 'lucide-react';

const createIcon = (url: string, size: [number, number] = [32, 32]) => L.icon({
  iconUrl: url,
  iconSize: size,
  iconAnchor: [size[0] / 2, size[1]],
  popupAnchor: [0, -size[1]],
});

const Icons = {
  Pickup: createIcon('https://cdn-icons-png.flaticon.com/512/1673/1673188.png'),
  Delivery: createIcon('https://cdn-icons-png.flaticon.com/512/1673/1673235.png'),
  Driver: createIcon('https://cdn-icons-png.flaticon.com/512/1048/1048329.png', [40, 40]),
  UserLocation: createIcon('https://cdn-icons-png.flaticon.com/512/484/484167.png', [24, 24]),
};

const MapController: React.FC<{ 
  pickup: [number, number]; 
  delivery: [number, number]; 
  driver?: [number, number]; 
  focusLocation?: [number, number];
}> = ({ pickup, delivery, driver, focusLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (focusLocation) {
      map.setView(focusLocation, 16, { animate: true });
    } else {
      const points = [pickup, delivery];
      if (driver) points.push(driver);
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [40, 40], animate: true });
    }
  }, [pickup, delivery, driver, map, focusLocation]);

  return null;
};

interface TrackingMapProps {
  order: Order;
  driverLocation?: [number, number];
  className?: string;
}

const TrackingMap: React.FC<TrackingMapProps> = ({ order, driverLocation, className }) => {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [focusPos, setFocusPos] = useState<[number, number] | undefined>(undefined);
  
  const pickupCoords: [number, number] = [order.pickupLatitude, order.pickupLongitude];
  const deliveryCoords: [number, number] = [order.deliveryLatitude, order.deliveryLongitude];
  const driverCoords = driverLocation || pickupCoords;

  const handleLocateUser = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      setUserPos(coords);
      setFocusPos(coords);
      // Reset focus after a moment so standard bounds can take over if needed
      setTimeout(() => setFocusPos(undefined), 1000);
    });
  };

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      <MapContainer 
        center={driverCoords} 
        zoom={13} 
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={pickupCoords} icon={Icons.Pickup} />
        <Marker position={deliveryCoords} icon={Icons.Delivery} />
        <Marker position={driverCoords} icon={Icons.Driver} />
        {userPos && <Marker position={userPos} icon={Icons.UserLocation} />}

        <Polyline positions={[pickupCoords, driverCoords]} color="#3b82f6" weight={3} dashArray="8, 12" />
        <Polyline positions={[driverCoords, deliveryCoords]} color="#10b981" weight={4} />

        <MapController pickup={pickupCoords} delivery={deliveryCoords} driver={driverCoords} focusLocation={focusPos} />
      </MapContainer>

      {/* Mobile Map UI Overlays */}
      <div className="absolute bottom-40 right-4 lg:bottom-10 lg:right-10 z-[1000] flex flex-col gap-3">
         <button 
           onClick={handleLocateUser}
           className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-blue-600 shadow-2xl active:scale-90 transition-all border border-slate-200"
         >
            <Target size={24} />
         </button>
         <button 
           className="w-14 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all"
           onClick={() => setFocusPos(driverCoords)}
         >
            <Navigation size={24} className="fill-white" />
         </button>
      </div>
    </div>
  );
};

export default TrackingMap;
