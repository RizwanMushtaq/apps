from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)


@app.route("/chat", methods=["POST"])
def chat_endpoint():
    data = request.get_json()
    prompt_text = data.get("prompt")

    response = ollama.generate(model="phi", prompt=prompt_text)
    print(response["response"])
    return jsonify({"response": response["response"]})


@app.route("/health", methods=["GET"])
def health_check():
    """Simple check to see if the Flask wrapper is live."""
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
