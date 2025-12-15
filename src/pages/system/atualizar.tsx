import { Layout } from "@/components/includes/Layout";
import { AtualizarUsuario } from "@/components/system/Atualizar_component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Atualizar() {
    return (
        <ProtectedRoute>
            <Layout title="Atualizar Usuário">
                <AtualizarUsuario />
            </Layout>
        </ProtectedRoute>
    );
}