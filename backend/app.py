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


@app.route("/trending")
def trending():
    # This is a placeholder URL. Replace with an actual source if you have one.
    URL = "https://explodingtopics.com/blog/fast-growing-companies"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(URL, headers=headers)

    soup = BeautifulSoup(response.content, "html.parser")
    # The following selectors are placeholders. You'll need to adjust based on the site structure.
    startup_elements = soup.select(".startup")

    startups = []
    for elem in startup_elements:
        name = elem.select_one(".name").text
        description = elem.select_one(".description").text
        imageUrl = elem.select_one(".image").get("src")
        startups.append(
            {"name": name, "description": description, "imageUrl": imageUrl}
        )

    return jsonify(startups)


if __name__ == "__main__":
    app.run(debug=True)
