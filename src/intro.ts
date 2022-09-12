import { Grid, Text } from "kontra";

export default function Intro(canvas: HTMLCanvasElement) {
  let prophecy = Text({
    text: `
    When The Eternal Night falls
    the twins of Life and Death
    shall hunt down The Abominations\' body
    and harvest their souls
    to quench The Night Mother\'s thirst
    
                              ---- Prophecy
    `,
    font: 'bold 40px serif',
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 1.5,
  });

  let startText = Text({
    text: `\n\nPress [Space] to start
    Press [Esc] at any time to learn the controls`,
    font: 'bold 40px Arial',
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 1.5,
  });

  const intro = Grid({
    x: canvas.width / 2,
    y: canvas.height / 2,
    anchor: { x: 0.5, y: 0.5 },
  
    // add 15 pixels of space between each row
    rowGap: 15,
  
    // center the children
    justify: 'center',
  
    children: [prophecy, startText]
  });

  return intro
}