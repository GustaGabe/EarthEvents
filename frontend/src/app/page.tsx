import { Button } from "@/components/ui/button";
import { ChevronRight, GlobeIcon, Leaf, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg')] bg-cover bg-center opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Acompanhe os Eventos Naturais da Terra em Tempo Real
            </h1>
            <p className="text-xl text-muted-foreground">
              Visualize e monitore tempestades, incêndios florestais, vulcões e outros eventos naturais em todo o mundo usando os dados do EONET da NASA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 bg-white text-black">
                <Link href="/events">
                  Explore Eventos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-black">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Monitoramento em Tempo Real</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-neutral-400">
              Nossa plataforma fornece informações atualizadas sobre eventos naturais que ocorrem ao redor do mundo, com dados do Observatório da Terra da NASA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-800 flex items-center justify-center mb-6">
                <GlobeIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pesquisa Interativa</h3>
              <p className="text-muted-foreground">
                Pesquise eventos naturais em nosso sistema global interativo. Aproxime-se para explorar regiões específicas e obter informações detalhadas sobre os eventos.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acompanhamento de Eventos</h3>
              <p className="text-muted-foreground">
                Acompanhe a progressão de eventos naturais em andamento, como incêndios florestais, tempestades e erupções vulcânicas, à medida que se desenvolvem ao longo do tempo.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-amber-800 flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Insights Ambientais</h3>
              <p className="text-muted-foreground">
                Obtenha uma compreensão mais profunda dos sistemas naturais da Terra e como eles afetam nosso planeta e as comunidades ao redor do mundo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
