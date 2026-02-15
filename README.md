## You like and use this theme? Then support me. Just [paypal.me/PhlowMedia](https://www.paypal.me/PhlowMedia) :)

## A Responsive Jekyll Theme: *Feeling Responsive*

Do you want to get to know *Feeling Responsive*? Have a look › <http://phlow.github.io/feeling-responsive/>.

Documentation & Features › [documentation][1].
License › https://github.com/Phlow/feeling-responsive/blob/gh-pages/LICENSE

## Why use this theme?

Feeling Responsive is heavily customizable.

1. Language-Support :)
2. Optimized for speed and it's responsive.
3. Built on Foundation Framework.
4. Six different Headers.
5. Customizable navigation, footer,...

**[More ›][3]**


 [1]: http://phlow.github.io/feeling-responsive/documentation/
 [2]: https://github.com/Phlow/feeling-responsive/blob/gh-pages/LICENSE
 [3]: http://phlow.github.io/feeling-responsive/info/
 [4]: https://www.youtube.com/watch?v=rLS-BEvlEyY
 [5]: https://github.com/TWiStErRob
 [6]: https://phlow.github.io/feeling-responsive/changelog/
 [7]: http://phlow.github.io/feeling-responsive/
 [8]: http://phlow.github.io/simplicity/


## To run web page on local ubuntu machine

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

# cd to the directory where you have the Jekyll project and run:
cd /path/to/your/jekyll/project

bundle install

# Finally, to serve the site locally, run:
bundle exec jekyll serve

# The site should then be accessible at http://localhost:4000 (or the port shown in the terminal output).
```