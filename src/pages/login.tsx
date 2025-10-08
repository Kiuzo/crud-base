import Link from "next/link";
import { LoginComponent } from "./app/_components/account/logincomponent";
import { Footer } from "./app/_components/landing/footer";

export default function Login() {
    return (
       <main className="font-pt-sans">
           <LoginComponent/>
       </main>
    );
}