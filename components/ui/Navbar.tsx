/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import helpIcon from "../../public/images/help.svg";
import LinkButton from "./LinkButton";
import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import { Fragment, useState } from "react";
import Box from "./Box";
import Divider from "./Divider";

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
  return (
    <>
      <li className="flex h-10 items-center gap-3">
        <LinkButton color="secondary" to="/">
          Home
        </LinkButton>
        <LinkButton
          color="primary"
          to="/dashboard
        "
        >
          <div className="flex items-center gap-2">
            <p>Create</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" />
            </svg>
          </div>
        </LinkButton>
        <AccountMenu />
      </li>
    </>
  );
}

function AccountMenu() {
  const { data: session } = useSession();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex w-10 items-center overflow-hidden rounded-full">
        <img src={session?.user.image ?? ""} alt="User avatar" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 text-xl font-semibold">{session?.user.name}</div>
          <div className="flex w-full flex-col p-1">
            <Menu.Item>
              {({ active }) => (
                <LinkButton
                  textAlign="left"
                  font="normal"
                  color="none"
                  to="/account"
                  fullWidth
                  className={active ? "bg-gray-100" : ""}
                >
                  Account
                </LinkButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <LinkButton
                  textAlign="left"
                  font="normal"
                  color="none"
                  to="/dashboard"
                  fullWidth
                  className={active ? "bg-gray-100" : ""}
                >
                  Dashboard
                </LinkButton>
              )}
            </Menu.Item>
          </div>
          <div className="flex w-full p-1">
            <Menu.Item>
              {({ active }) => (
                <Button
                  textAlign="left"
                  color="danger"
                  fullWidth
                  onClick={() => void signOut()}
                  className={active ? "bg-red-200" : ""}
                >
                  Sign out
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
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
            <Menu.Items className="absolute top-0 right-0 z-20 h-max w-full translate-y-16 rounded-xl backdrop-blur">
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

function MenuItems() {
  const { data: session } = useSession();

  return (
    <Container className="flex w-full flex-col gap-8 rounded-xl text-xl">
      <TransitionChild delay={"delay-[0ms]"} leaveDelay={"delay-[150ms]"}>
        <Menu.Item>
          <LinkButton fullWidth color={"secondary"} to={"/"}>
            Home
          </LinkButton>
        </Menu.Item>
      </TransitionChild>
      <TransitionChild delay={"delay-[50ms]"} leaveDelay={"delay-[100ms]"}>
        <Menu.Item>
          <LinkButton fullWidth color={"secondary"} to={"/about"}>
            About
          </LinkButton>
        </Menu.Item>
      </TransitionChild>
      {session ? (
        <TransitionChild delay={"delay-[150ms]"} leaveDelay={"delay-[0ms]"}>
          <Menu.Item>
            <div className="flex items-center gap-2 rounded bg-san-marino-600 p-2">
              <div>
                <img
                  src={session?.user.image ?? ""}
                  className="w-20 overflow-hidden rounded-full"
                  alt="User avatar"
                />
              </div>
              <LinkButton fullWidth color="noneWhite" to={"/account"}>
                Account
              </LinkButton>
            </div>
          </Menu.Item>
        </TransitionChild>
      ) : (
        <TransitionChild delay={"delay-[150ms]"} leaveDelay={"delay-[0ms]"}>
          <Menu.Item>
            <Button fullWidth color={"primary"} onClick={() => void signIn()}>
              Sign up
            </Button>
          </Menu.Item>
        </TransitionChild>
      )}
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
