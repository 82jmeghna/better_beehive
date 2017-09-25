export const validate = (values) => {
  const errors = {}
  const requiredFields = [ 'Username','Password']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}
