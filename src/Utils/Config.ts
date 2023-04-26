// configuration for develepment and production environments
// General
class Config {}

// Development Environment
class DevelopmentConfig extends Config {
  loginUrl = "http://localhost:8080/login";
}

// Production Environment
class ProductionConfig extends Config {
  loginUrl = "http://localhost:8080/login";
}

const appConfig =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default appConfig;
