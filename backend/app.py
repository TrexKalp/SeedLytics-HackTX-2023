from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)

# Load the JSON data into memory once
with open("startups.json", "r", encoding="utf-8") as file:
    data = json.load(file)


@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q").lower()
    matches = []

    # Iterate through the JSON data to find matches
    for item in data:
        if any(query in str(value).lower() for value in item.values()):
            matches.append(item)

    return jsonify(matches)


# @app.route("/trending")
# def trending():
#     url = "https://newsdata.io/api/1/news?apikey=pub_316009238764d6a9b6eeeecd6bf97b43121cd&q=trending%20startup%20news&language=en"
#     response = requests.get(url)
#     data = response.json()
#     return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
