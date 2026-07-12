from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import warnings

warnings.filterwarnings("ignore")

model_name = "HuggingFaceTB/SmolLM2-360M-Instruct"

print("Loading model...")

tokenizer = AutoTokenizer.from_pretrained(model_name)

tokenizer.pad_token = tokenizer.unk_token

model = AutoModelForCausalLM.from_pretrained(
    model_name, device_map="cpu", torch_dtype=torch.float32
)

messages = [
    {
        "role": "system",
        "content": "You are a helpful meeting assistant. Summarize the meeting in 2-3 lines and provide action items.",
    },
    {
        "role": "user",
        "content": "Good afternoon, everyone. Let’s get started. Today, we are reviewing our timeline for the Project Alpha Q3 launch. Elena, could you start us off with the latest user interface updates?"
        " Thanks, Sarah. Yes, I finished the high-fidelity wireframes for the user dashboard last Friday. I streamlined the navigation menu based on our last round of user feedback. Users found the old layout confusing, so the new version uses collapsible side panels to save space.",
    },
]

tokenized = tokenizer.apply_chat_template(
    messages,
    tokenize=True,
    add_generation_prompt=True,
    return_tensors="pt",
    return_dict=True,
    max_length=512,
)

with torch.inference_mode():
    outputs = model.generate(
        tokenized["input_ids"],
        attention_mask=tokenized["attention_mask"],
        max_new_tokens=60,
        temperature=0.5,
        top_p=0.8,
        do_sample=True,
        repetition_penalty=1.3,
        no_repeat_ngram_size=3,
        pad_token_id=tokenizer.pad_token_id,
    )

response = tokenizer.decode(
    outputs[0][tokenized["input_ids"].shape[-1] :], skip_special_tokens=True
)

print(f"Bot: {response}\n")
