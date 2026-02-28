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

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS food_diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            food_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            ingredients TEXT NOT NULL,
            allergen TEXT NOT NULL,
            creation_date TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """
    )

    conn.commit()
    conn.close()
    return {"status": "sucess"}


def generate_sample_data():
    food_data = {
        "Banana": {"ingredients": "Banana", "allergen": "None"},
        "Cabbage Soup": {
            "ingredients": "Cabbage, Carrot, Onion, Vegetable Broth",
            "allergen": "None",
        },
        "Chicken Wrap": {
            "ingredients": "Chicken, Tortilla, Lettuce, Tomato, Sauce",
            "allergen": "Gluten",
        },
        "Grilled Salmon": {
            "ingredients": "Salmon, Olive Oil, Lemon",
            "allergen": "Fish",
        },
        "Oatmeal": {"ingredients": "Oats, Milk, Honey", "allergen": "Dairy"},
        "Scrambled Eggs": {"ingredients": "Eggs, Butter, Salt", "allergen": "Egg"},
        "Greek Yogurt": {"ingredients": "Milk, Live Cultures", "allergen": "Dairy"},
        "Beef Stir Fry": {
            "ingredients": "Beef, Soy Sauce, Vegetables",
            "allergen": "Soy",
        },
        "Pasta Bolognese": {
            "ingredients": "Pasta, Beef, Tomato Sauce",
            "allergen": "Gluten",
        },
        "Protein Shake": {
            "ingredients": "Milk, Whey Protein, Banana",
            "allergen": "Dairy",
        },
    }

    conn = sqlite3.connect(DB_FOODS)
    cursor = conn.cursor()

    start_date = datetime.datetime(2026, 2, 1)
    end_date = datetime.datetime(2026, 2, 28)

    for user_id in range(1, 11):
        num_entries = random.randint(3, 10)

        for _ in range(num_entries):
            food = random.choice(list(food_data.keys()))
            quantity = random.randint(1, 5)

            ingredients = food_data[food]["ingredients"]
            allergen = food_data[food]["allergen"]

            random_seconds = random.randint(
                0, int((end_date - start_date).total_seconds())
            )

            random_date = start_date + datetime.timedelta(seconds=random_seconds)

            cursor.execute(
                """
                INSERT INTO food_diary 
                (user_id, food_name, quantity, ingredients, allergen, creation_date)
                VALUES (?, ?, ?, ?, ?, ?)
            """,
                (
                    user_id,
                    food,
                    quantity,
                    ingredients,
                    allergen,
                    random_date.isoformat(),
                ),
            )

    conn.commit()
    conn.close()
    return {"status": "sucess"}


class ManageFood:
    def __init__(self):
        pass

    def add_item(
        self, user_id, food_name, ingredients, allergen, quantity, creation_date
    ):

        print(user_id, food_name, ingredients, allergen, quantity, creation_date)
        conn = sqlite3.connect(DB_FOODS)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO food_diary (user_id, food_name, quantity, ingredients, allergen, creation_date)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (user_id, food_name, quantity, ingredients, allergen, creation_date),
        )

        conn.commit()
        conn.close()

        return {"status": "sucess"}

    def modify_item(
        self,
        item_id,
        user_id,
        food_name,
        ingredients,
        allergen,
        quantity,
        creation_date,
    ):
        conn = sqlite3.connect(DB_FOODS)
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE food_diary
            SET user_id = ?,
                food_name = ?,
                quantity = ?,
                ingredients = ?,
                allergen = ?,
                creation_date = ?
            WHERE id = ?
            """,
            (
                user_id,
                food_name,
                quantity,
                ingredients,
                allergen,
                creation_date,
                item_id,
            ),
        )

        updated = cursor.rowcount

        conn.commit()
        conn.close()

        if updated == 0:
            return {"error": "not found"}
        return {"status": "sucess"}

    def delete_item(self, item_id):
        conn = sqlite3.connect(DB_FOODS)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM food_diary WHERE id = ?", (item_id,))

        conn.commit()
        conn.close()

        return {"status": "sucess"}

    def get_items(self, user_id):
        conn = sqlite3.connect(DB_FOODS)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM food_diary WHERE user_id = ?", (user_id,))

        items = [dict(row) for row in cursor.fetchall()]

        conn.close()
        return items


if __name__ == "__main__":
    pass
    # create_database()
    # # generate_sample_data()
    # name = "Burrito"
    # name, ingredients, allergen = test(name)
    # print(ingredients, allergen)
    # ManageFood_Class = ManageFood(DB_FOODS)
    # # ManageFood_Class.add_item(2,"Shrimp", 5)
    # # ManageFood_Class.delete_item(72)
    # items = ManageFood_Class.list_items_userid(1)
    # print(items)


# name = "Burrito"
# name, ingredients, allergen = test(name)
# print("ing", ingredients)
# print("all:", allergen)

ManageFood_Class = ManageFood()
