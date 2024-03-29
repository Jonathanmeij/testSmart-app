/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LinkButton } from "components/ui";
import Box from "components/ui/Box";
import Button from "components/ui/Button";
import { Card } from "components/ui/Card";
import Container from "components/ui/Container";
import { Modal, ModalBody, ModalFooter } from "components/ui/Modal";
import Image from "next/image";
import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import arrowIcon from "../../public/images/arrow.svg";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import superjson from "superjson";
import { type difficulty } from "@prisma/client";
import { EnumToNormal } from "~/utils/EnumToNormal";

import { signIn, useSession } from "next-auth/react";

type Test = RouterOutputs["test"]["getFeatured"][0];

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  await ssg.test.getFeatured.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

function Home() {
  return (
    <>
      <header className=" h-[700px] bg-san-marino-100">
        <Container
          maxWidth="6xl"
          className="m-auto flex h-full items-center pt-16 "
        >
          <div>
            <h1 className="max-w-md text-5xl font-extrabold text-san-marino-900">
              Testing knowledge made easy
            </h1>
            <p className="mt-4 max-w-md text-lg text-san-marino-900">
              Take or create tests to test your knowledge. Sign up or get
              started without an account.
            </p>

            <div className="mt-6 flex gap-3">
              <Button color="primary" onClick={() => void signIn()} animate>
                Sign up
              </Button>
              <LinkButton color="secondary" to="/about" animate>
                Learn more
              </LinkButton>
            </div>
          </div>
        </Container>
      </header>
      <main>
        <Container maxWidth="6xl" className="m-auto my-12">
          <h2 className="mb-12  text-3xl font-semibold">Featured tests</h2>
          <div className="flex gap-6 overflow-x-scroll py-2">
            <FeaturedTests />
          </div>
        </Container>
      </main>
    </>
  );
}

export default Home;

function FeaturedTests() {
  const tests = api.test.getFeatured.useQuery();

  if (tests.isLoading) return <div>Loading...</div>;
  if (tests.isError) return <div>Error</div>;

  return (
    <div className="m-auto flex h-full gap-6 overflow-x-scroll py-2">
      {tests.data.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  test: Test;
}

interface TestCardProps {
  test: Test;
}

function TestCard({ test }: TestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className=" min-w-max " shadow={true} key={test.title}>
      <div className="relative h-52 w-80">
        <Image
          src={test.imageUrl}
          fill
          alt={test.title}
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-0 left-0 p-4">
          <DifficultyLabel difficulty={test.difficulty} />
        </div>
      </div>
      <Box className="flex items-center justify-between">
        <div className="flex  flex-col gap-1">
          <h3 className="text-xl font-medium">{test.title}</h3>
          <p className="w-min rounded bg-san-marino-100 p-1 text-sm text-san-marino-800">
            {EnumToNormal(test.category)}
          </p>
        </div>
        <Button
          rounded="full"
          padding="none"
          color="primary"
          animate
          onClick={() => setIsModalOpen(true)}
        >
          <Image src={arrowIcon} alt="arrow" />
        </Button>
      </Box>
      <StartTestModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        test={test}
      />
    </Card>
  );
}

export function DifficultyLabel({ difficulty }: { difficulty: difficulty }) {
  function backgroundColor() {
    switch (difficulty) {
      case "EASY":
        return "bg-green-600";
      case "MEDIUM":
        return "bg-yellow-600";
      case "HARD":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  }
  return (
    <div
      className={`h-min rounded px-2 py-1 text-sm text-white ${backgroundColor()}`}
    >
      {difficulty}
    </div>
  );
}

function StartTestModal({ isOpen, setIsOpen, test }: ModalProps) {
  const { data: session } = useSession();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className="relative h-32 w-full overflow-hidden rounded">
          <Image
            src={test.imageUrl}
            fill
            alt={test.title}
            style={{ objectFit: "cover" }}
          />
          <div className=" absolute h-full w-full bg-black opacity-50" />

          <Box className="absolute top-0 left-0">
            <h2 className="text-2xl font-semibold text-white">{test.title}</h2>
          </Box>
        </div>
      </div>
      <ModalBody>
        {!session && (
          <div className="mb-4 flex items-center rounded border border-san-marino-300 bg-san-marino-100 p-2 ">
            <p className="pr-4 pl-2 text-4xl font-bold text-san-marino-700">
              !
            </p>
            <p className="text text-san-marino-700">
              {"Your results won't be saved because you're not logged in."}
            </p>
          </div>
        )}
        <p className="text  text-san-marino-800">{test.fullDescription}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondaryDarker"
          onClick={() => setIsOpen(false)}
          animate
        >
          Cancel
        </Button>
        <LinkButton to={`/test/${test.id}`} color="primary" animate>
          Start test
        </LinkButton>
      </ModalFooter>
    </Modal>
  );
}
