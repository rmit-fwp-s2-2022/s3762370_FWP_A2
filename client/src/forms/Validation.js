export default function validate(values) {
    let errors = {};
    // user name is required
    if (!values.userName) {
      errors.userName = 'Email is required';
      // check valid email or not
    } else if (!/\S+@\S+\.\S+/.test(values.userName)) {
      errors.userName = 'Email is invalid';
    }
    // check the password. user input or not.
    if (!values.password) {
      errors.password = 'Password is required';
      // check user password length.
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    return errors;
};