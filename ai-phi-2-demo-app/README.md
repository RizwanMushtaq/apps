# Simple CLI Chatbot using Phi Model (Ollama)

## 1. Introduction

This is a **minimal CLI chatbot** that runs locally on your laptop using an open-source LLM.  
The chatbot uses **Ollama** to run a lightweight language model (`phi`) and Python to create a simple interactive terminal interface.

**Features**

- Runs fully offline
- Lightweight (works on 8GB RAM)
- Simple CLI interface
- Conversation memory
- Easy to modify

---

## 2. What is Ollama?

Ollama is a tool that lets you **run large language models locally** on your machine.  
It handles:

- Downloading models
- Running them efficiently (CPU/GPU)
- Providing a local API
- Managing quantization and memory

In this project, Ollama runs the **Phi model** and the Python script communicates with it.

---

systemctl status ollama
systemctl disable ollama

## 3. Prerequisites

Make sure you have:

- Ubuntu / Linux
- Python 3.8+
- `curl` (used for installing Ollama)
- Internet connection (only required for first model download)

Check Python:

```bash
python3 --version
```

## 4. Python virtual environment (recommended)

Create a new virtual environment (recommended to keep things isolated)

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

Install Python dependencies

```bash
pip install -r requirements.txt
```

## 5. Install Ollama

Install Ollama (if not already installed):

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama --version
```

## 6. Start Ollama and pull the Phi model

Ollama will run a local service that the demo talks to. Pull the model and start the server (if not already running):

```bash
ollama pull phi
ollama serve
```

You can check running models and status with:

```bash
ollama ps
ollama list
```

If Ollama is installed as a system service on your machine, manage it with `systemctl`:

```bash
systemctl status ollama
systemctl stop ollama
systemctl disable ollama
```

## 7. Run the application

1. Activate your virtual environment (see section 4):

```bash
source .venv/bin/activate
```

2. Run the demo script:

```bash
python demo.py
```

The script will connect to the local Ollama service and start the CLI chatbot.

## 8. Troubleshooting tips

- If you see connection issues, ensure `ollama serve` is running and the `phi` model is pulled.
- To run without activating the venv, call the venv Python directly (see above).
- Use `pip show <package>` to confirm dependencies are installed from `requirements.txt`.
