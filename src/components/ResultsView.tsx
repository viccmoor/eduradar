import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";

export default function ResultsView() {
    return (
        <div className="flex-1 bg-[#222831] p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-3xl">
                <ClipboardDocumentListIcon className="w-5 h-5" />
                <span>Resultados del análisis</span>
            </div>
        </div>
    )
}