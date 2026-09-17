from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model = joblib.load(
    os.path.join(BASE_DIR, "models", "logistic_model.pkl")
)

preprocessor = joblib.load(
    os.path.join(BASE_DIR, "models", "preprocessor.pkl")
)


@app.route("/")
def home():
    return jsonify({
        "message": "Customer Churn Prediction API is running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    input_data = pd.DataFrame([data])

    processed_data = preprocessor.transform(input_data)

    probability = model.predict_proba(processed_data)[0][1]

    prediction = model.predict(processed_data)[0]

    if probability < 0.30:
        risk = "Low"
    elif probability < 0.60:
        risk = "Medium"
    else:
        risk = "High"

    return jsonify({
        "churn_prediction": int(prediction),
        "churn_probability": round(float(probability), 3),
        "risk_level": risk
    })


if __name__ == "__main__":
    app.run(debug=True)