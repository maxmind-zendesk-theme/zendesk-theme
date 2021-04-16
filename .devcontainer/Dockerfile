ARG RUBY_VERSION=2
FROM mcr.microsoft.com/vscode/devcontainers/ruby:${RUBY_VERSION}

ARG NODE_VERSION="lts/*"
RUN su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"

RUN gem install rake && \
  gem install zendesk_apps_tools && \
  gem update zendesk_apps_tools && \
  gem install sassc:1.12.1

RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g yarn" 2>&1
