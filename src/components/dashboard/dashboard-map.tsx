"use client";

import { useEffect, useRef, useMemo } from 'react';
import { useDashboardStore } from "@/store/dashboard-store";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';


export function DashboardMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const { mapLocations } = useDashboardStore();

    const features = useMemo(() => {
        return mapLocations.map(location => {
            const coords = location.coordinates;
            if (!coords || coords.length !== 2) return null;

            const feature = new Feature({
                geometry: new Point(fromLonLat(coords)),
                locationName: location.name,
                description: location.description,
            });

            feature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({ color: location.color || '#3b82f6' }),
                    stroke: new Stroke({ color: '#ffffff', width: 2 })
                })
            }));

            return feature;
        }).filter(Boolean) as Feature<Point>[];
    }, [mapLocations]);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!mapInstance.current) {
            const vectorSource = new VectorSource({ features });
            const vectorLayer = new VectorLayer({ source: vectorSource });
            const tileLayer = new TileLayer({
                source: new OSM(),
                className: 'dark-map-layer'
            });

            mapInstance.current = new Map({
                target: mapRef.current,
                layers: [tileLayer, vectorLayer],
                view: new View({
                    center: fromLonLat([-51.9253, -14.2350]),
                    zoom: 4,
                }),
                controls: []
            });
        } else {
            const layers = mapInstance.current.getLayers().getArray();
            const vectorLayer = layers.find(l => l instanceof VectorLayer) as VectorLayer<VectorSource> | undefined;
            if (vectorLayer) {
                const source = vectorLayer.getSource();
                if (source) {
                    source.clear();
                    source.addFeatures(features);
                }
            }
        }

        return () => {
        };
    }, [features]);

    return (
        <div className="flex flex-col h-full space-y-4">
            <h3 className="font-semibold text-white">Mapa de clientes por região</h3>
            <div className="flex-1 rounded-xl overflow-hidden relative border border-[#2e344d]">
                <div ref={mapRef} className="w-full h-full" />
            </div>
        </div>
    );
}
