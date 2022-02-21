import { createStore } from 'solid-js/store';
import { JSX } from 'solid-js';
import { Path, UseFormSetValue } from './ObjectPath';
import { FormProps } from '~/UseForm/types';

interface UseFormResult<Fields> {
  register(name: Path<Fields>): JSX.InputHTMLAttributes<HTMLInputElement>
  handleSubmit(callback: (values: Fields, ev: Event) => void): (ev: Event) => void
  clear(): void
  setValue: UseFormSetValue<Fields>;
}

export const useForm = <Fields>(props: Partial<FormProps<Fields>> = {}) => {
  const [store, setStore] = createStore<Fields>(props.defaultValues || {} as any);
  const scopeRefArr: Record<string, HTMLInputElement> = {};

  const self = {
    register: (name: string, refOverload?: (ref: HTMLInputElement) => void) => {
      const spitedName = name.split('.');
      const value = () => spitedName.reduce((acc: any, cur) => acc[cur], store)

      return {
        onInput: (ev) => (
          self.setValue(name as any, ev.currentTarget.value as any)
        ),
        value: value(),
        name,
        ref(ref) {
          scopeRefArr[name] = ref;
          refOverload?.(ref);
        }
      }
    },
    setValue: (name: string, value: any) => (setStore as any)(...name.split('.'), value),
    clear() {
      Object.entries(scopeRefArr).forEach(([key, val]) => {
        self.setValue(key as any, undefined as any);
        val.value = '';
      });
    },
    handleSubmit: (callback: (values: Fields, ev: Event) => void) => (ev: Event) => {
      ev.preventDefault();
      callback(store as any, ev);
      if (props.clearOnSubmit) self.clear();
    }
  } as UseFormResult<Fields>;

  return self;
}
