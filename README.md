
---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A robust email sending service built with <a href="http://nodejs.org" target="_blank">Node.js</a> and <a href="https://nestjs.com/" target="_blank">NestJS</a>, using Bull and Redis for job queuing and containerized with Docker for easy deployment.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
</p>

## Description

This project is an email sending service built using the [NestJS](https://nestjs.com/) framework. It utilizes [Bull](https://github.com/OptimalBits/bull) for managing job queues with Redis, allowing efficient processing of high volumes of email tasks, such as welcome emails and password reset notifications.

## Features

- **Job Queuing**: Uses Bull and Redis to queue email tasks, improving scalability and reliability.
- **Template-Based Emails**: Easily create and manage different types of email templates.
- **Scheduling and Delayed Delivery**: Schedule emails or delay them for future delivery.
- **Containerized Deployment**: Dockerized for ease of deployment, compatible with Docker Compose.

## Prerequisites

- **Node.js** (version 14+ recommended)
- **Redis** (for job queuing)
- **Docker** (optional, for containerized deployment)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/esti08-hu/email_sending_service.git
   cd email_sending_service
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory:
   ```plaintext
   REDIS_HOST=localhost
   REDIS_PORT=6379
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@example.com
   EMAIL_PASSWORD=your-email-password
   ```

## Running the App

### Local Development

```bash
# development mode
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

### Docker Deployment

1. **Using Docker Compose**:

   Ensure Docker is running and start the application with Redis:
   ```bash
   docker-compose up -d
   ```

2. **Access the Service**:
   - The application will be accessible at `http://localhost:3000`.
   - Redis will be running on `localhost:6379`.

## API Endpoints

- **POST /email/send-welcome**: Sends a welcome email.
  - **Payload**:
    ```json
    {
      "to": "recipient@example.com",
      "subject": "Welcome",
      "text": "Welcome to our service!",
      "user": { "name": "John Doe" }
    }
    ```

- **POST /email/send-reset**: Sends a password reset email.
  - **Payload**:
    ```json
    {
      "to": "recipient@example.com",
      "subject": "Reset Password",
      "text": "Click the link to reset your password.",
      "user": { "name": "John Doe" }
    }
    ```

## Testing

Run the tests to verify functionality:

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

## Project Structure

- **`src/app.module.ts`**: Main module where Bull and Mailer configurations are set up.
- **`src/app.controller.ts`**: Defines API endpoints for sending emails.
- **`src/email.processor.ts`**: Handles queued email jobs, processing and sending.
- **`src/templates/`**: Directory for Handlebars email templates (`welcome.hbs`, `reset-password.hbs`).

## Docker Configuration

- **Redis Service**: Configured as a separate service in `docker-compose.yml` and linked with the application.
- **Dockerfile**: Multi-stage Dockerfile for development and production builds, ensuring a lightweight production image.


## License

This project is [MIT licensed](LICENSE).

---

- **Author**: Estifanos A.
