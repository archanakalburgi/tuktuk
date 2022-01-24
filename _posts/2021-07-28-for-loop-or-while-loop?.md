---
layout: post
title:  "Choosing the loops!"
date:   2021-07-28 
---
Based on my understanding
<p align="center">
  <img width="460" height="300" src="/images/loop.jpg">
</p>

- **for loop** is used when you know how many times you want to iterate over an iterable
- the counter that keep keeps the track of number of times you have iterated over something is incremented or decremented until a condition is met
- where as while loops behaves differently from for loop, although while loop is also used to iterate
- **while loops** are used when you are not sure of how many time you want to iterate 
- a while loop run over a code over and over until a condition becomes  _false_ 
- where as `if condition` lets us run a block of code below it only if the condition is _true_

### Examples: 

#### Search a value 'X'  given a head of a linked list
- in this case we do not know the length the linked list we are just give a value that is present in the linked list and the head of the linked list
- you have loop over the linked list till you find 'X'
- using a while is easier in this case
```sh
while temp.val != 'X': 
    go to next node
```
- the block will loop over every node in the linked list till it finds 'X'.
- once temp.val == 'X' the control exits the while loop.

#### Construct a linked list using a given array
- in this case you are given an array, you know how many time you have to loop over this array to construct a linked list, which would be equal to the length of the given array
- using a for loop in this case will be a wise decision
```sh
for i in array:
    construct a node with val=i 
    attach previous node to the current node 
```

#### A situation where you want to prompt the user to enter a temperature and display "hot" if temperature entered is greater than 100, "cold" if temperature entered is smaller than 60, "just right" if temperature entered is greater than 61 but less than 99, display "good-bye" if temperature entered is 0 and stop prompting once the user enters 0 

#### Using while loop:
```sh
def temperature():
    temp = int(input("Enter temperature : "))
    while temp != 100:
        if temp >= 100:
            print("hot")
        elif temp <= 60:
            print("cold")
        elif temp >= 61 and temp <= 99:
            print("just right")
        temp = int(input("Enter temperature : "))
    print("good-bye!!")
    return temp

temperature()
```
- as an additional step, we could return the last entered temperature by the user
- while loop keeps running till the user enters 100

#### Using for loop:
```sh
import sys
def temperature():
    for _ in range(sys.maxsize**10):
        temp = int(input("Enter temperature : "))
        if temp >= 100:
            print("hot")
        elif -99 <= temp <= 60:
            print("cold")
        elif temp >= 61 and temp <= 99:
            print("just right")
        elif temp == 100:
            print("good-bye!!")
            return temp 

temperature()
```
- instead of using a _return_ statement we could use a _break_ statement which will break out of the loop 

_`while loop` provides dynamic condition execution where as a for a `for loop` the condition for iteration is fixed_

#### Using recursion:
```sh
def temperature_recursion():
    temp = int(input("Enter temperature : "))
    if temp == 100:
        print("good-bye!!")
        return temp
    if temp > 100:
        print("hot")
    if temp < 60:
        print("cold")
    if 61 <= temp <= 99:
        print("just right")
    temperature_recursion()

temperature_recursion() 
```
- with recursion one can avoid making the decision on loops and call the function recursively

_This leaves us with the question of when do we take a recursive approach verses when do we take an iterative approach!_
