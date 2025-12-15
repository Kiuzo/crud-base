import { Layout } from "@/components/includes/Layout";
import { AdicionarUsuario } from "@/components/system/Adicionar_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Adicionar() {
    return (
        <ProtectedRoute>
            <Layout title="Adicionar Usuário">
                <AdicionarUsuario />
            </Layout>
        </ProtectedRoute>
    );
}