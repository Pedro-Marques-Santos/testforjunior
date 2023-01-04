/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Ponto } from "./components/Ponto";
import { Button, ButtonRefazer, Element } from "./elements";
import { GlobalStyle } from "./styles/global";

function App() {

  const [allCirculos, setAllCirculos] = useState({
    eixoX: [] as number[],
    eixoY: [] as number[],
  });

  const [rvtCirculosEixoX, setRvCirculosEixoX] = useState<(number)[]>([]);
  const [rvtCirculosEixoY, setRvCirculosEixoY] = useState<(number)[]>([]);

  const [jsxCirculos, setJsxCirculos] = useState({
    circulos: [] as JSX.Element[]
  });

  // criando evento de click
  useEffect(() => {

    let eixoX: number[] = [];
    let eixoY: number[] = [];

    const element = document.getElementById('container');

    element?.addEventListener('click', event => {

      // removendo o evento de click dos buttons
      const target = event.target as HTMLTextAreaElement;
      let elementoclick = target.id;
      if (elementoclick === 'button') {
        return;
      }

      eixoX.push(event.clientX);
      eixoY.push(event.clientY);

      setAllCirculos({
        eixoX: eixoX,
        eixoY: eixoY
      });

    });

  }, []);

  // adicionando elementos ao array de listagem jsxelement
  useEffect(() => {
    let pontos: JSX.Element[] = [];

    let i;
    if (allCirculos.eixoX.length > 0) {
      for (i = 0; i < allCirculos.eixoX.length; i++) {
        let x = allCirculos.eixoX[i];
        let y = allCirculos.eixoY[i];
        pontos.push(
          <Ponto x={x} y={y} key={i} />
        )
      }
      setJsxCirculos({ circulos: pontos });
    }
  }, [allCirculos.eixoX, allCirculos.eixoY]);

  //Remover circulo
  function removerCirculo() {

    let pontos: JSX.Element[] = [];

    if (allCirculos.eixoX.length < 1) {
      return;
    }

    let eixox = allCirculos.eixoX.pop() as number;
    let eixoy = allCirculos.eixoY.pop() as number;
    jsxCirculos.circulos.pop()

    setRvCirculosEixoX([...rvtCirculosEixoX, eixox]);
    setRvCirculosEixoY([...rvtCirculosEixoY, eixoy]);

    for (let i = 0; i < allCirculos.eixoX.length; i++) {
      let x = allCirculos.eixoX[i];
      let y = allCirculos.eixoY[i];
      pontos.push(
        <Ponto x={x} y={y} key={i} />
      )
    }
    setJsxCirculos({ circulos: pontos });

  }

  //Refazer circulo
  function refazerCirculo() {
    let pontos: JSX.Element[] = [];

    let eixoX: number[] = allCirculos.eixoX;
    let eixoY: number[] = allCirculos.eixoY;

    if (!rvtCirculosEixoX.length && !rvtCirculosEixoY.length) {
      alert('não há elementos para retornarem');
      return;
    }

    let eixox = rvtCirculosEixoX.pop() as number;
    let eixoy = rvtCirculosEixoY.pop() as number;

    eixoX.push(eixox);
    eixoY.push(eixoy);

    setAllCirculos({
      eixoX: eixoX,
      eixoY: eixoY
    })

    for (let i = 0; i < allCirculos.eixoX.length; i++) {
      let x = allCirculos.eixoX[i];
      let y = allCirculos.eixoY[i];
      pontos.push(
        <Ponto x={x} y={y} key={i} />
      )
    }
    setJsxCirculos({ circulos: pontos });

  }

  return (
    <Element id="container">
      {
        allCirculos.eixoX.length > 0 &&
        jsxCirculos.circulos
      }
      <Button onClick={removerCirculo} id='button'>Desfazer</Button>
      <ButtonRefazer onClick={refazerCirculo} id='button'>Refazer</ButtonRefazer>
      <GlobalStyle />
    </Element>
  );
}

export default App;

