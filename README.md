# MaxMind ZenDesk Theme

The MaxMind ZenDesk theme is a fork of [the Copenhagen theme](https://github.com/zendesk/copenhagen_theme) (the default Zendesk Guide theme).

## Developing
### Requirements
This project requires both Ruby and NodeJS packages for local development and
building.

* Ruby >= 2.7
* Node >= 18

If your local machine does not have the correct version of Ruby installed, look
into installing [Ruby version manager](https://rvm.io/).

If your machine does not have the correct version of NodeJS installed, look into
installing [Node version manager](https://github.com/nvm-sh/nvm).

### Installation

```shell
bundle install
npm install
```

### Developing

Before developing, make sure that `.zat.example` has been edited with your
appropriate credentials, and renamed `.zat`.

```shell
npm run develop
```

### VSCode Recommendations


#### Extensions

A list of recommended VSCode extensions has been provided in
[.vscode/extensions.json](.vscode/extensions.json). To install these extensions,
open the command pallete in VSCode and run the
`Extensions: Show Recommended Extensions` command. The list of plugins will show
up in the Extensions pane of VSCode, where you can then choose to install them.

#### Settings

This project is configured to automatically fix code on file save, via
[.vscode/settings.json](.vscode/settings.json).

## Resources

### Custom Template Functionality

We are using [PostHTML](https://posthtml.org/#/) and a few PostHTML plugins to
enhance the Zendesk templates during our build process. Most notably, we are
using [posthtml-include](https://www.npmjs.com/package/posthtml-include) to
allow us to break our templates into smaller, more readable templates.

### Styling Methodology

For any new styles added to the theme, or when refactoring existing styles, it
is recommended to use the [Block Element Modifier (BEM) methodology](http://getbem.com/)
so that we can keep styles organized and scoped appropriately.

### Zendesk Templating

* [Zendesk Help Center Dev Docs](https://developer.zendesk.com/documentation/help_center/)
* [Zendesk Help Center Templating Docs](https://developer.zendesk.com/documentation/help_center/help-center-templates/introduction/)

*__IMPORANT!__* Zendesk's templating engine is [Curlybars](https://developer.zendesk.com/documentation/help_center/help-center-templates/introduction/), not [Handlebars](https://handlebarsjs.com/)!
Curlybars is based on the Handlebars language, but has some subtle Zendeskisms
built in.

### Festivus

A [FESTIVUS.md](FESTIVUS.md) file has been included to capture personal dislikes
(The Airing of Grievances) and proposed improvements (Feats of Strength) for
this project. Feel free to add to this file.
