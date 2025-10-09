import { About } from "../components/landing/about";
import { Hero } from "../components/landing/hero";
import { Services } from "../components/landing/services";
import { Footer } from "../components/landing/footer";
import Navbar from "@/components/includes/Navbar";


export default function Home() {
  return (
    <main className="font-pt-sans">
        <Navbar/>      
        <Hero/>
        <About/>
        <Services/>
        <Footer/>
    </main>
  );
}
