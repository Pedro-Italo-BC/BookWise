export function limitString(
  string: string,
  length: number,
  dots: boolean = true,
) {
  if (string.length <= length) {
    return string
  }

  if (dots) {
    return string.substring(0, length).concat('...')
  }

  return string.substring(0, length)
}
