import { CONFIG } from 'src/config-global';

import {EncuestaCodeView} from "../sections/encuesta/code/EncuestaCodeView";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>Ingresa el codigo</title>

      <EncuestaCodeView />
    </>
  );
}
