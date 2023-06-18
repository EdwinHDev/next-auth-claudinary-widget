"use client";

import { FormEvent, useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { FaUserPlus, FaFileImage, FaUserCircle, FaExclamationCircle } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {

  const router = useRouter();

  const [error, setError] = useState({
    error: false,
    message: ""
  });
  const [urlImage, setUrlImage] = useState("");

  const onUpload = (result: any) => {
    setUrlImage(result.info.public_id);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
        image: urlImage,
      });

      console.log(signupResponse);

      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard/profile");

      console.log(res);

    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError({
          error: true,
          message: error.response?.data.message
        });
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-80"
      >
        <h1
          className="text-4xl font-bold mb-7 text-center"
        >Registro de usuario</h1>
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
        <div className="flex justify-center">
          {urlImage !== "" ? (
            <div className="w-40 h-40 bg-zinc-100 rounded-full flex justify-center items-center overflow-hidden mb-4">
              <CldImage
                width="160"
                height="160"
                src={urlImage}
                alt="Imagen de perfil"
              />
            </div>
          ) : (
            <div className="w-40 h-40 bg-zinc-100 rounded-full flex justify-center items-center overflow-hidden text-[170px] text-zinc-300 mb-4">
              <FaUserCircle />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <CldUploadButton
            uploadPreset="ufixm4jb"
            onUpload={onUpload}
            className="bg-indigo-500 px-4 py-2 flex gap-2 items-center mb-4"
          >
            <FaFileImage />
            Cargar imagen
          </CldUploadButton>
        </div>
        <input
          type="text"
          name="fullname"
          placeholder="Edwin Hernández"
          className="bg-zinc-800 px-4 py-2 block mb-4 w-full"
        />
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
        <div className="flex justify-center">
          <button
            className="bg-indigo-500 px-4 py-2 flex gap-2 items-center"
            type="submit"
          >
            <FaUserPlus style={{ fontSize: "20px" }} />
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
