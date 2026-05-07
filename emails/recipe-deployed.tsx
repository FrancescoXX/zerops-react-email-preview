import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type Service = {
  hostname: string;
  type: string;
  subdomainUrl?: string;
};

const previewData = {
  userFirstName: "Francesco",
  recipeName: "nodejs-hello-world-small-prod",
  zeropsAppUrl: "https://app.zerops.io",
  recipeSourceUrl: "nodejs-hello-world-small-prod",
  services: [
    {
      hostname: "app",
      type: "nodejs@22",
      subdomainUrl: "https://example.zerops.app",
    },
    {
      hostname: "db",
      type: "postgresql@18",
    },
  ],
};

export default function RecipeDeployedEmail() {
  const {
    userFirstName,
    recipeName,
    services,
    zeropsAppUrl,
    recipeSourceUrl,
  } = previewData;

  const nextStepsUrl = `${zeropsAppUrl}/recipes/${recipeSourceUrl}#next-steps`;

  return (
    <Html>
      <Head />
      <Preview>Your Zerops recipe {recipeName} is live</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>Zerops</Text>
            <Text style={styles.eyebrow}>Recipe deployed</Text>

            <Heading style={styles.h1}>
              Your recipe <span style={styles.highlight}>{recipeName}</span> is
              live! 🚀
            </Heading>

            <Text style={styles.intro}>
              Hey {userFirstName}, your Zerops recipe has been successfully
              deployed and all services are up and running.
            </Text>
          </Section>

          <Section style={styles.card}>
            <Text style={styles.cardEyebrow}>Running now</Text>
            <Heading style={styles.h2}>Deployed services</Heading>

            {services.map((service) => (
              <ServiceRow key={service.hostname} service={service} />
            ))}
          </Section>

          <Section style={styles.card}>
            <Text style={styles.cardEyebrow}>Next steps</Text>
            <Heading style={styles.h2}>What’s next?</Heading>

            <Text style={styles.paragraph}>
              Your environment is ready. Now choose how you want to continue.
            </Text>

            <Section style={styles.optionCard}>
              <Text style={styles.optionNumber}>1</Text>
              <Text style={styles.optionTitle}>
                Use this recipe as a template
              </Text>
              <Text style={styles.paragraph}>
                Start from the deployed recipe, clone the template repositories,
                and use the full setup as the foundation for your project.
              </Text>
              <Text style={styles.muted}>
                Best if you want to create a new app from this recipe.
              </Text>
            </Section>

            <Section style={styles.optionCard}>
              <Text style={styles.optionNumber}>2</Text>
              <Text style={styles.optionTitle}>
                Integrate with your existing app
              </Text>
              <Text style={styles.paragraph}>
                Connect your own application or repository to the Zerops setup
                created by this recipe.
              </Text>
              <Text style={styles.muted}>
                Best if you already have an app and want to run it on Zerops.
              </Text>
            </Section>

            <Button href={nextStepsUrl} style={styles.primaryButton}>
              Choose your next step
            </Button>

            <Text style={styles.helperText}>
              The recipe guide will walk you through repository setup,
              deployment configuration, domains, and optional production
              settings.
            </Text>
          </Section>

          <Section style={styles.card}>
            <Text style={styles.cardEyebrow}>Need help</Text>
            <Heading style={styles.h2}>Looking for GitHub setup?</Heading>

            <Text style={styles.paragraph}>
              If you want to continue with your own repository, open the recipe
              guide and follow the integration path.
            </Text>

            <Text style={styles.paragraph}>
              You’ll find the steps for connecting your app, setting up
              deployments, and preparing the environment for your workflow.
            </Text>

            <Link href={nextStepsUrl} style={styles.textLink}>
              Open the recipe guide
            </Link>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            Happy building,
            <br />
            The Zerops team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <Section style={styles.serviceRow}>
      <Row>
        <Column style={styles.serviceIconColumn}>
          <Text style={styles.serviceIcon}>▦</Text>
        </Column>

        <Column>
          <Text style={styles.serviceName}>{service.hostname}</Text>
          <Text style={styles.serviceType}>{service.type}</Text>
        </Column>

        {service.subdomainUrl ? (
          <Column style={styles.serviceButtonColumn}>
            <Button href={service.subdomainUrl} style={styles.secondaryButton}>
              Open app
            </Button>
          </Column>
        ) : null}
      </Row>
    </Section>
  );
}

