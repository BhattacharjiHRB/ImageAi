'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constans'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function MobileNav() {

    const pathName = usePathname()

  return (
    <header className='header'>
        <Link href={"/"} className='flex items-center gap-2 md:py-2'>
            <Image 
                src={'/assets/images/logo-text.svg'}
                alt='logo'
                width={180}
                height={28}
            />
        </Link>
        <nav className='flex space-x-5'>
            <SignedIn>
                <UserButton afterSignOutUrl='/' />
                <Sheet>
                    <SheetTrigger>
                    <Image 
                        src={'/assets/icons/menu.svg'}
                        alt='menu'
                        width={30}
                        height={30}
                        className='cursor-pointer'
                    />
                    </SheetTrigger>
                    <SheetContent className='sheet-content sm:w-64'>
                    <ul className='header-nav_elements'>
                    {navLinks.map((link)=> {
                        const isActive = link.route === pathName
                        return (
                            <li key={link.route} className={`sidebar-nav_element group ${
                                isActive ? "bg-purple-500 text-white hover:text-purple-500 " : "text-gray-900"
                            }`} >
                                <Link href={link.route} className='sidebar-link'>
                                <Image 
                                    src={link.icon} 
                                    alt='logo'
                                    width={28}
                                    height={28}
                                    className={`${isActive && 'brightness-200'}`} 
                                />
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                    </SheetContent>
                </Sheet>
            </SignedIn>
            <SignedOut>
                <Button asChild className='button bg-purple-gradient bg-cover'>
                    <Link href={'/sign-in'}>Login</Link>
                </Button>
            </SignedOut>

        </nav>
    </header>
  )
}
