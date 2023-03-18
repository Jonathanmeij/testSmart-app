/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import NotSignedIn, { FullScreenWrapper } from "../NotSignedIn";
import { Disclosure, Tab } from "@headlessui/react";
import Container from "components/ui/Container";
import { Card } from "components/ui/Card";
import { api, type RouterOutputs } from "~/utils/api";
import { useState } from "react";
import Box from "components/ui/Box";
import { DifficultyLabel } from "..";
import Image from "next/image";
import arrow2 from "../../../public/images/arrow2.svg";

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
          <Tab.Panel>
            <History />
          </Tab.Panel>
          <Tab.Panel>My tests</Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}

type TestHistory = RouterOutputs["user"]["getHistory"];

function History() {
  const [tests, setTests] = useState<TestHistory | null>(null);

  const { data: session, status } = useSession();

  const { data: testsData, refetch: refetchTestsData } =
    api.user.getHistory.useQuery(undefined, {
      enabled: session?.user !== undefined,
      onSuccess: (testData) => {
        setTests(testData);
      },
    });

  const distinctTests = tests?.filter(
    (v, i, a) => a.findIndex((t) => t.testId === v.testId) === i
  );

  console.log(distinctTests);

  return (
    <Container className="m-auto flex flex-col gap-6 py-6">
      <div>
        <h2 className="text-3xl font-semibold">History</h2>
        <p className="">Here you can see your test history</p>
      </div>
      <div className="flex flex-col gap-3">
        {distinctTests?.map((testHistory) => (
          <TestCard key={testHistory.id} testHistory={testHistory} />
        ))}
      </div>
    </Container>
  );
}

interface TestCardProps {
  testHistory: TestHistory[0];
}

function TestCard({ testHistory }: TestCardProps) {
  const test = testHistory.test;

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <Card
            shadow="shadow"
            className={`${open ? "rouned-t" : "rounded"}`}
            rounded="none"
          >
            <Disclosure.Button className="w-full">
              <Box className="flex justify-between">
                <div className="flex gap-3">
                  <DifficultyLabel difficulty={test.difficulty} />
                  <h3 className="text-lg font-semibold">{test.title}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <p>tries: </p>
                  <Image
                    className={`rotate-90 ${open ? "-rotate-90" : ""}`}
                    src={arrow2}
                    alt="V"
                  />
                </div>
              </Box>
            </Disclosure.Button>
          </Card>
          <Disclosure.Panel className="bg-san-marino-50 shadow-md ">
            <Box>
              Yes! You can purchase a license that you can share with your
              entire team.
            </Box>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
