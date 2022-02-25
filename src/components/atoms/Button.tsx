import { JSX } from 'solid-js';


const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      {...props}
      class={`bg-main-orange text-white px-2 py-1 rounded-full font-semibold hover:opacity-70 ${props.class || ''}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
