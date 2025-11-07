import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { jsPDF } from "jspdf";

export default function ResultsView() {
    const nivelRiesgo = "Alto";
    const variables = "Uso excesivo de palabras negativas, tono urgente, correlación con patrones de riesgo anteriores.";
    const planAccion = "1. Revisar el contexto de las interacciones.\n2. Implementar revisión humana.\n3. Notificar a moderadores.";

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Resultados del Análisis", 14, 20);

        doc.setFontSize(12);
        doc.text("Nivel de Riesgo:", 14, 35);
        doc.text(nivelRiesgo, 60, 35);

        doc.text("Variables y patrones detectados:", 14, 50);
        doc.text(doc.splitTextToSize(variables, 180), 14, 58);

        doc.text("Plan de acción:", 14, 90);
        doc.text(doc.splitTextToSize(planAccion, 180), 14, 98);

        doc.save("resultados_analisis.pdf");
    };

    return (
        <div className="flex-1 bg-[#222831] p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-3xl">
                <ClipboardDocumentListIcon className="w-5 h-5" />
                <span>Resultados del análisis</span>
            </div>
            <h3>Nivel de Riesgo</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">fsaffsaafsas</label>
            <h3>Variables y patrones detectados</h3>
            <label className="flex bg-[#393E46] px-3 py-1 rounded-md text-sm">fsaffsaafsas</label>
            <h3>Plan de acción</h3>
            <textarea
                className="w-full bg-[#393E46] text-white px-3 py-2 rounded-md text-sm resize-none h-40"
                readOnly={true}
            />
            <button onClick={downloadPdf} className="bg-[#00ADB5] p-5 rounded-md">Descargar plan</button>
        </div>
    )
}