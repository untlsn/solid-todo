import { JSX } from 'solid-js';

interface SwitchProps {
  children?: any
  spread?: JSX.InputHTMLAttributes<HTMLInputElement>
  onCheck?(checked: boolean, ev: Event & {currentTarget: HTMLInputElement, target: Element}): void
  checked?: boolean
}

const Switch = (props: SwitchProps) => {
  return (
    <label class="flex items-center gap-4 cursor-pointer select-none">
      {props.children}
      <div class="h-4 w-10 bg-gray-100 rounded-full relative">
        <input
          checked={props.checked}
          onChange={ev => props.onCheck?.(ev.currentTarget.checked, ev)}
          type="checkbox"
          {...props.spread || {}}
          class={`hidden checked:sibling:(translate-x-[110%] bg-main-fuchsia) ${props.spread?.class || ''}`}
        />
        <hr class="h-6 w-6 absolute bg-gray-300 rounded-full -top-1 left-0 transform translate-x-[-10%] transition-transform"/>
      </div>
    </label>
  );
};

export default Switch;
