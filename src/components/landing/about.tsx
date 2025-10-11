import Image from "next/image";
import aboutImg from "../../../public/about.png";
import { Check, MessageCircle, Github } from "lucide-react";

export function About() {
    return (
        <section className="bg-amber-50 py-16">
            <div className="container mx-auto px-4">


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden">
                            <Image
                                src={aboutImg}
                                alt="Foto About"
                                fill
                                quality={100}
                                className="object-cover hover:scale-110 duration-300"
                                priority />
                        </div>
                    </div>

                    <div className="space-y-6 mt-10">

                        <h2 className="text-4xl font-bold">
                            SOBRE
                        </h2>

                        <p>
                            O Crud Base é um projeto voltado para simplificar o desenvolvimento de aplicações que utilizam operações fundamentais de banco de dados: Create, Read, Update e Delete. A ideia é oferecer uma base sólida, organizada e escalável para que desenvolvedores possam iniciar seus projetos com rapidez, eficiência e boas práticas já implementadas.
                            Com uma estrutura clara e intuitiva, o Crud Base serve tanto como ponto de partida para novos sistemas quanto como referência de aprendizado para quem deseja entender melhor o funcionamento do CRUD na prática. Além disso, busca reduzir a complexidade inicial do desenvolvimento, permitindo que o foco esteja na lógica de negócio da aplicação.
                            Em resumo, o Crud Base é uma ferramenta que combina simplicidade, produtividade e boas práticas para quem deseja construir aplicações modernas com mais agilidade.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <Check className="text-blue-500" />
                                Segurança
                            </li>

                            <li className="flex items-center gap-2">
                                <Check className="text-blue-500" />
                                Ótimas práticas
                            </li>

                            <div className="flex gap-2">
                                <a href="#"
                                    className="bg-blue-500 px-2 py-1 font-semibold flex items-center rounded-md gap-2 text-white item-center justify-center w-fit hover:scale-105 duration-500">
                                    <MessageCircle size={20} strokeWidth={1.5} className="text-white" />
                                    Contato via Whatsapp
                                </a>

                                <a href="#"
                                    className="bg-blue-800 px-2 py-1 font-semibold flex items-center rounded-md gap-2 text-white  item-center justify-center w-fit hover:scale-105 duration-500">
                                    <Github size={20} strokeWidth={1.5} className="text-white" />
                                    Meu GitHub
                                </a>
                            </div>

                        </ul>

                    </div>
                </div>



            </div>
        </section>
    );
}