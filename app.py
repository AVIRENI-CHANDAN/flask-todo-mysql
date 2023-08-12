from flask import Flask
from dotenv import load_dotenv
import os

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
def index():
    return "Hello world"


if __name__ == "__main__":
    app.run()
