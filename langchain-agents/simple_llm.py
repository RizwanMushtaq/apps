from ollama import Client

client = Client()

messages = [
    {
        "role": "user",
        "content": "Why is your name?",
    },
]

response = client.chat("phi", messages=messages)
print(response)

# for part in client.chat("phi", messages=messages, stream=True):
#     print(part["message"]["content"], end="", flush=True)
