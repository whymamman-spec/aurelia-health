import { Link } from "react-router-dom";
import { Button, Container, Section } from "../components";

function NotFound() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-aurelia-teal">404</p>

          <h1 className="mt-3 text-4xl font-bold text-aurelia-text">
            Page not found
          </h1>

          <p className="mt-4 text-aurelia-muted">
            Sorry, we couldn't find the page you're looking for.
          </p>

          <div className="mt-8">
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default NotFound;
