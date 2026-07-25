import type { RadarAttackPair } from "./schemas/radar"
import { getRadarAttackPair } from "./radar"
import { ee } from "./root"

const limit = 10

interface RadarCache {

    currentData: RadarAttackPair | null
    previousData: RadarAttackPair | null
    updating: boolean
}

const radarCache: RadarCache = {

    currentData: null,
    previousData: null,
    updating: false
}

export async function updateCache() {

    radarCache.updating = true
    const result = await getRadarAttackPair(limit)
    radarCache.previousData = radarCache.currentData
    radarCache.currentData = result
    radarCache.updating = false

    ee.emit('update', radarCache.currentData)
}

updateCache()
    .then(() => setInterval(() => { void updateCache() }, 30_00))
    .catch(console.error)