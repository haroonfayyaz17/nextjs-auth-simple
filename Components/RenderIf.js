export const RenderIf = ({ isTrue, children, fallback = <></> }) =>
  isTrue ? children : fallback;
