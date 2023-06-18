"use client";

import { FormEvent, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {

  const router = useRouter();

  const [error, setError] = useState({
    error: false,
    message: ""
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if(res?.error) return setError({
      error: true,
      message: res.error
    });

    if(res?.ok) return router.push("/dashboard/profile");

    console.log(res);
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-80"
      >
        <h1
          className="text-4xl font-bold mb-7"
        >Inicio de sesión</h1>
        {
          error.error && (
            <div
              className="bg-red-500 text-white p-2 my-2 flex text-center items-center gap-2"
            >
              <FaExclamationCircle />
              {error.message}
            </div>
          )
        }
        <input
          type="email"
          name="email"
          placeholder="edwinhernandez@mail.com"
          className="bg-zinc-800 px-4 py-2 block mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Escribe tu contraseña"
          className="bg-zinc-800 px-4 py-2 block mb-6 w-full"
        />
        <div className="flex justify-end">
          <button
            className="bg-indigo-500 px-4 py-2 flex gap-2 items-center"
            type="submit"
          >
            Entrar
            <LuLogIn style={{ fontSize: "20px" }} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
