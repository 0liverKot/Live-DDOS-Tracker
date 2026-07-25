'use client'
import dynamic from "next/dynamic";
import { useStack } from "./hooks/useStack";

// avoid ssr rendering so server doesnt call useSubsriptions() 
const NotificationListener = dynamic(
  () => import("./_components/NotificationListener"),
  { ssr: false },
);

export default function Home() {
    const { stack, latest } = useStack()

    return(
        <>
            <NotificationListener />
            <pre>{JSON.stringify(latest)}</pre>
        </>
    )
    }
