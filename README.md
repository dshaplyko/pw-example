# BZ / EV / BK Platform e2e test framework

##### Table of Contents

[1 - Description](#description)  
[2 - Installation](#installation)  
[3 - How to Run test scenarios](#how_to_run)  
[4 - CI/CD](#ci_cd)

<a name="description"/>

## 1 - Description

- playwright v1.35+: https://playwright.dev/
- Typescript: https://www.typescriptlang.org/
- All the info related to the E2E Process: https://berlinerverlag.atlassian.net/wiki/spaces/DPP/pages/561872901/Test+Automation+Process#Basic-info
- Test Coverage: https://berlinerverlag.atlassian.net/wiki/spaces/DPP/pages/561774597/Test+coverage

<a name="installation"/>

## 2 - Installation

Node version - min 16.13.x
NPM version - 8 (with `lockfileVersion: 2`)

```sh
1. npm i
2. Create .env file with the content: https://berlinerverlag.atlassian.net/wiki/spaces/DPP/pages/561872901/DRAFT+Test+Automation+Process#Basic-info
```

<a name="how_to_run"/>

## 3 - How to Run test scenarios

```sh
1. ENV=${env} npm run test:bz:${type} -> to run tests for BZ platform where env=qa|prod|pre-prod and type=smoke|regression
2. ENV=${env} npm run test:ev:${type} -> to run tests for EV platform where env=ev-qa|ev-prod|ev-pre-prod and type=smoke|regression
3. ENV=${env} npm run test:bk:${type} -> to run tests for BK platform where env=bk-qa|bk-prod|bk-pre-prod and type=smoke|regression

e.g ENV=pre-prod npm run test:bz:smoke -> to run Smoke test against BZ pre-prod
```

<a name="ci_cd"/>

## 4 - CI/CD

```
Pipelines can be found here:
https://gitlab.com/wunderdog1/jos-e2e/-/pipelines

CI/CD approach:
- Smoke test suite is run for every tenant (BZ/EV/BK) after each deployment on QA
- Full regression test suite is run after every deployment on PRE-PROD
- Smoke test is automatically triggered after each deployment on PROD
- Nightly BZ regression test suite is scheduled for BZ/BV/BK: https://gitlab.com/wunderdog1/jos-e2e/-/pipeline_schedules
- Every 4 hours smoke test is run on BZ PROD
- Auto tests can be triggrred manually from this page: https://gitlab.com/wunderdog1/jos-e2e/-/pipelines/new . In order to do that one has to select branch, environment (qa, pre-prod, prod), type of the test suite (smoke/regression) and tenant (bk/bz/ev)

```
