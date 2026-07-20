from langchain_ollama import ChatOllama
from langchain_core.output_parsers import CommaSeparatedListOutputParser
from langchain_core.prompts import PromptTemplate

llm = ChatOllama(model="phi", temperature=0.1)

# Create an instance of the parser that will convert comma-separated text into a Python list
output_parser = CommaSeparatedListOutputParser()

# Get formatting instructions that will tell the LLM how to structure its response
# These instructions explain to the LLM that it should return items in a comma-separated format
format_instructions = output_parser.get_format_instructions()

# Create a prompt template that:
# 1. Instructs the LLM to answer the user query
# 2. Includes format instructions so the LLM knows to respond with comma-separated values
# 3. Asks the LLM to list five items of the specified subject
prompt = PromptTemplate(
    template="Answer the user query. {format_instructions}\nList five {subject}.",
    input_variables=[
        "subject"
    ],  # This variable will be provided when the chain is invoked
    partial_variables={
        "format_instructions": format_instructions
    },  # This variable is set once when creating the prompt
)

# Build a processing chain that:
# 1. Takes the subject and formats it into the prompt template
# 2. Sends the formatted prompt to the Llama LLM
# 3. Parses the LLM's response into a Python list using the CommaSeparatedListOutputParser
chain = prompt | llm | output_parser

# Invoke the processing chain with "ice cream flavors" as the subject
# This will:
# 1. Substitute "ice cream flavors" into the prompt template
# 2. Send the formatted prompt to the Llama LLM
# 3. Parse the LLM's comma-separated response into a Python list
result = chain.invoke({"subject": "ice cream flavors"})
print(result)
