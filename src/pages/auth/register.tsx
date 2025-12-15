import Head from 'next/head';
import { RegisterComponent } from "../../components/account/Register_Component";

export default function Register() {
    return (
        <>
            <Head>
                <title>Registrar - Crud Base</title>
            </Head>
            <main>
                <RegisterComponent />
            </main>
        </>
    );
}