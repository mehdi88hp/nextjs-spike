export default {
    required: value => !!value,
    minLength: (value, count) => {
        console.log(5544,value)
        return value.length > count
    },
}