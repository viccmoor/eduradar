import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

export default function ResultsView() {
    const downloadPdf = () => {
        const doc = new jsPDF();
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