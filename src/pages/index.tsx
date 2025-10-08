import { About } from "./app/_components/landing/about";
import { Hero } from "./app/_components/landing/hero";
import { Services } from "./app/_components/landing/services";
import { Footer } from "./app/_components/landing/footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="font-pt-sans">
        <Hero/>
        <About/>
        <Services/>
        <Footer/>
    </main>
  );
}
