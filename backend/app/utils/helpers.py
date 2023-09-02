import math
import random


def generate_otc(n: int = 6) -> str:
    return ''.join([str(math.floor(random.random() * 10)) for i in range(n)])
