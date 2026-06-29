import json
import os

MEMORY_FOLDER = "memory"
MEMORY_FILE = os.path.join(MEMORY_FOLDER, "customer_memory.json")


def load_previous_memory():

    os.makedirs(MEMORY_FOLDER, exist_ok=True)

    if not os.path.exists(MEMORY_FILE):
        return None

    try:
        with open(MEMORY_FILE, "r") as f:
            return json.load(f)
    except:
        return None


def save_memory(context):

    os.makedirs(MEMORY_FOLDER, exist_ok=True)

    with open(MEMORY_FILE, "w") as f:
        json.dump(context, f, indent=4)


def remember_customer(context):

    previous = load_previous_memory()

    save_memory(context)

    return previous