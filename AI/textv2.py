import os
from openai import AzureOpenAI

# Használd a saját, már működő adataidat!


client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=subscription_key,
)

user_input = input("Mit szeretnél kérdezni? ")

try:
    response = client.chat.completions.create(
        stream=True,
        messages=[
            {"role": "system", "content": "Te egy segítőkész asszisztens vagy."},
            {"role": "user", "content": user_input}
        ],
        # Itt a javítás: max_tokens helyett max_completion_tokens
        max_completion_tokens=2000, 
        model=deployment,
    )

    print("\n--- AI Válasza: ---")
    for update in response:
        if update.choices:
            content = update.choices[0].delta.content
            if content:
                print(content, end="", flush=True)
    print("\n")

except Exception as e:
    print(f"\n❌ Hiba történt: {e}")

finally:
    client.close()