# Simple Chatbot with Open Source LLMs using Python and Hugging Face

## Introduction: How does a chatbot work?

A chatbot is a computer program that takes a text input and returns a relevant text output. It follows a simple cycle:

1. It receives a message from the user.
2. It processes the message to understand its meaning.
3. It generates a response based on the context.
4. It sends the response back to the user.

Chatbots often use a type of neural network called a transformer. Transformers are designed to understand relationships between words and phrases in a sentence or conversation. Inside this system, a language model (LLM) helps generate human-like responses.

### How the process works

- Input processing: The chatbot breaks the user message into smaller pieces called tokens.
- Context understanding: The model analyzes these tokens and uses patterns it learned during training to understand the message.
- Response generation: The model predicts the next words that should appear in the reply.
- Iterative conversation: As the conversation continues, the chatbot uses both the new input and earlier messages to generate better responses.

The main idea is that the LLM learns from large amounts of text data so it can understand language patterns and generate meaningful replies. The transformer helps process and structure the information so the language model can focus on understanding and generating text.

## Introduction: Hugging Face

Hugging Face is a popular open-source organization focused on machine learning and natural language processing (NLP). It provides tools, libraries, and pretrained models that make it easier to build AI applications.

In this project, you will use the Hugging Face Python library called transformers to work with language models and build chatbot examples.

## Project overview

This project contains two simple chatbot examples that demonstrate different approaches to building conversational AI systems:

- chatbot.py
- chatbot_llm.py

## File details

### chatbot.py

chatbot.py is a beginner-friendly example that shows the basic mechanics of a chatbot. It uses a sequence-to-sequence (Seq2Seq) model, which is a classic architecture for transforming one input sequence into another output sequence.

This file demonstrates:

- how a prompt is manually created
- how text is converted into tokens
- how chat history is stored and reused
- how the model generates a reply from the given input

Because the logic is explicit, this script is helpful for understanding the core workflow behind a chatbot. It is a great starting point for learning about tokenization, input formatting, and response generation.

### chatbot_llm.py

chatbot_llm.py is a more modern chatbot example that uses a causal large language model (LLM). Instead of manually building the prompt, it uses structured conversational messages such as user and assistant.

This file demonstrates:

- how to load a pretrained causal language model
- how to format chat-style inputs
- how to generate responses in a conversational way
- how the model can handle multi-turn dialogue more naturally

This approach is closer to how modern chat assistants are built. The model handles much of the conversation structure for you, making it easier to create a chatbot that feels more natural and interactive.

## Summary

These two files show two different levels of chatbot development:

- chatbot.py focuses on the fundamentals and helps you understand how a chatbot works under the hood.
- chatbot_llm.py uses a more advanced and practical approach with modern language models and conversation formatting.
