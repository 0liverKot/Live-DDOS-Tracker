import { z } from "zod";

export const RadarAttackPairSchema = z.object({
    result: z.object({
        meta: z.object({
            confidenceInfo: z.object({
                annotations: z.array(z.object({
                    dataSource: z.string(),
                    description: z.string(),
                    endDate: z.string(),
                    eventType: z.string(),
                    isInstantaneous: z.boolean(),
                    linkedUrl: z.string(),
                    startDate: z.string(),
                    tags: z.optional(z.array(z.string()))
                })),
                level: z.number()
            }).nullable(),
            dateRange: z.array(z.object({
                endTime: z.string(),
                startTime: z.string()
            })),
            lastUpdated: z.string(),
            normalization: z.string(),
            units: z.array(z.object({
                name: z.string(),
                value: z.string()
            }))
        }),
        top_0: z.array(z.object({
            originCountryAlpha2: z.string(),
            originCountryName: z.string(),
            targetCountryAlpha2: z.string(),
            targetCountryName: z.string(),
            value: z.string()
        }))
    }),
    success: z.boolean()
})

export type RadarAttackPair = z.infer<typeof RadarAttackPairSchema>