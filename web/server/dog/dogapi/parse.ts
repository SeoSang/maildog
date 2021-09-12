export const parseTemperaments = (temperament: string): string[] => {
  const result = temperament.split(',').map((temper) => temper.trim())
  return result
}
