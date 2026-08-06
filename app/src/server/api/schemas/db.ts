import z from "zod";

export const probeSchema = z.object({
    id: z.number(),
    latitude: z.number(),
    longitude: z.number()
})

export const probeArraySchema = z.array(probeSchema)

export type Probe = z.infer<typeof probeSchema>