# Author: Timi
# File: symptomps.py
# Created: 2026-02-27T13:27:54.315Z
# Description: Desc

import sqlite3
import random
from pathlib import Path
import datetime

BASE_DIR = Path(__file__).resolve().parent
DB_USERS = BASE_DIR / "users.db"
DB_FOODS = BASE_DIR / "foods.db"


def create_database():
    conn = sqlite3.connect(DB_FOODS)
    cursor = conn.cursor()

    # Food table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS food_diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            food_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            creation_date TEXT NOT NULL
        )
    """)

    # Symptoms table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS symptoms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
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

    conn = sqlite3.connect(DB_FOODS)
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