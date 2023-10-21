from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q")

    # Sample data for demonstration.
    data = ["apple", "banana", "cherry", "date", "fig", "grape"]
    results = [item for item in data if query.lower() in item.lower()]

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
