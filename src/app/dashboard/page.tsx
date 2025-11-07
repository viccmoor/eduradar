"use client"

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CustomForm from "@/components/CustomForm";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#393E46] transition-all duration-300">
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <main className="flex-1 ml-16 p-8" style={{ marginLeft: isOpen ? "16rem" : "4rem" }}>
        <div className="flex-1">
          <CustomForm />
        </div>
      </main>
    </div>
  );
}
