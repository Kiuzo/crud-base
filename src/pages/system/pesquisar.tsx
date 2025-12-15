import { Layout } from "@/components/includes/Layout";
import { PesquisarUsuario } from "@/components/system/Pesquisar_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Pesquisar() {
    return (
        <ProtectedRoute>
            <Layout title="Pesquisar Usuário">
                <PesquisarUsuario />
            </Layout>
        </ProtectedRoute>
    );
}