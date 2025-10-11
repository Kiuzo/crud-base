import Link from "next/link";
import Navbar from "../includes/Navbar";

export function LoginComponent() {
    return (
        <>
            <Navbar />

            <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200">

                <div className="bg-white shadow-2xl w-150 h-138 flex flex-col items-center justify-center p-8 rounded-lg mx-4">

                    <h1 className="text-2xl md:text-3xl text-center font-semibold text-blue-500">Ainda não possui conta?</h1>

                    <p className="text-blue-500 font-semibold py-6 text-center">Não perca tempo, junte-se ao crud base e garanta conteúdo de qualidade.</p>

                    <Link href="../auth/register" className="mt-4 font-semibold text-white bg-blue-500 hover:bg-blue-600 py-3 px-6 text-lg rounded-md shadow-md transition-colors duration-200">
                        Criar conta
                    </Link>

                </div>

                <div className="bg-blue-500 px-8 py-10 shadow-2xl max-w-md w-full mx-4 rounded-lg">

                    <div className="border-b-2 border-white/30 pb-6 mb-8">
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">Fazer Login</h2>
                        <p className="text-blue-100 text-sm">Caso não tenha uma conta, registre-se</p>
                    </div>

                    <form className="flex flex-col gap-y-6">

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

                        <button
                            type="submit"
                            className="bg-white hover:bg-gray-100 text-blue-500 font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
                        >
                            Entrar
                        </button>

                        <div className="flex gap-2 items-center justify-center pt-4 border-t border-white/20">
                            <p className="text-white text-sm">Não lembra sua senha?</p>
                            <Link
                                href="#"
                                className="text-blue-200 text-sm font-bold hover:text-white hover:underline transition-all duration-200"
                            >
                                Esqueci minha senha.
                            </Link>
                        </div>

                    </form>

                </div>

            </section>
        </>
    );
}