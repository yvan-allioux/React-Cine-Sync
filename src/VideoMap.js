import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const VideoMap = ({ waypoints, videoRef }) => {
    const navigateToTimestamp = (timestamp) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timestamp;
            videoRef.current.play();
        }
    };

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {waypoints.map((point, index) => (
                <Marker
                    key={index}
                    position={[point.lat, point.lng]}
                    onClick={() => navigateToTimestamp(point.timestamp)}
                >
                    <Popup>
                        {point.label}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default VideoMap;
