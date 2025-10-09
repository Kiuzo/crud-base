import Link from "next/link";
import { LoginComponent } from "../../components/account/Login_Component";
import { Footer } from "../../components/landing/footer";

export default function Login() {
    return (
       <main className="font-pt-sans">
           <LoginComponent/>
       </main>
    );
}