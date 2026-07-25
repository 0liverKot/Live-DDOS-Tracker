'use client';
import { api } from "~/trpc/react";
import { rapStack } from "../utils/RAPStack";

export default function NotificationListener() {
    
    api.onCacheUpdate.useSubscription(undefined, {
        onData(newAttackPair) {
            console.log('listener')
            rapStack.push(newAttackPair)         
        }
    })

    return null
}



