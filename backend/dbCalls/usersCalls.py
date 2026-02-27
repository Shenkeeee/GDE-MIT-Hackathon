# Author: Mate, Timi
# File: usersCalls.py
# Created: 2026-02-26T23:12:34.068Z
# Description: User setter

import hashlib
import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DB_USERS = BASE_DIR / "DB" / "users.db"
DB_FOODS = BASE_DIR / "DB" / "foods.db"
DB_SYMPTOM = BASE_DIR / "DB" / "symptom.db"


class UserSetter:
    def __init__(self) -> None:
        self.items = 0

    def get(self):
        items = {}
        for i in range(10):
            items[i] = i
        items["db"] = self.items

        return items


class UserCreator:
    def __init__(self, userdb_path):
        self.user_db = userdb_path

    def create_database(self, DB):
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute(
            """
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            first TEXT NOT NULL,
            last TEXT NOT NULL,
            pwd TEXT NOT NULL
        )
    """
        )

        conn.commit()
        conn.close()

    def add_item(self, DB, email, first, last, pwd):

        conn = sqlite3.connect(self.user_db)
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO items (email, first, last, pwd) VALUES (?, ?, ?, ?)",
            (email, first, last, pwd),
        )

        conn.commit()
        conn.close()

    def hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def add_item_user(self, email, first, last, pwd):
        conn = sqlite3.connect(DB_USERS)
        cursor = conn.cursor()

        hashed_pwd = self.hash_password(pwd)

        try:
            cursor.execute(
                "INSERT INTO items (email, first, last, pwd) VALUES (?, ?, ?, ?)",
                (email, first, last, hashed_pwd),
            )
            conn.commit()

            user_id = cursor.lastrowid  # Get the generated ID
            conn.close()

            return {
                "status": "success",
                "message": "User created successfully",
                "user_id": user_id,
            }

        except sqlite3.IntegrityError:
            conn.close()
            return {"status": "error", "message": "Email already exists"}

    def get_logindata(self, email, pwd):
        conn = sqlite3.connect(DB_USERS)
        cursor = conn.cursor()

        # Step 1: Check if email exists
        cursor.execute("SELECT id, pwd FROM items WHERE email = ?", (email,))

        result = cursor.fetchone()

        if not result:
            conn.close()
            return {"status": "error", "message": "Email doesnt exists"}

        user_id, stored_pwd = result
        hashed_pwd = self.hash_password(pwd)

        # Step 2: Check password
        if hashed_pwd != stored_pwd:
            conn.close()
            return {"status": "error", "message": "Password doesnt match"}

        conn.close()
        return {"status": "success", "userId": user_id}

    def get_all_items(self, DB):
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM items")
        rows = cursor.fetchall()

        conn.close()
        return rows

    def get_item_by_id(self, DB, item_id):
        conn = sqlite3.connect(DB)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
        row = cursor.fetchone()

        conn.close()
        return row


if __name__ == "__main__":
    pass
    # RUN THIS ON INIT
    # # Step 1: Create DB + table
    # UserCreator_Class = UserCreator(DB_USERS)
    # UserCreator_Class.create_database(DB_USERS)
    # # UserCreator_Class.create_database(DB_FOODS)

    # # Step 2: Add sample items
    # UserCreator_Class.add_item_user("testiiii", "First", "Last", "myPassword")

    # Step 3: Fetch and print all items
    # print("All items:")
    # for item in UserCreator_Class.get_all_items(DB_USERS):
    #     print(item)

    # # Step 4: Fetch single item
    # print("\nItem with ID 1:")
    # print(UserCreator_Class.get_item_by_id(DB_USERS, (1)))
