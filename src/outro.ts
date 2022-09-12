import { Grid, Text } from "kontra";

export default function Outro(canvas: HTMLCanvasElement, success: boolean) {
  let prophecy = Text({
    text: success ? `
    "Well done my children
    The souls you harvested are delicious!"
    ` : `
    You Died
    (Can Death die?)
    `,
    font: 'bold 40px serif',
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 1.5,
  });

  let restartText = Text({
    text: `\n\nRefresh the web page to restart`,
    font: 'bold 40px Arial',
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 1.5,
  });

  const outro = Grid({
    x: canvas.width / 2,
    y: canvas.height / 2,
    anchor: { x: 0.5, y: 0.5 },
  
    // add 15 pixels of space between each row
    rowGap: 15,
  
    // center the children
    justify: 'center',
  
    children: [prophecy, restartText]
  });

  return outro
}