import { FieldPath, FieldPathValue, Path, UnpackNestedValue, UseFormSetValue } from '~/UseForm/ObjectPath';
import { JSX } from 'solid-js';

interface UniversalFormProp {
  clearOnSubmit: boolean
}

export interface FormProps<Field> extends UniversalFormProp {
  defaultValues: Partial<Field>
}

export interface SingleFormProps<Field> extends UniversalFormProp {
  defaultValue: Field
  name: string,
}

export interface RegisterProps {
  refOverload?: (ref: HTMLInputElement) => void
  valueAsNumber?: boolean
}

export interface UseFormResult<Fields> {
  register(name: Path<Fields>, registerProps?: RegisterProps): JSX.InputHTMLAttributes<HTMLInputElement>
  unregister(name: Path<Fields>): void
  handleSubmit(callback: (values: Fields, ev: Event) => void): (ev: Event) => void
  clear(name: Path<Fields>): void
  clearForm(): void
  setValue: UseFormSetValue<Fields>;
  watch<TFieldName extends FieldPath<Fields> = FieldPath<Fields>>(name: Path<Fields>): UnpackNestedValue<FieldPathValue<Fields, TFieldName>>
}
