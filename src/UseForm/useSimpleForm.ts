import { createSignal, JSX } from 'solid-js';
import { SingleFormProps } from './types';

interface UseFormResult<Field> {
  register(refOverload?: (ref: HTMLInputElement) => void): JSX.InputHTMLAttributes<HTMLInputElement>
  handleSubmit(callback: (value: Field, ev: Event) => void): (ev: Event) => void
  clear(): void
  setValue(value: Field): Field
}


const saveConvertString = (val?: any) => val != undefined ? String(val) : ''

export const useSimpleForm = <Field>(props: Partial<SingleFormProps<Field>> = {}) => {
  const [value, setValue] = createSignal(props.defaultValue);
  let scopeRef: HTMLInputElement;
  const forceChangeValue = (val: any) => {
    setValue(val)
    scopeRef.value = saveConvertString(value());
    return value();
  }

  const self = {
    register(refOverload) {
      return {
        onInput: (ev) => setValue(ev.currentTarget.value as any),
        value: saveConvertString(value()),
        name: props.name,
        ref(ref) {
          scopeRef = ref;
          refOverload?.(ref);
        }
      }
    },
    handleSubmit: (callback: (values: Field, ev: Event) => void) => (ev: Event) => {
      ev.preventDefault();
      callback(value() as any, ev);
      if (props.clearOnSubmit) self.clear();
    },
    clear: () => forceChangeValue(undefined),
    setValue: (val) => forceChangeValue(val as any),
  } as UseFormResult<Field>;

  return self;
}
