'use client';
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import type { RadarAttackPair } from "~/server/api/schemas/radar";

export function NotificationListener() {

    const attackPairQuery = api.radar.getAttackPair.useQuery({limit: 10})
    console.log("hello")    
    const [attackPairs, setAttackPairs] = useState<[RadarAttackPair, RadarAttackPair] | undefined>();

    // initial query value undefined, onced obtained will update
    useEffect(() => {
        if(attackPairQuery.data) {
            setAttackPairs([attackPairQuery.data, attackPairQuery.data])
        }
    }, [attackPairQuery.data]); 

    // updates attackPairs once notification recieved 
    api.onCacheUpdate.useSubscription(undefined, {
        onData(newAttackPairs) {
            setAttackPairs(() => newAttackPairs)            
        }
    })

    return (
        <ul>
            {attackPairs?.map(attackPair => 
                <li key={JSON.stringify(attackPair)}>{JSON.stringify(attackPair)}</li>
                )}
        </ul>
    )
}
