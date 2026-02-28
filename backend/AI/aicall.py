import csv
import json
from openai import AzureOpenAI
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

# Azure config
endpoint = os.getenv("AZURE_ENDPOINT")
deployment = "gpt-5.2-chat"
subscription_key = os.getenv("AZURE_API_KEY")
api_version = "2024-12-01-preview"


# --- CSV ÚTVONAL ---
BASE_DIR = Path(__file__).resolve().parent.parent 
CSV_PATH = BASE_DIR.parent / "other" / "FOOD_DATASETS" / "food_ingredients_and_allergens.csv"

FIELDS = ["Ingredients, Allergens"]

def test(food_to_find):
    # 1. Ellenőrzés a CSV-ben
    if CSV_PATH.exists():
        with open(CSV_PATH, mode='r', encoding='utf-8', newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['Food Product'].lower() == food_to_find.lower():
                    all_ing = [row['Main Ingredient'], row['Sweetener'], row['Fat/Oil'], row['Seasoning']]
                    clean_ing = ", ".join([i for i in all_ing if i and i.lower() != 'none'])
                    print(f"✅ Megtalálva a CSV-ben: {food_to_find}")
                    return row['Food Product'], clean_ing, row['Allergens']

    # 2. AI hívás
    print(f"🔍 '{food_to_find}' nincs a CSV-ben. AI hívása...")
    client = AzureOpenAI(api_version=api_version, azure_endpoint=endpoint, api_key=subscription_key)
    prompt = f'Provide details for "{food_to_find}" in JSON format using these keys: {FIELDS}.'

    try:
        response = client.chat.completions.create(
            model=deployment,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        new_data = json.loads(response.choices[0].message.content)

        # 3. Írás CSV-be új sorban
        file_exists = CSV_PATH.exists()
        with open(CSV_PATH, mode='a', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=FIELDS)
            # Ha a fájl üres, írjuk a fejlécet
            if not file_exists or CSV_PATH.stat().st_size == 0:
                writer.writeheader()
            writer.writerow({k: new_data.get(k, "") for k in FIELDS})

        ai_ing_list = [new_data.get('Main Ingredient'), new_data.get('Sweetener'),
                       new_data.get('Fat/Oil'), new_data.get('Seasoning')]
        clean_ai_ing = ", ".join([i for i in ai_ing_list if i and i.lower() != 'none'])

        print(f"✨ '{food_to_find}' rögzítve a CSV-be.")
        return new_data['Food Product'], clean_ai_ing, new_data['Allergens']

    except Exception as e:
        print(f"❌ Hiba történt: {e}")
        return food_to_find, "Unknown", "None"
