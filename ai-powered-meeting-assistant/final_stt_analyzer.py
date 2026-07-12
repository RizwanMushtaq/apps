from transformers import pipeline
import gradio as gr

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

pipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-tiny.en",
    chunk_length_s=30,
)


# Function to transcribe audio using the OpenAI Whisper model
def transcript_audio(audio_file):
    if not audio_file:
        return "Please upload an audio file."

    # Transcribe the audio file and return the result
    result = pipe(audio_file, batch_size=8)["text"]

    messages = [
        {
            "role": "system",
            "content": "You are a helpful meeting assistant. Summarize the meeting in 2-3 lines and provide action items.",
        },
        {
            "role": "user",
            "content": result,
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

    return response


# Set up Gradio interface
audio_input = gr.Audio(sources="upload", type="filepath")  # Audio input
output_text = gr.Textbox()  # Text output


# Create the Gradio interface with the function, inputs, and outputs
iface = gr.Interface(
    fn=transcript_audio,
    inputs=audio_input,
    outputs=output_text,
    title="Audio Transcription App",
    description="Upload the audio file",
)

# Launch the Gradio app
iface.launch(server_name="0.0.0.0", server_port=7860)
