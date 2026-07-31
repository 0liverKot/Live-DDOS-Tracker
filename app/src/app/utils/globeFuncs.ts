import type { GlobeConfig, Position } from "./globeTypes"

// temporary to test dynamically updating arcs for the globe 
export const getSampleArc = () => {
    
    const randomColor = () => {
        let color = '#'
        const alphanum = '0123456789abcdef'
        for(let i = 0; i < 6; i++) {
            color += alphanum[Math.floor(Math.random() * 16)]
        }
        return color;
    }
    
    const color = randomColor()
    const sampleArc = {
        order: 1,
        startLat: -19.885592,
        startLng: -43.951191,
        endLat: -50.9068,
        endLng: -43.1729,
        arcAlt: 0.1,
        color: color
    }
    

    return sampleArc
}

export const getPoints = (arc: Position, defaultProps: GlobeConfig) => {

    const points = []
    points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
        });
    points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
        });
    return points;
    }
