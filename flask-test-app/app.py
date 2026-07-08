from flask import Flask, request

my_app = Flask(__name__)


@my_app.route("/")
def hello_world():
    print(request.headers)
    print(request.args)
    return f"Hello World! from {__name__}"


if __name__ == "__main__":
    my_app.run(debug=True)
