import { HouseSimpleIcon, PresentationChartIcon } from "@phosphor-icons/react";
import { SignOutIcon } from "@phosphor-icons/react";
import { HandCoinsIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
    return (
        <section>

            <aside className="fixed left-0 flex flex-col gap-12  bg-blue-500 border-r-2  text-white w-fit h-screen p-8 items-start">

                <h1 className="text-4xl tracking-normal font-bold text-center">Crud Base</h1>

                <div className="flex flex-col gap-8">

                    <div className="flex items-center gap-2">

                        <HouseSimpleIcon
                            className="w-10 h-10" />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Home</Link>

                    </div>

                    <div className="flex items-center gap-2">

                        <PresentationChartIcon
                            className="w-10 h-10" />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Dashboard</Link>

                    </div>


                </div>



                <div className="flex flex-col  mt-auto gap-2">

                    <div className="flex items-center gap-2">

                        <SignOutIcon
                            className="w-10 h-10" />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Deslogar</Link>

                    </div>

                    <div className="flex items-center gap-2">

                        <HandCoinsIcon
                            className="w-10 h-10" />

                        <Link href="#" className="text-sm tracking-normal font-semibold">Doar</Link>

                    </div>

                </div>

            </aside>

        </section>
    );
}
