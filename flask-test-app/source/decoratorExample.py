def jsonify_decorator(function):
    def modifyOutput():
        return {"output": function()}

    return modifyOutput


@jsonify_decorator
def hello():
    return "hello world"


@jsonify_decorator
def add():
    num1 = input("Enter a number - ")
    num2 = input("Enter another number - ")
    return int(num1) + int(num2)


if __name__ == "__main__":
    print(hello())
    print(add())
