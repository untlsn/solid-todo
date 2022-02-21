interface UniversalFormProp {
  clearOnSubmit: boolean
}

export interface FormProps<Field> extends UniversalFormProp {
  defaultValues: Field
}

export interface SingleFormProps<Field> extends UniversalFormProp {
  defaultValue: Field
  name: string,
}
