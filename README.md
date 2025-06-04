# Hastee Mini Wallet

This project is a Hastee Frontend Case, implementing a simple wallet application.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

Unzip folder

```bash
cd hastee-mini-wallet
npm install
```

### Running the App

```bash
npm run dev
```

## Technologies Used

- **React** for building the user interface
- **TypeScript** for type safety
- **Vite** as a builder
- **react router dom** as router

## Caused errors to see error handling
- In login form, if you use a username called 'fail' you will get a failed attempt of login.
- In registration form, if you use a username called 'fail' you will get a failed attempt to register.

## Curiosities

- TypeScript's strict mode is enabled for better code quality.
- When user is registered I am adding 1000$ for making some tests. We are adding too some transactions with some 'Deposits' for see in the listing.
- The project structure follows the feature-based organization for scalability taking into consideration that this will reuse in a react-native application. I tried to separate all the logic of the renderization for replaces it them for react native renderization layouts.
- The API is fake. All results are saving in local storage with user as a key. All responses are taking 1 second to see loading a normal behaviour on the screen.
- If you want to reply tests because you are out of money in the wallet, delete all local storage items or register again. You can also edit local storage items to edit values if you want.
- If you have any doubts please contact me and I would be delighted to solve them.