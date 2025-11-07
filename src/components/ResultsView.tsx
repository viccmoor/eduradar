import { ClipboardDocumentListIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

interface Results {
    riskLevel: string;
    variables: string;
    plan: string;
};

export default function ResultsView({ results }: { results: Results }) {
    const [disabledButton, setDisabledButton] = useState(true);
    useEffect(() => {
        if (results.riskLevel == "Sin datos") {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    }, [results]);

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Resultados del Análisis", 100, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text("Nivel de Riesgo:", 14, 35);
        doc.setFont("helvetica", "regular");
        doc.text(results.riskLevel, 60, 35);

        doc.setFont("helvetica", "bold");
        doc.text("Variables y patrones detectados:", 14, 50);
        doc.setFont("helvetica", "regular");
        doc.text(doc.splitTextToSize(results.variables, 180), 14, 58);

        doc.setFont("helvetica", "bold");
        doc.text("Plan de acción:", 14, 90);
        doc.setFont("helvetica", "regular");
        doc.text(doc.splitTextToSize(results.plan, 180), 14, 98);

        doc.save("resultados_analisis.pdf");
    };

    return (
        <div className="flex-1 bg-[#222831] p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-2xl">
                <ClipboardDocumentListIcon className="w-10" />
                <span>Resultados del análisis</span>
            </div>
            <h3 className="mt-3">Nivel de Riesgo</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">
                {results.riskLevel}
            </label>
            <h3 className="mt-2">Variables y patrones detectados</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">
                {results.variables}
            </label>
            <h3 className="mt-2">Plan de acción</h3>
            <textarea
                className="w-full bg-[#393E46] text-white px-3 py-2 rounded-md text-sm resize-none h-40"
                value={results.plan}
                readOnly={true}
            />
            <button
                onClick={downloadPdf}
                className="bg-[#00ADB5] p-5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabledButton}
            >   
                <div className="flex items-center gap-3">
                    <ArrowDownTrayIcon className="w-6" />
                    <span className="font-semibold">Descargar plan</span>
                </div>
            </button>
        </div>
    )
}