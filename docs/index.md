---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Zero JDK"
  tagline: Reproducible builds by default
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/zero-jdk

features:
  - title: Reproducible builds
    details: Projects define their own JDK version, ensuring consistency across development, testing, and production environments
    icon: 🔁
  - title: Extensive JDK catalog
    details: Access to hundreds of JDK versions from major vendors (Temurin, Oracle, GraalVM, etc.) powered by Foojay
    icon: 📚
  - title: Automatic environment switching
    details: Optional shell integration automatically sets up the correct JDK when you enter a project directory
    icon: 🔄
  - title: Cross-platform support
    details: Works seamlessly on macOS and Linux (x64 and ARM64 architectures)
    icon: 🖥️
---

## Get Started Now!

Paste and run the following in your terminal:

```sh
curl -sS https://raw.githubusercontent.com/zero-jdk/zero-jdk-cli/HEAD/install.sh | sh
```

## See It In Action

### Local Development

```bash
# Initialize your project with a specific JDK version
$ zjdk init --version temurin-17.0.8
# Create the zjdk wrapper script - think of gradlew, mvnw
$ zjdk wrapper

# Commit both configuration and wrapper to version control
$ git add .zjdk/ zjdkw
$ git commit -m "Add Zero JDK configuration and wrapper"

# Clone project and use the wrapper
$ git clone https://github.com/example/java-project.git
$ cd java-project
$ ./zjdkw sync  # Downloads and sets up the project's required JDK

# Check what's configured using the wrapper
$ ./zjdkw info
Version:       21.0.7 (21 - 21.0.7+6)
Identifier(s): temurin-21.0.7
Support:       LTS
Link:          https://adoptium.net/temurin/releases

# Perfect for CI/CD - no global zjdk installation needed
$ ./zjdkw env  # Prints shell commands to set up environment variables
```

### CI / CD Pipelines

```bash
# Inside your CI/CD script:
$ ./zjdkw sync
$ eval "$(./zjdkw env)"

# Now build with your preferred build tool, e.g. maven
$ ./mvnw clean verify
```
