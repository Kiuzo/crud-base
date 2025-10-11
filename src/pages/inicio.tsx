import { Sidebar } from "@/components/includes/Sidebar";
import { InicioComponent } from "@/components/system/Inicio_Component"

export default function Inicio() {
    return (
        <section>
            
            <Sidebar/>

            <main className="ml-[250px]">
                <InicioComponent />
            </main>

        </section>
    );
}