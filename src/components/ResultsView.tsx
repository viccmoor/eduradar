import { ClipboardDocumentListIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

interface Results {
    riskLevel: string;
    riskScore: GLfloat;
    confidence: GLfloat;
    plan: string;
    threshold: GLfloat;
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

    function removeEmojis(text: string) {
        return text.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F)/g,
            ""
        );
    }

    const downloadPdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Resultados del Análisis", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Nivel de Riesgo:", 14, 35);
        doc.setFont("helvetica", "normal");
        doc.text(removeEmojis(results.riskLevel), 60, 35);

        doc.setFont("helvetica", "bold");
        doc.text("Puntaje de Riesgo:", 14, 45);
        doc.setFont("helvetica", "normal");
        doc.text(removeEmojis(String(results.riskScore)), 60, 45);

        doc.setFont("helvetica", "bold");
        doc.text("Puntaje de Credibilidad:", 14, 60);
        doc.setFont("helvetica", "normal");
        const confidenceLines = doc
            .splitTextToSize(removeEmojis(String(results.confidence)), 180);
        doc.text(confidenceLines, 70, 60);

        doc.setFont("helvetica", "bold");
        doc.text("Plan de acción:", 14, 90);
        doc.setFont("helvetica", "normal");
        const planLines = doc
            .splitTextToSize(removeEmojis(results.plan), 180);
        doc.text(planLines, 14, 98);

        doc.save("resultados_analisis.pdf");
    };

    return (
        <div className="flex-1 bg-[#222831] p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-2xl">
                <ClipboardDocumentListIcon className="w-10" />
                <span>Resultados del análisis</span>
            </div>
            <p className="text-sm">⚠️ Disclaimer: Este NO es un diagnóstico académico oficial. Consulta con tu tutor.</p>
            <h3 className="mt-3">Nivel de Riesgo</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">
                {results.riskLevel}
            </label>
            <h3 className="mt-3">Puntaje de Riesgo</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">
                {results.riskScore}
            </label>
            <h3 className="mt-2">Puntaje de Credibilidad</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">
                {results.confidence}
            </label>
            <h3 className="mt-2">Indicador</h3>
            <label className="flex items-center gap-2 bg-[#393E46] px-3 py-1 rounded-md text-sm">
            {(() => {
                const score = results.riskScore;
                const threshold = results.threshold;

                let colorEmoji = "🟢";
                if (score >= threshold) colorEmoji = "🔴";
                else if (score >= 0.5) colorEmoji = "🟡";

                return colorEmoji;
            })()}
            <span>
                Umbral alto: {Number(results.threshold).toFixed(3)}
            </span>
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