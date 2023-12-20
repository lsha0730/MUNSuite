import { ReactNode } from "react";

type Props = {
  condition: boolean;
  wrapper: (c: ReactNode) => ReactNode;
  children: ReactNode;
};

const ConditionalWrapper = ({ condition, wrapper, children }: Props) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;
