export default (ctx, inject) => {
  const email = () => (v) =>
    !!(v || '').match(/@/) || 'Please enter a valid email'

  const password = () => (v) =>
    !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    'Password must contain an upper case letter, a numeric character, and a special character'

  const required = () => (v) => (v && v.length > 0) || 'This field is required'

  const minLength = (minL) => (v) =>
    (v && v.length >= minL) || `This field must be at least ${minL} characters`

  const maxLength = (maxL) => (v) =>
    (v && v.length <= maxL) || `A maximum of ${maxL} characters is allowed`

  inject('validation', { email, password, required, minLength, maxLength })
}
