import { WhatsappLogoIcon } from '@phosphor-icons/react/dist/ssr';
import logoImg from '../../../../../public/logo.png';
import Image from 'next/image';

export function Hero() {
    return (
        <section className="bg-blue-500 text-white relative overflow-hidden">

            <div>
                <Image
                    src={logoImg}
                    alt='Imagem Logo'
                    fill
                    sizes="100vw"
                    priority
                    className='object-cover opacity-60 lg:hidden' />
                <div className='absolute inset-0 bg-black opacity-40 md:hidden'></div>
            </div>

            <div className="container mx-auto pt-16 pb-16 md:pb-0 px-4 relative">

                <article className='grid grid-cols-1 lg:grid-cols-2 gap-8 '>

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-10 font-bold">
                            Seja bem-vindo(a) a Crud Base
                        </h1>
                        <p className="mt-4 lg:text-lg">
                            Este projeto irá te ajudar a facilitar seus futuros projetos, disponibilizando arquivos pré-prontos para seu projeto!
                        </p>
                        <div className="flex">
                            <a href=""
                                className="bg-emerald-500 px-2 py-1 font-semibold flex items-center rounded-md gap-2 hover:scale-110 duration-300">
                                <WhatsappLogoIcon className='w-5 h-5' />
                                Contato
                            </a>
                        </div>

                        <div>
                            <p className="text-sm mt-8 mb-8">
                                Feito por: Kiuzo
                            </p>
                        </div>

                    </div>

                    <div className='hidden md:block h-full relative'>
                        <Image
                            src={logoImg}
                            alt='Imagem Logo'
                            className='object-contain'
                            fill
                            sizes="(max-width: 768px) 0vw, 50vw"
                            quality={100}
                            priority />
                    </div>

                </article>

            </div>
        </section>
    );
}