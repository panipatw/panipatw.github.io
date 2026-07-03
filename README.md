# panipatw.github.io

Personal portfolio site built with [Jekyll](https://jekyllrb.com/) on the [Feeling Responsive](https://github.com/Phlow/feeling-responsive) theme (MIT licensed, see [LICENSE](LICENSE)).

## Local development

### Ubuntu setup

```bash
# Update and upgrade system packages
sudo apt update && sudo apt upgrade -y

# Install Ruby
sudo apt install ruby-full build-essential zlib1g-dev -y

# Check ruby version
ruby -v

# By default, Ruby tries to install gems into system folders, which requires sudo and causes headaches.
# We want to tell Ruby to install them to a folder in your home directory instead.
# Run these commands to update your .bashrc:
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install bundler
gem install bundler
```

### Running the site

```bash
# Install dependencies (first time)
bundle install

# Serve locally with dev overrides (uses localhost URLs instead of production)
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# Build for production
bundle exec jekyll build
```

The site should then be accessible at `http://localhost:4000` (or the port shown in the terminal output).

## Deployment

The `dev` branch is used for local development. Merging `dev` into `gh-pages` triggers a GitHub Actions workflow that builds and deploys the site to GitHub Pages.
