//https://rgbcolorpicker.com/random

const useColorGenerator = () => {
  return (
    'hsl(' +
    360 * Math.random() +
    ',' +
    (60 + 30 * Math.random()) +
    '%,' +
    (30 + 20 * Math.random()) +
    '%)'
  )
}

export default useColorGenerator
