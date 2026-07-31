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
            <World globeConfig={globeConfig}/>
        </Suspense>
    )
})

export default RadarGlobe;