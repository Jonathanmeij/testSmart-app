import { cva, type VariantProps } from "class-variance-authority";

const cardStlyes = cva("  rounded border-gray-700 border-1", {
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
  },
  defaultVariants: {
    shadow: "none",
    rounded: "rounded",
    color: "white",
  },
});

interface CardProps extends VariantProps<typeof cardStlyes> {
  children: React.ReactNode;
  className?: string;
}

export function Card(props: CardProps) {
  const { children, className, shadow, rounded, color } = props;

  return (
    <div
      className={` overflow-hidden ${className ?? ""} ${cardStlyes({
        shadow,
        rounded,
        color,
      })} `}
    >
      {children}
    </div>
  );
}
