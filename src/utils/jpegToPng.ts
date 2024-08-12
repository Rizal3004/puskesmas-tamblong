export default async (imageFile: File): Promise<File> => {
  if (!imageFile.name.match(/\.jpe?g$/i)) {
    return imageFile
  }
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const arrayBuffer = event.target.result as ArrayBuffer

        // Check for both .jpg and .jpeg extensions (case-insensitive)
        const newFilename = imageFile.name.replace(/\.jpe?g$/i, '.png')

        const pngBlob = new Blob([arrayBuffer], { type: 'image/png' })
        const newFile = new File([pngBlob], newFilename, { type: 'image/png' })
        resolve(newFile)
      } else {
        reject(new Error('Failed to read image data'))
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsArrayBuffer(imageFile)
  })
}
