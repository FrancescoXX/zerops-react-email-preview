import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
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
  discordUrl: "https://discord.gg/zeropsio",
  buildPipelineDocsUrl: "https://docs.zerops.io/features/pipeline",
  publicAccessDocsUrl: "https://docs.zerops.io/features/access",
  logsDocsUrl: "https://docs.zerops.io/guides/logging",
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
    {
      hostname: "redis",
      type: "valkey@7.2",
    },
    {
      hostname: "queue",
      type: "nodejs@22",
    },
    {
      hostname: "scheduler",
      type: "nodejs@22",
    },
  ],
};

export default function RecipeDeployedEmail() {
  const {
    userFirstName,
    recipeName,
    services,
    zeropsAppUrl,
    discordUrl,
    buildPipelineDocsUrl,
    publicAccessDocsUrl,
    logsDocsUrl,
  } = previewData;

  const recipesUrl = `${zeropsAppUrl}/recipes`;
  const templateGuideUrl = recipesUrl;
  const integrationGuideUrl = recipesUrl;

  const serviceRows = chunkServices(services, 2);

  return (
    <Html>
      <Head>
        <style>{`
          @media only screen and (max-width: 480px) {
            .container {
              width: 100% !important;
              max-width: 100% !important;
              padding: 40px 20px !important;
              box-sizing: border-box !important;
            }

            .hero-title {
              font-size: 25px !important;
              line-height: 32px !important;
            }

            .desktop-column {
              display: block !important;
              width: 100% !important;
              max-width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              box-sizing: border-box !important;
            }

            .option-card {
              height: auto !important;
              margin-bottom: 14px !important;
              box-sizing: border-box !important;
            }

            .option-title {
              height: auto !important;
            }

            .option-body {
              height: auto !important;
            }

            .service-card {
              height: auto !important;
              margin-bottom: 10px !important;
              box-sizing: border-box !important;
            }

            .button {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }
          }
        `}</style>
      </Head>

      <Preview>
        Your Zerops recipe is live. Open the guide and choose your next step.
      </Preview>

      <Body style={styles.body}>
        <Container className="container" style={styles.container}>
          <Section style={styles.logoSection}>
            <Link href="https://zerops.io" style={styles.logoLink}>
              <Img
                src="/static/zerops-logo.svg"
                width="22"
                height="22"
                alt="Zerops"
                style={styles.logoIcon}
              />
            </Link>
          </Section>

          <Section style={styles.heroSection}>
            <Heading className="hero-title" style={styles.h1}>
              Your recipe{" "}
              <span style={styles.highlight}>{recipeName}</span> is live!
            </Heading>

            <Text style={styles.intro}>
              Hey {userFirstName}, your Zerops recipe has finished deploying and
              your services are now running.
            </Text>
          </Section>

          <Section style={styles.section}>
            <Heading style={styles.h2}>What’s next?</Heading>

            <Text style={styles.paragraph}>
              Choose how you want to continue. The guide will help you pick the
              right next step.
            </Text>

            <Row>
              <Column className="desktop-column" style={styles.optionColumnLeft}>
                <Section className="option-card" style={styles.optionCard}>
                  <Text style={styles.optionLabel}>A</Text>

                  <Text className="option-title" style={styles.optionTitle}>
                    Use this recipe as a template
                  </Text>

                  <Text className="option-body" style={styles.optionBodyFixed}>
                    Start from the deployed setup, clone the template
                    repositories, and use this recipe as the foundation for your
                    own project.
                  </Text>

                  <Button
                    className="button"
                    href={templateGuideUrl}
                    style={styles.optionButton}
                  >
                    View template guide
                  </Button>

                  <Text style={styles.optionHelper}>
                    Best if you want to start from this recipe.
                  </Text>
                </Section>
              </Column>

              <Column className="desktop-column" style={styles.optionColumnRight}>
                <Section className="option-card" style={styles.optionCard}>
                  <Text style={styles.optionLabel}>B</Text>

                  <Text className="option-title" style={styles.optionTitle}>
                    Integrate your existing app
                  </Text>

                  <Text className="option-body" style={styles.optionBodyFixed}>
                    Connect your own application or repository to the
                    infrastructure created by this recipe.
                  </Text>

                  <Button
                    className="button"
                    href={integrationGuideUrl}
                    style={styles.optionButton}
                  >
                    View integration guide
                  </Button>

                  <Text style={styles.optionHelper}>
                    Best if you already have an app and want to run it on Zerops.
                  </Text>
                </Section>
              </Column>
            </Row>
          </Section>

          <Section style={styles.section}>
            <Heading style={styles.h2}>Deployed services</Heading>

            {serviceRows.map((row, rowIndex) => (
              <Row key={`service-row-${rowIndex}`}>
                {row.map((service, serviceIndex) => (
                  <Column
                    key={service.hostname}
                    className="desktop-column"
                    style={
                      serviceIndex === 0
                        ? styles.serviceColumnLeft
                        : styles.serviceColumnRight
                    }
                  >
                    <ServiceCard service={service} />
                  </Column>
                ))}
              </Row>
            ))}
          </Section>

          <Section style={styles.section}>
            <Heading style={styles.h2}>Need help?</Heading>

            <Section style={styles.faqCard}>
              <Text style={styles.faqTitle}>
                Not sure which path to choose?
              </Text>

              <Text style={styles.faqBody}>
                If you want to build from the deployed setup, start with the
                template path. If you already have an app, follow the integration
                path.
              </Text>

              <Link href={recipesUrl} style={styles.textLink}>
                Open recipes ↗
              </Link>
            </Section>

            <Section style={styles.faqCard}>
              <Text style={styles.faqTitle}>
                Looking for deploys, public access, or logs?
              </Text>

              <Text style={styles.faqBody}>
                Check the Zerops docs for build and deploy pipelines, public
                access, and runtime logs.
              </Text>

              <Link href={buildPipelineDocsUrl} style={styles.textLink}>
                Build & deploy ↗
              </Link>

              <Text style={styles.inlineSeparator}> · </Text>

              <Link href={publicAccessDocsUrl} style={styles.textLink}>
                Public access ↗
              </Link>

              <Text style={styles.inlineSeparator}> · </Text>

              <Link href={logsDocsUrl} style={styles.textLink}>
                Logs ↗
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

function ServiceCard({ service }: { service: Service }) {
  return (
    <Section className="service-card" style={styles.serviceCard}>
      <Text style={styles.serviceName}>{service.hostname}</Text>
      <Text style={styles.serviceType}>{service.type}</Text>

      {service.subdomainUrl ? (
        <Link href={service.subdomainUrl} style={styles.serviceLink}>
          Open app
        </Link>
      ) : null}
    </Section>
  );
}

function chunkServices(services: Service[], size: number) {
  const rows: Service[][] = [];

  for (let index = 0; index < services.length; index += size) {
    rows.push(services.slice(index, index + size));
  }

  return rows;
}

const styles = {
  body: {
    margin: "0",
    backgroundColor: "#eeeeee",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: "580px",
    margin: "0 auto",
    padding: "56px 28px 44px",
    boxSizing: "border-box" as const,
  },

  logoSection: {
    width: "100%",
    margin: "0 0 52px",
    textAlign: "center" as const,
  },

  logoLink: {
    display: "block",
    width: "100%",
    textAlign: "center" as const,
    textDecoration: "none",
  },

  logoIcon: {
    display: "block",
    margin: "0 auto",
  },

  heroSection: {
    margin: "0 0 42px",
  },

  h1: {
    margin: "0",
    color: "#164742",
    fontSize: "30px",
    lineHeight: "39px",
    fontWeight: "600",
    letterSpacing: "-0.5px",
  },

  highlight: {
    color: "#00c7b7",
    fontWeight: "800",
  },

  intro: {
    margin: "18px 0 0",
    color: "#164742",
    fontSize: "14px",
    lineHeight: "22px",
  },

  section: {
    margin: "0 0 46px",
  },

  h2: {
    margin: "0 0 14px",
    color: "#164742",
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: "700",
  },

  paragraph: {
    margin: "0 0 22px",
    color: "#315f58",
    fontSize: "14px",
    lineHeight: "22px",
  },

  optionColumnLeft: {
    width: "50%",
    paddingRight: "8px",
    verticalAlign: "top" as const,
    boxSizing: "border-box" as const,
  },

  optionColumnRight: {
    width: "50%",
    paddingLeft: "8px",
    verticalAlign: "top" as const,
    boxSizing: "border-box" as const,
  },

  optionCard: {
    height: "270px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    verticalAlign: "top" as const,
    boxSizing: "border-box" as const,
  },

  optionLabel: {
    margin: "0 0 10px",
    color: "#00c7b7",
    fontSize: "22px",
    lineHeight: "26px",
    fontWeight: "900",
    textAlign: "right" as const,
  },

  optionTitle: {
    height: "42px",
    margin: "0 0 12px",
    color: "#164742",
    fontSize: "15px",
    lineHeight: "21px",
    fontWeight: "800",
  },

  optionBodyFixed: {
    height: "88px",
    margin: "0 0 18px",
    color: "#315f58",
    fontSize: "12px",
    lineHeight: "18px",
  },

  optionButton: {
    width: "100%",
    padding: "12px 0",
    borderRadius: "5px",
    backgroundColor: "#00c7b7",
    color: "#ffffff",
    fontSize: "10px",
    lineHeight: "16px",
    fontWeight: "900",
    letterSpacing: "0.8px",
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

  serviceColumnLeft: {
    width: "50%",
    paddingRight: "6px",
    paddingBottom: "12px",
    verticalAlign: "top" as const,
    boxSizing: "border-box" as const,
  },

  serviceColumnRight: {
    width: "50%",
    paddingLeft: "6px",
    paddingBottom: "12px",
    verticalAlign: "top" as const,
    boxSizing: "border-box" as const,
  },

  serviceCard: {
    height: "78px",
    padding: "14px 16px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxSizing: "border-box" as const,
  },

  serviceName: {
    margin: "0",
    color: "#164742",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "800",
  },

  serviceType: {
    margin: "2px 0 8px",
    color: "#789590",
    fontSize: "12px",
    lineHeight: "18px",
    fontFamily: "monospace",
  },

  serviceLink: {
    color: "#00a99a",
    fontSize: "10px",
    lineHeight: "15px",
    fontWeight: "900",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
  },

  faqCard: {
    margin: "0 0 12px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxSizing: "border-box" as const,
  },

  faqTitle: {
    margin: "0 0 8px",
    color: "#164742",
    fontSize: "15px",
    lineHeight: "21px",
    fontWeight: "800",
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
    fontWeight: "900",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    textDecoration: "none",
  },

  inlineSeparator: {
    display: "inline",
    margin: "0",
    color: "#789590",
    fontSize: "11px",
    lineHeight: "16px",
  },

  discordSection: {
    margin: "48px 0 42px",
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
    fontWeight: "800",
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