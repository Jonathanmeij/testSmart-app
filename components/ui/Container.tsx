/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const containerStyles = cva("px-6 ", {
  variants: {
    maxWidth: {
      none: "max-w-none",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    maxWidth: "4xl",
  },
});

interface ContainerProps extends VariantProps<typeof containerStyles> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  maxWidth,
}: ContainerProps) {
  return (
    <div className={`${className ?? ""} ${containerStyles({ maxWidth })}`}>
      {children}
    </div>
  );
}
