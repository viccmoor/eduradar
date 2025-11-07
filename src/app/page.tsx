"use client"

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222831] text-white">
      <Image
        src="/logo.svg"
        alt="Logo del sitio"
        width={120}
        height={120}
        className="mb-6"
      />
      <h1 className="text-4xl font-bold">Bienvenido a EduRadar</h1>
      <p className="text-lg mt-2">
        Analiza, comprende y potencia el aprendizaje.
      </p>
      <Link href="dashboard">
        <button className="bg-gradient-to-r from-[#00ADB5] to-[#1B5B5F] mt-3 p-2 w-50 rounded-xl font-bold hover:bg-[#006F75]">
          Ir al dashboard
        </button>
      </Link>
    </div>
  );
}
