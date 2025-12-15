import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { AtualizarUsuario } from "@/components/system/Atualizar_component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Atualizar() {
    return (
        <ProtectedRoute>
            <section>
                <Head>
                    <title>Atualizar Usuário - Crud Base</title>
                </Head>
                <Sidebar />
                <AtualizarUsuario />
            </section>
        </ProtectedRoute>
    );
}