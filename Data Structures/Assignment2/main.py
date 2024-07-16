from random import randrange

SEA = 0


class Building:
    def __init__(self, val, index):
        self.height = val
        self.index = index


class Stack:
    def __init__(self):
        self._list = []

        for i in range(50):
            self._list.append(Building(0, i))

        self.head = None

    def IsEmpty(self):
        return self.head is None

    def Pop(self):
        pop_val = self._list[self.head]

        if self.head == 0:
            self.head = None
        else:
            self.head -= 1

        return pop_val

    def Push(self, value, index):
        if self.head is None:
            self.head = 0
        else:
            self.head += 1

        self._list[self.head].height = value
        self._list[self.head].index = index

    def Top(self):
        return self._list[self.head]


def generate_random_buildings():
    return [randrange(1, 101) for _ in range(30)]


def blocking_building(stack: Stack, height):
    """
    :param stack: Current stack of possible blocking buildings
    :param height: A given height of a subject building
    :return: The index of the blocking building if exists, else 0
    """
    while not stack.IsEmpty():
        curr_building = stack.Top()

        if height > curr_building.height:
            stack.Pop()
        else:
            return curr_building.index

    return SEA


def line_of_sight(heights: list):
    """
    :param heights: List of heights of buildings
    :return: List of the indexes of blocking buildings.
                0 for no blocking building
    """
    list_of_sight = []
    stack = Stack()

    for i, height in enumerate(heights):
        list_of_sight.append(blocking_building(stack, height))
        stack.Push(height, i + 1)

    return list_of_sight


def print_lists_together(heights, sights):
    def format_line(height, view, index):
        return f'{index:2}: height: {height:2} sees: {view:2}'
    
    for height, sight, index in zip(heights, sights, range(1, 31)):
        print(format_line(height, sight, index))


if __name__ == '__main__':
    buildings = generate_random_buildings()
    sight_of_buildings = line_of_sight(buildings)
    print_lists_together(buildings, sight_of_buildings)
