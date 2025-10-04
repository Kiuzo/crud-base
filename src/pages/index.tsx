import { About } from "./app/_components/about";
import { Hero } from "./app/_components/hero";
import { Services } from "./app/_components/services";

export default function Home() {
  return (
    <main className="font-pt-sans">
        <Hero/>
        <About/>
        <Services/>
    </main>
  );
}
