import Button from "components/ui/Button";
import { signIn } from "next-auth/react";

export default function NotSignedIn() {
  return (
    <FullScreenWrapper className="flex flex-col gap-2">
      <p className="text-2xl font-semibold">Not signed in</p>
      <Button color="primary" onClick={() => void signIn()}>
        Sign in
      </Button>
    </FullScreenWrapper>
  );
}

export function FullScreenWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={` flex h-screen w-full items-center justify-center bg-san-marino-100 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
