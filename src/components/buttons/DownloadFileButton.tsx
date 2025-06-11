import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download"; // Ícono oficial de MUI

const DownloadFileButton = () => (
    <Tooltip title="Descargar reporte del docente">
        <IconButton
            color="primary"
            onClick={() => {
                // Simulación de descarga. Reemplaza con tu URL real.
                const link = document.createElement('a');
                link.href = '/api/reportes/docente/123'; // <--- aquí va tu endpoint real
                link.setAttribute('download', 'reporte-docente.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }}
        >
            <Badge color="primary">
                <DownloadIcon fontSize="medium" />
            </Badge>
        </IconButton>
    </Tooltip>
);

export default DownloadFileButton;
