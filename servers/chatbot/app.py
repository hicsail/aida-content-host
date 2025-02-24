import sys
import os

submodule_path = os.path.join(os.path.dirname(__file__), "cmac_arg")

if submodule_path not in sys.path:
    sys.path.insert(0, submodule_path)

from flask import Flask, request, jsonify
from flask_cors import CORS
from rag import graph

app = Flask(__name__)
CORS(app)

os.environ["source_path"] = "cmac_arg/PDFs/978-1-4020-9650-1.pdf"
os.environ["prompt_name"] = "biosemiotics_prompt"

from loaders import PdfLibLoader

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    print(data)
    if not data or "question" not in data:
        return jsonify({"error": "Invalid request"}), 400

    user_input = data["question"]
    response = answer(user_input)

    return jsonify({
        "answer": response["answer"],
    })

def answer(user_input):
    question_answer = graph.invoke({"question": user_input})
    return question_answer

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
