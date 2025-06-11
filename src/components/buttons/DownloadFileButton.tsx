import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

import {generateEvaluacionAlumnosByDocente} from "../../api/dashboard"; // Ícono oficial de MUI

interface DownloadFileButtonProps {
    userId: number;
}

const DownloadFileButton: React.FC<DownloadFileButtonProps> = ({ userId }) => (
    <Tooltip title="Descargar reporte del docente">
        <IconButton
            color="primary"
            onClick={() => {
                downloadEvaluacionAlumnosByDocente(userId);
            }}
        >
            <Badge color="primary">
                <DownloadIcon fontSize="medium" />
            </Badge>
        </IconButton>
    </Tooltip>
);

export default DownloadFileButton;

const downloadEvaluacionAlumnosByDocente = async (idDocente: number) => {
    const pdfBlob = await generateEvaluacionAlumnosByDocente(idDocente);

    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `EvaluacionAlumnos_${idDocente}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};