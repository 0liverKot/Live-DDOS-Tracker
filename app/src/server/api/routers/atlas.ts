import { createTRPCRouter, publicProcedure } from "../trpc"
import { getMeasurementOfPopularDomains } from "../atlas";

export const atlasRouter = createTRPCRouter({
    getMeasurementOfPopularDomains: publicProcedure
    .query(async () => {
        return getMeasurementOfPopularDomains()
    })
})