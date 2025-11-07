"use client"

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
    
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
            router.push("/dashboard");
        } else {
            //
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#222831] text-white">
            <div className="bg-[#16191E] p-8 rounded-2xl">
                <h2 className="text-2xl text-center font-semibold">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl mt-2 mb-2">Correo electrónico</h3>
                    <input className="bg-[#393E46] rounded-md p-2 w-80" type="email" name="email" placeholder="Email" required/>
                    <h3 className="text-xl mt-2 mb-2">Contraseña</h3>
                    <input className="bg-[#393E46] rounded-md p-2 w-80 block" type="password" name="password" placeholder="Contraseña" required/>
                    <button
                        type="submit"
                        className="mt-4 bg-[#00ADB5] hover:bg-[#08c2cb] text-white px-4 py-2 rounded-md font-semibold transition-all "
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
}
