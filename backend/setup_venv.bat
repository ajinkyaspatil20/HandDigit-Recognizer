@echo off
echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Setup complete! You can now run the Flask app with: python app.py
echo To activate the virtual environment in the future, run: venv\Scripts\activate.bat