import Head from 'next/head';
import { Sidebar } from "@/components/includes/Sidebar";
import { InicioComponent } from "@/components/system/Inicio_Component"

export default function Inicio() {
    return (
        <section>
            <Head>
                <title>Dashboard - Crud Base</title>
            </Head>
            <Sidebar />
            <InicioComponent />
        </section>
    );
}