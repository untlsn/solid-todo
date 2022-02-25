interface SquareCountProps {
  curCount: number
  maxCount: number
  onClick?(): void
}

const SquareCount = (props: SquareCountProps) => {

  return (
    <div class="h-5 w-5 border-2 cursor-pointer relative flex items-center justify-center" onClick={props.onClick}>
      <hr
        class="border-none absolute bottom-0 left-0 w-full h-full origin-bottom bg-gray-200"
        style={{ 'transform': `scaleY(${props.curCount ? props.curCount / props.maxCount : 0})` }}
      />
    </div>
  );
};

export default SquareCount;
