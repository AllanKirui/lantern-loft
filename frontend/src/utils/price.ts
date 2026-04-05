export function roundDown(value: number, step: number) {
  return Math.floor(value / step) * step
}

export function roundUp(value: number, step: number) {
  return Math.ceil(value / step) * step
}

export function snapToStep(value: number, step: number) {
  return Math.round(value / step) * step
}
