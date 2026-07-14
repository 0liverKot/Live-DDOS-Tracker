import type { RadarAttackPair } from "./schemas/radar"
import { getRadarAttackPair } from "./radar"
import { ee } from "./root"

const limit = 10

interface RadarCache {
    currentData: RadarAttackPair
    previousData: RadarAttackPair | null
    updating: boolean
}
const initialData = await getRadarAttackPair(limit)
const radarCache: RadarCache = {
    currentData: initialData,
    previousData: null,
    updating: false
}

export async function updateCache() {
    radarCache.updating = true
    const result = await getRadarAttackPair(limit)
    radarCache.currentData = result
    radarCache.updating = false
    
    ee.emit('udate', [radarCache.currentData, radarCache.previousData])
}