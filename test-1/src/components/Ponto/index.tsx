import { Circulo } from "./styles";

interface PontoProps {
  x: number;
  y: number;
}

export function Ponto({ x, y }: PontoProps) {

  return (
    <Circulo
      x={x}
      y={y}
    ></Circulo>
  );
}