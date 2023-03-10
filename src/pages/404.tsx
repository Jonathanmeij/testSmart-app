import Container from "components/ui/Container";
import { Divider } from "components/ui";

export default function Custom404() {
  return (
    <div>
      <Container className="m-auto flex h-screen w-80 flex-col items-center justify-center gap-2 pt-16">
        <h1 className=" text-4xl font-bold">404</h1>
        <Divider />
        <p> This page could not be found.</p>
      </Container>
    </div>
  );
}
