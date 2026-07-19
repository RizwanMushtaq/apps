"""tutorial for using PromptTemplate in LangChain."""

from langchain_core.prompts import PromptTemplate
from langchain_ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser

llm = ChatOllama(model="llama3", temperature=0.7)
output_parser = StrOutputParser()

string_template = PromptTemplate.from_template(
    "You are an expert chef. Give me a 3-ingredient recipe using {ingredient}."
)

chain = string_template | llm | output_parser
result = chain.invoke({"ingredient": "eggs"})
print(result)
