"use client"
import { Globe, Menu, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

export const Header = () => {
    const pathName = usePathname()
    const router = useRouter()
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { data: session } = useSession()

    const handleMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleLogin = () => {
        router.push('/auth/login')
    }

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/events', name: 'Eventos' },
    ]

    return (
        <header className="fixed flex items-center top-0 left-0 right-0 w-full bg-black z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center gap-2 cursor-pointer">
                    <Globe className="text-white" />
                    <span className="text-xl font-bold text-white">EarthEvents</span>
                </div>

                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 font-semibold transition-colors cursor-pointer ${
                                pathName === link.href ? 'text-neutral-100' : 'text-neutral-400'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile">
                                <Button 
                                    className="bg-white text-black py-2 px-4 rounded font-semibold flex items-center gap-2 cursor-pointer"
                                >
                                    <User className="w-4 h-4" />
                                    Perfil
                                </Button>
                            </Link>
                            <Button 
                                className="border border-neutral-600 text-neutral-400 hover:text-white cursor-pointer"
                                onClick={() => signOut()}
                            >
                                Sair
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button 
                                className="bg-white text-black py-2 px-4 rounded font-semibold cursor-pointer"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div>
                <Button onClick={() => handleMenuToggle()} className="md:hidden cursor-pointer">
                    <Menu />
                </Button>
            </div>
            
            {isMobileMenuOpen && (
                <nav className="md:hidden absolute top-16 left-0 right-0 bg-black p-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 flex flex-col font-semibold transition-colors cursor-pointer ${
                                pathName === link.href ? 'text-neutral-100' : 'text-neutral-400'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex mt-5 flex-col left-0 gap-4">
                        {session ? (
                            <>
                                <Link href="/profile">
                                    <Button 
                                        className="bg-white text-black py-2 px-4 rounded font-semibold flex items-center gap-2 w-full cursor-pointer"
                                    >
                                        <User className="w-4 h-4" />
                                        Perfil
                                    </Button>
                                </Link>
                                <Button 
                                    className="border border-neutral-600 text-neutral-400 hover:text-white cursor-pointer"
                                    onClick={() => signOut()}
                                >
                                    Sair
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    className="bg-white text-black py-2 px-4 rounded font-semibold cursor-pointer"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    )
}
