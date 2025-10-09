import Link from "next/link";

export default function Navbar() {
    return (

        <header className="fixed top-0 left-0 w-full h-16 bg-blue-700 text-white z-50 flex items-center px-4">

            <div className="container mx-auto flex justify-between items-center p-4">

                <Link
                    href="/"
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold select-none transition-transform duration-300 hover:scale-105 hover:text-red-400"
                >
                    Crud Base
                </Link>

                <nav>

                    <ul className="flex space-x-6">

                        <li>
                            <Link
                                href="/"
                                className="transition-colors duration-300 hover:text-red-400 hover:font-bold select-none"
                            >Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/login"
                                className="transition-colors duration-300 hover:text-red-400 hover:font-bold select-none"
                            >Fazer Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/register"
                                className="transition-colors duration-300 hover:text-red-400 hover:font-bold select-none"> Criar Conta
                            </Link>
                        </li>

                    </ul>

                </nav>

            </div>

        </header>
    );
}
