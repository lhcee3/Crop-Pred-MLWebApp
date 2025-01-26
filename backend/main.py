from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier
import logging

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Log that the server is starting
logger.info("Starting the Flask server...")

# Global variables to store models and encoders
crop_model = None
price_model = None
label_encoders = None

def load_and_train_models():
    global crop_model, price_model, label_encoders
    
    # Load training data
    df = pd.read_excel(r'C:\Users\anees\Downloads\ml crop\backend\Advanced_Crop_Prediction_and_Analysis_2024.xlsx')

    # Encode categorical variables
    label_encoders = {}
    for column in ['Crop', 'Month', 'Soil_Type', 'Recommended_Fertilizers', 'Storage_Conditions']:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le

    # Define features
    X = df[['Month', 'Soil_Type', 'Nitrogen (%)', 'Phosphorus (%)', 'Potassium (%)',
            'Temperature (°C)', 'Humidity (%)', 'Rainfall (mm)', 'Weather_Deviation_Index']]
    y_crop = df['Crop']
    y_price = df['Price_Per_Ton (₹)']

    # Train models
    X_train_crop, _, y_train_crop, _ = train_test_split(X, y_crop, test_size=0.2, random_state=42)
    X_train_price, _, y_train_price, _ = train_test_split(X, y_price, test_size=0.2, random_state=42)

    crop_model = DecisionTreeClassifier(random_state=42)
    crop_model.fit(X_train_crop, y_train_crop)

    price_model = RandomForestRegressor(random_state=42)
    price_model.fit(X_train_price, y_train_price)

# Define a route for the root URL
@app.route('/')
def home():
    return "Welcome to the Crop Prediction API!"

# Load models when the script is run
if __name__ == "__main__":
    load_and_train_models()  # Load and train models before starting the server
    logger.info("Flask server is running on http://127.0.0.1:8000/")  # Log the server URL
    app.run(debug=True, port=8000)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Encode categorical variables
        month_encoded = label_encoders['Month'].transform([data['month']])[0]
        soil_type_encoded = label_encoders['Soil_Type'].transform([data['soilType']])[0]
        
        # Create feature vector
        features = pd.DataFrame({
            'Month': [month_encoded],
            'Soil_Type': [soil_type_encoded],
            'Nitrogen (%)': [data['nitrogen']],
            'Phosphorus (%)': [data['phosphorus']],
            'Potassium (%)': [data['potassium']],
            'Temperature (°C)': [data['temperature']],
            'Humidity (%)': [data['humidity']],
            'Rainfall (mm)': [data['rainfall']],
            'Weather_Deviation_Index': [data['weatherDeviation']]
        })
        
        # Make predictions
        predicted_crop = crop_model.predict(features)[0]
        predicted_crop_name = label_encoders['Crop'].inverse_transform([predicted_crop])[0]
        predicted_price = price_model.predict(features)[0]
        
        return jsonify({
            "crop": predicted_crop_name,
            "price": float(predicted_price)
        })
        
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")  # Log any errors
        return jsonify({"error": str(e)}), 400