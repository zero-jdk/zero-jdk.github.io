# Getting Started with Zero JDK

## What is Zero JDK?

**Zero JDK** is a cross-platform JDK management tool that enables reproducible Java builds by allowing projects to define their own JDK version requirements. It eliminates the need for global JDK installations and ensures consistency across development environments, CI/CD pipelines, and team collaboration.

### The Problem Zero JDK Solves

Java developers often face these challenges:
- **Environment inconsistency**: Different team members have different JDK versions installed
- **Project switching overhead**: Manually switching between JDK versions for different projects
- **CI/CD complexity**: Setting up build environments with the correct JDK version
- **Onboarding friction**: New team members need to install and configure the right JDK version

### How Zero JDK Works

Zero JDK operates on a simple principle: **projects define their JDK requirements, and the tool ensures those requirements are met automatically**. It works by:

1. **Configuration-driven**: Projects include a `.zjdk` configuration that specifies the required JDK version
2. **Automatic downloads**: JDKs are downloaded and cached locally when needed
3. **Environment isolation**: Each project uses its specified JDK without affecting the global system
4. **Shell integration**: Optional shell extensions provide automatic environment switching

Think of it as `nvm` for Node.js, `rbenv` for Ruby, or `pyenv` for Python, but specifically designed for Java development with enterprise-grade features.

## Installation

### Quick Install (Recommended)

The fastest way to install Zero JDK is using the install script:

```bash
curl -sS https://raw.githubusercontent.com/zero-jdk/zero-jdk-cli/HEAD/install.sh | sh
```

This script will:
- Detect your platform (macOS/Linux, x64/arm64)
- Download the latest release from GitHub
- Verify the download with checksums
- Install the `zjdk` binary to `/usr/local/bin`

### Manual Installation

