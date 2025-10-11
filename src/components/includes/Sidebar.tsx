import { Home, Presentation, LogOut, HandCoins } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
    return (
        <section>

            <aside className="fixed left-0 flex flex-col gap-12 bg-gradient-to-r from-blue-400 to-blue-500 border-r-2  text-white w-fit h-screen p-8 items-start">

                <h1 className="text-4xl tracking-normal font-bold text-center border-b-1 border-white pb-8">Crud Base</h1>

                <div className="flex flex-col gap-8">

                    <div className="flex items-center gap-2">

                        <Home
                            size={40}
                            strokeWidth={1.5} />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Home</Link>

                    </div>

                    <div className="flex items-center gap-2">

                        <Presentation
                            size={40}
                            strokeWidth={1.5} />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Dashboard</Link>

                    </div>


                </div>



                <div className="flex flex-col  mt-auto gap-2">

                    <div className="flex items-center gap-2">

                        <LogOut
                            size={40}
                            strokeWidth={1.5} />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Deslogar</Link>

                    </div>

                    <div className="flex items-center gap-2">

                        <HandCoins
                            size={40}
                            strokeWidth={1.5} />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Doar</Link>

                    </div>

                </div>

            </aside>

        </section>
    );
}