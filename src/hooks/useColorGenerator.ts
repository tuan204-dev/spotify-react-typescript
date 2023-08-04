interface useColorGeneratorProps {
  min: number
  max: number
}

const useColorGenerator = (props: useColorGeneratorProps) => {
  const { min, max } = props

  const range = Math.abs(max - min)

  const firstIndex = Math.floor(Math.random() * range) + min
  const secondIndex = Math.floor(Math.random() * range)
  const thirdIndex = Math.floor(Math.random() * range)

  const colors = [firstIndex, secondIndex, thirdIndex]

  const redIndex = Math.floor(Math.random() * 3)

  let greenIndex = 0

  while (greenIndex === redIndex) {
    greenIndex = Math.floor(Math.random() * 3)
  }

  const blueIndex = 3 - redIndex - greenIndex

  return `rgb(${colors[redIndex]},${colors[greenIndex]},${colors[blueIndex]})`
}

export default useColorGenerator
