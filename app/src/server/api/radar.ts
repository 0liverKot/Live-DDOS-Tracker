import { RadarAttackPairSchema } from "./schemas/radar";

export async function getRadarAttackPair(limit: number) {
    const res = await fetch(`https://api.cloudflare.com/client/v4/radar/attacks/layer7/top/attacks?dateRange=1d&limit=${limit}`, {headers: {
        Authorization: `Bearer ${process.env.RADAR_TOKEN}`
        }
    })

    if (!res.ok) {
        throw new Error(`Radar API error: ${res.status}`)
    }

    const data: unknown = await res.json()
    return RadarAttackPairSchema.parse(data)
}