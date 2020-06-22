import './index.css'

function setupCanvas() {
  const body = document.body
  const canvas = document.createElement('canvas')
  const fitToWindow = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  body.append(canvas)
  fitToWindow()
  //window.addEventListener('resize', fitToWindow)
  return canvas.getContext('2d')
}

function makeSquare({context, x, y}) {
  const size = 100
  context.save()
  context.fillStyle = 'black'
  context.fillRect(x, y, size, size)
  context.restore()
}

function makeArray (items) {
  return [...Array(items).keys()]
}

function makeListSquares(items) {
  const assign = i => ({
    x: i * 100,
    y: i * 100,
  })
  const squares = makeArray(10).map(assign)
  return squares
}

function main() {
  const context = setupCanvas()
  const squares = makeListSquares().map(({x, y}) => {
    makeSquare({context, x, y})
  })
}

main()
