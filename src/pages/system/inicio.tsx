import { Layout } from "@/components/includes/Layout";
import { InicioComponent } from "@/components/system/Inicio_Component";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Inicio() {
    return (
        <ProtectedRoute>
            <Layout title="Dashboard">
                <InicioComponent />
            </Layout>
        </ProtectedRoute>
    );
}