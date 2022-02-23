import { JSX, Show } from 'solid-js';
import './style.css';

export interface TextFieldProps {
  class?: string;
  placeholder?: string;
  error?: string;

  inputSpread?: JSX.InputHTMLAttributes<HTMLInputElement>
}

const TextField = (props: TextFieldProps) => {
  return (
    <div class={props.class}>
      <label
        class='bg-white flex items-center px-4 gap-4 border-1 rounded border-gray-500 hover:border-blue-600 focus-within:border-blue-600 relative'
        tabIndex={-1}
      >
        <input
          {...props.inputSpread || {}}
          placeholder=" "
          class="w-full rounded h-10 bg-transparent focus:outline-none input-placeholder-move"
        />
        <div
          class="absolute text-gray-500 transform transition-transform
          before before:(absolute bg-white w-[110%] h-[3px] -left-[5%] top-0 bottom-0 mx-0 my-auto -z-1)"
        >
          {props.placeholder}
        </div>
      </label>
      {<Show when={props.error}>{<small class="block text-red-600 pl-4">{props.error}</small>}</Show>}
    </div>
  );
};

export default TextField;
