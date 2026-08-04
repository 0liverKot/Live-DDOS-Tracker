import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"
import { getMeasurementOfPopularDomains } from "../atlas";

export const atlasRouter = createTRPCRouter({
    getMeasurementOfPopularDomains: publicProcedure
    .input(
        z.object({
            limit: z.number()
        })
    )
    .query(async () => {
        return getMeasurementOfPopularDomains()
    })
})