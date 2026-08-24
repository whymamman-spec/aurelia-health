import {
  Button,
  Card,
  Badge,
  Input,
  Avatar,
  Container,
  Section,
} from "../components";

function ComponentShowcase() {
  return (
    <main className="min-h-screen bg-aurelia-ivory">
      <Section>
        <Container>
          <div className="mb-12">
            <Badge>Design System</Badge>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-aurelia-text sm:text-5xl">
              Aurelia Health Components
            </h1>

            <p className="mt-4 max-w-2xl text-aurelia-muted">
              A collection of reusable interface components that form the
              foundation of the Aurelia Health experience.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <h2 className="text-xl font-semibold text-aurelia-text">
                Buttons
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button>Primary</Button>

                <Button variant="secondary">Secondary</Button>

                <Button variant="coral">Coral</Button>

                <Button variant="outline">Outline</Button>

                <Button variant="ghost">Ghost</Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-aurelia-text">
                Badges
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                <Badge>Default</Badge>

                <Badge variant="success">Confirmed</Badge>

                <Badge variant="warning">Pending</Badge>

                <Badge variant="error">Cancelled</Badge>

                <Badge variant="info">Information</Badge>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-aurelia-text">
                Form Input
              </h2>

              <div className="mt-6">
                <Input
                  label="Patient name"
                  id="patient-name"
                  placeholder="Enter patient name"
                  helperText="Use the patient's legal name."
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-aurelia-text">
                Avatar
              </h2>

              <div className="mt-6 flex items-center gap-4">
                <Avatar initials="YM" size="sm" />
                <Avatar initials="AH" size="md" />
                <Avatar initials="DR" size="lg" />
                <Avatar initials="AM" size="xl" />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}

export default ComponentShowcase;
