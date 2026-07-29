'use client'
import dynamic from "next/dynamic";
import { useStack } from "./hooks/useStack";
import { useEffect } from "react";

// avoid ssr rendering so server doesnt call useSubsriptions() 
const NotificationListener = dynamic(
  () => import("./_components/NotificationListener"),
  { ssr: false },
);

export default function Home() {
    const { stack, latest } = useStack()

    useEffect(() => {
        console.log(`STACK LENGTH: ${stack.length}`)
        stack.forEach((pairs) => {
            console.log(pairs)
        })
    }, [stack])

    return(
        <>
            <NotificationListener />
            <pre>{JSON.stringify(latest)}</pre>
        </>
    )
    }
