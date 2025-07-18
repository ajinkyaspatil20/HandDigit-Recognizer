import os
import numpy as np
import tensorflow as tf
from tensorflow import keras
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)

# here we add thsis to reuse
# Create a model similar to the one in the notebook
def create_model():
    model = keras.Sequential(
        [
            keras.layers.Input(shape=(28, 28, 1)),
            keras.layers.Conv2D(32, kernel_size=(3, 3), activation="relu"),
            keras.layers.BatchNormalization(),
            keras.layers.MaxPooling2D(pool_size=(2, 2)),
            keras.layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
            keras.layers.BatchNormalization(),
            keras.layers.MaxPooling2D(pool_size=(2, 2)),
            keras.layers.Conv2D(64, kernel_size=(3, 3), activation="relu"),
            keras.layers.BatchNormalization(),
            keras.layers.Flatten(),
            keras.layers.Dense(128, activation="relu"),
            keras.layers.Dropout(0.5),
            keras.layers.Dense(10, activation="softmax"),
        ]
    )

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )
    return model


# Load MNIST dataset for training
def load_and_train_model():
    # Load MNIST dataset
    (X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

    # Normalize the data
    X_train = X_train / 255.0
    X_test = X_test / 255.0

    # Create and train the model
    model = create_model()
    # Reshape data for CNN input
    X_train = X_train.reshape(-1, 28, 28, 1)
    X_test = X_test.reshape(-1, 28, 28, 1)

    model.fit(
        X_train, y_train, batch_size=32, epochs=10, validation_split=0.2, verbose=1
    )

    # Evaluate the model
    test_loss, test_acc = model.evaluate(X_test, y_test)
    print(f"Test accuracy: {test_acc}")

    return model


# Process the image data from the frontend
def preprocess_image(image_data):
    # Remove the data URL prefix
    if "data:image/png;base64," in image_data:
        image_data = image_data.split("data:image/png;base64,")[1]

    # Decode base64 image
    image = Image.open(io.BytesIO(base64.b64decode(image_data)))

    # Convert to grayscale
    image = image.convert("L")

    # Resize to 28x28
    image = image.resize((28, 28))

    # Convert to numpy array and normalize
    image_array = np.array(image)
    image_array = image_array / 255.0
    image_array = image_array.reshape(28, 28, 1)

    # Invert colors if needed (MNIST has white digits on black background)
    image_array = 1 - image_array

    return image_array


# Initialize the model
model = None


@app.route("/predict", methods=["POST"])
def predict():
    global model

    # Load the model if it's not already loaded
    if model is None:
        model = load_and_train_model()

    # Get the image data from the request
    data = request.json
    image_data = data.get("image")

    if not image_data:
        return jsonify({"error": "No image data provided"}), 400

    # Preprocess the image
    processed_image = preprocess_image(image_data)

    # Make prediction
    prediction = model.predict(np.expand_dims(processed_image, axis=0))[0]

    # Get the predicted digit and confidence scores
    predicted_digit = np.argmax(prediction)
    confidence_scores = prediction.tolist()

    return jsonify(
        {
            "predicted_digit": int(predicted_digit),
            "confidence_scores": confidence_scores,
        }
    )


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
