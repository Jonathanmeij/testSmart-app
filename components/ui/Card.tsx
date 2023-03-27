import { cva, type VariantProps } from "class-variance-authority";

const cardStlyes = cva("  border-gray-700 border-1", {
  variants: {
    shadow: {
      none: "",
      shadow: "shadow-md shadow-slate-300 ",
    },
    rounded: {
      none: "",
      rounded: "rounded",
      roundedLg: "rounded-lg",
    },
    color: {
      none: "",
      white: "bg-white",
      darkGray: "bg-gray-900",
    },
    overflow: {
      true: "",
      false: "overflow-hidden",
    },
  },
  defaultVariants: {
    shadow: "none",
    rounded: "rounded",
    color: "white",
    overflow: false,
  },
});

interface CardProps extends VariantProps<typeof cardStlyes> {
  children: React.ReactNode;
  className?: string;
}

export function Card(props: CardProps) {
  const { children, className, shadow, overflow, rounded, color } = props;

  return (
    <div
      className={`  ${className ?? ""} ${cardStlyes({
        shadow,
        rounded,
        color,
        overflow,
      })} `}
    >
      {children}
    </div>
  );
}
