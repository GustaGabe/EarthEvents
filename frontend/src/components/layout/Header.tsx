"use client"
import { Globe, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { useState } from "react"

export default function Header() {
    const pathName = usePathname()
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)


    const handleMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen)
    }

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/events', name: 'Events' },
        { href: '/about', name: 'About' },
    ]

    return (
        <header className="fixed flex items-center top-0 left-0 right-0 w-full bg-black z-50">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                    <Globe className="text-white" />
                    <span className="text-xl font-bold text-white">EarthEvents</span>
                </div>

                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 font-semibold transition-colors ${
                                pathName === link.href ? 'text-neutral-100' : 'text-neutral-400'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Button className="bg-white text-black py-2 px-4 rounded font-semibold">Login</Button>
                    <Button className="font-semibold text-white">Register</Button>
                </div>

            </div>
             <div>
                <Button onClick={() => handleMenuToggle()} className="md:hidden ">
                    <Menu  />
                </Button>
            </div>
            
            {isMobileMenuOpen && (
                <nav className="md:hidden absolute top-16 left-0 right-0 bg-black p-4">
                          {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 flex flex-col font-semibold transition-colors ${
                                pathName === link.href ? 'text-neutral-100' : 'text-neutral-400'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex mt-5 flex-col left-0  gap-4">
                    <Button className="bg-white text-black py-2 px-4 rounded font-semibold">Login</Button>
                    <Button className="font-semibold text-white">Register</Button>
                </div>
                </nav>)}

        </header>
    )
}
