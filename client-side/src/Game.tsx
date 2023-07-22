import { Sketch } from "@p5-wrapper/react";
import "./Game.css"

// interface ComponentProps {
//   // Your component props
// }

const game:  Sketch = (p5) => {
  p5.setup = () => { 
    p5.createCanvas(1000, 600);
    
  }

  p5.draw = () => {
    
    p5.clear();
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.ellipse(500, 300, 15);
    p5.line(500, 0, 500, 600);
    
    p5.rect(4 ,3, 8, 80, 50);


  }

}

export default game;