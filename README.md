# MenuBot

This project was an exercise provided by the teachers at Nuclio School during a hackathon.

It revolves around integrating the Telegram API with the Telegraf framework.

Its purpose is to enable users to create orders through the Telegram app and mark them as completed via the web application. Additionally, it provides feedback to the user regarding the status of their order.

## Screenshots

![App animated Screenshot](menubot-animated.gif)

## Tech Stack

**Client:** React, Typescript, AntDesign

**Server:** Node, Express, Telegram API

**DataBase:** MongoDB

## Installation

1. Clone the repository and navigate to the project directory.

```bash
  cd menubot
```

2. Install MenuBot with npm

```bash
  npm install
```

3.  Create and configure the environment variables in the .env file

`MONGO_URL`

`BOT_TOKEN`

4. Run the project in the terminal with the following command:

```bash
  npm run dev
```

5. Navigate to http://localhost:3000 to view the application.
