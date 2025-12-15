import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { AdicionarUsuario } from "@/components/system/Adicionar_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Adicionar() {
    return (
        <ProtectedRoute>
            <section>
                <Head>
                    <title>Adicionar Usuário - Crud Base</title>
                </Head>
                <Sidebar />
                <AdicionarUsuario />
            </section>
        </ProtectedRoute>
    );
}