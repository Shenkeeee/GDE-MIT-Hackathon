# Author: Timi
# File: fooddata.py
# Created: 2026-02-27T10:23:56.277Z
# Description: Desc

import sqlite3
import random
from pathlib import Path
import datetime


# FOOD
# id
# user_id
# food_name
# category (carb, dairy, protein, etc.) (AI generated maybe)
# quantity
# timestamp

BASE_DIR = Path(__file__).resolve().parent
DB_USERS = BASE_DIR / "DB" / "users.db"
DB_FOODS = BASE_DIR / "DB" / "foods.db"
DB_SYMPTOM = BASE_DIR / "DB" / "symptom.db"


def create_database():
    conn = sqlite3.connect(DB_FOODS)
    cursor = conn.cursor()

    # Create table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS food_diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            food_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            category TEXT NOT NULL,
            creation_date TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """
    )

    conn.commit()
    conn.close()


def generate_sample_data():
    foods = [
        "Banana",
        "Cabbage Soup",
        "Chicken Wrap",
        "Grilled Salmon",
        "Oatmeal",
        "Scrambled Eggs",
        "Avocado Toast",
        "Greek Yogurt",
        "Beef Stir Fry",
        "Pasta Bolognese",
        "Caesar Salad",
        "Turkey Sandwich",
        "Apple",
        "Protein Shake",
        "Vegetable Curry",
    ]

    conn = sqlite3.connect(DB_FOODS)
    cursor = conn.cursor()

    # February 2026 date range
    start_date = datetime.datetime(2026, 2, 1)
    end_date = datetime.datetime(2026, 2, 28)

    for user_id in range(1, 11):  # Users 1–10
        num_entries = random.randint(1, 10)
        category = "[]"

        for _ in range(num_entries):
            food = random.choice(foods)
            quantity = random.randint(1, 5)

            # Random date in February 2026
            random_seconds = random.randint(
                0, int((end_date - start_date).total_seconds())
            )

            random_date = start_date + datetime.timedelta(seconds=random_seconds)

            cursor.execute(
                """
                INSERT INTO food_diary (user_id, food_name, quantity, category,creation_date)
                VALUES (?, ?, ?, ?, ?)
            """,
                (user_id, food, quantity, category, random_date.isoformat()),
            )

    conn.commit()
    conn.close()


class ManageFood:
    def __init__(self):
        pass

    def add_item(self, user_id, food_name, category, quantity):
        conn = sqlite3.connect(DB_FOODS)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO food_diary (user_id, food_name, quantity, creation_date)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            """,
            (user_id, food_name, category, quantity),
        )

        conn.commit()
        conn.close()

    def delete_item(self, item_id):
        conn = sqlite3.connect(DB_FOODS)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM food_diary WHERE id = ?", (item_id,))

        conn.commit()
        conn.close()

    def list_items_userid(self, user_id):
        conn = sqlite3.connect(DB_FOODS)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM food_diary WHERE user_id = ?", (user_id,))

        items = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return items


if __name__ == "__main__":
    # create_database()
    # generate_sample_data()
    ManageFood_Class = ManageFood()
    # # ManageFood_Class.add_item(2,"Shrimp", 5)
    # # ManageFood_Class.delete_item(72)
    # items = ManageFood_Class.list_items_userid(2)
    # print(items)

ManageFood_Class = ManageFood()
