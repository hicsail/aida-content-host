FROM python:3.11

WORKDIR /app

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=${OPENAI_API_KEY}

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/cmac_arg

RUN echo 'import os\nfrom dotenv import load_dotenv\nload_dotenv()\ndef openai_key():\n    return os.environ.get(\"OPENAI_API_KEY\")' > /app/cmac_arg/credentials.py

EXPOSE 5000

CMD ["python", "app.py"]