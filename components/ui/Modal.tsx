import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Card } from "./Card";
import Box from "./Box";
import Divider from "./Divider";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  if (isOpen === undefined) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="relative z-50 "
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="flex w-full max-w-md justify-center">
              <Card rounded="rounded" className="w-full max-w-md ">
                {children}
              </Card>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box>
        <h1 className="text-2xl font-semibold">{children}</h1>
      </Box>
      <Divider />
    </>
  );
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  return <Box className=" max-h-96 overflow-auto ">{children}</Box>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="r">
      <Divider />
      <Box className="flex justify-end gap-2 ">{children}</Box>
    </div>
  );
}
