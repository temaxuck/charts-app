from numbers import Number
from random import random


class ChartData:
    __slots__ = ("current_value", "max_value")

    def __init__(self):
        initial = random() * 100
        appandage = random() * 100
        # range of current_value is [0..100]
        self.current_value = initial
        # range of max_value is [current_value..current_value+100]
        self.max_value = initial + appandage
