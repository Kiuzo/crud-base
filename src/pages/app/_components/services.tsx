"use client"

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Scissors } from "lucide-react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

const services = [
    {
        title: "Facilitador de crud, comece com uma base",
        description: "O Crud Base fornece uma base para que você não precise começar do 0 seu crud, ele vai te oferecer coisas pré prontas para que você facilite seu serviço",
        linkText: "Pronto para começar?"
    },

    {
        title: "Tecnologias do Crud Base",
        description: "Construído com Next.js, React e Tailwind CSS, o Crud Base combina performance, interfaces dinâmicas e design moderno. Essa stack garante produtividade, escalabilidade e estilo em qualquer aplicação CRUD",
        linkText: "Pronto para começar?"
    },

    {
        title: "Benefícios",
        description: "O Crud Base oferece uma base sólida que garante agilidade no desenvolvimento, permitindo que você foque na lógica do projeto em vez de perder tempo com a estrutura inicial. Sua organização clara facilita a escalabilidade, enquanto as boas práticas já implementadas asseguram um código limpo e sustentável. Além disso, conta com uma interface moderna desenvolvida com Tailwind CSS e a flexibilidade necessária para se adaptar a diferentes tipos de aplicações.",
        linkText: "Pronto para começar?"
    },

];




export function Services() {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 3 }
        }
    })

    function scrollPrev() {
        emblaApi?.scrollPrev();
    }

    function scrollNext() {
        emblaApi?.scrollNext();
    }

    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="container mx-auto px-4 ">
                <h2 className="text-4xl font-bold mb-12">Serviços</h2>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {services.map((item, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(100%/3)] px-3">
                                    <article className="bg-blue-900 text-white rounded-2xl space-y-4 p-6 h-full flex flex-col">
                                        <div className="flex-1 flex items-start justify-between">
                                            <div className="flex gap-4">

                                                <div>
                                                    <h3 className="text-xl font-bold my-1 select-none">{item.title}</h3>
                                                    <p className="text-gray-400 text-sm select-none">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-blue-300 pt-4 flex items-center justify-center">
                                            <a href="#"
                                                className="flex items-center justify-center gap-2 hover:bg-emerald-500 px-4 py-1 rounded-md duration-500 select-none">
                                                <WhatsappLogoIcon className="w-5 h-5" />
                                                Entrar em contato
                                            </a>
                                        </div>


                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className=" bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute left-3 -translate-y-1/2
                     -translate-x-1/2 top-1/2 z-index-10"
                        onClick={scrollPrev}>
                        <ChevronLeft
                        className="w-6 h-6 text-gray-600 " />
                    </button>

                    <button className=" bg-white flex items-center justify-center rounded-full shadow-lg w-10 h-10 absolute -right-6 -translate-y-1/2
                     -translate-x-1/2 top-1/2 z-index-10"
                        onClick={scrollNext}>
                        <ChevronRight
                        className="w-6 h-6 text-gray-600 " />
                    </button>

                </div>

            </div>
        </section>
    );
}