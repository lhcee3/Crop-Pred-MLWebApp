from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Starting the Flask server...")

crop_model = None
price_model = None
label_encoders = None

def load_and_train_models():
    global crop_model, price_model, label_encoders
    df = pd.read_excel(r'C:\Users\anees\Downloads\ml crop\backend\Advanced_Crop_Prediction_and_Analysis_2024.xlsx')
    label_encoders = {}
    for column in ['Crop', 'Month', 'Soil_Type', 'Recommended_Fertilizers', 'Storage_Conditions']:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le
    X = df[['Month', 'Soil_Type', 'Nitrogen (%)', 'Phosphorus (%)', 'Potassium (%)',
            'Temperature (°C)', 'Humidity (%)', 'Rainfall (mm)', 'Weather_Deviation_Index']]
    y_crop = df['Crop']
    y_price = df['Price_Per_Ton (₹)']
    X_train_crop, _, y_train_crop, _ = train_test_split(X, y_crop, test_size=0.2, random_state=42)
    X_train_price, _, y_train_price, _ = train_test_split(X, y_price, test_size=0.2, random_state=42)
    crop_model = DecisionTreeClassifier(random_state=42)
    crop_model.fit(X_train_crop, y_train_crop)
    price_model = RandomForestRegressor(random_state=42)
    price_model.fit(X_train_price, y_train_price)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        data = request.json
        logger.info(f"Received data: {data}")
        # You can process the data and return a response as needed
        return jsonify({"message": "Data received", "data": data}), 200
    return "Welcome to the Crop Prediction API!"

if __name__ == "__main__":
    load_and_train_models()
    logger.info("Flask server is running on http://127.0.0.1:8000/")
    app.run(debug=True, port=8000)