You can also download the binary manually from the [GitHub releases page](https://github.com/zero-jdk/zero-jdk-cli/releases):

1. Download the appropriate archive for your platform:
   - `zjdk-VERSION-macos-x64.tar.gz` (macOS Intel)
   - `zjdk-VERSION-macos-arm64.tar.gz` (macOS Apple Silicon)
   - `zjdk-VERSION-linux-x64.tar.gz` (Linux x64)
   - `zjdk-VERSION-linux-arm64.tar.gz` (Linux ARM64)

2. Extract the archive:
   ```bash
   tar -xzf zjdk-VERSION-PLATFORM.tar.gz
   ```

3. Move the binary to your PATH:
   ```bash
   sudo mv zjdk /usr/local/bin/
   sudo chmod +x /usr/local/bin/zjdk
   ```

### Homebrew (Coming Soon)

Homebrew support is planned for a future release.

### Verify Installation

After installation, verify that Zero JDK is working:

```bash
zjdk --version
```

## Getting Started

### Initialize a New Project (Recommended Workflow)

To set up Zero JDK for a new project, the recommended approach is to create both the configuration and wrapper:

```bash
# Navigate to your project directory
cd my-java-project

# Initialize with the latest LTS JDK
zjdk init

# Or initialize with a specific version
zjdk init --version temurin-17.0.2

# Create the wrapper script (recommended!)
zjdk wrapper

# Commit both configuration and wrapper to version control
git add .zjdk/ zjdkw
git commit -m "Add Zero JDK configuration and wrapper"
```

This creates:
- A `.zjdk` directory with the configuration file
- A `zjdkw` wrapper script that can bootstrap Zero JDK automatically

**Why use the wrapper?** The wrapper allows anyone to clone your project and run `./zjdkw sync` without needing to install Zero JDK globally first. This is especially valuable for CI/CD environments and team collaboration.

### Initialize Globally

You can also set up a global configuration that applies to all directories unless overridden locally:

```bash
zjdk init --global
```

### Working with Existing Projects

When you clone a project that already uses Zero JDK with a wrapper (recommended):

```bash
# Clone the repository
git clone https://github.com/example/java-project.git
cd java-project

# Use the wrapper to sync (no zjdk installation required!)
./zjdkw sync
```

The wrapper automatically bootstraps Zero JDK if needed, then reads the project's `.zjdk` configuration and ensures the specified JDK version is available.

**Alternative (if no wrapper is available):** If the project doesn't have a wrapper, you'll need to install Zero JDK first and then run `zjdk sync`.

## Common Workflows

### Check Current Configuration

To see information about the currently configured JDK:

```bash
zjdk info
```

This displays metadata about the JDK version, including version number, vendor, and support type (LTS/non-LTS).

### Change JDK Version

To update the JDK version for your project:

```bash
zjdk set version temurin-21.0.1
```

This updates the configuration and downloads the new JDK if needed.

### List Available JDKs

To see what JDK versions are available for your platform:

```bash
zjdk list available
```

To see what JDKs are already installed locally:

```bash
zjdk list installed
```

### Environment Setup

To get the environment variables for the current JDK:

```bash
zjdk env
```

This outputs the `JAVA_HOME` and `PATH` settings you can use in scripts or CI/CD.

### Shell Integration

Zero JDK can integrate with your shell to automatically set up the environment when you enter a directory:

```bash
# For Zsh
zjdk shell install zsh

# For Bash
zjdk shell install bash
```

After installation, restart your shell or source your profile. Now when you `cd` into a Zero JDK managed directory, the environment will be set up automatically.

### Zero JDK Wrapper (Recommended)

Zero JDK can generate wrapper scripts similar to Maven Wrapper or Gradle Wrapper - this is the **recommended approach** for team projects:

```bash
zjdk wrapper
```

This creates a `zjdkw` wrapper script that:
- **Bootstraps Zero JDK automatically** if not installed
- **Ensures the correct JDK** is used for your project
- **Eliminates installation requirements** for team members and CI/CD
- **Works identically to zjdk** but with automatic setup

**Usage examples:**
```bash
./zjdkw sync     # Same as 'zjdk sync' but auto-bootstraps
./zjdkw info     # Same as 'zjdk info' but auto-bootstraps
./zjdkw env      # Same as 'zjdk env' but auto-bootstraps
```

Always commit the wrapper to version control: `git add zjdkw`

### Update Catalog

To update the catalog of available JDK versions:

```bash
zjdk update
```

This refreshes the local catalog with the latest JDK releases from Foojay.

## Typical Use Cases

### Team Development

**Scenario**: A team working on a Java project wants to ensure everyone uses the same JDK version.

```bash
# Team lead initializes the project with wrapper (recommended)
zjdk init --version temurin-17.0.2
zjdk wrapper
git add .zjdk/ zjdkw
git commit -m "Add Zero JDK configuration and wrapper"

# Team members clone and sync (no zjdk installation required!)
git clone https://github.com/team/project.git
cd project
./zjdkw sync
```

### Multi-Project Development

**Scenario**: A developer working on multiple projects with different JDK requirements.

```bash
# Project A uses Liberica 11
cd project-a
zjdk init --version liberica-11

# Project B uses Temurin 17
cd ../project-b
zjdk init --version temurin-17.0.8

# Project C uses GraalVM 21
cd ../project-c
zjdk init --version graalvm_community-21.0.2

# With shell integration, the environment switches automatically
```

### CI/CD Pipeline

**Scenario**: Setting up a CI/CD pipeline that uses the project's specified JDK.

```yaml
# GitHub Actions example
- name: Setup project JDK
  run: ./zjdkw sync

- name: Setup JDK Environment
  run: ./zjdkw env | sed 's/^export //' >> "$GITHUB_ENV"

- name: Build project
  run: ./mvnw clean package
```

## Configuration

Zero JDK stores its configuration in a `.zjdk` directory within your project (or globally in `~/.zjdk`). The configuration includes:

- **JDK version specification**: The exact version required
- **Platform-specific settings**: Optimizations for your operating system
- **Catalog cache**: Local cache of available JDK versions

You typically don't need to edit these files manually, as the CLI commands handle configuration management for you.

### Configuration Precedence

Zero JDK follows a configuration hierarchy:

1. **Local configuration** (`.zjdk` in current directory) - highest priority
2. **Global configuration** (`~/.zjdk`) - fallback when no local config exists

This allows you to have a global default JDK while overriding it on a per-project basis.

## Troubleshooting

### Common Issues

**"Already initialized" error**
- Use `zjdk set version <VERSION>` to change the JDK version instead of `zjdk init`
- Or remove the `.zjdk` directory and run `zjdk init` again

**Download failures**
- Check your internet connection
- Try updating the catalog: `zjdk update`
- Verify the JDK version exists: `zjdk list available`

**Permission errors during installation**
- The install script may need sudo access to write to `/usr/local/bin`
- Ensure you have the necessary permissions or run with appropriate privileges

### Getting Help

For additional help:
- Run `zjdk help` for general usage
- Run `zjdk help <command>` for command-specific help
- Check the [GitHub repository](https://github.com/zero-jdk/zero-jdk-cli) for issues and discussions

## Next Steps

Now that you have Zero JDK set up, you might want to:

1. **Set up shell integration** for automatic environment switching
2. **Configure your IDE** to use Zero JDK managed JDKs (IntelliJ plugin coming soon)
3. **Update your CI/CD pipelines** to use Zero JDK for consistent builds (GitHub Action coming soon)
4. **Share the configuration** with your team by committing the `.zjdk` directory
