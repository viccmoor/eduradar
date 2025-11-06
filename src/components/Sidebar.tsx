"use client";

import { useState } from "react";
import { BookOpenIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      <div
        className={`fixed top-0 left-0 h-screen bg-[#222831] text-[#F6F4EB]
        transition-all duration-300 ease-in-out flex flex-col justify-between
        ${isOpen ? "w-60" : "w-20"}`}
      >
        <div className="flex items-center gap-3 p-5">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-md"
          />
          {isOpen && (
            <Link href="#" className="font-semibold tracking-wide whitespace-nowrap">
                EduRadar
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-between h-full p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-3 text-[#F6F4EB]
            bg-transparent rounded-xl p-2 transition-all duration-300
            hover:bg-white/10 
            ${isOpen ? "pl-6 pr-4" : "px-3"}`}
          >
            <BookOpenIcon className="w-5 h-5" />
            {isOpen && <Link href="#" className="whitespace-nowrap">Predicción</Link>}
          </button>

          <button
            className={`flex items-center gap-3 text-[#F6F4EB]
            bg-transparent rounded-xl p-2 transition-all duration-300
            hover:bg-white/10 
            ${isOpen ? "pl-6 pr-4" : "px-3"}`}
          >
            <InformationCircleIcon className="w-5 h-5" />
            {isOpen && <span className="whitespace-nowrap">Información</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
