export const getInitials = (str: string) => {
  if (!str.includes(' ')) return str.slice(0, 2).toUpperCase()

  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

export const getDate = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
