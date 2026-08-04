'use client';
import { api } from "~/trpc/react";

export default function NotificationListener() {
    
    api.onCacheUpdate.useSubscription(undefined, {
        onData() {
            console.log('listener')
        }
    })

    return null
}



