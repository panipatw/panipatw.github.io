---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
header:
  image_fullwidth: header_unsplash_12.jpg
widget1:
  title: "About Me"
  url: '/info/'
  text: 'Machine learning engineer with a passion for biomechanics research and building intelligent systems. Learn about my background and experience.'
widget2:
  title: "ML Projects"
  url: '/projects/'
  text: 'Hands-on machine learning projects covering model development, data analysis, and deployment.'
widget3:
  title: "Blog"
  url: '/blog/'
  text: 'Thoughts, notes, and write-ups on machine learning, research, and things I find interesting.'
#
# Use the call for action to show a button on the frontpage
#
# To make internal links, just use a permalink like this
# url: /getting-started/
#
# To style the button in different colors, use no value
# to use the main color or success, alert or secondary.
# To change colors see sass/_01_settings_colors.scss
#
callforaction:
  url: /contact/
  text: Get in touch ›
  style: alert
permalink: /index.html
#
# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

