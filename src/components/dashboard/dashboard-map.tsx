"use client";

import { useEffect, useRef, useMemo, useState } from 'react';
import { useDashboardStore } from "@/store/dashboard-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MAP_ICONS } from "@/lib/map-icons";
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
import { Style, Circle as CircleStyle, Fill, Stroke, Icon } from 'ol/style';
import { useTranslations } from 'next-intl';

export function DashboardMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const { mapLocations } = useDashboardStore();
    const t = useTranslations("Map");

    const [selectedLocal, setSelectedLocal] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    const types = useMemo(() => Array.from(new Set(mapLocations.map(l => l.category))).filter(Boolean).sort(), [mapLocations]);

    const locales = useMemo(() => {
        const set = new Set(mapLocations.map(l => {
            if (!l.address) return '';
            const parts = l.address.split('-');
            return parts[parts.length - 1].trim();
        }).filter(Boolean));
        return Array.from(set).sort();
    }, [mapLocations]);

    const filteredLocations = useMemo(() => {
        return mapLocations.filter(loc => {
            const locState = loc.address ? loc.address.split('-').pop()?.trim() : '';
            if (selectedLocal !== 'all' && locState !== selectedLocal) return false;
            if (selectedType !== 'all' && loc.category !== selectedType) return false;
            return true;
        });
    }, [mapLocations, selectedLocal, selectedType]);

    const features = useMemo(() => {
        return filteredLocations.map(location => {
            const coords = location.coordinates;
            if (!coords || coords.length !== 2) return null;

            const feature = new Feature({
                geometry: new Point(fromLonLat(coords)),
                locationName: location.name,
                description: location.description,
            });

            const svgString = MAP_ICONS[location.icon] || MAP_ICONS['map-pin'];
            const iconUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString || '<svg></svg>');

            feature.setStyle([
                new Style({
                    image: new CircleStyle({
                        radius: 12,
                        fill: new Fill({ color: location.color || '#3b82f6' }),
                    })
                }),
                new Style({
                    image: new Icon({
                        src: iconUrl,
                        scale: 1
                    })
                })
            ]);

            return feature;
        }).filter(Boolean) as Feature<Point>[];
    }, [filteredLocations]);

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
                    center: fromLonLat([-34.8717, -8.0631]),
                    zoom: 13,
                }),
                controls: []
            });

        } else {
            const map = mapInstance.current;
            const layers = map.getLayers().getArray();
            const vectorLayer = layers.find(l => l instanceof VectorLayer) as VectorLayer<VectorSource> | undefined;

            if (vectorLayer) {
                const source = vectorLayer.getSource();
                if (source) {
                    source.clear();
                    source.addFeatures(features);

                    if (features.length > 0) {
                        const extent = source.getExtent();
                        if (extent && extent[0] !== Infinity) {
                            map.getView().fit(extent, {
                                padding: [60, 60, 60, 60],
                                maxZoom: 15,
                                duration: 800
                            });
                        }
                    }
                }
            }
        }

        return () => { };
    }, [features]);

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-[18px] font-semibold text-white">{t("title")}</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Select value={selectedLocal} onValueChange={setSelectedLocal}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-loomi-bg-card border-none text-gray-300 h-9 rounded-full px-4">
                            <SelectValue placeholder={t("allLocations")} />
                        </SelectTrigger>
                        <SelectContent className="bg-loomi-bg-card border-[#2e344d] text-gray-300">
                            <SelectItem value="all">{t("allLocations")}</SelectItem>
                            {locales.map(local => (
                                <SelectItem key={local} value={local}>{local}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-loomi-bg-card border-none text-gray-300 h-9 rounded-full px-4">
                            <SelectValue placeholder={t("allTypes")} />
                        </SelectTrigger>
                        <SelectContent className="bg-loomi-bg-card border-[#2e344d] text-gray-300">
                            <SelectItem value="all">{t("allTypes")}</SelectItem>
                            {types.map(type => (
                                <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden relative border border-[#2e344d]">
                <div ref={mapRef} className="w-full h-full" />
            </div>
        </div>
    );
}
