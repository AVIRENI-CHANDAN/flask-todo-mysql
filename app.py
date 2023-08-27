from flask import Flask, render_template, request, redirect, session, Response
from flask import jsonify, session, url_for
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
    verify_jwt_in_request,
)
from dotenv import load_dotenv
import os
from models import db, User, Task
import logging

load_dotenv()

SECRET_KEY = os.environ.get("SECRET_KEY")
DB_USER = os.environ.get("db_user")
DB_PASSWORD = os.environ.get("db_password")
DB_HOST = os.environ.get("db_host")
DB_NAME = os.environ.get("db_name")
APP_USER = os.environ.get("app_user")
APP_PASSWORD = os.environ.get("app_password")
APP_USER_MAIL = os.environ.get("app_user_mail")
TEMPLATE_FOLDER = os.environ.get("template_folder")
STATIC_FOLDER = os.environ.get("static_folder")
STATIC_URL = os.environ.get("static_url")
REFERENCE_PATTERN = r"^\{\{url_for\('static', filename='[^']*'\)\}\}$"
REFERENCE_VALUE_ATTRIBUTES = {"link": "href", "script": "src"}
DEBUG = os.environ.get("FLASK_DEBUG")

app = Flask(
    __name__,
    template_folder=TEMPLATE_FOLDER,
    static_folder=STATIC_FOLDER,
    static_url_path=STATIC_URL,
)

app.config["SECRET_KEY"] = SECRET_KEY
app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
jwt = JWTManager(app)


@app.get("/")
@app.get("/login")
@app.get("/about")
@app.get("/home")
def index():
    return render_template("index.html"), 200


@app.post("/login")
@jwt_required(optional=True)  # Allow missing token
def login():
    try:
        verify_jwt_in_request()
        return jsonify({"token_valid": True, "next": "/home"}), 200
    except:
        pass

    try:
        form_data = request.form
        username = form_data["username"]
        password = form_data["password"]
        logging.info("Received credentials for logging")
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            logging.info(
                "Credentials valid and redirected to", url_for(home_index.__name__)
            )
            access_token = create_access_token(identity=username)
            return jsonify({"next": "/home", "access_token": access_token}), 301
    except Exception as e:
        logging.error(e)
    logging.info("Redirecting to", "/login")
    return jsonify({"next": "/login", "message": "Credentials Invalid"}), 401


@app.get("/logout")
@jwt_required()
def logout():
    logging.info("Logging out and redirecting to:", "/login")
    session.clear()
    return "", 200


@app.get("/home")
def home_index():
    return render_template("index.html"), 200


@app.get("/task/all")
@jwt_required()
def get_all_tasks():
    print("At endpoint: get_all_tasks")
    verify_jwt_in_request()
    current_user = get_jwt_identity()
    print("get_all_tasks - current_user:", current_user)
    tasks = Task.query.all()
    data = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "completed": task.completed,
            "created_at": task.created_at,
            "updated_at": task.updated_at,
        }
        for task in tasks
    ]
    data.sort(key=lambda x: x.get("due_date"))
    data.sort(key=lambda x: x.get("completed"))
    return jsonify(data), 200


@app.post("/task/new")
@jwt_required()
def new_task():
    verify_jwt_in_request()
    form_data = request.form
    task = Task(title=form_data["title"], description=form_data["description"])
    with app.app_context():
        db.session.add(task)
        db.session.commit()
    return jsonify({"status": "Task added"}), 200


@app.errorhandler(401)
def unauthorized(error):
    return jsonify({"message": "Unauthorized"}), 401


@app.errorhandler(422)
def unprocessable_entity(error):
    return jsonify({"message": "Unprocessable entity"}), 422


def initialize_app():
    logging.info("Initializing application")
    with app.app_context():
        db.init_app(app)
        db.create_all()

        super_user = User.query.filter_by(username=APP_USER).first()
        if not super_user:
            super_user = User(
                username=APP_USER, email=APP_USER_MAIL, password=APP_PASSWORD
            )
            db.session.add(super_user)
            db.session.commit()


initialize_app()
if __name__ == "__main__":
    app.run(debug=(DEBUG == "1"))
