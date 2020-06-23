import './index.css'

function setupCanvas() {
  const body = document.body
  const canvas = document.createElement('canvas')
  const width = window.innerWidth
  const height = window.innerHeight

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
  this.size = 100

  this.draw = () => {
    context.save()
    context.fillStyle = 'black'
    context.fillRect(this.x, this.y, this.size, this.size)
    context.restore()
  }

  this.animate = () => {
    this.y = this.y + 10

    console.log(this.x)

    this.draw()
  }
}

function makeArray (items) {
  return [...Array(items).keys()]
}

function makeListSquares(items) {
  const assign = i => ({
    x: 500,
    y: 50,
  })
  const squares = makeArray(1).map(assign)
  return squares
}

const {canvas, context, width, height} = setupCanvas()
let square = new makeSquare({context, x: 500, y: 500})

window.addEventListener('wheel', event => {
  if(event.deltaY < 0) {
    context.clearRect(0, 0, width, height)
    square.animate()
  }
})

function main() {
  context.clearRect(0, 0, width, height)
  square.draw()
  requestAnimationFrame(main)
}

main()
