import { cva, type VariantProps } from "class-variance-authority";

const cardStlyes = cva("  border-gray-700 border-1", {
  variants: {
    shadow: {
      false: "",
      true: "shadow-md shadow-slate-300 ",
    },
    rounded: {
      none: "",
      rounded: "rounded",
      roundedLg: "rounded-lg",
    },
    color: {
      none: "",
      white: "bg-white",
      light: "bg-san-marino-50",
    },
    overflow: {
      true: "",
      false: "overflow-hidden",
    },
    border: {
      none: "",
      normal: "border-1 border-san-marino-200",
      dotted: "border-dotted border-1 border-san-marino-200",
    },
  },
  defaultVariants: {
    shadow: false,
    rounded: "rounded",
    color: "white",
    overflow: false,
    border: "none",
  },
});

interface CardProps extends VariantProps<typeof cardStlyes> {
  children: React.ReactNode;
  className?: string;
}

export function Card(props: CardProps) {
  const { children, className, shadow, border, overflow, rounded, color } =
    props;

  return (
    <div
      className={`  ${className ?? ""} ${cardStlyes({
        shadow,
        rounded,
        color,
        overflow,
        border,
      })} `}
    >
      {children}
    </div>
  );
}
