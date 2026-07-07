from flask import Flask

my_app = Flask(__name__)


@my_app.route("/")
def hello_world():
    return f"Hello World! from {__name__}"


if __name__ == "__main__":
    my_app.run(debug=True)
