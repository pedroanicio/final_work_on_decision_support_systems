# Disease Diagnosis System

The Disease Diagnosis System is a web application that uses a Decision Tree model to predict diseases based on symptoms provided by the user. The system allows adding, editing, and removing symptoms, as well as providing an instant diagnosis based on the registered information.

## Technologies Used
### Backend
* Node.js: JavaScript runtime environment.
* Express: Framework for building APIs.
* SQLite: Lightweight and embedded database.
* Python (scikit-learn): Library for training the Decision Tree model.

### Frontend
* React: JavaScript library for building user interfaces.
* React Router: Routing management for the frontend.
* Axios: HTTP client for API communication.
* Bootstrap: CSS framework for styling.

## Features
1. Disease Diagnosis:

* The user can select symptoms and their intensities ("Irrelevant", "Medium", "Strong").
* The system returns a diagnosis based on the trained model.

2. Symptom Management:

* Add new symptoms.
* Edit or delete existing symptoms.

3. Intuitive Interface:

* Separate pages for diagnosis and symptom table editing.
* Easy navigation between pages.

## How to Run the Project
### Prerequisites

* Node.js (v16 or higher).
* Python (v3.8 or higher).
* SQLite.

### Setup Steps
1. Clone the Repository:

```
git clone https://github.com/your-username/disease-diagnosis-system.git
cd disease-diagnosis-system
```

2. Set Up the Backend:
* Install Node.js dependencies:
```
cd backend
npm install
```
* Run the server:
```
npm start
```
3. Set Up the Frontend:
* Install React dependencies:
```
cd ../frontend
npm install
```
* Run the frontend:
```
npm start
```
4. Set Up the Python Script:
* Ensure Python is installed and the required libraries are available:
```
pip install pandas scikit-learn
```
5. Access the Application:
* Open your browser and navigate to:
```
http://localhost:3000
```
## How to Use
1. Diagnosis:
* Go to the diagnosis page (/diagnostico).
* Select symptoms and their intensities.
* Click "Diagnose" to get the result.
2. Symptom Management:
* Go to the symptom editing page (/editar-tabela).
* Add, edit, or delete symptoms as needed.
