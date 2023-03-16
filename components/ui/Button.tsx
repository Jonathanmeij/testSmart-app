import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

const buttonStyles = cva("font-semibold  border-1", {
  variants: {
    color: {
      primary:
        " bg-san-marino-500 text-white border-0  hover:bg-san-marino-600",
      secondary: " bg-white text-san-marino-900 hover:bg-san-marino-50 ",
      secondaryDarker:
        " border border-gray-300 text-san-marino-900 hover:bg-san-marino-100",
      none: "bg-transparent hover:bg-san-marino-50 border-0",
      danger: " bg-red-100 text-red-800 hover:bg-red-200 border-red-500",
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
    font: {
      normal: "font-normal",
      bold: "font-bold",
      semibold: "font-semibold",
    },
    textAlign: {
      left: "text-left",
      right: "text-right",
      center: "text-center",
    },
  },
  defaultVariants: {
    color: "none",
    padding: "normal",
    fullWidth: false,
    rounded: "rounded",
    animate: false,
    font: "semibold",
    textAlign: "center",
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
  font,
  textAlign,
}: ButtonProps) {
  return (
    <button
      className={`${buttonStyles({
        color,
        padding,
        fullWidth,
        rounded,
        animate,
        font,
        textAlign,
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
