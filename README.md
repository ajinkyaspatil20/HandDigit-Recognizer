# ✍️ Handwritten Digit Recognition Application

An interactive web-based system that recognizes handwritten digits (0–9) drawn by the user on a canvas using a deep learning model trained on the MNIST dataset. This real-time digit recognition system combines the power of Convolutional Neural Networks (CNNs) with modern web technologies like React and Flask.
> *Draw digits on the canvas and receive instant predictions with confidence scores!*
<img width="700" height="560" alt="image" src="https://github.com/user-attachments/assets/58a00519-d240-4939-b14f-7d722c824e3e" />





---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Model Insights](#model-insights)
- [Results](#results)
- [Challenges](#challenges)
- [Future Work](#future-work)
- [Contributors](#contributors)

---

## 📌 Project Overview

This project demonstrates how neural networks can be applied to real-time image recognition. Initially built for binary digit classification (0 and 1), the system has now evolved to recognize all digits from 0 to 9 using the MNIST dataset.

The core idea: draw a digit on a canvas → the image is processed by the backend → the model predicts the digit → confidence score is displayed.

---

## ✨ Features

- 🖌️ **Canvas Interface** – Sketch digits using mouse/touch
- 🔮 **Real-Time Predictions** – Instant output using Flask API
- 📊 **Confidence Scores** – See model certainty for every prediction
- 🧠 **Trained CNN Model** – Built on MNIST with >95% accuracy
- 🔁 **Clear & Reset** – Easily erase and retry drawing
- 🌐 **Responsive Design** – Works on both desktop & mobile

---



### 🖼️ Screenshots

#### 🏠 Home Page

<img width="800" height="560" alt="image" src="https://github.com/user-attachments/assets/34604547-f20f-4d87-8e6b-b05e6628d180" />

#### 🔍 Prediction Result

<img width="800" height="560" alt="image" src="https://github.com/user-attachments/assets/7782c7f9-43c0-4036-8c48-add228546dd6" />


---

## ⚙️ Tech Stack

| Component   | Technology Used                      |
|-------------|---------------------------------------|
| Frontend    | React.js, Tailwind CSS, HTML5 Canvas |
| Backend     | Flask, Python, NumPy, Pickle          |
| ML Model    | TensorFlow/Keras, CNN, MNIST dataset |
| Communication | Axios (API calls from React to Flask) |
| Deployment  | Localhost / (Ready for Cloud/Edge)   |

---

## 🧱 Architecture
<img width="408" height="500" alt="image" src="https://github.com/user-attachments/assets/a7f3fdf5-31e5-4ff2-94bb-e20f64566e44" />



---

## 🔧 Setup Instructions

### 📌 Backend Setup (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # For Linux/macOS
venv\Scripts\activate         # For Windows
pip install -r requirements.txt
python app.py
Flask server will run at http://localhost:5000
```
### 🌐 Frontend Setup (React)
```bash
cd frontend
npm install
npm start
React app will run at http://localhost:3000 (or 5173 if Vite)
```

### 🖱️ Usage Guide
Draw a digit (0–9) on the canvas.

Click the Predict button to send the image to the backend.

View the predicted digit and the model’s confidence score.

Use the Clear button to reset the canvas and try again.

### 🧠 Model Insights
#### Dataset: MNIST – 60,000 training images, 10,000 test images.

#### Input: Grayscale, 28×28 px

#### Layers:

Convolution + ReLU
MaxPooling
Dropout (for regularization)
Fully Connected
Trained for 2000 iterations

### 📈 Results
✅ Achieved >95% accuracy on test data

📉 Consistent drop in cost during training

🧪 High confidence (>0.9) for most digits

🧾 Confusion matrix & visual analysis helped refine performance


### 🧩 Challenges
✍️ Similar digits (e.g., 4 & 9, 3 & 8) caused confusion

💻 MNIST dataset doesn’t represent all handwriting styles

⚠️ Risk of overfitting with small architecture

📊 Black-box nature of CNNs limits deep interpretability

### 🚀 Future Work
🖼️ Add data augmentation (rotate, noise, scale)

🌍 Deploy to cloud or edge devices

🔐 Implement adversarial robustness

🧩 Support for symbols & letters (beyond 0–9)

📡 Live camera digit recognition

### 👨‍💻 Contributors
👤 Ajinkya Sunil Patil (D15B 42)

### 🎓 Under the guidance of Mrs. Vidya Pujari
📍 Department of Information Technology, VESIT
📅 Academic Year: 2024–25

### 📝 License
This project is developed for educational purposes.
