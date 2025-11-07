"use client"

import Form from "next/form";
import React, { useState } from "react";
import { IdentificationIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ResultsView from "@/components/ResultsView";

export default function CustomForm() {
    const [selectedOption, setSelectedOption] = useState("");
    const [attendanceValue, setAttendanceValue] = useState(90);
    const [results, setResults] = useState({ riskLevel: "Sin datos", variables: "Sin datos", plan: "Sin datos" });
    const options = [
        { label: "Masculino", value: "male" },
        { label: "Femenino", value: "female" },
        { label: "No binario", value: "non-binary" },
        { label: "Otro", value: "other" },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleAttendanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAttendanceValue(Number(event.target.value));
    };

    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        /*
        const response = await fetch("api", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        */
        setResults({
            riskLevel: "1.0",
            variables: "Las variables son...",
            plan: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id distinctio deleniti atque earum aut reiciendis asperiores, veniam assumenda quaerat repellendus ipsa praesentium a tempore recusandae sed dolor voluptatibus nostrum nemo",
        });
    };

    return (
        <div className="flex gap-6">
            <div className="flex-1 bg-[#222831] p-6 rounded-2xl">
                <div className="flex gap-2 items-center text-2xl">
                    <IdentificationIcon className="w-10" />
                    <span>Analiza los datos de tu estudiante</span>
                </div>
                <Form onSubmit={handleSubmit} action={() => {}}>
                    <h3 className="text-lg mt-2 mb-2">Edad</h3>
                    <input name="age" placeholder="Indica la edad" className="bg-[#393E46] rounded-md p-2 w-50" type="number" min="5" max="100" required />
                    <h3 className="text-lg mt-2 mb-2">Sexo</h3>
                    <select name="gender" value={selectedOption} onChange={handleChange} className="bg-[#393E46] rounded-md p-2">
                        {options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-[#222831]">
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <h3 className="text-lg mt-2 mb-2">Establecimiento educacional</h3>
                    <input name="school" placeholder="Indica el establecimiento educacional" className="bg-[#393E46] rounded-md p-2 w-80" required />
                    <h3 className="text-lg mt-2 mb-2">Promedio general (0-7)</h3>
                    <input name="generalAvg" placeholder="Indica el promedio general" className="bg-[#393E46] rounded-md p-2 w-80" type="number" min="0" max="7" step="0.1" required />
                    <h3 className="text-lg mt-2 mb-2">Asistencia</h3>
                    <div className="flex items-center gap-4">
                        <input
                            name="attendance"
                            type="range"
                            className="accent-[#00ADB5] w-80"
                            min={0}
                            max={100}
                            value={attendanceValue}
                            onChange={handleAttendanceChange}
                        />
                        <span className="text-white w-12">{attendanceValue}%</span>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-[#00ADB5] hover:bg-[#08c2cb] text-white px-4 py-2 rounded-md font-semibold transition-all"
                    >
                        <div className="flex items-center gap-1">
                            <DocumentMagnifyingGlassIcon className="w-6" />
                            <span>Analizar datos</span>
                        </div>
                    </button>
                </Form>
            </div>
            <ResultsView results={results}/>
        </div>
    )
}