import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import "./Game.css"

interface ComponentProps {
  // Your component props
}

// let x = 50;
// const y = 50;
  
const Game: React.FC<ComponentProps> = (props: ComponentProps) => {

  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1000, 600).parent(canvasParentRef);
  };

  let paddleY = 0;

  const draw = (p5: p5Types) => {
    p5.background(35);

    p5.stroke(255);
    p5.strokeWeight(3);
    p5.line(500, 0, 500, 600);

    p5.ellipse(500, 300, 15);

    // setup paddle
    p5.rect(4, paddleY, 8, 80, 15);

    if (p5.keyIsPressed) {
        if (p5.keyCode === p5.DOWN_ARROW && paddleY <= 600 - 80) {
            paddleY += 3;
        }
        if (p5.keyCode === p5.UP_ARROW && paddleY >= 0) {
            paddleY -= 3;
        }
    }

  };

  return <Sketch className="canvas" setup={setup} draw={draw} />;
};

export default Game;