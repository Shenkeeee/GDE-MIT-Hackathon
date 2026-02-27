# Author: Timi
# File: symptomps.py
# Created: 2026-02-27T13:27:54.315Z
# Description: Desc

import sqlite3
import random
from pathlib import Path
import datetime

# id
# user_id
# symptom_name
# severity (1–5)
# timestamp


BASE_DIR = Path(__file__).resolve().parent
DB_USERS =  BASE_DIR / "DB" /  "users.db"
DB_FOODS =  BASE_DIR / "DB" /  "foods.db"
DB_SYMPTOM = BASE_DIR / "DB" / "symptom.db"


def create_database():
    conn = sqlite3.connect(DB_SYMPTOM)
    cursor = conn.cursor()


    # Symptoms table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS symptoms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            severity INTEGER NOT NULL,
            symptom TEXT NOT NULL,
            creation_date TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


def generate_symptom_data():
    symptoms_list = [
        "Stomach Cramps",
        "Bloating",
        "Headache",
        "Nausea",
        "Fatigue",
        "Gas",
        "Diarrhea",
        "Constipation",
        "Acid Reflux",
        "Sharp Abdominal Pain"
    ]

    conn = sqlite3.connect(DB_SYMPTOM)
    cursor = conn.cursor()

    start_date = datetime.datetime(2026, 2, 1)
    end_date = datetime.datetime(2026, 2, 28)

    for user_id in range(1, 11):  # Users 1–10
        num_entries = random.randint(3, 15)

        for _ in range(num_entries):
            symptom = random.choice(symptoms_list)

            random_seconds = random.randint(
                0,
                int((end_date - start_date).total_seconds())
            )

            random_date = start_date + datetime.timedelta(seconds=random_seconds)

            cursor.execute("""
                INSERT INTO symptoms (user_id, symptom, creation_date)
                VALUES (?, ?, ?)
            """, (user_id, symptom, random_date.isoformat()))

    conn.commit()
    conn.close()

class ManageSymptom:
    def __init__(self):
        pass


    def add_item(self, user_id, food_name,category, quantity):
        conn = sqlite3.connect(DB_SYMPTOM)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO food_diary (user_id, food_name, quantity, creation_date)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            """,
            (user_id, food_name, category, quantity)
        )

        conn.commit()
        conn.close()

    def delete_item(self,item_id):
        conn = sqlite3.connect(DB_FOODS)
        cursor = conn.cursor()

        cursor.execute(
            "DELETE FROM food_diary WHERE id = ?",
            (item_id,)
        )

        conn.commit()
        conn.close()


    def list_items_userid(self,user_id):
        conn = sqlite3.connect(DB_FOODS)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute(
            "SELECT creation_date, food_name, quantity FROM food_diary WHERE user_id = ?",
            (user_id,)
        )

        items = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return items

if __name__ == "__main__":
    pass
    # create_database()
    # generate_symptom_data()