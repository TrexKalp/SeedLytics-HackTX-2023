from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


# Load the CSV file into a DataFrame once
data_df = pd.read_csv("updatedstartups.csv", encoding="utf-8")


@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q").lower()

    # Use pandas to filter rows that contain the query string
    filtered_df = data_df[
        data_df.apply(
            lambda row: row.astype(str).str.lower().str.contains(query).any(), axis=1
        )
    ]
    results = filtered_df.values.tolist()

    return jsonify(results)


# @app.route("/trending")
# def trending():
#     url = "https://newsdata.io/api/1/news?apikey=pub_316009238764d6a9b6eeeecd6bf97b43121cd&q=trending%20startup%20news&language=en"
#     response = requests.get(url)
#     data = response.json()
#     return jsonify(data)


# if __name__ == "__main__":
#     app.run(debug=True)
