import Link from "next/link";
import Navbar from "../includes/Navbar";

export function RegisterComponent() {
    return (
        <>
            <Navbar />

            <section className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-8 gap-y-12 lg:gap-y-0 lg:gap-x-8">

                <div className="bg-blue-500 rounded-lg px-8 py-10 shadow-2xl max-w-md w-full mx-4">

                    <div className="border-b-2 border-white/30 pb-6 mb-8">
                        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">Registre-se</h1>
                        <p className="text-blue-100 text-sm">Crie sua conta e comece agora</p>
                    </div>

                    <form className="flex flex-col gap-y-6">

                        <input
                            type="text"
                            name="nome"
                            required
                            placeholder="Nome completo"
                            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg py-3 px-4 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="seu@email.com"
                            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg py-3 px-4 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <input
                            type="password"
                            name="senha"
                            required
                            placeholder="Senha"
                            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg py-3 px-4 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <input
                            type="password"
                            name="senha2"
                            required
                            placeholder="Confirmar Senha"
                            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white rounded-lg py-3 px-4 outline-none transition-all duration-200 placeholder:text-gray-400"
                        />

                        <button
                            type="submit"
                            className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
                        >
                            Criar minha conta
                        </button>

                        <div className="flex gap-2 items-center justify-center pt-4 border-t border-white/20">
                            <Link
                                href="#"
                                className="text-blue-200 text-sm font-bold hover:text-white hover:underline transition-all duration-200"
                            >
                                Como criar boas senhas?
                            </Link>
                        </div>

                    </form>

                </div>

                <div className="bg-white shadow-2xl w-full max-w-md lg:w-150 h-auto lg:h-160 flex flex-col items-center justify-center p-8 rounded-lg mx-4">

                    <h1 className="text-2xl md:text-3xl text-center font-semibold text-blue-500">Já possui uma conta?</h1>

                    <p className="text-blue-500 font-semibold py-6 text-center">Se você já possui uma conta, não recomendamos a criação de outra</p>

                    <Link href="../auth/login" className="mt-4 font-semibold text-white bg-blue-500 hover:bg-blue-600 py-3 px-6 text-lg rounded-md shadow-md transition-colors duration-200">
                        Fazer Login
                    </Link>

                </div>

            </section>
        </>
    );
}