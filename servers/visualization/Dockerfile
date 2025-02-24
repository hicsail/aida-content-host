FROM python:3.11

WORKDIR /app

COPY genai-interactive-topics/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python nltk_init.py

EXPOSE 8092

CMD ["python", "genai-interactive-topics/code/visualization.py", "--model_dir", "genai-interactive-topics/model_info/model_info_all"]