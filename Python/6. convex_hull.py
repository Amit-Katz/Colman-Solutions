import math
from functools import cmp_to_key


def findBottomLeft(points: list):
    most_lower_left_point = points[0]

    for point in points[1:]:
        if point.y < most_lower_left_point.y or (
            point.y == most_lower_left_point.y and point.x < most_lower_left_point.x
        ):
            most_lower_left_point = point

    return most_lower_left_point


def sortCCW(points: list):
    reference_point = findBottomLeft(points)

    def polar_angle_cmp(p1, p2):
        angle1 = math.atan2(p1.y - reference_point.y, p1.x - reference_point.x)
        angle2 = math.atan2(p2.y - reference_point.y, p2.x - reference_point.x)

        if angle1 < angle2:
            return -1
        elif angle1 > angle2:
            return 1
        else:
            dist1 = (p1.x - reference_point.x) ** 2 + (p1.y - reference_point.y) ** 2
            dist2 = (p2.x - reference_point.x) ** 2 + (p2.y - reference_point.y) ** 2

            if dist1 < dist2:
                return -1
            elif dist1 > dist2:
                return 1
            else:
                return 0

    points.sort(key=cmp_to_key(polar_angle_cmp))
    return points


def isLeftTurn(p1, p2, p3):
    cross_product = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)
    return cross_product > 0


def grahamScan(points: list):
    sortCCW(points)
    convex_hull = [points[0], points[1], points[2]]

    for i in range(3, len(points)):
        while len(convex_hull) > 1 and not isLeftTurn(
            convex_hull[-2], convex_hull[-1], points[i]
        ):
            convex_hull.pop()

        convex_hull.append(points[i])

    convex_hull.append(convex_hull[0])
    return convex_hull
