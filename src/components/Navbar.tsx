"use client"

import Link from 'next/link';
import { useSession } from 'next-auth/react';

function Navbar() {

  const { data: session, status } = useSession();

  return (
    <nav className='bg-zinc-900 p-4'>
      <div className='container mx-auto flex justify-between'>
        <Link href="/">
          <h1 className='font-bold text-xl'>App</h1>
        </Link>
        <ul className='flex gap-x-2'>
          <li className='px-3 py-1'><Link href="/about">Nosotros</Link></li>
          {
            status === "authenticated" ? (
              <>
                <li className='px-3 py-1'><Link href="/dashboard/profile">Perfil</Link></li>
                {
                  session.user.role === "admin" && (
                    <li className='px-3 py-1'><Link href="/dashboard/admin">Administración</Link></li>
                  )
                }
              </>
            ) : (
              <>
                <li className='px-3 py-1'><Link href="/login">Login</Link></li>
                <li className='px-3 py-1'><Link href="/register">Register</Link></li>
              </>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar