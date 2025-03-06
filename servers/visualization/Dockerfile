FROM python:3.11

WORKDIR /app

COPY genai-interactive-topics/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN python -m spacy download en_core_web_sm

COPY . .

RUN python nltk_init.py

EXPOSE 8092

CMD ["python", "app.py", "--model_dir", "model_info/model_info_all"]