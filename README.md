## Getting Started

To set up and run the project on your local machine, follow these steps:

### 1. Setup Local Repository

First, pull the repository to your local machine:

```
git clone https://github.com/hicsail/aida-content-host.git
cd aida-content-host
```

### 2. Configure Environment Variables

Update the environment files with the required configurations:

- At root directory, change `.env-example` to `.env` (you don't need to change any values)
- Navigate to `./server/db-api` and chage `.env-example` to `.env` (you don't need to change the value)
- Navigate to `./server/chatbot` and chage `.env-example` to `.env`, and update the `OPENAI_API_KEY` value to your actual API key

### 3. Ensure Docker is Running

Make sure **Docker** is installed and running on your local machine. You can verify this by running:

```
docker --version
```

If Docker is not installed, you can download it from [Docker's official website](https://www.docker.com/).

### 4. Run the Project

Use the provided shell script to start the necessary services. You can run:

```
sh run.sh -a
```

Alternatively, to start specific services:

- Databse (MongoDB) Only:

  ```
  sh run.sh -d
  ```

- Frontend Only (including chatbot and digital repository):

  ```
  sh run.sh -f
  ```

- Visualization Only:

  ```
  sh run.sh -v
  ```

### 5. Access the Application

Once Docker services are running, open the following URLs in your browser:

- Frontend: http://localhost:3000
- Visualization: http://localhost:3001

If you need to shutdown the App, use:

```
sh shutdown.sh
```

_Note: This command will also prune all volumes. If you wish not to do this, you have to run `docker compose -f docker-compose-local.yml down` yourself._
