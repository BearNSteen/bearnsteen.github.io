import json
import os
import random
import sys
from functools import wraps

import constants as c
import discord
from discord.ext import commands, tasks
from dungeon_data import DUNGEON_BIOMES, ENEMIES, ITEMS, Enemy, Item
from PyQt5.QtCore import Qt, pyqtSignal
from PyQt5.QtGui import QColor, QFont, QPalette
from PyQt5.QtWidgets import (QApplication, QDesktopWidget, QGridLayout,
                             QLineEdit, QMainWindow, QTextEdit, QVBoxLayout,
                             QWidget)

global currently_online

currently_online = []

# Get the absolute path to this file
current_file_path = os.path.abspath(__file__)

# Get the directory of this file
current_dir = os.path.dirname(current_file_path)

# Change directory to this file's directory
os.chdir(current_dir)

class Character:
    def __init__(
        self,
        user_id,
        name,
        level,
        hp,
        mp,
        strength,
        dexterity,
        intelligence,
        inventory=[],
        dungeon_maps=[],
        
    ):
        self.user_id = user_id
        self.name = name
        self.level = level
        self.hp = hp
        self.mp = mp
        self.strength = strength
        self.dexterity = dexterity
        self.intelligence = intelligence
        self.inventory = inventory
        self.dungeon_maps = dungeon_maps
        
        self.inn_prompt = False

    def __str__(self):
        inventory_str = ", ".join(self.inventory) if self.inventory else "Empty"
        return f"Character: {self.name}, Level: {self.level}, HP: {self.hp}, MP: {self.mp}, STR: {self.strength}, DEX: {self.dexterity}, INT: {self.intelligence}\n\nInventory: {inventory_str}"

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "level": self.level,
            "hp": self.hp,
            "mp": self.mp,
            "strength": self.strength,
            "dexterity": self.dexterity,
            "intelligence": self.intelligence,
            "inventory": [self.dungeon_map_to_dict(dungeon_map) for dungeon_map in self.inventory],
        }

    @classmethod
    def from_dict(cls, data):
        inventory = [cls.dungeon_map_from_dict(dungeon_map_data) for dungeon_map_data in data["inventory"]]
        return cls(
            data["user_id"],
            data["name"],
            data["level"],
            data["hp"],
            data["mp"],
            data["strength"],
            data["dexterity"],
            data["intelligence"],
            inventory,
        )

    @staticmethod
    def dungeon_map_to_dict(dungeon_map):
        return [[room.to_dict() if room else None for room in row] for row in dungeon_map]

    @staticmethod
    def dungeon_map_from_dict(dungeon_map_data):
        return [[DungeonRoom.from_dict(room_data) if room_data else None for room_data in row] for row in dungeon_map_data]


def save_characters(characters):
    with open("character_data.json", "w") as file:
        json.dump(
            {user_id: char.to_dict() for user_id, char in characters.items()}, file, indent=4
        )


def load_characters():
    try:
        with open("character_data.json", "r") as file:
            data = json.load(file)
            characters = {}
            for user_id, char_data in data.items():
                characters[user_id] = Character.from_dict(char_data)
            return characters
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        print("Error: Invalid JSON data in character_data.json. Returning empty dictionary.")
        return {}


