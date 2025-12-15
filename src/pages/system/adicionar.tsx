import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { AdicionarUsuario } from "@/components/system/Adicionar_Component";

export default function Adicionar() {
    return (
        <section>
            <Head>
                <title>Adicionar Usuário - Crud Base</title>
            </Head>
            <Sidebar />
            <AdicionarUsuario />
        </section>
    );
}