import { PrismaClient } from "../generated/prisma";

const db = new PrismaClient();

type Probe = {
    id: number;
    status: { id: number }
    geometry: { coordinates: [number, number] };
}

async function getAllProbes(): Promise<Probe[]> {
    const probes: Probe[] = [];
    const pageSize = 500; // 500 seems to be the max page size

    // large amount of data requires looping through each page 
    for(let page = 1;; page++) {
        const res = await fetch(`https://atlas.ripe.net/api/v2/probes/?page=${page}&page_size=${pageSize}`)

        if (!res.ok) {
            throw new Error(`RIPE Atlas APi error' ${res.status}`);
        }

        const data = await res.json() as {results: Probe[]};
        probes.push(...data.results);

        if (data.results.length < pageSize) break;
    }

    return probes;
}

async function main() {
    const probes = await getAllProbes();
    const data = probes.
        filter((p) => p.status.id === 1 && p.geometry).// only use probes that are connected and have a location listed
        map((p) => ({
            id: p.id,
            latitude: p.geometry.coordinates[1],
            longitude: p.geometry.coordinates[0],
        }))

        const { count } = await db.probe.createMany({ data, skipDuplicates: true});
        console.log(`Seeding complete, ${count} probes added`)
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(() => db.$disconnect());