import * as React from "react";
import { useState } from "react";

export interface stateType {
  value?: string,
  hasError?: boolean,
  showError?: boolean,
  validations: () => Array<string | boolean>,
}

export type formOptions = {
  endpoint: string;
}

export default (
  initialState: Record<string, stateType>,
  formOptions: formOptions
) => {
  for (let key in initialState) {
    if (initialState[key].value == undefined) {
      initialState[key].value = ''
    }
    if (initialState[key].hasError == undefined) {
      initialState[key].showError = false
    }
    if (initialState[key].hasError == undefined) {
      initialState[key].hasError = true
    }
  }

  const [form, setForm] = useState(initialState);

  const handleInput = function (event, type) {
    const item = form[type]
    item.value = event.target.value

    let validations = form[type].validations()

    // console.log(validations.filter(Boolean).length > 0)
    item.hasError = validations.filter(Boolean).length > 0;

    item.showError = false;

    setForm({...form, [type]: item})
  }

  const handleBlur = function (event, type) {
    const item = form[type]

    let validations = form[type].validations()

    // console.log(validations.filter(Boolean).length > 0)
    item.showError = item.hasError = validations.filter(Boolean).length > 0;

    setForm({...form, [type]: item})
  }

  const handleHelperText = function (type) {
    return form[type].validations().filter(Boolean).join(',')
  }

  return {
    initialState,
    form,
    setForm,
    handleInput,
    handleBlur,
    handleHelperText
  }
}
