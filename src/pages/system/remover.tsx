import { Layout } from "@/components/includes/Layout";
import { RemoverUsuario } from "@/components/system/Remover_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Remover() {
    return (
        <ProtectedRoute>
            <Layout title="Remover Usuário">
                <RemoverUsuario />
            </Layout>
        </ProtectedRoute>
    );
}