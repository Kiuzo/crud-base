import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { AtualizarUsuario } from "@/components/system/Atualizar_component";

export default function Atualizar() {
    return (
        <section>
            <Head>
                <title>Atualizar Usuário - Crud Base</title>
            </Head>
            <Sidebar />
            <AtualizarUsuario />
        </section>
    );
}