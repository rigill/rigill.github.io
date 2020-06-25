import './index.css'

const SQUARE_SIZE = 10

const PALETTE = [
  '#010101',
  '#000000', 
  '#1b1b2f', 
]

function randomBetween(lower, higher) {
  return (Math.floor(Math.random() * higher) + lower)
}

function pickColours() {
  if(randomBetween(1, 50) === 1) {
    return PALETTE[2]
  }
  return PALETTE[randomBetween(1, 2) - 1]
}

function setupCanvas() {
  const body = document.body
  const canvas = document.createElement('canvas')
  const width = window.outerWidth + 15
  const height = window.innerHeight

  const gridCount = Math.floor(width / SQUARE_SIZE)

  const fitToWindow = () => {
    canvas.width = width
    canvas.height = height
  }
  body.append(canvas)
  fitToWindow()
  //window.addEventListener('resize', fitToWindow)
  return {
    canvas,
    context: canvas.getContext('2d'),
    width,
    height,
    gridCount
  }
}

function makeSquare({context, x, y}) {
  this.x = x
  this.y = y
  this.size = SQUARE_SIZE

  this.draw = () => {
    context.save()
    context.fillStyle = pickColours()
    context.fillRect(this.x, this.y, this.size, this.size)
    context.restore()
  }
}

function createGrid (gridCount) {
  const points = []
  const count = gridCount
  for(let x = 0; x < count; x++) {
    for(let y = 0; y < count; y++) {
      const u = x * SQUARE_SIZE
      const v = y * SQUARE_SIZE

      points.push([u, v])
    }
  }
  return points
}

function main() {
  const {context, width, height, gridCount} = setupCanvas()

  const points = createGrid(gridCount)
  console.log('points', points)
  context.clearRect(0, 0, width, height)
  
  points.forEach(([x,y]) => {
    const square = new makeSquare({context, x, y})
    square.draw()
  })
}

main()
