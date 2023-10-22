from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load and parse the JSON data into a Python data structure
with open("modified_startup_data.json", "r") as file:
    data = json.load(file)


def sort_data(match_arr, sort_order):
    if sort_order == "asc":
        sorted_startup_data = sorted(match_arr, key=lambda x: x["funding_total_usd"])
    elif sort_order == "desc":
        sorted_startup_data = sorted(
            match_arr, key=lambda x: x["funding_total_usd"], reverse=True
        )
    else:
        sorted_startup_data = match_arr

    return sorted_startup_data


@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q").lower()
    category = request.args.get("category", None)  # Retrieve category from query params
    sort_order = request.args.get("sort", "asc")
    matches = []

    # Iterate through the data loaded from the JSON file instead of querying a database
    for item in data:
        if (category is None or item.get("broader_category") == category) and any(
            query in str(value).lower() for value in item.values()
        ):
            matches.append(item)

    result = sort_data(matches, sort_order)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
