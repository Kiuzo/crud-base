import Link from "next/link";
import Navbar from "../includes/Navbar";

export function LoginComponent() {
    return (
        <section>

            <Navbar />

            <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200">

                <div className="bg-blue-500 backdrop-blur-sm rounded-2xl px-12 py-10 relative shadow-2xl max-w-md w-full mx-4">

                    <div className="border-b-4 border-white/30 pb-6 mb-8">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Logar-se</h1>
                        <p className="text-blue-100 text-sm">Caso não tenha uma conta registre-se</p>
                    </div>

                    <form action="" className="flex flex-col gap-y-6">

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="seu@email.com"
                            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-yellow-400 focus:bg-white rounded-lg py-3 px-4 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <input
                            type="password"
                            name="senha"
                            required
                            placeholder="Senha"
                            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-yellow-400 focus:bg-white rounded-lg py-3 px-4 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-gray-800 font-bold rounded-lg py-3 px-4 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] mt-2"
                        >
                            Logar-se
                        </button>

                        <div className="flex gap-2 items-center justify-center pt-4 border-t border-white/20">
                            <p className="text-white text-sm">Ainda não tem uma conta?</p>
                            <Link
                                href="../auth/register"
                                className="text-yellow-300 text-sm font-bold hover:text-yellow-200 hover:underline hover:scale-105 transition-all duration-300"
                            >
                                Criar conta
                            </Link>
                        </div>

                    </form>

                </div>

            </section>

        </section>
    );
}