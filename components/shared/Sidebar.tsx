'use client'

import { navLinks } from '@/constans'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

export default function Sidebar() {

    const pathName = usePathname()

  return (
    <aside className='sidebar'>
      <div className="flex size-full flex-col gap-4">
        <Link href={'/'} className='sidebar-logo' >
            <Image 
                src={'/assets/images/logo-text.svg'} 
                alt='logo'
                width={180}
                height={28} 
            />
        </Link>
        <nav className='sidebar-nav'>
            <SignedIn>
                <ul className='sidebar-nav_elements'>
                    {navLinks.map((link)=> {
                        const isActive = link.route === pathName
                        return (
                            <li key={link.route} className={`sidebar-nav_element group ${
                                isActive ? "bg-purple-500 text-white hover:text-purple-800 hover:bg-purple-100" : "text-gray-900"
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

                    <li className='flex-center cursor-pointer gap-2 p-4'>
                        <UserButton afterSignOutUrl='/' showName />
                    </li>
                </ul>
            </SignedIn>
            <SignedOut>
                <Button asChild className='button bg-purple-gradient bg-cover'>
                    <Link href={'/sign-in'}>Login</Link>
                </Button>
            </SignedOut>
        </nav>
      </div>
    </aside>
  )
}
