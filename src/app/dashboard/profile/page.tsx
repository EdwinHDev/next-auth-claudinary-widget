"use client"

import { signOut, useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { BsEnvelope } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { LuLogOut, LuUserCheck } from "react-icons/lu";

function ProfilePage() {

  const { data: session, status } = useSession();

  return (
    <div className="flex w-full justify-center p-10">
      <div className="p-10 rounded-2xl border border-zinc-800 flex flex-col items-center">
        <div className="w-40 h-40 outline outline-zinc-600 outline-offset-2 bg-zinc-100 rounded-full flex justify-center items-center overflow-hidden mb-2">
          {
            status === "loading" ?
            (
              <div className="text-zinc-500">Loading...</div>
            ) :
            (
              status === "authenticated" &&
              (
                session.user?.image ? (
                  <CldImage
                    width="160"
                    height="160"
                    src={session?.user?.image!}
                    alt={session?.user?.fullname!}
                    priority
                  />
                ) : (
                  <div className="w-40 h-40 bg-zinc-100 rounded-full flex justify-center items-center overflow-hidden text-[170px] text-zinc-300 mb-2">
                    <FaUserCircle />
                  </div>
                )
              )
            )
          }
        </div>
        <h2 className="text-center my-6 font-medium text-xl">
          {session?.user?.fullname!}
        </h2>
        <div className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg mb-4">
          <BsEnvelope />
          {session?.user?.email}
        </div>
        <div className="flex items-center gap-3 p-4 bg-zinc-800 rounded-lg mb-4">
          <LuUserCheck />
          {session?.user?.role}
        </div>
        <button
          className="p-4 bg-indigo-500 flex gap-2 items-center rounded-lg"
          onClick={() => signOut()}
        >
          <LuLogOut style={{ fontSize: "20px" }} />
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default ProfilePage