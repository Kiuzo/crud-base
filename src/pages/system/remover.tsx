import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { RemoverUsuario } from "@/components/system/Remover_Component";

export default function Remover() {
    return (
        <section>
            <Head>
                <title>Remover Usuário - Crud Base</title>
            </Head>
            <Sidebar />
            <RemoverUsuario />
        </section>
    );
}