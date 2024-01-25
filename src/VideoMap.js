import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const customIcon = L.icon({
    iconUrl: '/marker-icon.png', // Specify your marker icon URL
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowUrl: null // No shadow
});

const customIconBLUE = L.icon({
    iconUrl: '/marker-icon-blue.png', // Specify your marker icon URL
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    shadowUrl: null // No shadow
});


const MapBounds = ({ waypoints }) => {
    const map = useMap();

    useEffect(() => {
        if (waypoints.length > 0) {
            const bounds = L.latLngBounds(waypoints.map(wp => [wp.lat, wp.lng]));
            map.fitBounds(bounds);
        }
    }, [waypoints, map]);

    return null;
};

const VideoMap = ({ waypoints, videoRef, currentTime}) => {
    const navigateToTimestamp = (timestamp) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timestamp;
            videoRef.current.play();
        }
    };

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }} whenCreated={mapInstance => { this.map = mapInstance; }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {waypoints.map((waypoint, index) => {
                const isActive = currentTime >= waypoint.timestamp && currentTime < (waypoints[index + 1]?.timestamp || Infinity);
                return (
                    <Marker
                        key={index}
                        position={[waypoint.lat, waypoint.lng]}
                        icon={isActive ? customIconBLUE : customIcon} // Changement d'icône ici
                        eventHandlers={{
                            click: () => navigateToTimestamp(waypoint.timestamp),
                        }}
                    >
                        <Popup>
                            {waypoint.label}
                        </Popup>
                    </Marker>
                );
            })}
            <MapBounds waypoints={waypoints} />
        </MapContainer>
    );
};

export default VideoMap;

