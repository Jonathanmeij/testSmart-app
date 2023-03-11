import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

const buttonStyles = cva("font-semibold text-center border-1", {
  variants: {
    color: {
      primary:
        " bg-san-marino-500 text-white border-0  hover:bg-san-marino-600",
      secondary: " bg-white text-san-marino-900 hover:bg-san-marino-50 ",
      secondaryDarker:
        " bg-san-marino-100 text-san-marino-900 hover:bg-san-marino-200",
      none: "bg-transparent hover:bg-gray-900 border-0",
      danger: " bg-red-600 text-white hover:bg-red-700 border-red-500",
    },
    padding: {
      none: "p-0",
      normal: "py-2 px-4",
      small: "p-1",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    rounded: {
      rounded: "rounded",
      roundedLg: "rounded-lg",
      full: "rounded-full",
      none: "",
    },
    animate: {
      true: " transition ease-in-out hover:scale-105 ",
      false: "",
    },
  },
  defaultVariants: {
    color: "none",
    padding: "normal",
    fullWidth: false,
    rounded: "rounded",
    animate: false,
  },
});

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  className?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  padding?: "none" | "small" | "normal";
  rounded?: "rounded" | "roundedLg" | "full" | "none";
}

function Button({
  color,
  onClick,
  type,
  children,
  padding,
  fullWidth,
  onMouseOver,
  className,
  rounded,
  animate,
}: ButtonProps) {
  return (
    <button
      className={`${buttonStyles({
        color,
        padding,
        fullWidth,
        rounded,
        animate,
      })} ${className ?? ""}`}
      onClick={onClick}
      type={type}
      onMouseOver={onMouseOver}
    >
      {children}
    </button>
  );
}

export default Button;
