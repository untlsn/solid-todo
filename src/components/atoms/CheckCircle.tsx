interface CheckCircleProps {
  onClick?(): void
  checked?: boolean
}

const CheckCircle = (props: CheckCircleProps) => {
  return (
    <div
      class="h-5 w-5 rounded-full border-2 cursor-pointer"
      onClick={props.onClick}
    >
      <hr class={`h-3 w-3 rounded-full border-none bg-gray-200 m-0.5 ${props.checked ? '' : 'hidden'}`} />
    </div>
  );
};

export default CheckCircle;
