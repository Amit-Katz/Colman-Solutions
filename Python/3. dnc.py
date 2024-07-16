def dnc(baseFunc, combineFunc):
    def res(arr):
        if len(arr) == 1:
            return baseFunc(arr[0])

        A = arr[: len(arr) // 2]
        B = arr[len(arr) // 2 :]

        return combineFunc(res(A), res(B))

    return res


def maxAreaHist(hist):
    stack = []
    max_area = 0
    index = 0

    while index < len(hist):
        if not stack or hist[index] >= hist[stack[-1]]:
            stack.append(index)
            index += 1
        else:
            top_of_stack = stack.pop()
            if stack:
                area = hist[top_of_stack] * (index - stack[-1] - 1)
            else:
                area = hist[top_of_stack] * index
            max_area = max(max_area, area)

    while stack:
        top_of_stack = stack.pop()
        if stack:
            area = hist[top_of_stack] * (index - stack[-1] - 1)
        else:
            area = hist[top_of_stack] * index
        max_area = max(max_area, area)

    return max_area
