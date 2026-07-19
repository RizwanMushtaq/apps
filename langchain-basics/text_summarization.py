from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOllama(model="phi", temperature=0.1)
output_parser = StrOutputParser()
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert summarizer. Provide a concise summary of the following text in 2-3 sentences.",
        ),
        ("user", "Text to summarize:\n\n{text}"),
    ]
)

chain = prompt | llm | output_parser

# 5. Execute the chain
text_to_summarize = """
LangChain Expression Language (LCEL) is a declarative way to compose chains in LangChain. 
It makes it easy to build complex pipelines by chaining different components together using the pipe (|) operator. 
Every component in LCEL implements the Runnable interface, meaning that the output of one component is automatically 
passed as the input to the next. This allows for native support of streaming, batching, and async operations.
"""

summary = chain.invoke({"text": text_to_summarize})

print(summary)
