import time


s0 = 0
s1 = 1
for x in range(100):
    s1 = s0 + s1
    s0 = s1
    print(s1)

print("*" * 20)


def fib(n):
    if n > 1:
        return fib(n - 1) + fib(n - 2)
    if n == 1:
        return 1
    if n == 0:
        return 0

memo = {0:0, 1:1}
def fib2(n):
    print(memo)
    if not n in memo:
        memo[n] = fib2(n-1)+fib2(n-2)
    return memo[n]

for _ in range(100):
    print(_)
    t = time.clock()
    print(t)
    print(fib(_))
