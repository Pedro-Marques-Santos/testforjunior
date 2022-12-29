/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Ponto } from "./components/Ponto";
import { Button, ButtonRefazer, Element } from "./elements";
import { GlobalStyle } from "./styles/global";

function App() {

  const [circulos, setCirculos] = useState({
    x: 0,
    y: 0,
    qtdCirculos: 0
  });

  const [allCirculos, setAllCirculos] = useState({
    eixoX: [] as number[],
    eixoY: [] as number[],
  });

  const [jsxCirculos, setJsxCirculos] = useState({
    circulos: [] as JSX.Element[]
  });

  // criando evento de click
  useEffect(() => {

    let eixoX: number[] = [];
    let eixoY: number[] = [];

    const element = document.getElementById('container');
    let count = 0;

    element?.addEventListener('click', event => {

      // removento o evento de click dos buttons
      const target = event.target as HTMLTextAreaElement;
      let elementoclick = target.id;
      if (elementoclick === 'button') {
        return;
      }

      count = count + 1;

      console.log('count ' + count);

      setCirculos({
        x: event.clientX,
        y: event.clientY,
        qtdCirculos: count
      });

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
    if (circulos.qtdCirculos > 0) {
      for (i = 0; i < circulos.qtdCirculos; i++) {
        let x = allCirculos.eixoX[i];
        let y = allCirculos.eixoY[i];
        pontos.push(
          <Ponto x={x} y={y} key={i} />
        )
      }
      setJsxCirculos({ circulos: pontos });
    }
  }, [allCirculos.eixoX, allCirculos.eixoY, circulos.qtdCirculos]);

  function removerCirculo() {

    if (circulos.qtdCirculos < 1) {
      return;
    }
    let newqtdCirculos = circulos.qtdCirculos - 1;
    setCirculos({
      ...circulos,
      qtdCirculos: newqtdCirculos
    })
    allCirculos.eixoX.pop();
    allCirculos.eixoY.pop();
    jsxCirculos.circulos.pop();
    // console.log(allCirculos);
    // console.log(jsxCirculos.circulos);
  }

  return (
    <Element id="container">
      {
        circulos.qtdCirculos > 0 &&
        jsxCirculos.circulos
      }
      <Button onClick={removerCirculo} id='button'>Desfazer</Button>
      <ButtonRefazer id='button'>Refazer</ButtonRefazer>
      <GlobalStyle />
    </Element>
  );
}

export default App;