class DungeonRoom:
    def __init__(self, biome, position):
        self.biome = biome
        self.position = position
        self.description = self.generate_description()
        self.enemies = self.populate_enemies()
        self.loot = self.populate_loot()
        # Add more room attributes as needed
        
    def to_dict(self):
        return {
            "biome": self.biome,
            "position": self.position,
            "description": self.description,
            "enemies": self.enemies,
            "loot": self.loot,
        }

    @classmethod
    def from_dict(cls, data):
        room = cls(data["biome"], tuple(data["position"]))
        room.description = data["description"]
        room.enemies = data["enemies"]
        room.loot = data["loot"]
        return room

    def generate_description(self):
        # Generate a description based on the biome
        descriptions = {
            "Cave": [
                "You enter a dark cave with stalactites hanging from the ceiling.",
                "The cave walls are damp and the air feels heavy.",
            ],
            "Crypt": [
                "You find yourself in an eerie crypt with ancient tombstones.",
                "The atmosphere is gloomy and the air is stale.",
            ],
            "Mine": [
                "You venture into an abandoned mine with old mining equipment scattered around.",
                "The mine shafts are dimly lit and the air is thick with dust.",
            ],
            "Swamp": [
                "You wade through a murky swamp with twisted trees and stagnant water.",
                "The air is humid and filled with the sounds of buzzing insects.",
            ],
            "Castle": [
                "You explore the ruins of an old castle with crumbling walls and ivy-covered stones.",
                "The castle halls are empty and echoes of the past linger in the air.",
            ],
            "Forest": [
                "You find yourself in a dense forest with tall trees surrounding you.",
                "The room is filled with lush vegetation and the sound of chirping birds.",
            ],
            "Cavern": [
                "You enter a vast cavern with towering rock formations and underground streams.",
                "The cavern is illuminated by bioluminescent fungi and the air is cool and damp.",
            ],
            "Wasteland": [
                "You traverse a desolate wasteland with cracked earth and scattered debris.",
                "The landscape is barren and the air is dry and dusty.",
            ],
            # Add more descriptions for other biomes
        }
        return random.choice(descriptions[self.biome])

    def populate_enemies(self):
        # Populate the room with enemies based on the biome
        enemies = []
        if random.random() < 0.6:  # 60% chance of enemies spawning
            num_enemies = random.randint(1, 3)  # Spawn 1 to 3 enemies
            for _ in range(num_enemies):
                enemy_data = random.choice(ENEMIES[self.biome])
                enemy_name = enemy_data["name"]
                enemies.append(enemy_name)
        return enemies

    def populate_loot(self):
        # Populate the room with loot based on the biome
        loot = []
        if random.random() < 0.4:  # 40% chance of loot spawning
            num_items = random.randint(1, 2)  # Spawn 1 to 2 items
            for _ in range(num_items):
                item_data = random.choice(ITEMS[self.biome])
                item_name = item_data["name"]
                loot.append(item_name)
        return loot


def generate_dungeon_map(max_width, max_height, biome, min_width=0,min_height=0):
    width = random.randint(min_width, max_width)
    height = random.randint(min_height, max_height)
    
    dungeon_map = []
    for y in range(height):
        row = []
        for x in range(width):
            if random.random() < 0.7:  # 70% chance of generating a room
                position = (x, y)
                room = DungeonRoom(biome, position)
                row.append(room)
            else:
                row.append(None)  # No room at this position
        dungeon_map.append(row)
    
    # Ensure the starting room is not None
    while dungeon_map[0][0] is None:
        dungeon_map[0][0] = DungeonRoom(biome, (0, 0))
    
    return dungeon_map

class RPGWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("RPG")
        self.setGeometry(100, 100, 800, 600)
        self.setStyleSheet("background-color: #333333; color: #ffffff;")

        # Get the available screen geometry
        screen = QDesktopWidget().availableGeometry()

        # Calculate the window size as a fraction of the screen size
        window_width = int(screen.width() * 0.8)  # 80% of screen width
        window_height = int(screen.height() * 0.8)  # 80% of screen height

        # Set the window size
        self.resize(window_width, window_height)

        # Center the window on the screen
        self.move(
            (screen.width() - window_width) // 2,
            (screen.height() - window_height) // 2
        )

        central_widget = QWidget(self)
        self.setCentralWidget(central_widget)

        # Calculate the font sizes based on the window size
        self.base_font_size = window_width // 50  # Adjust the divisor as needed
        self.input_font_size = self.base_font_size
        self.output_font_size = self.base_font_size

        self.text_box = QTextEdit(self)
        self.text_box.setReadOnly(True)
        self.text_box.setStyleSheet(
            f"background-color: #222222; color: #ffffff; font-size: {self.output_font_size}px;"
        )

        self.right_text_box = QTextEdit(self)
        self.right_text_box.setReadOnly(True)
        self.right_text_box.setStyleSheet(
            f"background-color: #222222; color: #ffffff; font-size: {self.output_font_size}px;"
        )
        # Set a monospaced font for the text box
        monospace_font = QFont("Lucida Console")
        monospace_font.setStyleHint(QFont.Monospace)
        self.right_text_box.setFont(monospace_font)

        self.input_field = QLineEdit(self)
        self.input_field.setStyleSheet(
            f"background-color: #222222; color: #ffffff; font-size: {self.input_font_size}px;"
        )
        self.input_field.returnPressed.connect(self.process_input)

        layout = QGridLayout(central_widget)
        layout.addWidget(self.text_box, 0, 0)
        layout.addWidget(self.right_text_box, 0, 1)
        layout.addWidget(self.input_field, 1, 0, 1, 2)

        layout.setColumnStretch(0, 1)
        layout.setColumnStretch(1, 1)
        layout.setRowStretch(0, 95)
        layout.setRowStretch(1, 5)

        self.dungeon_maps = {}
        self.currently_online = []
        self.characters = load_characters()
        self.publicly_online = []
        self.test_user_id = "test_user"

        self.display_welcome_message()

    def display_welcome_message(self):
        welcome_message = "Welcome!\nType '/enter' to log in and start playing."
        self.display_output(welcome_message)

    def process_input(self):
        command = self.input_field.text().strip()
        self.input_field.clear()
        self.display_output(f"> {command}")

        # Check if the user is logged in for commands that require being logged in
        if command.startswith(
            (
                "/rename",
                "/retire",
                "/explore",
                "/current_biome",
                "/show_map",
                "/go_left",
                "/move_left",
                "/left",
                "/go_right",
                "/move_right",
                "/right",
                "/go_up",
                "/move_up",
                "/up",
                "/go_down",
                "/move_down",
                "/down",
                "/fight",
                "/character_info",
                "/item",
                "/pickup",
                "/leave_dungeon",
            )
        ):
            user_id = self.test_user_id  # Assign a default user ID for offline mode
            if user_id not in self.currently_online:
                self.display_output("You have not entered. Please do so via /enter.")
                return

        # Process the command and display the output
        if command.startswith("/enter") or command.startswith("enter"):
            visibility = command.split(" ")[1] if len(command.split(" ")) > 1 else None
            self.enter()
        elif command.startswith("/rename") or command.startswith("rename"):
            new_name = command.split(" ", 1)[1].strip() if " " in command else ""
            self.rename(new_name)
        elif command == "/retire" or command == "retire":
            self.retire()
        elif command.startswith("/explore") or command.startswith("explore"):
            dungeon_index = command.split(" ")[1] if len(command.split(" ")) > 1 else None
            self.explore(dungeon_index)
        elif command.startswith(("/list_dungeon_maps", "/dungeons", "list_dungeon_maps", "dungeons")):
            biome_filter = command.split(" ", 1)[1].strip() if " " in command else None
            self.list_dungeon_maps(biome_filter)
        elif command == "/current_biome" or command == "current_biome":
            self.current_biome()
        elif command == "/show_map" or command == "show_map":
            self.show_map()
        elif command in ["/go_left", "/move_left", "/left", "go_left", "move_left", "left"]:
            self.move_player(dx=-1, dy=0)
        elif command in ["/go_right", "/move_right", "/right", "go_right", "move_right", "right"]:
            self.move_player(dx=1, dy=0)
        elif command in ["/go_up", "/move_up", "/up", "go_up", "move_up", "up"]:
            self.move_player(dx=0, dy=-1)
        elif command in ["/go_down", "/move_down", "/down", "go_down", "move_down", "down"]:
            self.move_player(dx=0, dy=1)
        elif command.startswith("/fight") or command.startswith("fight"):
            enemy_input = command.split(" ", 1)[1].strip() if " " in command else ""
            self.fight(enemy_input)
        elif command == "/character_info" or command == "character_info":
            self.character_info()
        elif command.startswith("/item") or command.startswith("/pickup") or command.startswith("item") or command.startswith("pickup"):
            item_name = command.split(" ", 1)[1].strip() if " " in command else ""
            self.item(item_name)
        elif command == "/leave_dungeon" or command == "/leave" or command == "leave_dungeon" or command == "leave":
            self.leave_dungeon()
        elif command.startswith("inn") or command.startswith("/inn"):
            self.inn_interaction()
        elif command == "/upstairs" or command == "upstairs":
            self.go_upstairs()
        elif command == "/downstairs" or command == "downstairs":
            self.go_downstairs()
        elif command == "/guild" or command == "guild":
            self.guild_interaction()
        elif command == "/get_map" or command == "get_map":
            self.get_map()
        else:
            self.display_output("Invalid command. Please try again.")
            
        self.update_right_side()

    def inn_interaction(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if character.location != "Town":
            self.display_output("You are not in town. You can only interact with the inn while in town.")
            return

        self.display_output("You enter the inn. The innkeeper greets you warmly.")
        character.location = "inn_bar"  # Set the character's location to "inn_bar"
        save_characters(self.characters)
        
    def go_upstairs(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if character.location == "inn_bar":
            character.location = "inn_rooms"
            save_characters(self.characters)
            self.display_output("You go upstairs to the second floor of the inn.")
        else:
            self.display_output("You are not in the inn or already on the second floor.")

    def go_downstairs(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if character.location == "inn_rooms":
            character.location = "inn_bar"
            save_characters(self.characters)
            self.display_output("You go downstairs to the first floor of the inn.")
        else:
            self.display_output("You are not on the second floor of the inn.")
            
    def guild_interaction(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if character.location != "Town":
            self.display_output("You are not in town. You can only interact with the guild while in town.")
            return

        self.display_output("You enter the guild. The receptionist greets you.")
        character.location = "guild_lobby"  # Set the character's location to "guild_lobby"
        save_characters(self.characters)
        self.display_output("Available actions:\n/get_map - Generate a new dungeon map")
        
    def get_map(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if character.location != "guild_lobby":
            self.display_output("You can only get a dungeon map from the guild.")
            return

        width = 5  # Set the width of the dungeon
        height = 5  # Set the height of the dungeon
        biome = random.choice(DUNGEON_BIOMES)  # Select a random biome for the dungeon
        dungeon_map = generate_dungeon_map(width, height, biome)
        character.dungeon_maps.append(dungeon_map)
        save_characters(self.characters)
        self.display_output(f"You received a new dungeon map for a {biome} dungeon.")

    def update_right_side(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.right_text_box.clear()
            return

        if user_id in self.characters:
            character = self.characters[user_id]
            if character.location == "Town":
                # Define the town_locations list with default values
                town_locations = [
                    ["O", "O", "O", "O", "O", "O"],
                    ["O", "O", "O", "O", "O", "O"],
                    ["O", "O", "O", "O", "O", "O"],
                    ["O", "O", "G", "I", "O", "O"]
                ]

                # Populate the town_locations list based on user's progress
                # Example: town_locations[0][0] = "T"  # Tavern
                # Modify this part based on how you track user's progress

                # Update the town_map string with formattable strings
                town_map = f"""
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒ {town_locations[0][0]} ▒ {town_locations[0][1]} ▒ {town_locations[0][2]} ▒ {town_locations[0][3]} ▒ {town_locations[0][4]} ▒ {town_locations[0][5]} ▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒ {town_locations[1][0]} ▒ {town_locations[1][1]} ▒ {town_locations[1][2]} ▒ {town_locations[1][3]} ▒ {town_locations[1][4]} ▒ {town_locations[1][5]} ▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒ {town_locations[2][0]} ▒ {town_locations[2][1]} ▒ {town_locations[2][2]} ▒ {town_locations[2][3]} ▒ {town_locations[2][4]} ▒ {town_locations[2][5]} ▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        ▒ {town_locations[3][0]} ▒ {town_locations[3][1]} ▒ {town_locations[3][2]} ▒ {town_locations[3][3]} ▒ {town_locations[3][4]} ▒ {town_locations[3][5]} ▒
        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    """

                # Define the town_legend dictionary
                town_legend = {
                    "T": "Tavern",
                    "B": "Blacksmith",
                    "A": "Alchemist",
                    "M": "Mage Tower",
                    "L": "Library",
                    "S": "Stables",
                    "G": "Guild",
                    "W": "Weapon Shop",
                    "H": "Herbalist",
                    "C": "Chapel",
                    "R": "Rune Shop",
                    "F": "Fletcher",
                    "I": "Inn"
                    # Add more legend entries as needed
                }

                # Update the legend based on the town_locations and town_legend
                legend = ["Legend:"]
                for letter, building in town_legend.items():
                    if letter in ["G", "I"] or any(letter in row for row in town_locations):
                        legend.append(f"  {letter} - {building}")
                if any("O" in row for row in town_locations):
                    legend.append("  O - Empty Plot")

                # Join the legend entries with newline characters
                legend_str = "\n".join(legend)

                # Concatenate the town map and legend with an empty line in between
                town_map += "\n\n" + legend_str

                self.right_text_box.setPlainText(town_map)
            elif character.location == "Inn":
                # Display the inn map on the right side
                inn_map = """
┌────┬────┬────┬────┬────┬▄▄▄┐
│ R1 │ R2 │ R3 │ R4 │ R5 │-v-│
├─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┘-v-│
│                            │
├─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┐   │
│ R6 │ R7 │ R8 │ R9 │ R10│   │
└────┴────┴────┴────┴────┘───┘
┌────┬─────────────┬─────┬▄▄▄┐
│ B  │+   ▄▄ ▄▄ ▄▄ ▌     │-^-│
│    │+   ██ ██ ██ └─────┘-^-│
│    │+   ▀▀ ▀▀ ▀▀           ▌
│    │+                      │
│    │+   ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒ │
└────┴───────────────────────┘
            """
                self.right_text_box.setPlainText(inn_map)
            elif character.location == "inn_bar":
                # Display the first floor of the inn on the right side
                inn_map_first_floor = """
    ┌────┬─────────────┬─────┬▄▄▄┐
    │ B  │+   ▄▄ ▄▄ ▄▄ ▌     │-^-│
    │    │+   ██ ██ ██ └─────┘-^-│
    │    │+   ▀▀ ▀▀ ▀▀           ▌
    │    │+                      │
    │    │+   ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒ │
    └────┴───────────────────────┘
                """
                self.right_text_box.setPlainText(inn_map_first_floor)
            elif character.location == "inn_rooms":
                # Display the second floor of the inn on the right side
                inn_map_second_floor = """
    ┌────┬────┬────┬────┬────┬▄▄▄┐
    │ R1 │ R2 │ R3 │ R4 │ R5 │-v-│
    ├─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┘-v-│
    │                            │
    ├─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┐   │
    │ R6 │ R7 │ R8 │ R9 │ R10│   │
    └────┴────┴────┴────┴────┘───┘
                """
                self.right_text_box.setPlainText(inn_map_second_floor)
            elif character.location == "guild_lobby":
                # Display the guild lobby map on the right side
                guild_lobby_map = """
    ┌─────────────────────────────┐
    │                             │
    │                             │
    │          Reception          │
    │                             │
    │                             │
    └─────────────────────────────┘
                
/get_map - Receive dungeon map
/leave - Return to town
                """
                self.right_text_box.setPlainText(guild_lobby_map)
            elif user_id in self.dungeon_maps:
                # Display the dungeon map on the right side
                dungeon_map = self.dungeon_maps[user_id]["map"]
                position = self.dungeon_maps[user_id]["position"]
                visited_rooms = self.dungeon_maps[user_id].get("visited_rooms", set())

                # Create a visual representation of the map
                map_str = ""
                for y in range(len(dungeon_map)):
                    row_str = "|"
                    for x in range(len(dungeon_map[0])):
                        if (x, y) == position:
                            row_str += " P "
                        elif (x, y) in visited_rooms:
                            room = dungeon_map[y][x]
                            if room is not None:
                                if room.loot:
                                    row_str += " I "
                                else:
                                    row_str += "   "
                            else:
                                row_str += "   "
                        elif (
                            (x, y) not in visited_rooms
                            and (abs(x - position[0]) <= 1 and abs(y - position[1]) <= 1)
                        ):
                            room = dungeon_map[y][x]
                            if room is not None:
                                row_str += " ? "
                            else:
                                row_str += "   "
                        else:
                            row_str += "   "
                        row_str += "|"

                    if y == len(dungeon_map) - 1:
                        row_str += "\n" + "└" + "───┴" * (len(dungeon_map[0]) - 1) + "───┘"
                    else:
                        row_str += "\n" + "├" + "───┼" * (len(dungeon_map[0]) - 1) + "───┤\n"

                    map_str += row_str

                # Add top border
                map_str = "┌" + "───┬" * (len(dungeon_map[0]) - 1) + "───┐\n" + map_str

                self.right_text_box.setPlainText(map_str)
            else:
                self.right_text_box.clear()

    def display_output(self, message):
        self.text_box.append(message)

    def enter(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode

        if user_id not in self.currently_online:
            if user_id not in self.characters:
                # Create a new character for the user
                name = "Dan"
                character = Character(
                    user_id,
                    name,
                    level=1,
                    hp=100,
                    mp=50,
                    strength=10,
                    dexterity=10,
                    intelligence=10,
                )
                self.characters[user_id] = character
                save_characters(self.characters)
                self.display_output(f"Character '{name}' enters the world.")
            else:
                # Retrieve the user's existing character
                character = self.characters[user_id]
                self.display_output(f"Welcome back, {character.name}.")

            character.location = "Town"  # Set the character's location to "Town"
            self.currently_online.append(user_id)
            save_characters(self.characters)
            self.display_output("You have entered the game privately.")
        else:
            self.display_output("You have already entered.")

    def rename(self, new_name: str):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        if user_id in self.characters:
            character = self.characters[user_id]

            # Check if the new name is already taken by another player
            for char in self.characters.values():
                if char.name.lower() == new_name.lower():
                    if char.user_id != user_id:
                        self.display_output(
                            f"The name '{new_name}' is already taken by another player. Please choose a different name."
                        )
                        return
                    else:
                        self.display_output(
                            f"The name '{new_name}' is already taken... by you! Please choose a different name."
                        )
                        return

            old_name = character.name
            character.name = new_name
            save_characters(self.characters)
            self.display_output(
                f"Your character has been renamed from '{old_name}' to '{new_name}'."
            )
        else:
            self.display_output("You don't have a character yet. Use /enter to create one.")

    def retire(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id in self.currently_online:
            character = self.characters[user_id]
            if character.location == "Inn":
                self.currently_online.remove(user_id)
                self.display_output("You retire to your room in the inn. Connection severed.")
            else:
                self.display_output("You can only retire while in the inn.")
        else:
            self.display_output("You are not currently connected. Try /enter.")

    def explore(self, dungeon_index=None):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        try:
            character = self.characters[user_id]
            if not character.dungeon_maps:
                self.display_output("You don't have any dungeon maps. Visit the guild to get one.")
                return

            if dungeon_index is None:
                self.display_output("Please specify a dungeon map index. Usage: /explore [dungeon_index]")
                return

            try:
                dungeon_index = int(dungeon_index)
                if dungeon_index < 1 or dungeon_index > len(character.dungeon_maps):
                    raise ValueError
            except ValueError:
                self.display_output(f"Invalid dungeon map index. Please enter a number between 1 and {len(character.dungeon_maps)}.")
                return

            dungeon_map = character.dungeon_maps[dungeon_index - 1]  # Use the specified dungeon map index
            self.dungeon_maps[user_id] = {
                "map": dungeon_map,
                "position": (0, 0),  # Starting position
                "visited_rooms": set([(0, 0)]),  # Add the starting room to visited_rooms
            }

            # Add the current room to visited_rooms if it hasn't been initialized yet
            if "visited_rooms" not in self.dungeon_maps[user_id]:
                position = self.dungeon_maps[user_id]["position"]
                self.dungeon_maps[user_id]["visited_rooms"] = set([position])

            # Get the player's current position
            position = self.dungeon_maps[user_id]["position"]
            current_room = dungeon_map[position[1]][position[0]]
            biome = current_room.biome  # Get the biome from the current room

            self.characters[user_id].location = biome  # Set the character's location to the dungeon biome
            save_characters(self.characters)

            # Display the current room information to the player
            room_info = f"You are currently in a {current_room.biome}. {current_room.description}"
            if current_room.enemies:
                enemy_info = "Enemies: " + ", ".join(f"[{i+1}] {enemy}" for i, enemy in enumerate(current_room.enemies))
                room_info += "\n" + enemy_info
            if current_room.loot:
                loot_info = "Loot: " + ", ".join(f"[{i+1}] {item}" for i, item in enumerate(current_room.loot))
                room_info += "\n" + loot_info
            self.display_output(room_info)
        except Exception as e:
            print(f"Error in explore command: {str(e)}")
            self.display_output("An error occurred while processing the explore command.")
            
    def list_dungeon_maps(self, biome_filter=None):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if not character.dungeon_maps:
            self.display_output("You don't have any dungeon maps.")
            return

        dungeon_map_list = []
        for i, dungeon_map in enumerate(character.dungeon_maps, start=1):
            biome = dungeon_map[0][0].biome if dungeon_map[0][0] else "Unknown"
            if biome_filter is None or biome.lower() == biome_filter.lower():
                dungeon_map_list.append(f"{i}. {biome} Dungeon")

        if dungeon_map_list:
            dungeon_map_info = "Available Dungeon Maps:\n" + "\n".join(dungeon_map_list)
        else:
            dungeon_map_info = "No dungeon maps found for the specified biome."

        self.display_output(dungeon_map_info)

    def current_biome(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        try:
            if user_id not in self.dungeon_maps:
                self.display_output("You haven't started exploring yet. Use the /explore command to start.")
                return

            dungeon_map = self.dungeon_maps[user_id]["map"]
            position = self.dungeon_maps[user_id]["position"]
            current_room = dungeon_map[position[1]][position[0]]

            biome_name = current_room.biome
            biome_name_lower = biome_name.lower()
            if biome_name_lower.startswith(("a", "e", "i", "o", "u")):
                self.display_output(f"You are currently in an {biome_name}.")
            else:
                self.display_output(f"You are currently in a {biome_name}.")
        except Exception as e:
            print(f"Error in current_biome command: {str(e)}")
            self.display_output("An error occurred while processing the current_biome command.")

    def show_map(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        try:
            if user_id not in self.dungeon_maps:
                self.display_output("You haven't started exploring yet. Use the /explore command to start.")
                return

            dungeon_map = self.dungeon_maps[user_id]["map"]
            position = self.dungeon_maps[user_id]["position"]
            visited_rooms = self.dungeon_maps[user_id].get("visited_rooms", set())

            # Create a visual representation of the map
            map_str = ""
            for y in range(len(dungeon_map)):
                row_str = "|"
                for x in range(len(dungeon_map[0])):
                    if (x, y) == position:
                        row_str += " P "
                    elif (x, y) in visited_rooms:
                        room = dungeon_map[y][x]
                        if room.loot:
                            row_str += " I "
                        else:
                            row_str += "   "
                    else:
                        row_str += " ? "
                    row_str += "|"

                if y == len(dungeon_map) - 1:
                    row_str += "\n" + "└" + "───┴" * (len(dungeon_map[0]) - 1) + "───┘"
                else:
                    row_str += "\n" + "├" + "───┼" * (len(dungeon_map[0]) - 1) + "───┤\n"

                map_str += row_str

            # Add top border
            map_str = "┌" + "───┬" * (len(dungeon_map[0]) - 1) + "───┐\n" + map_str

            self.display_output(map_str)
        except Exception as e:
            print(f"Error in show_map command: {str(e)}")
            self.display_output("An error occurred while processing the show_map command.")

    async def test_show_map(self, ctx):
        user_id = str(ctx.author.id)

        print(f"Test show map command invoked by {ctx.author.name}")

        # Create a test dungeon map
        dungeon_map = [
            [
                DungeonRoom("Forest", (0, 0)),
                DungeonRoom("Cave", (1, 0)),
                DungeonRoom("Castle", (2, 0)),
            ],
            [
                DungeonRoom("Swamp", (0, 1)),
                DungeonRoom("Crypt", (1, 1)),
                DungeonRoom("Mine", (2, 1)),
            ],
            [
                DungeonRoom("Cavern", (0, 2)),
                DungeonRoom("Wasteland", (1, 2)),
                DungeonRoom("Forest", (2, 2)),
            ],
        ]

        # Set test player position
        position = (1, 1)

        # Set test visited rooms
        visited_rooms = {(0, 0), (2, 0), (1, 2)}

        # Add loot to some visited rooms
        dungeon_map[0][0].loot = ["Potion", "Scroll"]
        dungeon_map[2][0].loot = ["Sword"]
        dungeon_map[1][2].loot = ["Gem"]  # Added loot to the correct room

        # Create a visual representation of the map
        map_str = ""
        for y in range(len(dungeon_map)):
            row_str = "|"
            for x in range(len(dungeon_map[0])):
                if (x, y) == position:
                    row_str += " P "
                elif (x, y) in visited_rooms:
                    room = dungeon_map[y][x]
                    if room.loot:
                        row_str += " I "
                    else:
                        row_str += "   "
                else:
                    row_str += " ? "
                row_str += "|"

            if y == len(dungeon_map) - 1:
                map_str += row_str + "\n└───┴───┴───┘"
            else:
                map_str += row_str + "\n├───┼───┼───┤\n"

        # Add top border
        map_str = "┌───┬───┬───┐\n" + map_str

        await ctx.send(f"{ctx.author.mention}\n{map_str}")

    def go_left(self):
        self.move_player(dx=-1, dy=0)

    def go_right(self):
        self.move_player(dx=1, dy=0)

    def go_up(self):
        self.move_player(dx=0, dy=-1)

    def go_down(self):
        self.move_player(dx=0, dy=1)

    def move_player(self, dx, dy):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        print(f"Move command invoked by the player")
        try:
            player_id = str(user_id)
            if player_id not in self.dungeon_maps:
                self.display_output("You haven't started exploring yet. Use the `/explore` command to start.")
                return

            dungeon_map = self.dungeon_maps[player_id]["map"]
            position = self.dungeon_maps[player_id]["position"]
            visited_rooms = self.dungeon_maps[player_id].setdefault("visited_rooms", set())

            new_x = position[0] + dx
            new_y = position[1] + dy

            if 0 <= new_x < len(dungeon_map[0]) and 0 <= new_y < len(dungeon_map):
                new_room = dungeon_map[new_y][new_x]
                if new_room is None:
                    self.display_output("There is no room in that direction.")
                    return

                self.dungeon_maps[player_id]["position"] = (new_x, new_y)
                visited_rooms.add((new_x, new_y))  # Add the new room to visited_rooms
                current_room = dungeon_map[new_y][new_x]
                direction = (
                    "left"
                    if dx < 0
                    else "right" if dx > 0 else "up" if dy < 0 else "down"
                )
                room_info = (
                    f"You moved one room {direction}. {current_room.description}"
                )
                if current_room.enemies:
                    room_info += "\nEnemies: " + ", ".join(current_room.enemies)
                if current_room.loot:
                    room_info += "\nLoot: " + ", ".join(current_room.loot)
                self.display_output(room_info)
            else:
                self.display_output("You cannot move in that direction.")
        except Exception as e:
            print(f"Error in move command: {str(e)}")
            self.display_output("An error occurred while processing the move command.")

    def fight(self, enemy_input: str):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        player_id = str(user_id)
        if player_id not in self.dungeon_maps:
            self.display_output("You haven't started exploring yet. Use the `/explore` command to start.")
            return

        dungeon_map = self.dungeon_maps[player_id]["map"]
        position = self.dungeon_maps[player_id]["position"]
        current_room = dungeon_map[position[1]][position[0]]

        if not current_room.enemies:
            self.display_output("There are no enemies to fight in this room.")
            return

        if not enemy_input:
            self.display_output("Please specify an enemy to fight. Usage: /fight [enemy_number/name]")
            return

        enemy_found = False
        for i, enemy_name in enumerate(current_room.enemies):
            if enemy_input.isdigit() and int(enemy_input) == i + 1:
                enemy_found = True
                break
            elif enemy_input.lower() == enemy_name.lower():
                enemy_found = True
                break

        if enemy_found:
            # Perform the fight logic here
            self.display_output(f"You engage in combat with {enemy_name}!")
            # Remove the enemy from the current room after the fight
            current_room.enemies.remove(enemy_name)
        else:
            self.display_output(f"Enemy '{enemy_input}' not found in the current room.")

    def character_info(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You have not entered. Please do so via /enter.")
            return

        if user_id in self.characters:
            character = self.characters[user_id]
            self.display_output(str(character))
        else:
            self.display_output("You don't have a character yet. Use /enter to create one.")

    def item(self, item_input: str):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        player_id = str(user_id)
        if player_id not in self.dungeon_maps:
            self.display_output("You haven't started exploring yet. Use the `/explore` command to start.")
            return

        dungeon_map = self.dungeon_maps[player_id]["map"]
        position = self.dungeon_maps[player_id]["position"]
        current_room = dungeon_map[position[1]][position[0]]

        if item_input.isdigit():
            item_index = int(item_input) - 1
            if 0 <= item_index < len(current_room.loot):
                item_name = current_room.loot[item_index]
                character = self.characters[user_id]
                character.inventory.append(item_name)
                current_room.loot.pop(item_index)
                save_characters(self.characters)
                self.display_output(f"You picked up {item_name}.")
            else:
                self.display_output(f"Invalid item number. Please enter a valid number.")
        else:
            self.display_output(f"Invalid input. Please enter the item number.")

    def leave_dungeon(self):
        user_id = self.test_user_id  # Assign a default user ID for offline mode
        if user_id not in self.currently_online:
            self.display_output("You are not currently connected. Try /enter.")
            return

        character = self.characters[user_id]
        if character.location in DUNGEON_BIOMES:
            player_id = str(user_id)
            if player_id in self.dungeon_maps:
                del self.dungeon_maps[player_id]
                character.location = "Town"
                save_characters(self.characters)
                self.display_output("You have left the dungeon and returned to town.")
            else:
                self.display_output("You are not currently in a dungeon.")
        elif character.location == "Town":
            self.display_output("Where would you like to go?")
        elif character.location == "inn_bar":
            character.location = "Town"
            save_characters(self.characters)
            self.display_output("You leave the inn and return to town.")
        elif character.location == "inn_rooms":
            self.display_output("You can't leave the inn from the second floor. Go downstairs first.")
        elif character.location == "guild_lobby":
            character.location = "Town"
            save_characters(self.characters)
            self.display_output("You leave the guild and return to town.")
        else:
            self.display_output("You can't leave your current location.")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = RPGWindow()
    window.show()
    sys.exit(app.exec_())
