from langchain_ollama import ChatOllama
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate

# Create your JSON parser
json_parser = JsonOutputParser()

# Create the LLM instance
llm = ChatOllama(model="phi", temperature=0.1)

# Create more explicit format instructions
format_instructions = """RESPONSE FORMAT: Return ONLY a single JSON object—no markdown, no examples, no extra keys.  It must look exactly like:
{
  "title": "movie title",
  "director": "director name",
  "year": 2000,
  "genre": "movie genre"
}

IMPORTANT: Your response must be *only* that JSON.  Do NOT include any illustrative or example JSON."""

# Create your prompt template with clearer instructions
prompt_template = PromptTemplate(
    template="""You are a JSON-only assistant.
    Task: Generate info about the movie "{movie_name}" in JSON format.
    {format_instructions}""",
    input_variables=["movie_name"],
    partial_variables={"format_instructions": format_instructions},
)

# Create the chain without cleaning step
movie_chain = prompt_template | llm | json_parser

# Test with a movie name
movie_name = "Three Idiots"
result = movie_chain.invoke({"movie_name": movie_name})

# Print the structured result
print("Parsed result:")
print(f"Title: {result['title']}")
print(f"Director: {result['director']}")
print(f"Year: {result['year']}")
print(f"Genre: {result['genre']}")
