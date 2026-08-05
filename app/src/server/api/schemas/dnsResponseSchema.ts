import { z } from "zod";

export const dnsResponseResultSetSchema = z.object({
    qbuf: z.string(),
    result: z.object({
        rt: z.number(),
        size: z.number()
    })
})

export const dnsResponseProbeSchema = z.object({
    resultset: dnsResponseResultSetSchema,
    prb_id: z.number()
})

// invalid probes are silently discarded, repsonse from api is rather messy 
export const dnsResponseSchema = z.array(z.unknown()).transform((list) => {
    list.flatMap((probe) => {
        const result = dnsResponseProbeSchema.safeParse(probe)
        return result.success ? [result.data] : []
    })
})

export type DNSResponse = z.infer<typeof dnsResponseSchema>
export type dnsResponseResultSet = z.infer<typeof dnsResponseResultSetSchema>