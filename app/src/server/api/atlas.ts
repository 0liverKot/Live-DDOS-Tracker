import { dnsResponseSchema } from "./schemas/dnsResponseSchema";

export async function getMeasurementOfPopularDomains() {
    const res = await fetch('https://atlas.ripe.net/api/v2/measurements/30002/latest/')

    if (!res.ok) {
        throw new Error(`RIPE Atlas API error: ${res.status}`)
    }

    const data: unknown = await res.json()
    return dnsResponseSchema.parse(data)
}