const styles = {
  body: {
    margin: "0",
    backgroundColor: "#eef3f1",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },

  container: {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "40px 24px",
  },

  header: {
    padding: "32px",
    borderRadius: "24px",
    backgroundColor: "#f8fbfa",
    border: "1px solid #dbe9e6",
  },

  logo: {
    margin: "0 0 32px",
    color: "#194b45",
    fontSize: "18px",
    fontWeight: "800",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#08a99a",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2.2px",
    textTransform: "uppercase" as const,
  },

  h1: {
    margin: "0",
    color: "#214f49",
    fontSize: "34px",
    lineHeight: "42px",
    fontWeight: "800",
    letterSpacing: "-0.8px",
  },

  highlight: {
    color: "#102f2b",
  },

  intro: {
    margin: "18px 0 0",
    color: "#315f58",
    fontSize: "16px",
    lineHeight: "26px",
  },

  card: {
    margin: "18px 0 0",
    padding: "28px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid #dbe9e6",
  },

  cardEyebrow: {
    margin: "0 0 8px",
    color: "#08a99a",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
  },

  h2: {
    margin: "0 0 18px",
    color: "#214f49",
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "800",
  },

  paragraph: {
    margin: "0 0 12px",
    color: "#315f58",
    fontSize: "15px",
    lineHeight: "24px",
  },

  muted: {
    margin: "0",
    color: "#789590",
    fontSize: "14px",
    lineHeight: "22px",
  },

  serviceRow: {
    margin: "0 0 12px",
    padding: "16px",
    borderRadius: "14px",
    backgroundColor: "#f3f8f7",
    border: "1px solid #dbe9e6",
  },

  serviceIconColumn: {
    width: "44px",
  },

  serviceIcon: {
    width: "32px",
    height: "32px",
    lineHeight: "32px",
    margin: "0",
    borderRadius: "9px",
    backgroundColor: "#d4efea",
    color: "#08a99a",
    fontSize: "18px",
    fontWeight: "800",
    textAlign: "center" as const,
  },

  serviceName: {
    margin: "0",
    color: "#174b45",
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "800",
  },

  serviceType: {
    margin: "3px 0 0",
    color: "#789590",
    fontSize: "14px",
    lineHeight: "20px",
    fontFamily: "monospace",
  },

  serviceButtonColumn: {
    width: "110px",
    textAlign: "right" as const,
  },

  secondaryButton: {
    padding: "9px 12px",
    borderRadius: "8px",
    backgroundColor: "#eef7f5",
    color: "#174b45",
    fontSize: "13px",
    fontWeight: "800",
    textDecoration: "none",
    border: "1px solid #bfe3dd",
  },

  optionCard: {
    margin: "16px 0 0",
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: "#f3f8f7",
    border: "1px solid #dbe9e6",
  },

  optionNumber: {
    width: "28px",
    height: "28px",
    lineHeight: "28px",
    margin: "0 0 12px",
    borderRadius: "999px",
    backgroundColor: "#08c7b4",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "900",
    textAlign: "center" as const,
  },

  optionTitle: {
    margin: "0 0 8px",
    color: "#174b45",
    fontSize: "17px",
    lineHeight: "24px",
    fontWeight: "800",
  },

  primaryButton: {
    marginTop: "22px",
    padding: "14px 22px",
    borderRadius: "10px",
    backgroundColor: "#174b45",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "900",
    letterSpacing: "1.2px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
  },

  helperText: {
    margin: "18px 0 0",
    color: "#789590",
    fontSize: "14px",
    lineHeight: "23px",
  },

  textLink: {
    color: "#08a99a",
    fontSize: "15px",
    fontWeight: "800",
    textDecoration: "underline",
  },

  hr: {
    margin: "28px 0",
    borderColor: "#dbe9e6",
  },

  footer: {
    margin: "0",
    color: "#315f58",
    fontSize: "15px",
    lineHeight: "24px",
  },
};