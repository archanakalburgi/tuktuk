---
layout: post
title: Why deep learning? 
date: 2021-09-21
---

One of the questions I have been trying to answer is why deep learning algorithms over traditional machine learning algorithms. What can we accomplish with deep learning algorithms that we can't with machine learning algorithms. After reflecting on what I had covered while studying Machine Learning(ML) and what I would cover in a deep learning course I was able to answer the question. 

## Machine learning algorithms

<p align="center">
 <img width="1000" height="500" src="/images/themes_ml.jpg">
</p>

There are numerous ML algorithms, for a better understanding we can classify them under three themes.
1. Mathematical theme
    - Algorithms based on probability
        - Example: Maximum likelihood classification
    - Algorithms based on distance
        - Example: knn
    - Linear algebraic model 
        - Example: SVM, linear regression, logistic regression, perceptron
2. Machine learning theme 
    - Supervised machine learning algorithms 
        - Examples: Naive bayes, decision trees, SVM, knn
    - Unsupervised machine learning algorithms
        - Examples: k-means clustering 
    - Reinforcement learning 
3. Based on problem statement
    - Classification, for discrete variables
        - Examples: Naive Bayes, SVM, etc
    - Regression, for continuous variables 
        - Examples: Linear regression

All these algorithms can classify linearly separable data. Data that can be visualized as follows

<p align="center">
 <img width="400" height="400" src="/images/linearly_sep.jpg">
</p>

- We can perfectly find a hyperplane(blue line) for classifying the blue dots and the red dots into their respective classes 

But how can we classify non-separable data points(something like the following), can we use multiple models, is there a simpler way to achieve this? 

<p align="center">
 <img width="400" height="400" src="/images/non_linearly_sep.jpg">
</p>

- To classify the above points into red, blue, and black classes we need a complex model. This is where deep learning(DL) algorithms can be helpful. With DL algorithm we can classify the data points into red, blue and black classes (multi label). 

In conclusion, deep learning algorithms are used when 
- Data set is non-linearly separable.
- The data size is large. 
- Amount of time available for training the data is reasonable.