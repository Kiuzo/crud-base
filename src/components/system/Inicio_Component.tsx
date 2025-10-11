import { Badge, Search, UserCheck, Settings, UserMinus, UserPlus } from "lucide-react";
import Link from "next/link";

export function InicioComponent() {
    return (
        <section className="flex flex-col gap-y-8 py-8 px-4 lg:px-8">

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">

                <div className="flex flex-col gap-8 lg:gap-12 w-full lg:w-auto">

                    <div className="flex gap-4 items-center border-b-4 border-blue-600 w-fit pb-4 lg:pb-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl">Bem-vindo(a),</h1>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Nome</h1>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

                        <div className="shadow-lg bg-blue-400 rounded-md p-6 flex flex-col items-center justify-center gap-4 text-white font-semibold text-center hover:bg-blue-500 transition-colors cursor-pointer">
                            <UserPlus className="w-16 h-16" />
                            <h1 className="text-sm lg:text-base">Adicionar nova pessoa</h1>
                        </div>

                        <div className="shadow-lg bg-red-500 rounded-md p-6 flex flex-col items-center justify-center gap-4 text-white font-semibold text-center hover:bg-red-600 transition-colors cursor-pointer">
                            <UserMinus className="w-16 h-16" />
                            <h1 className="text-sm lg:text-base">Remover pessoa</h1>
                        </div>

                        <div className="shadow-lg bg-green-600 rounded-md p-6 flex flex-col items-center justify-center gap-4 text-white font-semibold text-center hover:bg-green-700 transition-colors cursor-pointer">
                            <Settings className="w-16 h-16" />
                            <h1 className="text-sm lg:text-base">Pesquisar pessoa</h1>
                        </div>

                        <div className="shadow-lg bg-yellow-600 rounded-md p-6 flex flex-col items-center justify-center gap-4 text-white font-semibold text-center hover:bg-yellow-700 transition-colors cursor-pointer">
                            <UserCheck className="w-16 h-16" />
                            <h1 className="text-sm lg:text-base">Atualizar pessoa</h1>
                        </div>

                    </div>

                    <div className="bg-gray-200 w-full lg:max-w-4xl px-6 lg:px-8 py-6 rounded-md">

                        <div className="flex flex-col gap-3 border-b-2 border-blue-400 pb-4 lg:pb-6 w-fit">
                            <h1 className="text-2xl lg:text-3xl font-semibold">Doar</h1>
                            <Link href="#" className="text-sm text-blue-500 hover:underline">
                                Ajude a manter o sistema com uma simples doação.
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 justify-center items-center mt-6">

                            <div className="bg-blue-500 rounded-md w-full sm:w-64 p-6 text-white flex flex-col items-center gap-4">
                                <h1 className="font-bold text-center">Registros de hoje:</h1>
                                <h1 className="text-4xl lg:text-6xl font-bold">1</h1>
                            </div>

                            <div className="bg-blue-600 rounded-md w-full sm:w-64 p-6 text-white flex flex-col items-center gap-4">
                                <h1 className="font-bold text-center">Registros Mensais:</h1>
                                <h1 className="text-4xl lg:text-6xl font-bold">8</h1>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-gray-200 rounded-md w-full lg:w-96">

                    <h1 className="font-bold text-2xl lg:text-3xl p-6 bg-blue-500 text-white text-center rounded-t-md">
                        Visão Geral
                    </h1>

                    <div className="flex flex-col gap-6 bg-blue-400 py-8 px-6">

                        <div className="flex items-center justify-center">
                            <Badge className="text-white w-16 h-16 lg:w-20 lg:h-20" />
                        </div>

                        <div className="flex flex-col items-center">

                            <h4 className="font-semibold text-xl lg:text-2xl pb-4 text-white text-center">
                                Últimos clientes:
                            </h4>

                            <ul className="flex flex-col gap-3 list-disc text-white font-semibold pl-5">
                                <li>Amostrado da silva</li>
                                <li>Mario Games</li>
                                <li>Bora bill</li>
                                <li>Zezin</li>
                            </ul>

                        </div>

                    </div>

                    <div className="flex flex-col gap-6 bg-green-500 py-8 px-6 rounded-b-md">

                        <div className="flex items-center justify-center">
                            <Search className="text-white w-16 h-16 lg:w-20 lg:h-20" />
                        </div>

                        <div className="flex flex-col items-center">

                            <h4 className="font-semibold text-xl lg:text-2xl pb-4 text-white text-center">
                                Pessoas Mais pesquisadas
                            </h4>

                            <ul className="flex flex-col gap-3 list-disc text-white font-semibold pl-5">
                                <li>Amostrado da silva</li>
                                <li>Mario Games</li>
                                <li>Bora bill</li>
                                <li>Zezin</li>
                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}