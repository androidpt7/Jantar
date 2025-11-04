
import React from 'react';
import { Submission } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface ExportButtonProps {
    submissions: Submission[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ submissions }) => {
    const attendees = submissions.filter(s => s.isAttending);

    const handleExport = () => {
        if (attendees.length === 0) return;
        const csvHeader = "Nome,Presença,Data Votada\n";
        const csvRows = attendees.map(attendee => {
            const name = `"${attendee.name.replace(/"/g, '""')}"`;
            const presence = "Confirmado";
            const date = attendee.selectedDate || 'N/A';
            return `${name},${presence},${date}`;
        }).join('\n');
        const csvContent = csvHeader + csvRows;
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'lista_convidados.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            disabled={attendees.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
            <DownloadIcon />
            <span className="ml-2">Exportar Lista</span>
        </button>
    );
};

export default ExportButton;
