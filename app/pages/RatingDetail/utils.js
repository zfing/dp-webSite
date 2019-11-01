export function handleNA(input) {
  return input <= -100 ? {
    name: 'N/A',
    value: 0,
  } : {
    name: input,
    value: input,
  }
}
