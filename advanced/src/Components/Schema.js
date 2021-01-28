import * as yup from 'yup'

export default yup.object().shape({
    username: yup
    .string()
    .required('Username is required')
    .min(3,'Username must be 3 characters long'),
    email: yup
    .string()
    .email('Must be a valid email address')
    .required('Must include email address'),
    password: yup
    .string()
    .required('Password is required')
    .min(8,'Password must be 8 characters long'),

    terms: yup
    .boolean().oneOf([true], 'This is required')

})