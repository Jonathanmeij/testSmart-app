/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Container from "components/ui/Container";
import { LinkButton } from "components/ui";
import { Card } from "components/ui/Card";
import Box from "components/ui/Box";
import Button from "components/ui/Button";
import arrowIcon from "../../public/images/arrow.svg";

const fakeCards = [
  {
    title: "HTML basics",
    description: "Learn the basics of HTML",
    image: "https://source.unsplash.com/random/400x400/?webdeveloper",
  },
  {
    title: "CSS basics",
    description: "Learn the basics of CSS",
    image: "https://source.unsplash.com/random/400x400/?webdeveloper",
  },
  {
    title: "JavaScript basics",
    description: "Learn the basics of JavaScript",
    image: "https://source.unsplash.com/random/400x400/?webdeveloper",
  },
  {
    title: "React basics",
    description: "Learn the basics of React",
    image: "https://source.unsplash.com/random/400x400/?webdeveloper",
  },
];

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <header className=" h-[800px] bg-san-marino-100">
        <Container
          maxWidth="6xl"
          className="m-auto flex h-full items-center pt-16"
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
              <LinkButton color="primary" to="/sign-up">
                Sign up
              </LinkButton>
              <LinkButton color="secondary" to="/about">
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
            {fakeCards.map((card) => (
              <Card className=" min-w-max" shadow="shadow" key={card.title}>
                <Image
                  src={card.image}
                  width={300}
                  height={300}
                  alt={card.title}
                />
                <Box className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">{card.title}</h3>
                  <Button rounded="full" padding="none" color="primary">
                    <Image src={arrowIcon} alt="arrow" />
                  </Button>
                </Box>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
};

export default Home;
