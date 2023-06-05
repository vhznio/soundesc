import { PlayGround, PlayerProvider } from "@/components/Player";

export default function Favorites(){
    return(
        <div>
            <div className="text-lg text-center font-mono text-indigo-400 bg-slate-900">Favorites</div>
            <div>
            <PlayerProvider>
                <PlayGround/>
        </PlayerProvider>
        </div>
        </div>
    )
}