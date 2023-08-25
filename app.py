from flask import Flask, render_template, request, redirect
from flask import jsonify, session, url_for
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
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


@app.get("/")
@app.get("/login")
@app.get("/about")
def index():
    logging.info("Requesting path:", request.url)
    if "user_id" in session:
        logging.info(
            "Redirecting to:", url_for(home_index.__name__), "from", request.url
        )
        return redirect(url_for(home_index.__name__))
    return render_template("index.html"), 200


@app.post("/login")
def login():
    form_data = request.form
    username = form_data["username"]
    password = form_data["password"]
    logging.info("Received credentials for logging")
    try:
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            logging.info(
                "Credentials valid and redirected to", url_for(home_index.__name__)
            )
            session["user_id"] = user.id
            return redirect(url_for(home_index.__name__))
    except Exception as e:
        logging.error(e)
    logging.info("Redirecting to", "/login")
    return redirect("/login", code=200)


@app.get("/logout")
def logout():
    logging.info("Logging out and redirecting to:", "/login")
    session.clear()
    return redirect("/login")


@app.get("/home")
def home_index():
    if not "user_id" in session:
        logging.info("Not authnetic, Redirecting to", "/login")
        return redirect("/login")
    return render_template("index.html"), 200


@app.get("/task/all")
def get_all_tasks():
    if not "user_id" in session:
        logging.info("Not authnetic, Redirecting to /login")
        return redirect("/login")
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
def new_task():
    if not "user_id" in session:
        logging.info("Not authnetic, Redirecting to /login")
        return redirect("/login")
    form_data = request.form
    task = Task(title=form_data["title"], description=form_data["description"])
    with app.app_context():
        db.session.add(task)
        db.session.commit()
    return redirect(url_for(home_index.__name__), code=200)


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
