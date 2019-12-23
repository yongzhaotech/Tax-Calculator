This project was bootstrapped with [npx create-react-app my-app --template typescript].
The responsive layout is handled using bootstrap: [https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css]


## Available Scripts

In the project directory, run the following command to install all dependencies specified in the package.json:

### `npm install`

After `npm install` is finished successfully, run the following command to start the local server:

### `npm run start`

Open [http://localhost:3000] to view it in the browser. recommended browser: Chrome

### unit tests

### !!! VERY IMPORTANT !!!

Beaware that `npm run start` would set "jsx" to "preserve" in "tsconfig.json".
After `npm run start`, please change {"jsx": "preserve"} to {"jsx": "react"} in "tsconfig.json", otherwise `jest` command will not run properly!

Two test suites are written:
src/__tests__/TaxBreakdown.test.tsx
src/__tests__/EnterIncome.test.tsx

### execute the command `jest` to run the two test suites
### if `jest` command is not found, try `./node_modules/.bin/jest`

This application uses the following new features:

1. React and redux hooks - use state and dispatch in functional components without using redux connect HOC function to connect components to the store
2. Redux-persist - manage store state in a persistent way, even if the use closes and re-opens the browser, the store state is still in the components
3. reselect - optimize expensive tax calculation function, if state is not changed, previously calculated value is returned and the component is not re-painted
4. react-router hook - simplify the usage of router

Author: Yong Zhao, laoyezhao@yahoo.ca, 4168283689