/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LinkButton } from "components/ui";
import Box from "components/ui/Box";
import Button from "components/ui/Button";
import { Card } from "components/ui/Card";
import Container from "components/ui/Container";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "components/ui/Modal";
import Image from "next/image";
import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import arrowIcon from "../../public/images/arrow.svg";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import superjson from "superjson";
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
          <div className="flex h-full gap-6 overflow-x-scroll py-2">
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

  console.log(tests.data);

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
    <Card className=" min-w-max" shadow="shadow" key={test.title}>
      <Image src={test.imageUrl} width={300} height={300} alt={test.title} />
      <Box className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium">{test.title}</h3>
          <p className="text-sm text-san-marino-800">{test.description}</p>
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

function StartTestModal({ isOpen, setIsOpen, test }: ModalProps) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <h2 className="text-2xl font-semibold text-san-marino-900">
          {test.title}
        </h2>
      </ModalHeader>
      <ModalBody>
        <p className="text-sm text-san-marino-800">{test.fullDescription}</p>
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
