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

    try { 
        const result = await getMeasurementOfPopularDomains()
        serverCache.currentData = result
        ee.emit('update', serverCache.currentData)
    } catch(err) {
        console.error('Cache Update Failed: ', err)
    }
}

async function poll() {
    await updateCache()
    setTimeout(() => { void poll() }, 120000)
}

void poll()