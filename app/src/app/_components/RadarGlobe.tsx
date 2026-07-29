'use client';
import { memo, Suspense, useEffect, useMemo, useState } from "react";
import type{  GlobeConfig, Position } from "./Globe";
import { useStack } from "../hooks/useStack";
import React from "react";

const World = React.lazy(() => 
    import("./Globe").then((m) => ({default: m.World}))
) 

const RadarGlobe = memo(function RadarGlobe({}) {
    const { stack, latest } = useStack()
    
    const globeConfig = useMemo<GlobeConfig>(() => ({
        pointSize: 4,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: "#FFFFFF",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    }), []);
    
    const colors = useMemo(() => (["#06b6d4", "#3b82f6", "#6366f1"]), []);
    
    const sampleArcs = useMemo<Position[]>(() => ([
        {
        order: 1,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: -22.9068,
        endLng: -43.1729,
        arcAlt: 0.1,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!
        },
        {
        order: 1,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 3.139,
        endLng: 101.6869,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 1,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: -1.303396,
        endLng: 36.852443,
        arcAlt: 0.5,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 2,
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.2,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 2,
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 3.139,
        endLng: 101.6869,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 2,
        startLat: -15.785493,
        startLng: -47.909029,
        endLat: 36.162809,
        endLng: -115.119411,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 3,
        startLat: -33.8688,
        startLng: 151.2093,
        endLat: 22.3193,
        endLng: 114.1694,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 3,
        startLat: 21.3099,
        startLng: -157.8581,
        endLat: 40.7128,
        endLng: -74.006,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        },
        {
        order: 3,
        startLat: -6.2088,
        startLng: 106.8456,
        endLat: 51.5072,
        endLng: -0.1276,
        arcAlt: 0.3,
        color: colors[Math.floor(Math.random() * (colors.length - 1))]!,
        }
    ]), [])

    useEffect(() => {
        console.log(`STACK LENGTH: ${stack.length}`)
        stack.forEach((pairs) => {
            console.log(pairs)
        })
    }, [stack])

    // guard against server side rendering
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return null; 

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <World globeConfig={globeConfig} data={sampleArcs}/>
        </Suspense>
    )
})

export default RadarGlobe;