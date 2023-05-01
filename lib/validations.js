export default {
  required: value => !!value,
  isInteger: value => {
    console.log('isInteger', value)
    return /^\d+$/.test(value);
  },
  minLength: (value, count) => {
    return value && value.length >= count
  },
  email: email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
}