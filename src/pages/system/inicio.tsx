import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { InicioComponent } from "@/components/system/Inicio_Component"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Inicio() {
    return (
        <ProtectedRoute>
            <section>
                <Head>
                    <title>Dashboard - Crud Base</title>
                </Head>
                <Sidebar />
                <InicioComponent />
            </section>
        </ProtectedRoute>
    );
}