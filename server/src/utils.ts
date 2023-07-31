export const manejoError = (error: unknown) => {
  console.log(error)
  if (error instanceof Error) throw error
  else throw new Error('Error interno, por favor intentálo mas tarde')
}
