# Author: Timi
# File: testalldataaiandmore.py
# Created: 2026-02-27T23:47:30.795Z
# Description: Desc

from dbCalls.usersCalls import ManageUser
from dbCalls.fooddata import ManageFood
from dbCalls.symptomps import ManageSymptom

from AI.AI_test import *

ManageUser_Class = ManageUser()
ManageFood_Class = ManageFood()
ManageSymptom_Class = ManageSymptom()

# ManageFood_Class = ManageFood()
# ManageSymptom_Class = ManageSymptom()



# USER
#         cursor.execute(
#             """
#         CREATE TABLE IF NOT EXISTS items (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             email TEXT UNIQUE NOT NULL,
#             first TEXT NOT NULL,
#             last TEXT NOT NULL,
#             pwd TEXT NOT NULL
#         )
#     """
#         )




# FOOD
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS food_diary (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             user_id INTEGER NOT NULL,
#             food_name TEXT NOT NULL,
#             quantity INTEGER NOT NULL,
#             ingredients TEXT NOT NULL,
#             allergen TEXT NOT NULL,
#             creation_date TEXT DEFAULT CURRENT_TIMESTAMP
#         )
#     """
#     )




# SYM 
#     cursor.execute("""
#         CREATE TABLE IF NOT EXISTS symptoms (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             user_id INTEGER NOT NULL,
#             severity INTEGER NOT NULL,
#             symptom TEXT NOT NULL,
#             creation_date TEXT NOT NULL
#         )
#     """)




#################### ADD ITEM #######################
# ManageUser_Class.add_item_user(email="h@h.h", first="hFirs", last="hLast", pwd="hPwd")
# ManageFood_Class.add_item(user_id=1,food_name="Hal", ingredients="Fish", allergen="Fish", quantity=1, creation_date="2026-02-07T17:55:57")
# ManageSymptom_Class.add_item(user_id=1,severity=2,symptom="Headache", creation_date="2026-02-07T17:55:57")


#################### DELETE ITEM #######################
# ManageUser_Class.delete_item(2)
# ManageFood_Class.delete_item(2)
# ManageSymptom_Class.delete_item(2)

#################### MODIFY ITEM #######################
# ManageUser_Class.modify_item("3", "2", "2","2", "2")
# ManageFood_Class.modify_item(3,2,2,2,2,2,2)
# ManageSymptom_Class.modify_item(3,2,2,2,2)


#################### GET ITEM(S) #######################
# result = ManageUser_Class.get_name_by_id(3)
# result = ManageFood_Class.get_items(3)
# result = ManageSymptom_Class.get_items(3)

# print(result)



################### AI ####################
# foods = ManageFood_Class.get_items(3)
# symptom = ManageSymptom_Class.get_items(3)
# analyze_correlation(foods, symptom)
