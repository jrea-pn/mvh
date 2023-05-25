// Components
import { Container } from "./";

const Heading = ({ page }) => {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        {page.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm text-gray-700">{page.intro}</p>
    </Container>
  );
};

export default Heading;
