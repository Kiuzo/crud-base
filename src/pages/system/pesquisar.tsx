import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { PesquisarUsuario } from "@/components/system/Pesquisar_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Pesquisar() {
    return (
        <ProtectedRoute>
            <section>
                <Head>
                    <title>Pesquisar Usuário - Crud Base</title>
                </Head>
                <Sidebar />
                <PesquisarUsuario />
            </section >
        </ProtectedRoute>
    );
}