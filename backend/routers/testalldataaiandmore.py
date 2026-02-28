# # Author: Timi
# # File: testalldataaiandmore.py
# # Created: 2026-02-27T23:47:30.795Z
# # Description: Desc

# from dbCalls.usersCalls import ManageUser
# from dbCalls.fooddata import ManageFood
# from dbCalls.symptomps import ManageSymptom

# from AI.AI_test import *

# ManageUser_Class = ManageUser()
# ManageFood_Class = ManageFood()
# ManageSymptom_Class = ManageSymptom()

# # ManageFood_Class = ManageFood()
# # ManageSymptom_Class = ManageSymptom()



# # USER
# #         cursor.execute(
# #             """
# #         CREATE TABLE IF NOT EXISTS items (
# #             id INTEGER PRIMARY KEY AUTOINCREMENT,
# #             email TEXT UNIQUE NOT NULL,
# #             first TEXT NOT NULL,
# #             last TEXT NOT NULL,
# #             pwd TEXT NOT NULL
# #         )
# #     """
# #         )




# # FOOD
# #     cursor.execute("""
# #         CREATE TABLE IF NOT EXISTS food_diary (
# #             id INTEGER PRIMARY KEY AUTOINCREMENT,
# #             user_id INTEGER NOT NULL,
# #             food_name TEXT NOT NULL,
# #             quantity INTEGER NOT NULL,
# #             ingredients TEXT NOT NULL,
# #             allergen TEXT NOT NULL,
# #             creation_date TEXT DEFAULT CURRENT_TIMESTAMP
# #         )
# #     """
# #     )




# # SYM 
# #     cursor.execute("""
# #         CREATE TABLE IF NOT EXISTS symptoms (
# #             id INTEGER PRIMARY KEY AUTOINCREMENT,
# #             user_id INTEGER NOT NULL,
# #             severity INTEGER NOT NULL,
# #             symptom TEXT NOT NULL,
# #             creation_date TEXT NOT NULL
# #         )
# #     """)




# #################### ADD ITEM #######################
# # ManageUser_Class.add_item_user(email="h@h.h", first="hFirs", last="hLast", pwd="hPwd")
# # ManageFood_Class.add_item(user_id=1,food_name="Hal", ingredients="Fish", allergen="Fish", quantity=1, creation_date="2026-02-07T17:55:57")
# # ManageSymptom_Class.add_item(user_id=1,severity=2,symptom="Headache", creation_date="2026-02-07T17:55:57")


# #################### DELETE ITEM #######################
# # ManageUser_Class.delete_item(2)
# # ManageFood_Class.delete_item(2)
# # ManageSymptom_Class.delete_item(2)

# #################### MODIFY ITEM #######################
# # ManageUser_Class.modify_item("3", "2", "2","2", "2")
# # ManageFood_Class.modify_item(3,2,2,2,2,2,2)
# # ManageSymptom_Class.modify_item(3,2,2,2,2)


# #################### GET ITEM(S) #######################
# # result = ManageUser_Class.get_name_by_id(3)
# # result = ManageFood_Class.get_items(3)
# # result = ManageSymptom_Class.get_items(3)

# # print(result)



# ################### AI ####################
# # foods = ManageFood_Class.get_items(3)
# # symptom = ManageSymptom_Class.get_items(3)
# # analyze_correlation(foods, symptom)


# ManageUser_Class.add_item_user(
#     email="perfect@perfect.com",
#     first="Perfect",
#     last="User",
#     pwd="perfect123"
# )

# user_id = 6


# foods = [
#     ("Oatmeal", "Oats, Milk", "Gluten", 2),
#     ("Eggs", "Eggs", "Egg", 3),
#     ("Coffee", "Coffee Beans", "Caffeine", 1),
#     ("Pizza", "Flour, Cheese, Tomato", "Gluten, Dairy", 5),
#     ("Salmon", "Fish", "Fish", 2),
#     ("Chicken Salad", "Chicken, Lettuce", None, 3),
#     ("Chocolate", "Cocoa", None, 2),
#     ("Banana", "Banana", None, 1),
#     ("Yogurt", "Milk", "Dairy", 2),
#     ("Apple", "Apple", None, 1),
#     ("Burger", "Beef, Bread", "Gluten", 5),
#     ("Pasta", "Wheat", "Gluten", 4),
#     ("Orange Juice", "Orange", None, 1),
#     ("Almonds", "Nuts", "Nuts", 1),
#     ("Ice Cream", "Milk, Sugar", "Dairy", 3)
# ]

# symptoms = [
#     ("Headache", 3),
#     ("Bloating", 4),
#     ("Nausea", 3),
#     ("Fatigue", 2),
#     ("Stomach Pain", 5),
#     ("Skin Rash", 4),
#     ("Dizziness", 3),
#     ("Acid Reflux", 4),
#     ("Brain Fog", 2),
#     ("Itching", 3),
#     ("Muscle Pain", 2),
#     ("Diarrhea", 5),
#     ("Constipation", 3),
#     ("Heartburn", 4),
#     ("Allergy Swelling", 5)
# ]

# # Insert foods (spread over time)
# from datetime import datetime, timedelta

# base_time = datetime(2026, 2, 7, 8, 0, 0)

# for i, food in enumerate(foods):
#     ManageFood_Class.add_item(
#         user_id=user_id,
#         food_name=food[0],
#         ingredients=food[1],
#         allergen=food[2] or "",
#         quantity=food[3],
#         creation_date=(base_time + timedelta(hours=i*3)).isoformat()
#     )

# # Pasta → Bloating + Stomach Pain
# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Bloating",
#     severity=4,
#     creation_date=(base_time + timedelta(hours=4)).isoformat()
# )

# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Stomach Pain",
#     severity=5,
#     creation_date=(base_time + timedelta(hours=4, minutes=30)).isoformat()
# )

# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Bloating",
#     severity=4,
#     creation_date=(base_time + timedelta(hours=13)).isoformat()
# )



# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Headache",
#     severity=3,
#     creation_date=(base_time + timedelta(hours=2)).isoformat()
# )

# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Fatigue",
#     severity=2,
#     creation_date=(base_time + timedelta(hours=2, minutes=40)).isoformat()
# )


# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Nausea",
#     severity=3,
#     creation_date=(base_time + timedelta(hours=7)).isoformat()
# )

# ManageSymptom_Class.add_item(
#     user_id=user_id,
#     symptom="Dizziness",
#     severity=3,
#     creation_date=(base_time + timedelta(hours=7, minutes=45)).isoformat()
# )