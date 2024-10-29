import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface AddressMapProps {
  latitude: number;
  longitude: number;
  onLocationChange?: (lat: number, lng: number) => void;
  isEditable?: boolean;
}

function MapController({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([latitude, longitude], 16);
  }, [latitude, longitude, map]);
  
  return null;
}

export default function AddressMap({ 
  latitude, 
  longitude, 
  onLocationChange,
  isEditable = false 
}: AddressMapProps) {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        className="w-full h-full"
        dragging={isEditable}
      >
        <MapController latitude={latitude} longitude={longitude} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[latitude, longitude]}
          icon={new L.DivIcon({
            html: '<div class="text-blue-600"><MapPin size={24} /></div>',
            className: 'custom-div-icon'
          })}
          draggable={isEditable}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              onLocationChange?.(position.lat, position.lng);
            },
          }}
        />
      </MapContainer>
    </div>
  );
}