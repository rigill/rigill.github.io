import './index.css'

const SQUARE_SIZE = 25

const PALETTE = ['#333333', '#111111']

function setupCanvas() {
  const body = document.body
  const canvas = document.createElement('canvas')
  //const width = window.innerWidth
  //const height = window.innerHeight
  const width = 500
  const height = 500

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
    height
  }
}

function makeSquare({context, x, y}) {
  this.x = x
  this.y = y
  this.size = SQUARE_SIZE

  this.draw = () => {
    context.save()
    context.fillStyle = PALETTE[0]
    context.fillRect(this.x, this.y, this.size, this.size)
    context.restore()
  }
}

function createGrid () {
  const points = []
  const count = 10
  for(let x = 0; x < count; x++) {
    for(let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count -1)
      const v = count <= 1 ? 0.5 : y / (count -1)

      points.push([u, v])
    }
  }
  return points
}

function main() {
  const {context, width, height} = setupCanvas()

  const points = createGrid()
  context.clearRect(0, 0, width, height)
  
  points.forEach(([u,v]) => {
    const x = u * width 
    const y = v * height 
    const square = new makeSquare({context, x, y})
    square.draw()
  })
}

main()
