/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import helpIcon from "../../public/images/help.svg";
import LinkButton from "./LinkButton";
import { Menu, Transition } from "@headlessui/react";
import Divider from "./Divider";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed h-16 w-full bg-white">
      <div className="flex h-full w-full items-center justify-between pr-6 md:pr-0">
        <Container
          maxWidth="7xl"
          className="m-auto flex h-full w-full items-center justify-between"
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src={helpIcon} alt="Help icon" width={24} height={24} />
            <h1 className=" text-2xl font-extrabold text-san-marino-900">
              SmartTest
            </h1>
          </Link>
          <ul className="hidden items-center gap-3 md:flex">
            {session ? (
              <LoggedInLinks />
            ) : (
              <>
                <li>
                  <LinkButton color="secondary" to="/about">
                    About
                  </LinkButton>
                </li>
                <li>
                  <Button color="primary" onClick={() => void signIn()}>
                    Sign up
                  </Button>
                </li>
              </>
            )}
          </ul>
          <div className="block md:hidden"></div>
        </Container>
        <MobileMenuButton />
      </div>
      <Divider />
    </nav>
  );
}

function LoggedInLinks() {
  const { data: session } = useSession();
  return (
    <>
      <li>
        <LinkButton color="secondary" to="/dashboard">
          Dashboard
        </LinkButton>
      </li>
      <li>
        <div
          onClick={() => void signOut()}
          className="w-10 overflow-hidden rounded-full"
        >
          <img src={session?.user.image ?? ""} alt="User avatar" />
        </div>
      </li>
    </>
  );
}

function MobileMenuButton() {
  const genericHamburgerLine = `h-[2px] w-8 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className=" z-20 flex h-12 w-12 flex-col items-center justify-center rounded md:hidden">
            <>
              <div
                className={`${genericHamburgerLine} ${
                  open ? "translate-y-[10px] rotate-45 " : "opacity-100 "
                }`}
              />
              <div
                className={`${genericHamburgerLine} ${open ? "opacity-0" : ""}`}
              />
              <div
                className={`${genericHamburgerLine} ${
                  open
                    ? "-translate-y-[10px] -rotate-45 opacity-100"
                    : "opacity-100 "
                }`}
              />
            </>
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="absolute top-0 right-0 h-max w-full translate-y-16 rounded-xl backdrop-blur">
              <Divider />
              <div
                className="border-gray-850 z-40 w-full rounded-b border-b 
              bg-white py-16 opacity-90 "
              >
                <MenuItems />
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

type MenuItem = {
  name: string;
  href: string;
  delay: string;
  leaveDelay: string;
  color?: "primary" | "secondary" | "secondaryDarker";
};

const MenuItemsType: MenuItem[] = [
  {
    name: "Home",
    href: "/",
    delay: "delay-[0ms]",
    leaveDelay: "delay-[150ms]",
  },
  {
    name: "About",
    href: "/about",
    delay: "delay-[50ms]",
    leaveDelay: "delay-[100ms]",
  },
  {
    name: "Login",
    href: "/login",
    delay: "delay-[100ms]",
    leaveDelay: "delay-[50ms]",
    color: "primary",
  },
  {
    name: "Sign up",
    href: "/sign-up",
    delay: "delay-[150ms]",
    leaveDelay: "delay-[0ms]",
    color: "secondaryDarker",
  },
];

function MenuItems() {
  return (
    <Container className="flex w-full flex-col gap-8 rounded-xl text-2xl">
      {MenuItemsType.map((item) => (
        <TransitionChild
          key={item.name}
          delay={item.delay}
          leaveDelay={item.leaveDelay}
        >
          <Menu.Item>
            <LinkButton
              fullWidth
              color={item.color ?? "secondary"}
              to={item.href}
            >
              {item.name}
            </LinkButton>
          </Menu.Item>
        </TransitionChild>
      ))}
    </Container>
  );
}

function TransitionChild({
  children,
  delay,
  leaveDelay,
}: {
  children: React.ReactNode;
  delay: string;
  leaveDelay: string;
}) {
  return (
    <Transition.Child
      enter={`transition ease-out duration-200 transform ${delay}`}
      enterFrom="-translate-y-10 opacity-0"
      enterTo="translate-y-0"
      leave={`transition ease-in duration-200 transform ${leaveDelay}`}
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-10 opacity-0"
      className={"m-auto"}
    >
      {children}
    </Transition.Child>
  );
}
