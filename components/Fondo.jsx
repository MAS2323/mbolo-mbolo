import Svg, { Path } from "react-native-svg";
import * as React from "react";

export function Fondo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      width="100%" // Ocupa todo el ancho disponible
      height={90} // Puedes ajustar la altura según tus necesidades
      {...props}
    >
      <Path
        fill="#4c86A8"
        d="m0 288 40-37.3C80 213 160 139 240 133.3c80-5.3 160 58.7 240 53.4C560 181 640 107 720 64s160-53 240-21.3c80 32.3 160 106.3 240 112 80 5.3 160-58.7 200-90.7l40-32V0H0Z"
      />
    </Svg>
  );
}
