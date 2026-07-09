import gradio as gr
import numpy as np
from PIL import Image
from transformers import AutoProcessor, BlipForConditionalGeneration

# Load the pretrained processor and model
processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)


def generate_caption(image_path: np.ndarray) -> str:
    # convert it into an RGB format
    image = Image.fromarray(image_path).convert("RGB")

    text = "the image of"
    inputs = processor(images=image, text=text, return_tensors="pt")

    # Generate a caption for the image
    outputs = model.generate(**inputs, max_length=50)

    # Decode the generated tokens to text
    caption = processor.decode(outputs[0], skip_special_tokens=True)
    return caption


iface = gr.Interface(
    fn=generate_caption,
    inputs=gr.Image(),
    outputs="text",
    title="Image Captioning",
    description="This is a simple web app for generating captions for images using a trained model.",
)

iface.launch()
