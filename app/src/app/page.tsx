'use client';
import NotificationListener from "./_components/NotificationListener";
import RadarGlobe from "./_components/RadarGlobe";

export default function Home() {

    return(
    
    <div className="flex flex-row items-center justify-center py-20 h-screen dark:bg-black bg-white relative w-full">
        <NotificationListener/>
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full px-4">
            <RadarGlobe/>
        </div>
    </div>
    
    )
}
