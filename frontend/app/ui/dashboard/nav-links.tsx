'use client'

// next
import Link from 'next/link';
import {usePathname} from 'next/navigation';

// libs
import {
    HomeIcon,
    DocumentDuplicateIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

// component
import Button from "../neurobutton";

const links = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon},
    {name: 'Files', href: '/dashboard/files', icon: DocumentDuplicateIcon},
    {name: 'Chatbot', href: '/dashboard/chatbot', icon: RocketLaunchIcon},
]

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <>
        {links.map((link) => {
            const LinkIcon = link.icon; 
            return (
                <Link 
                key={link.name}
                href={link.href}
                className={
                    clsx(`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-700 p-3 text-sm font-medium
                    hover:shadow-white hover:shadow-md hover:text-gray-200 md:flex-none md:justify-start md:p-2 md:px-3`,
                    {
                        'bg-gray-400 text-red-100': pathname === link.href,
                    })
                }>
                    <LinkIcon className="w-6" />
                    <p className='hidden md:block'>{link.name}</p>
                </Link>
            )
        })}

        </>
    )
}

export default NavLinks;