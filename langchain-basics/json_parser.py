from langchain_ollama import ChatOllama
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate


class Joke(BaseModel):
    """A joke with a setup and punchline."""

    setup: str = Field(description="question to set up a joke")
    punchline: str = Field(description="answer to resolve the joke")


llm = ChatOllama(model="phi", temperature=0.1)
output_parser = JsonOutputParser(pydantic_object=Joke)

joke_query = "Tell me a joke."
# Get the formatting instructions for the output parser
# This generates guidance text that tells the LLM how to format its response
format_instructions = output_parser.get_format_instructions()

# Create a prompt template that includes:
# 1. Instructions for the LLM to answer the user's query
# 2. Format instructions to ensure the LLM returns properly structured data
# 3. The actual user query placeholder
prompt = PromptTemplate(
    template="Answer the user query.\n{format_instructions}\n{query}\n",
    input_variables=[
        "query"
    ],  # Dynamic variables that will be provided when invoking the chain
    partial_variables={
        "format_instructions": format_instructions
    },  # Static variables set once when creating the prompt
)

chain = prompt | llm | output_parser

# Invoke the chain with a specific query about jokes
# This will:
# 1. Format the prompt with the joke query
# 2. Send it to Llama
# 3. Parse the response into the structure defined by your output parser
# 4. Return the structured result
result = chain.invoke({"query": joke_query})
print(result)
