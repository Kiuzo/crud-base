import Head from 'next/head';
import { LoginComponent } from "../../components/account/Login_Component";

export default function Login() {
    return (
        <>
            <Head>
                <title>Login - Crud Base</title>
            </Head>
            <main>
                <LoginComponent />
            </main>
        </>
    );
}