export default (evt: KeyboardEvent | ClipboardEvent): void => {
  let key: string

  // Handle paste
  if (evt.type === 'paste') {
    const clipboardEvent = evt as ClipboardEvent
    key = clipboardEvent.clipboardData?.getData('text/plain') || ''
  } else {
    // Handle key press
    const keyboardEvent = evt as KeyboardEvent
    key = keyboardEvent.key // Get the key value directly
  }

  const regex = /^[0-9.]$/
  if (!regex.test(key)) {
    evt.preventDefault()
  }
}
