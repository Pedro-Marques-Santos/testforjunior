import styled from "styled-components";

interface CirculoProps {
  x: number;
  y: number;
}

export const Circulo = styled.div<CirculoProps>`
  position: absolute;
  left: ${ (props) => `${props.x}px` };
  top: ${ (props) => `${props.y}px` };;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background: red;
`