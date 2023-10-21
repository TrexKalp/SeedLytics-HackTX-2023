from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import models, transforms
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # This will allow all cross-origin requests

# # Load a pre-trained ResNet model
# model = models.resnet18(pretrained=True)
# model.eval()

# # Define a transform to preprocess the image
# transform = transforms.Compose(
#     [
#         transforms.Resize(256),
#         transforms.CenterCrop(224),
#         transforms.ToTensor(),
#         transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
#     ]
# )


# def get_class_description(label):
#     try:
#         # Try to fetch a summary of the label from Wikipedia
#         summary = wikipedia.summary(label, sentences=1)
#         return summary
#     except wikipedia.exceptions.DisambiguationError as e:
#         # If there are multiple possible meanings, just return the first option
#         summary = wikipedia.summary(e.options[0], sentences=1)
#         return summary


# @app.route("/api/predict", methods=["POST"])
# def predict():
#     file = request.files["file"]
#     image = Image.open(io.BytesIO(file.read())).convert("RGB")
#     image = transform(image).unsqueeze(0)
#     with torch.no_grad():
#         output = model(image)
#         _, predicted = torch.max(output, 1)
#     return jsonify({"predicted_class": predicted.item()})


@app.route("/api/hello")
def hello():
    return jsonify(message="Testing 123")


if __name__ == "__main__":
    app.run(debug=True)
