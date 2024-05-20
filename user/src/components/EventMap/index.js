import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const Example = () => {
    const [viewport, setViewport] = useState({
        latitude: 10.75305989852285,
        longitude: 106.67908367285673,
        zoom: 6
    });

    const mapRef = useRef();

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        []
    );

    return (
        <div style={{ height: '100vh' }}>
            <Map
                ref={mapRef}
                {...viewport}
                width='100%'
                height='100%'
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle={'mapbox://styles/mapbox/streets-v12'}
            >
                <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position='top-left'
                />

                <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: 125, left: 12 }}>
                    <NavigationControl />
                </div>
            </Map>
        </div>
    );
};

export default Example