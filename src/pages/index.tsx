import Head from 'next/head';
import Navbar from "@/components/includes/Navbar";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Services } from "@/components/landing/services";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crud Base - Início</title>
        <meta name="description" content="Sistema de gerenciamento de usuários completo e moderno." />
      </Head>
      <main>
        <Navbar />
        <div className="mt-15">
          <Hero />
          <About />
          <Services />
          <Footer />
        </div>
      </main>
    </>
  );
}