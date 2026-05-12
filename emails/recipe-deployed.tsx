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
  discordUrl: "https://discord.gg/zerops",
  services: [
    {
      hostname: "app",
      type: "nodejs@22",
      subdomainUrl: "https://example.zerops.app",
    },
    {
      hostname: "worker",
      type: "nodejs@22",
      subdomainUrl: "https://example-worker.zerops.app",
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
    discordUrl,
  } = previewData;

  const recipeDetailUrl = `${zeropsAppUrl}/recipes/${recipeSourceUrl}`;
  const guideUrl = `${recipeDetailUrl}#next-steps`;
  const templateUrl = `${recipeDetailUrl}?path=template`;
  const integrateUrl = `${recipeDetailUrl}?path=integrate`;

  return (
    <Html>
      <Head />
      <Preview>
        Your services are running. Choose whether to use the recipe as a template
        or integrate your existing app.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.logo}>zerops</Text>

            <Heading style={styles.h1}>
              Your recipe{" "}
              <span style={styles.highlight}>{recipeName}</span> is live!
            </Heading>

            <Text style={styles.intro}>
              Hey {userFirstName}, your Zerops recipe has finished deploying and
              your services are now running.
            </Text>
          </Section>

          <Section style={styles.section}>
            <Heading style={styles.h2}>Deployed services</Heading>

            {services.map((service) => (
              <ServiceRow key={service.hostname} service={service} />
            ))}
          </Section>

          <Section style={styles.section}>
            <Heading style={styles.h2}>What’s next?</Heading>

            <Text style={styles.paragraph}>
              Your environment is ready. Choose how you want to continue.
            </Text>

            <Row>
              <Column style={styles.optionColumnLeft}>
                <Section style={styles.optionCard}>
                  <Text style={styles.optionLabel}>A</Text>

                  <Text style={styles.optionTitle}>
                    Use this recipe as a template
                  </Text>

                  <Text style={styles.optionBodyFixed}>
                    Start from the deployed setup, clone the template
                    repositories, and use this recipe as the foundation for your
                    own project.
                  </Text>

                  <Button href={templateUrl} style={styles.optionButton}>
                    Use as template
                  </Button>

                  <Text style={styles.optionHelper}>
                    Best if you want to start from this recipe.
                  </Text>
                </Section>
              </Column>

              <Column style={styles.optionColumnRight}>
                <Section style={styles.optionCard}>
                  <Text style={styles.optionLabel}>B</Text>

                  <Text style={styles.optionTitle}>
                    Integrate your existing app
                  </Text>

                  <Text style={styles.optionBodyFixed}>
                    Connect your own application or repository to the
                    infrastructure created by this recipe.
                  </Text>

                  <Button href={integrateUrl} style={styles.optionButton}>
                    Integrate app
                  </Button>

                  <Text style={styles.optionHelper}>
                    Best if you already have an app and want to run it on Zerops.
                  </Text>
                </Section>
              </Column>
            </Row>
          </Section>

          <Section style={styles.section}>
            <Heading style={styles.h2}>Need help?</Heading>

            <Section style={styles.faqCard}>
              <Text style={styles.faqTitle}>
                How do I connect my repository?
              </Text>

              <Text style={styles.faqBody}>
                Follow the guide for this recipe. It will walk you through the
                next steps for your selected environment.
              </Text>

              <Link href={guideUrl} style={styles.textLink}>
                Open guide ↗
              </Link>
            </Section>

            <Section style={styles.faqCard}>
              <Text style={styles.faqTitle}>
                Where do I manage domains, deploys, and services?
              </Text>

              <Text style={styles.faqBody}>
                Open the recipe detail in Zerops to manage services,
                deployments, environment variables, domains, and runtime
                settings.
              </Text>

              <Link href={recipeDetailUrl} style={styles.textLink}>
                Open recipe detail ↗
              </Link>
            </Section>
          </Section>

          <Section style={styles.discordSection}>
            <Text style={styles.discordText}>
              Need something else?
              <br />
              Join{" "}
              <Link href={discordUrl} style={styles.discordLink}>
                Zerops Discord
              </Link>{" "}
              and we’ll help you out.
            </Text>
          </Section>

          <Section style={styles.socialSection}>
            <Link href="https://github.com/zeropsio" style={styles.socialLink}>
              GitHub
            </Link>

            <Link href="https://x.com/zeropsio" style={styles.socialLink}>
              X
            </Link>

            <Link
              href="https://www.linkedin.com/company/zeropsio"
              style={styles.socialLink}
            >
              LinkedIn
            </Link>
          </Section>

          <Hr style={styles.hr} />

          <Text style={styles.footer}>
            © 2026 Zerops
            <br />
            zerops.io
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
    backgroundColor: "#eeeeee",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },

  container: {
    maxWidth: "560px",
    margin: "0 auto",
    padding: "44px 24px",
  },

  header: {
    padding: "24px 0 40px",
  },

  logo: {
    margin: "0 0 56px",
    color: "#00c7b7",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "800",
  },

  h1: {
    margin: "0",
    color: "#164742",
    fontSize: "30px",
    lineHeight: "39px",
    fontWeight: "500",
    letterSpacing: "-0.4px",
  },

  highlight: {
    color: "#00c7b7",
    fontWeight: "700",
  },

  intro: {
    margin: "18px 0 0",
    color: "#164742",
    fontSize: "14px",
    lineHeight: "22px",
  },

  section: {
    margin: "0 0 44px",
  },

  h2: {
    margin: "0 0 16px",
    color: "#164742",
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: "500",
  },

  paragraph: {
    margin: "0 0 20px",
    color: "#315f58",
    fontSize: "14px",
    lineHeight: "22px",
  },

  serviceRow: {
    margin: "0 0 10px",
    padding: "14px 16px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },

  serviceName: {
    margin: "0",
    color: "#164742",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "700",
  },

  serviceType: {
    margin: "2px 0 0",
    color: "#789590",
    fontSize: "12px",
    lineHeight: "18px",
    fontFamily: "monospace",
  },

  serviceButtonColumn: {
    width: "110px",
    textAlign: "right" as const,
  },

  secondaryButton: {
    padding: "8px 10px",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#00a99a",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
  },

  optionColumnLeft: {
    width: "50%",
    paddingRight: "8px",
    verticalAlign: "top" as const,
  },

  optionColumnRight: {
    width: "50%",
    paddingLeft: "8px",
    verticalAlign: "top" as const,
  },

  optionCard: {
    height: "260px",
    padding: "18px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    verticalAlign: "top" as const,
  },

  optionLabel: {
    margin: "0 0 8px",
    color: "#00c7b7",
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: "800",
    textAlign: "right" as const,
  },

  optionTitle: {
    height: "42px",
    margin: "0 0 10px",
    color: "#164742",
    fontSize: "15px",
    lineHeight: "21px",
    fontWeight: "700",
  },

  optionBodyFixed: {
    height: "90px",
    margin: "0 0 18px",
    color: "#315f58",
    fontSize: "12px",
    lineHeight: "18px",
  },

  optionButton: {
    width: "100%",
    padding: "11px 0",
    borderRadius: "4px",
    backgroundColor: "#00c7b7",
    color: "#ffffff",
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
    textDecoration: "none",
  },

  optionHelper: {
    margin: "10px 0 0",
    color: "#789590",
    fontSize: "10px",
    lineHeight: "15px",
  },

  faqCard: {
    margin: "0 0 12px",
    padding: "18px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },

  faqTitle: {
    margin: "0 0 8px",
    color: "#164742",
    fontSize: "15px",
    lineHeight: "21px",
    fontWeight: "700",
  },

  faqBody: {
    margin: "0 0 12px",
    color: "#315f58",
    fontSize: "12px",
    lineHeight: "19px",
  },

  textLink: {
    color: "#00a99a",
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
  },

  discordSection: {
    margin: "44px 0",
    textAlign: "center" as const,
  },

  discordText: {
    margin: "0",
    color: "#164742",
    fontSize: "15px",
    lineHeight: "23px",
  },

  discordLink: {
    color: "#00a99a",
    fontWeight: "700",
    textDecoration: "underline",
  },

  socialSection: {
    margin: "0 0 18px",
  },

  socialLink: {
    marginRight: "24px",
    color: "#164742",
    fontSize: "12px",
    lineHeight: "18px",
    textDecoration: "none",
  },

  hr: {
    margin: "20px 0 18px",
    borderColor: "#c8d8d5",
  },

  footer: {
    margin: "0",
    color: "#789590",
    fontSize: "11px",
    lineHeight: "17px",
  },
};