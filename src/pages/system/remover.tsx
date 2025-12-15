import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { RemoverUsuario } from "@/components/system/Remover_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Remover() {
    return (
        <ProtectedRoute>
            <section>
                <Head>
                    <title>Remover Usuário - Crud Base</title>
                </Head>
                <Sidebar />
                <RemoverUsuario />
            </section>
        </ProtectedRoute>
    );
}