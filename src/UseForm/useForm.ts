import { createStore, unwrap } from 'solid-js/store';
import { Path } from './ObjectPath';
import { FormProps, RegisterProps, UseFormResult } from '~/UseForm/types';



export const useForm = <Fields>(props: Partial<FormProps<Fields>> = {}) => {
  const [store, setStore] = createStore<Fields>(props.defaultValues || {} as any);
  const scopeRefArr: Record<string, HTMLInputElement> = {};

  const registeredEvent: Record<string, any> = {};

  const self = {
    register(name: string, registerProps: RegisterProps = {}) {
      const spitedName = name.split('.');
      const value = () => spitedName.reduce((acc: any, cur) => acc[cur], store);

      return {
        value: value() ?? '',
        name,
        type: registerProps.valueAsNumber ? 'number' : undefined,
        ref(ref: any) {
          ref.removeEventListener('input', registeredEvent[name]);
          registeredEvent[name] = (ev: any) => {
            const parser = registerProps.valueAsNumber ? Number : String;
            self.setValue(name as any, parser(ev.currentTarget.value) as any);
          };
          ref.addEventListener('input', registeredEvent[name]);
          scopeRefArr[name] = ref;
          registerProps.refOverload?.(ref);
        },
      };
    },
    unregister(name: string) {
      if (scopeRefArr[name]) scopeRefArr[name].removeEventListener('input', registeredEvent[name]);
    },
    setValue(name: string, value: any) {
      (setStore as any)(...name.split('.'), value);
      if (scopeRefArr[name]) scopeRefArr[name].value = value ?? '';
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
      callback(unwrap(store) as any, ev);
      if (props.clearOnSubmit) self.clearForm();
    },
    watch(name: Path<Fields>) {
      return name.split('.').reduce((acc: any, cur) => acc[cur], store);
    },
  } as UseFormResult<Fields>;

  return self;
};
