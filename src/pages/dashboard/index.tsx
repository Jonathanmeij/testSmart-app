import Button from "components/ui/Button";
import { signIn, useSession } from "next-auth/react";
import NotSignedIn, { FullScreenWrapper } from "../NotSignedIn";
import { Tab } from "@headlessui/react";

export default function DashBoardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <FullScreenWrapper>Loading...</FullScreenWrapper>;
  }

  if (status === "unauthenticated") {
    return <NotSignedIn />;
  }

  return (
    <div>
      <DashBoard />
    </div>
  );
}

function DashBoard() {
  const { data: session, status } = useSession();
  return (
    <Tab.Group as={"div"} className="pt-16">
      <div className="flex h-12 items-center justify-center bg-white ">
        <Tab.List className="flex w-full max-w-[14rem] justify-between font-medium">
          <Tab className="rounded ring-san-marino-200 focus:outline-none focus:ring-2">
            {({ selected }) => (
              <div
                className={`rounded px-3 py-1  ring-san-marino-200 ${
                  selected ? "bg-san-marino-100" : ""
                }`}
              >
                History
              </div>
            )}
          </Tab>
          <Tab className="rounded ring-san-marino-200 focus:outline-none focus:ring-2 ">
            {({ selected }) => (
              <div
                className={`rounded px-3 py-1 ${
                  selected ? "bg-san-marino-100" : ""
                }`}
              >
                My tests
              </div>
            )}
          </Tab>
        </Tab.List>
      </div>

      <div className=" min-h-screen w-full bg-san-marino-100">
        <Tab.Panels>
          <Tab.Panel>History</Tab.Panel>
          <Tab.Panel>My tests</Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}
