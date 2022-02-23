import { JSX, splitProps } from 'solid-js';

interface IconWrapperProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  viewBoxArr: number[]
}

const IconWrapper = (_props: IconWrapperProps) => {
  const [props, forSvg] = splitProps(_props, ['viewBoxArr']);

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox={`0 0 ${props.viewBoxArr[0]} ${props.viewBoxArr[1]}`}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...forSvg}
    />
  );
};

export const createIcon = (viewBoxArr: number[], ...children: any) => (
  (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
    <IconWrapper viewBoxArr={viewBoxArr} {...props}>{children}</IconWrapper>
  )
);

export default IconWrapper;
