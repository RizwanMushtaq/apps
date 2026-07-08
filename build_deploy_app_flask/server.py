from flask import Flask, render_template, request
from maths.mathematics import summation, subtraction, multiplication, division

app = Flask("Mathematics Problem Solver")


@app.route("/sum")
def sum_route():
    num1 = float(request.args.get("num1"))
    num2 = float(request.args.get("num2"))
    result = summation(num1, num2)
    return f"The sum of {num1} and {num2} is: {result}"


@app.route("/sub")
def sub_route():
    num1 = float(request.args.get("num1"))
    num2 = float(request.args.get("num2"))
    result = subtraction(num1, num2)
    return f"The difference between {num1} and {num2} is: {result}"


@app.route("/mul")
def mul_route():
    num1 = float(request.args.get("num1"))
    num2 = float(request.args.get("num2"))
    result = multiplication(num1, num2)
    return f"The product of {num1} and {num2} is: {result}"


@app.route("/div")
def div_route():
    num1 = float(request.args.get("num1"))
    num2 = float(request.args.get("num2"))
    result = division(num1, num2)
    return f"The quotient of {num1} and {num2} is: {result}"


@app.route("/")
def render_index_page():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
