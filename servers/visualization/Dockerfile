FROM python:3.11

WORKDIR /app

COPY genai-interactive-topics/requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN python -m spacy download en_core_web_sm

COPY . .

RUN python nltk_init.py

ENV PYTORCH_MPS_HIGH_WATERMARK_RATIO="0"
ENV PYTORCH_MPS_FORCE_FALLBACK="1"
ENV CUDA_VISIBLE_DEVICES="-1"
ENV PYTORCH_MPS_DEVICE="cpu"

EXPOSE 8092

CMD ["python", "genai-interactive-topics/code/visualization.py", "--model_dir", "genai-interactive-topics/model_info/model_info_all"]