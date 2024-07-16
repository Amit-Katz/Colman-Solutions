def allSumsDP(arr):
    n = len(arr)
    dp = [set() for _ in range(n + 1)]

    dp[0].add(0)

    for i in range(n):
        for s in dp[i]:
            dp[i + 1].add(s + arr[i])
            dp[i + 1].add(s)

    return dp[n]