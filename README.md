# working-lunch-2-appsync

# Prerequisite

## Yarn

https://classic.yarnpkg.com/en/

## Amplify CLI

```yarn add global @aws-amplify/cli```

## CDK CLI

```yarn add global aws-cdk```

# Setup

## Install dependencies

From the project root, run: ```yarn run bootstrap```

## Generate GraphQL JS bindings

From the project root, run: ```yarn run graphql-codegen```

## Build & Deploy stack on AWS

From the project root, run: ```yarn run deploy```

* _An AWS profile named `okiok-dev` have to exist for this command to work. To change this, go to cdk/package.json and change ```--profile okiok-dev``` to your profile_
* _This command will also compile & package the lambdas in the backend folder_

# Build & Serve App

From the project root, run: ```yarn run serve```

The app should be available @ http://localhost:8080
