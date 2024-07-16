from abc import ABC
from numpy import double, integer
from abc import ABC, abstractmethod


class Expression(ABC):
    @abstractmethod
    def calc(self) -> double:
        pass


class Num(Expression):
    x: integer

    def __init__(self, x) -> None:
        self.x = x

    def calc(self) -> double:
        return double(self.x)


class BinExp(Expression):
    right: Expression
    left: Expression

    def __init__(self, left, right) -> None:
        self.left = left
        self.right = right


class Plus(BinExp):
    def calc(self) -> double:
        return self.left.calc() + self.right.calc()


class Minus(BinExp):
    def calc(self) -> double:
        return self.left.calc() - self.right.calc()


class Mul(BinExp):
    def calc(self) -> double:
        return self.left.calc() * self.right.calc()


class Div(BinExp):
    def calc(self) -> double:
        return self.left.calc() / self.right.calc()


def shunting_yard(expression):
    operatorScore = {"-": 0, "+": 0, "*": 1, "/": 1}

    currentNum = ""
    stack = []
    queue = []
    i = 0

    for token in expression:
        if (
            token == "."
            or str.isnumeric(token)
            or (token == "-" and (i == 0 or expression[i - 1] == "("))
        ):
            currentNum += token
        else:
            if currentNum != "":
                queue.append(currentNum)
                currentNum = ""

            if token == "(":
                stack.append(token)
            elif token == ")":
                while stack and stack[-1] != "(":
                    queue.append(stack.pop())
                stack.pop()
            else:
                while (
                    stack
                    and stack[-1] in operatorScore
                    and operatorScore[stack[-1]] >= operatorScore[token]
                ):
                    queue.append(stack.pop())
                stack.append(token)

        i += 1

    if currentNum != "":
        queue.append(currentNum)

    while stack:
        queue.append(stack.pop())

    return queue


def evaluate_posfix(tokens):
    stack = []

    for token in tokens:
        if token == "(" or token == ")":
            continue
        elif token == "*":
            right = stack.pop()
            left = stack.pop()
            stack.append(right * left)
        elif token == "-":
            right = stack.pop()
            left = stack.pop()
            stack.append(left - right)
        elif token == "+":
            right = stack.pop()
            left = stack.pop()
            stack.append(right + left)
        elif token == "/":
            right = stack.pop()
            left = stack.pop()
            stack.append(left / right)
        else:
            stack.append(float(token))

    return double(stack[0])


def parser(expression: str) -> double:  # type: ignore
    tokens = shunting_yard(expression)
    result = evaluate_posfix(tokens)
    
    return result    
