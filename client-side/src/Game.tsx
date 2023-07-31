import { Sketch, SketchProps } from "@p5-wrapper/react";
import "./Game.css"


interface Ball {
  x: number;
  y: number;
}

interface GameProps extends SketchProps {
  playerY: number;
  ball: Ball;
}

const game: Sketch<GameProps> = (p5) => {
  let playerY: number;
  let ball: Ball = {x: 500, y:300};

  
  p5.setup = () => { 
    p5.createCanvas(1000, 600);
  }

  p5.updateWithProps = (props) => { 
    if (props.playerY) {
      playerY = props.playerY;
    }
    if (props.ball) {
      ball = props.ball;
    }
  }
  


  p5.draw = () => {
    
    p5.clear();
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.ellipse(500, 300, 15);
    p5.line(500, 0, 500, 600);
    
    p5.rect(4 ,playerY, 8, 80, 50);
    
    // p5.ellipse(ball.x, ball.y, 15);


  }

}

export default game;