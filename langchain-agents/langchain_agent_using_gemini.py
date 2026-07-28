import re

from langchain.agents import create_agent
from langchain.tools import tool


@tool
def add_numbers(inputs: str) -> dict:
    """
    Adds a list of numbers provided in the input string.
    Parameters:
    - inputs (str):
    string, it should contain numbers that can be extracted and summed.
    Returns:
    - dict: A dictionary with a single key "result" containing the sum of the numbers.
    Example Input:
    "Add the numbers 10, 20, and 30."
    Example Output:
    {"result": 60}
    """
    # Use regular expressions to extract all numbers from the input
    numbers = [int(num) for num in re.findall(r"\d+", inputs)]
    # numbers = [int(x) for x in inputs.replace(",", "").split() if x.isdigit()]

    result = sum(numbers)
    return {"result": result}


agent = create_agent(
    model="google_genai:gemini-3.1-flash-lite",
    tools=[add_numbers],
    system_prompt="You are a helpful assistant",
)


result = agent.invoke(
    {"messages": [{"role": "user", "content": "Add 10, 20, two and 30"}]}
)
print(result["messages"][-1].content_blocks)

# print(result)

# {
#     "messages": [
#         HumanMessage(
#             content="Add 10, 20, two and 30",
#             additional_kwargs={},
#             response_metadata={},
#             id="21d7eab3-f871-4f00-8511-34439ca92e59",
#         ),
#         AIMessage(
#             content=[],
#             additional_kwargs={
#                 "function_call": {
#                     "name": "add_numbers",
#                     "arguments": '{"inputs": "10, 20, 2, 30"}',
#                 },
#                 "__gemini_function_call_thought_signatures__": {
#                     "d6uhwqro": "EjQKMgERTTIP40XuM35TRoPrx+7qbLNBooHz4XsaOcspcBy0nj5Umrc7tABtwaphGsYcgmWY"
#                 },
#             },
#             response_metadata={
#                 "finish_reason": "STOP",
#                 "model_name": "gemini-3.1-flash-lite",
#                 "safety_ratings": [],
#                 "model_provider": "google_genai",
#             },
#             id="lc_run--019fa86a-93ef-77d0-a197-7c2a9f9987b5-0",
#             tool_calls=[
#                 {
#                     "name": "add_numbers",
#                     "args": {"inputs": "10, 20, 2, 30"},
#                     "id": "d6uhwqro",
#                     "type": "tool_call",
#                 }
#             ],
#             invalid_tool_calls=[],
#             usage_metadata={
#                 "input_tokens": 148,
#                 "output_tokens": 28,
#                 "total_tokens": 176,
#                 "input_token_details": {"cache_read": 0},
#             },
#         ),
#         ToolMessage(
#             content='{"result": 62}',
#             name="add_numbers",
#             id="e1ff5ef5-eb60-4a54-b5d9-0d52ec09d351",
#             tool_call_id="d6uhwqro",
#         ),
#         AIMessage(
#             content=[
#                 {
#                     "type": "text",
#                     "text": "The sum of 10, 20, 2, and 30 is 62.",
#                     "extras": {
#                         "signature": "EjQKMgERTTIPOEZ6qt+Y7CrF1+JVjEnzqAbUIDqripuUZ5ASeGbeyMxHnZ2zI7fMBDQdckuj"
#                     },
#                 }
#             ],
#             additional_kwargs={},
#             response_metadata={
#                 "finish_reason": "STOP",
#                 "model_name": "gemini-3.1-flash-lite",
#                 "safety_ratings": [],
#                 "model_provider": "google_genai",
#             },
#             id="lc_run--019fa86a-9779-7803-be2c-e78bb1d523d8-0",
#             tool_calls=[],
#             invalid_tool_calls=[],
#             usage_metadata={
#                 "input_tokens": 189,
#                 "output_tokens": 23,
#                 "total_tokens": 212,
#                 "input_token_details": {"cache_read": 0},
#             },
#         ),
#     ]
# }
