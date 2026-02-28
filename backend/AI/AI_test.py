import os
from openai import AzureOpenAI
from dotenv import load_dotenv

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

# Azure config
endpoint = os.getenv("AZURE_ENDPOINT")
deployment = "gpt-5.2-chat"
subscription_key = os.getenv("AZURE_API_KEY")
api_version = "2024-12-01-preview"

if(endpoint == None):
    print("Env files not found")
    endpoint = ""

print("Done")

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=subscription_key,
)

# # ✅ Read question from file
# user_input = "Is this call working?"

# try:
#     response = client.chat.completions.create(
#         stream=True,
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": user_input}
#         ],
#         max_completion_tokens=2000,
#         model=deployment,
#     )

#     print("\n--- AI Answer ---")
#     for update in response:
#         if update.choices:
#             content = update.choices[0].delta.content
#             if content:
#                 print(content, end="", flush=True)

#     print("\n")

# except Exception as e:
#     print(f"\n❌ Error: {e}")

# finally:
#     client.close()



def analyze_correlation(food_items, symptom_items):

        prompt = f"""
    You are a medical assistant analyzing possible food and symptom correlations.

    IMPORTANT RULES:
    - Never diagnose diseases.
    - Only provide advice and possible correlations.
    - Give long detailed advice.
    - Consider allergens seriously.

    Task:
    Compare food intake and symptoms by date and time.

    Food Items:
    {food_items}

    Symptoms:
    {symptom_items}

    Provide:
    1. Possible correlations
    2. Possible allergens or food triggers
    3. What user should do next
    4. Lifestyle and dietary advice
    """

        try:
            response = client.chat.completions.create(
                model=deployment,
                max_completion_tokens=2000,
                stream=True,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a medical AI assistant that gives long helpful explanations."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            print("\n--- AI Analysis ---")

            for update in response:
                if update.choices:
                    content = update.choices[0].delta.content
                    if content:
                        print(content, end="", flush=True)

            print("\n")

        except Exception as e:
            print(f"Error: {e}")