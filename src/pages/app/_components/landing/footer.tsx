import Link from "next/link";

export function Footer() {
    return (
        <section className="bg-blue-500 text-white overflow-hidden">

            <div className="container mx-auto pt-16 pb-16 px-4 relative">

                <article className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
                        Pronto para começar?
                    </h1>

                    <div className="flex flex-col items-center lg:items-end lg:text-right gap-2">
                        <p className="lg:text-lg font-bold">
                            Para começar crie uma conta.
                        </p>

                        <Link href="/register" className="hover:bg-green-500 hover:scale-110 duration-500  rounded-md p-1">
                            Criar conta.
                        </Link>
                        <Link href="/login" className="hover:bg-green-500 hover:scale-110 duration-500  rounded-md p-1">
                            Logar.
                        </Link>
                    </div>

                </article>

            </div>

        </section>
    );
}