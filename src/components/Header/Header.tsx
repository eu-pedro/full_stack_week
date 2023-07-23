'use client'
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

export function Header() {
  const [menuIsOpen, setMenuIsOPen] = useState(false)

  const { status, data } = useSession()
  function handleLoginClick() {
    signIn()
  }

  function handleLogoutClick() {
    setMenuIsOPen(false)
    signOut()
  }

  function handleMenuClick() {
    setMenuIsOPen(!menuIsOpen)
  }

  return (
    <header className="container mx-auto p-5 h-[93px] flex justify-between items-center lg:border-b lg:border-grayLighter">
      <Link href="/">
        <div className="relative w-[182px] h-[32px]">
          <Image src="/logo.svg" alt="Logo Header" fill />
        </div>
      </Link>
      {status === 'unauthenticated' && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}

      {status === 'authenticated' && data.user && (
        <div className="flex items-center gap-3 border-grayLighter border px-3 p-2 rounded-full relative">
          <AiOutlineMenu
            size={16}
            onClick={handleMenuClick}
            className="cursor-pointer"
          />
          <Image
            height={32}
            width={32}
            alt={data.user.name!}
            src={data.user.image!}
            className="rounded-full shadow-md"
          />
          {menuIsOpen && (
            <div className="absolute top-12 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center transition-all z-50">
              <Link href="/my-trips" onClick={() => setMenuIsOPen(false)}>
                <button className="text-primary text-sm font-semibold transition-all p-2 border-b border-grayLighter border-sold">
                  Minhas Viagens
                </button>
              </Link>
              <button
                className="text-primary pt-2 text-sm font-semibold transition-all"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
