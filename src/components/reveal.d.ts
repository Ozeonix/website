import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealPreset = "left" | "right" | "up" | "fade" | "auto";
export type RevealDirection = RevealPreset | "none";

export interface RevealProps {
  children?: ReactNode;
  index?: number;
  direction?: RevealDirection;
  debug?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export interface RevealGroupProps {
  children?: ReactNode;
  preset?: RevealPreset;
  stepDelay?: number;
  duration?: number;
  debug?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export interface RevealProviderProps extends RevealGroupProps {
  easing?: string;
  slideDistance?: number;
}

declare const Reveal: (props: RevealProps) => JSX.Element;
declare const RevealGroup: (props: RevealGroupProps) => JSX.Element;
declare const RevealProvider: (props: RevealProviderProps) => JSX.Element;

export { Reveal, RevealGroup, RevealProvider };
export default Reveal;
