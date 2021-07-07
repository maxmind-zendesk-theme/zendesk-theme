# Festivus

Welcome, newcomers. The tradition of Festivus begins with the airing of
grievances. I got a lot of problems with this codebase! And now you're gonna
hear about it!

## The Airing of Grievances

* Zendesk's templating language isn't Handlebars – it's [Curlybars](https://developer.zendesk.com/documentation/help_center/help-center-templates/introduction/)!

  * Curlybars has limited control structures. There is no support for `switch`
  or `elseif` statements.

  * It is hard to tell where you are! You'll need to get creative when creating
  page-based CSS selectors. Pages don't have any sort of slug exposed as a
  Curlybar variable. To get around this, we are having to use the page name
  in a data attribute, and then targeting the attribute and value in CSS.
  ex: `[data-page-name='minFraud Services'] { ... }`

  * The [search helper](https://developer.zendesk.com/documentation/help_center/help-center-templates/helpers/#search-helper)
  only accepts static strings as the `placeholder` attribute value.

* An official Zendesk API Client, preferably NodeJS with TypeScript definitions
would be amazing.

* Local theme development is janky. The `zat` tool uploads your theme to Zendesk,
spins up a local static server, and gives you url to a Zendesk preview website.
The theme preview website then loads styles and scripts from the local static
web server (http://localhost:4567). Live reloading works on save of static files,
but if you update any Curlybars templates, you'll need to restart the `zat`
command. We were able to automatically restart the server via Gulp, but it's
still, uh, janky.

## Feats of Strength

* [x] Local development environment with propert dependency requirement checks
* [x] Build pipeline via Gulp
* [x] Separate source, build and build artifact files
* [x] Lint styles and scripts
* [] Add GitHub action to publish theme on PR merge to `main`
* [] Automate dependency management
* [] Add end-to-end tests
  * Link checker
  * Assert that theme upload succeeded and theme is live
  * Accessibility assessment by template type
  * Pagespeed Insights scans
* [] Local development Docker container to encapsulate Ruby and NodeJS
dependencies
