import Link from "next/link";

export default function Navbar() {
    return (

        <header className="fixed top-0 left-0 w-full bg-blue-600 text-white z-50 flex items-center">

            <div className="container mx-auto flex justify-between items-center p-4">

                <Link
                    href="/"
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold select-none "
                >
                    Crud Base
                </Link>

                <nav>

                    <ul className="flex space-x-6">

                        <li>
                            <Link
                                href="/"
                                className="select-none"
                            >Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/login"
                                className="select-none"
                            >Fazer Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/register"
                                className="select-none"> Criar Conta
                            </Link>
                        </li>

                    </ul>

                </nav>

            </div>

        </header>
    );
}
