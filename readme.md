# Engage UI E2E tests

##### Table of Contents

[1 - Description](#description)  
[2 - Installation](#installation)  
[3 - How to Run test scenarios](#how_to_run)
[4 - CI/CD](#ci_cd)  
[5 - Configure BaseUrl for particular Test Suite](#configure_base_url)  
[6 - Logger](#logger)
[7 - Domains handling](#domains)

<a name="description"/>

## 1 - Description

- playwright v1.29+: https://playwright.dev/
- Typescript: https://www.typescriptlang.org/

<a name="installation"/>

## 2 - Installation

Node version - min 16.13.x
NPM version - 8 (with `lockfileVersion: 2`)

```sh
1. npm i
2. create a `.env` file with the content https://breathelife.atlassian.net/wiki/spaces/ZEL/pages/2668953694/Grow+Engage+Test+Automation+Process#Engage-e2e-repository%3A-%5BinlineCard%5D
3. npm test (to run all the tests)
```

<a name="how_to_run"/>

## 3 - How to Run test scenarios

```sh
1. npm test -> run all the tests
2. LOCAL=true npm test OR npm run test:smoke -> run against local env
3. npm test ./src/tests/dashboard.spec.ts -> to run only one spec file
4. npm test -- --headed -> enable headed mode
5. npm test -- --grep="@smoke" OR npm run test:smoke  -> to run Smoke test only
6. npm test -- --grep="@criticalPath|@extended" OR npm run test:regression -> to run the regression test suite.
```

<a name="ci_cd"/>

## 4 - CI/CD

```
Scheduled full regression job for DEV env is configured here: https://github.com/lvhdev/lifeio-web-e2e/actions
```

<a name="configure_base_url"/>

## 5 - Configure BaseUrl for a particular Test Suite

```sh
test.use({ baseURL: 'https://playwright.dev' })
```

<a name="logger"/>

## 6 - Logger

```sh
DEBUG=true npm test
```

<a name="domains"/>

