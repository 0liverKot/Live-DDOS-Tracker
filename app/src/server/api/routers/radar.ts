import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"
import { getRadarAttackPair } from "../radar";

export const radarRouter = createTRPCRouter({
    getAttackPair: publicProcedure
    .input(
        z.object({
            limit: z.number()
        })
    )
    .query(async ({input}) => {
        return getRadarAttackPair(input.limit)
    })
})