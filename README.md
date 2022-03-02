# Esteemed.io

[![Build](https://github.com/EsteemedIO/esteemedio.github.io/actions/workflows/build.yml/badge.svg)](https://github.com/EsteemedIO/esteemedio.github.io/actions/workflows/build.yml)
[![HTML](https://github.com/EsteemedIO/esteemedio.github.io/actions/workflows/htmlproofer.yml/badge.svg)](https://github.com/EsteemedIO/esteemedio.github.io/actions/workflows/htmlproofer.yml)
[![Spell Check](https://github.com/EsteemedIO/esteemedio.github.io/actions/workflows/spellcheck.yml/badge.svg)](https://github.com/EsteemedIO/esteemedio.github.io/actions/workflows/spellcheck.yml)

## Development
```
Build HTML: docker-compose up --build jekyll

Serve HTML: docker-compose up nginx
```

## Deployment
Pushing to the develop branch will trigger a GitHub Actions build and GitHub pages deployment.
