import json
import random
import time

# Create banks to pull random events from:

workoutBank = ["Push-ups", "Sit-ups", "Laps", "Crunches", "Burpees", "Squats"]
frequencyBank = [3, 5, 7, 10, 12]
mealBank = [
    "Lamb Shawarma",
    "Chicken Parmesan",
    "Smoked Salmon",
    "Chef's Salad",
    "Spaghetti with Alfredo Sauce"
]
sidesBank = [
    "French Fries with Sea Salt",
    "Mixed Vegetables and Fried Rice",
    "Fruit Medley",
    "Mashed Potatoes with Garlic"
]
bookBank = [
    "'Outliers' by Malcolm Gladwell",
    "'The Host' by Stephenie Meyer",
    "'Unbroken' by Laura Hillenbrand",
    "'The Hunger Games' by Suzanne Collins",
    "'The Fault in Our Stars' by John Green",
    "'Go Set a Watchman' by Harper Lee",
    "'The Martian' by Andy Weir",
    "'Where the Crawdads Sing' by Delia Owens"
]
# Book bank titles sourced from: https://www.rd.com/list/bestselling-books-of-decade/


def exporter(category):
    """
    General purpose function to process a request.
    Accepts the type as string "ANY", "WORKOUT", "MEAL", or "BOOK".
    "ANY" will generate a random habit to be tracked;
    or you can specify the type of habit with "WORKOUT", "MEAL" and "BOOK".
    Generates and returns a python dictionary containing
    the requested details.
    """
    export = {"Type": category, "Description": ""}
    if (category == "ANY"):  # If so, assign type randomly to WORKOUT, MEAL or BOOK
        categories = ("WORKOUT", "BOOK", "MEAL")
        category = categories[random.randrange(0, len(categories))]
        # Update the Type value in our export object to match
        export["Type"] = category
    if (category == "WORKOUT"):  # Workout branch:
        export["Description"] = 'Today\'s recommended workout is: ' + \
                                str(frequencyBank[random.randrange(0, len(frequencyBank))]) + " " + \
                                workoutBank[random.randrange(
                                    0, len(workoutBank))] + " "
        return export
    elif (category == "MEAL"):  # Meal branch:
        export["Description"] = "Today's recommended meal is " + \
                                mealBank[random.randrange(0, len(mealBank))] + " along with a side of " + \
                                sidesBank[random.randrange(
                                    0, len(sidesBank))] + "."
        return export
    elif (category == "BOOK"):  # Book branch:
        export["Description"] = "Today's recommended book is " + \
                                bookBank[random.randrange(
                                    0, len(bookBank))] + "."
        return export
    else:  # Request is none of the above, silently return None:
        return None


"""
Run as a daemon and watch the file REQUEST for incoming requests.
It will watch the file for the line "WORKOUT", "MEAL" or "BOOK"
and then process the respective request.
Lastly, it will output the result in JSON into the same file,
overwriting its contents.
To exit, write "QUIT" into the REQUEST file.
"""
request = ""
print("Watching REQUEST file for incoming requests...")
while (request != "QUIT"):
    requestFile = open("REQUEST", "r")
    request = requestFile.readline()
    requestFile.close()

    # Check to see if the request is valid and attempt to process it:
    export = exporter(request)
    # export will be equal to None if not a valid request:
    if (export is not None):
        requestFile = open("REQUEST", "w")
        requestFile.write(json.dumps(export))
        requestFile.close()

    time.sleep(1)
