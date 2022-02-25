import { createEffect, createSignal, JSX } from 'solid-js';

interface SwitchProps {
  children?: any
  spread?: JSX.InputHTMLAttributes<HTMLInputElement>
  onCheck?(checked: boolean): void
  checked?: boolean
  tabIndex?: number
}

const Switch = (props: SwitchProps) => {
  const [checked, setChecked] = createSignal(!!props.checked);

  createEffect(() => {  
    props.onCheck?.(checked());
  });

  return (
    <div class="flex items-center gap-4 cursor-pointer select-none">
      {props.children}
      <button
        class="h-4 w-10 bg-gray-100 rounded-full relative group focus-within:outline-none hover:children:bg-opacity-7 focus:children:bg-opacity-7"
        tabIndex={props.tabIndex || -1}
        onClick={() => setChecked(v => !v)}
      >
        <div class={`h-10 w-10 absolute rounded-full -top-3 -left-2 transform translate-x-[-10%] transition-transform 
          bg-black bg-opacity-0 ${
          checked() ? 'translate-x-[60%] children:bg-main-fuchsia' : ''
        }`}>
          <hr class="h-6 w-6 absolute top-2 left-2 bg-gray-300 rounded-full"/>
        </div>
      </button>
    </div>
  );
};

export default Switch;
