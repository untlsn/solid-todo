import { createStore } from 'solid-js/store';
import { JSX } from 'solid-js';
import { FieldPath, FieldPathValue, Path, UnpackNestedValue, UseFormSetValue } from './ObjectPath';
import { FormProps } from '~/UseForm/types';

interface UseFormResult<Fields> {
  register(name: Path<Fields>): JSX.InputHTMLAttributes<HTMLInputElement>
  unregister(name: Path<Fields>): void
  handleSubmit(callback: (values: Fields, ev: Event) => void): (ev: Event) => void
  clear(name: Path<Fields>): void
  clearForm(): void
  setValue: UseFormSetValue<Fields>;
  watch<TFieldName extends FieldPath<Fields> = FieldPath<Fields>>(name: Path<Fields>): UnpackNestedValue<FieldPathValue<Fields, TFieldName>>
}

export const useForm = <Fields>(props: Partial<FormProps<Fields>> = {}) => {
  const [store, setStore] = createStore<Fields>(props.defaultValues || {} as any);
  const scopeRefArr: Record<string, HTMLInputElement> = {};

  const registeredEvent: Record<string, any> = {};

  const self = {
    register(name: string, refOverload?: (ref: HTMLInputElement) => void) {
      const spitedName = name.split('.');
      const value = () => spitedName.reduce((acc: any, cur) => acc[cur], store);

      return {
        value: value() ?? '',
        name,
        ref(ref) {
          ref.removeEventListener('input', registeredEvent[name]);
          registeredEvent[name] = (ev: any) => (
            self.setValue(name as any, ev.currentTarget.value as any)
          );
          ref.addEventListener('input', registeredEvent[name]);
          scopeRefArr[name] = ref;
          refOverload?.(ref);
        },
      };
    },
    unregister(name: string) {
      if (scopeRefArr[name]) scopeRefArr[name].removeEventListener('input', registeredEvent[name]);
    },
    setValue(name: string, value: any) {
      (setStore as any)(...name.split('.'), value);
      if (scopeRefArr[name]) scopeRefArr[name].value = value;
    },
    clear(name: string) {
      const defVal = props.defaultValues ? name.split('.').reduce(
        (acc: any, cur) => acc ? acc?.[cur] : undefined,
        props.defaultValues,
      ) : undefined;

      self.setValue(name as any, defVal);
      if (scopeRefArr[name]) scopeRefArr[name].value = defVal ?? '';
    },
    clearForm: () => Object.keys(scopeRefArr).forEach(self.clear as any),
    handleSubmit: (callback: (values: Fields, ev: Event) => void) => (ev: Event) => {
      ev.preventDefault();
      callback(store as any, ev);
      if (props.clearOnSubmit) self.clearForm();
    },
    watch(name: Path<Fields>) {
      return name.split('.').reduce((acc: any, cur) => acc[cur], store);
    },
  } as UseFormResult<Fields>;

  return self;
};
