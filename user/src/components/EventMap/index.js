import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGeoFormattedEvents } from '../../features/event/eventSlice';
import Map, { NavigationControl, GeolocateControl, ScaleControl, Marker, Popup } from 'react-map-gl';
import GeocoderControl from '../GeocoderControl';
import EventCard from '../EventCard'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventMap = () => {

    const [mapRef, setMapRef] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const dispatch = useDispatch();
    const geoJsonEvents = useSelector((state) => state.event.geoJsonEvents) || [];

    const eventMarkers = useMemo(
        () =>
            geoJsonEvents.map((event, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={event.geometry.coordinates[0]}
                    latitude={event.geometry.coordinates[1]}
                    anchor="bottom"
                >
                    <Link
                        to={`/events/${event.properties.id}`}
                        onMouseEnter={e => {
                            setPopupInfo(event);
                        }}
                        onMouseLeave={e => {
                            setPopupInfo(null);
                        }}>
                        <img style={{ cursor: 'pointer' }}
                            src={event.properties.isOngoing ? "./ongoing-marker.png" : "./marker.png"}
                            alt=""
                        />
                    </Link>
                </Marker>
            )),
        [geoJsonEvents]
    );

    useEffect(() => {
        dispatch(getGeoFormattedEvents(`?page=1&limit=30`));
    }, [dispatch]);

    return (
        <div style={{ height: '100vh' }}>
            <Map
                ref={(ref) => setMapRef(ref)}
                initialViewState={{
                    longitude: 106.67908367285673,
                    latitude: 10.75305989852285,
                    zoom: 6
                }}
                width='100%'
                height='100%'
                mapboxAccessToken={MAPBOX_TOKEN}
                mapStyle={'mapbox://styles/mapbox/streets-v12'}>

                <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position='top-left' />

                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {eventMarkers}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.geometry.coordinates[0])}
                        latitude={Number(popupInfo.geometry.coordinates[1])}
                        onClose={() => setPopupInfo(null)}>
                        <EventCard item={popupInfo.properties}></EventCard>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default EventMap;