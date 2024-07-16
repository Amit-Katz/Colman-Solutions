from functools import total_ordering
from random import randrange
from typing import Union


@total_ordering
class Point:
    def __init__(self,x,y):
        self.x = x
        self.y = y

    def __lt__(self,other):
        return self.x < other.x

    def __eq__(self, other):
        return self.x == other.x

    def __repr__(self):
        return f'({self.x}, {self.y})'


@total_ordering
class Node:
    def __init__(self):
        self.value = Point(randrange(0, 101), randrange(0, 101) )
        self.left_child: Union[None, Node] = None
        self.right_child: Union[None, Node] = None

    def __lt__(self, other):
        if other.__class__ is self.__class__:
            return self.value < other.value
        elif other.__class__ is int:
            return self.value.x < other
        else:
            raise TypeError()

    def __eq__(self, other):
        if other.__class__ is self.__class__:
            return self.value == other.value
        elif other.__class__ is int:
            return self.value.x == other
        else:
            raise TypeError()


def BuildTree():
    amount = 1000

    root = Node()
    for i in range(amount - 1):
        new_node = Node()
        pointer = root

        while pointer is not new_node:
            if pointer > new_node:
                if pointer.left_child is None:
                    pointer.left_child = new_node
                    pointer = new_node
                else:
                    pointer = pointer.left_child
            elif pointer < new_node:
                if pointer.right_child is None:
                    pointer.right_child = new_node
                    pointer = new_node
                else:
                    pointer = pointer.right_child
            else:
                break

    return root


def NearestRightPoint(T: Node, x0: int):
    closest: Point = T.value
    pointer: Union[Node, None] = T

    while pointer is not None:
        if pointer.value.x > x0:
            if closest.x < x0:
                closest = pointer.value
            else:
                closest = min(closest, pointer.value)
        if pointer.value.x > x0:
            pointer = pointer.left_child
        else:
            pointer = pointer.right_child

    if closest.x <= x0:
        return Point(0, 0)
    return closest


def main():
    tree = BuildTree()
    line = int(input("Enter line x position:\n"))
    print(NearestRightPoint(tree, line))


if __name__ == '__main__':
    main()
