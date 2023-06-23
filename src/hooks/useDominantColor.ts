import { useEffect, useState } from 'react'

const useDominantColor = (imageUrl: string | undefined): string => {
  const [dominantColor, setDominantColor] = useState<string>('')

  useEffect(() => {
    if (!imageUrl) return

    const loadImage = async () => {
      try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const imageUrlObject = URL.createObjectURL(blob)

        const image = new Image()
        image.src = imageUrlObject
        image.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(image, 0, 0)

          const imageData = ctx?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          ).data

          // Process the image data to find the dominant color
          const color = getDominantColor(imageData)
          setDominantColor(color)
        }
      } catch (error) {
        console.error('Error loading the image:', error)
      }
    }

    loadImage()
  }, [imageUrl])

  const getDominantColor = (imageData: Uint8ClampedArray | undefined): string => {
    // Your dominant color calculation logic goes here
    // You can use any color analysis algorithm of your choice
    // Here's a simple example that calculates the average RGB values

    let redSum = 0
    let greenSum = 0
    let blueSum = 0
    let pixelCount = 0

    for (let i = 0; i < imageData!.length; i += 4) {
      const red = imageData![i]
      const green = imageData![i + 1]
      const blue = imageData![i + 2]

      redSum += red
      greenSum += green
      blueSum += blue
      pixelCount++
    }

    const averageRed = Math.round(redSum / pixelCount)
    const averageGreen = Math.round(greenSum / pixelCount)
    const averageBlue = Math.round(blueSum / pixelCount)

    return rgbToHex(averageRed, averageGreen, averageBlue)
  }

  const rgbToHex = (red: number, green: number, blue: number): string => {
    const toHex = (c: number) => {
      const hex = c.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    const hexRed = toHex(red)
    const hexGreen = toHex(green)
    const hexBlue = toHex(blue)

    return `#${hexRed}${hexGreen}${hexBlue}`
  }

  return dominantColor
}

export default useDominantColor
