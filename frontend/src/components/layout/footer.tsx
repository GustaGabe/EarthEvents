import { Globe } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="bg-black border-t border-neutral-800">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Globe className="text-white" />
                        <span className="text-xl font-bold text-white">EarthEvents</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 text-neutral-400">
                        <Link href="/" className="hover:text-white transition-colors cursor-pointer">
                            Home
                        </Link>
                        <Link href="/events" className="hover:text-white transition-colors cursor-pointer">
                            Eventos
                        </Link>
                        <a 
                            href="https://eonet.gsfc.nasa.gov/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            NASA EONET
                        </a>
                    </div>

                    <div className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} EarthEvents. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
} 