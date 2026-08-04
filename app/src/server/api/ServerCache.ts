import type { DNSResponse } from "./schemas/dnsResponseSchema"
import { getMeasurementOfPopularDomains } from "./atlas"
import { ee } from "./root"

interface ServerCache {

    currentData: DNSResponse | null
}

const serverCache: ServerCache = {

    currentData: null,
}

export async function updateCache() {

    const result = await getMeasurementOfPopularDomains()
    serverCache.currentData = result
    ee.emit('update', serverCache.currentData)
}

updateCache()
    .then(() => setInterval(() => { void updateCache() }, 60000))
    .catch(console.error)