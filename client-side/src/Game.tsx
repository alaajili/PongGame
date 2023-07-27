import { Sketch, SketchProps } from "@p5-wrapper/react";
import "./Game.css"


interface GameProps extends SketchProps {
  ballX: number;
  ballY: number;
}

const game:  Sketch<GameProps> = (p5) => {
  let ballX: number = 50;
  let ballY: number = 50;
  
  p5.setup = () => { 
    p5.createCanvas(1000, 600);
    
  }

  p5.updateWithProps = (props) => {
    if (props.ballY) {
      ballY = props.ballY;
    }
    if (props.ballX) {
      ballX = props.ballX;
    }
  }
  
  p5.draw = () => {
    
    p5.clear();
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.ellipse(500, 300, 15);
    p5.line(500, 0, 500, 600);
    
    p5.rect(4 ,5, 8, 80, 50);
    
    p5.ellipse(ballX, ballY, 15);


  }

}

export default game;