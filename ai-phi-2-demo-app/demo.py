import ollama

conversation = []

print("CLI Chatbot (type 'exit' to quit)")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        break

    conversation.append({"role": "user", "content": user_input})
    response = ollama.chat(model="phi:latest", messages=conversation)
    reply = response["message"]["content"]
    print("Bot:", reply)
    conversation.append({"role": "assistant", "content": reply})
