import tkinter as tk
from tkinter import ttk
from datetime import datetime
import calendar
import math
import random

class GradientFrame(tk.Canvas):
    def __init__(self, parent, color1="blue", color2="cyan", **kwargs):
        tk.Canvas.__init__(self, parent, **kwargs)
        self._color1 = color1
        self._color2 = color2
        self.bind("<Configure>", self._draw_gradient)

    def _draw_gradient(self, event=None):
        self.delete("gradient")
        width = self.winfo_width()
        height = self.winfo_height()
        limit = width
        (r1,g1,b1) = self.winfo_rgb(self._color1)
        (r2,g2,b2) = self.winfo_rgb(self._color2)
        r_ratio = float(r2-r1) / limit
        g_ratio = float(g2-g1) / limit
        b_ratio = float(b2-b1) / limit

        for i in range(limit):
            nr = int(r1 + (r_ratio * i))
            ng = int(g1 + (g_ratio * i))
            nb = int(b1 + (b_ratio * i))
            color = "#%4.4x%4.4x%4.4x" % (nr,ng,nb)
            self.create_line(i,0,i,height, tags=("gradient",), fill=color)
        self.lower("gradient")

class LeapYearCalculator:
    def __init__(self, master):
        self.master = master
        master.title("Cosmic Leap Year Calculator")
        master.geometry("500x650")
        
        self.gradient_frame = GradientFrame(master, "navy", "purple")
        self.gradient_frame.pack(fill="both", expand=True)

        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TLabel', background='#000033', foreground='white', font=('Helvetica', 12))
        style.configure('TButton', background='#4CAF50', foreground='white', font=('Helvetica', 12, 'bold'))
        style.configure('TEntry', fieldbackground='#E0E0E0', foreground='#333333', font=('Helvetica', 12))

        main_frame = tk.Frame(self.gradient_frame, bg='#000033')
        main_frame.place(relx=0.5, rely=0.5, anchor='center')

        title_label = tk.Label(main_frame, text="Cosmic Leap Year Calculator", bg='#000033', fg='white', font=('Helvetica', 24, 'bold'))
        title_label.pack(pady=20)

        input_frame = tk.Frame(main_frame, bg='#000033')
        input_frame.pack(pady=20)

        self.year_label = ttk.Label(input_frame, text="Year:")
        self.year_label.grid(row=0, column=0, padx=10, pady=10)
        self.year_entry = ttk.Entry(input_frame, width=15)
        self.year_entry.grid(row=0, column=1, padx=10, pady=10)

        self.month_label = ttk.Label(input_frame, text="Month:")
        self.month_label.grid(row=1, column=0, padx=10, pady=10)
        self.month_entry = ttk.Entry(input_frame, width=15)
        self.month_entry.grid(row=1, column=1, padx=10, pady=10)

        self.day_label = ttk.Label(input_frame, text="Day:")
        self.day_label.grid(row=2, column=0, padx=10, pady=10)
        self.day_entry = ttk.Entry(input_frame, width=15)
        self.day_entry.grid(row=2, column=1, padx=10, pady=10)

        self.calculate_button = ttk.Button(main_frame, text="Calculate", command=self.calculate_leap_years)
        self.calculate_button.pack(pady=20)

        self.result_label = ttk.Label(main_frame, text="", font=('Helvetica', 14))
        self.result_label.pack(pady=10)

        self.seasons_swap_label = ttk.Label(main_frame, text="", font=('Helvetica', 14))
        self.seasons_swap_label.pack(pady=10)

        self.animation_canvas = tk.Canvas(main_frame, width=200, height=200, bg='#000033', highlightthickness=0)
        self.animation_canvas.pack(pady=20)
        self.draw_galaxy()

    def draw_galaxy(self):
        self.animation_canvas.delete("all")
        center_x, center_y = 100, 100
        for _ in range(200):
            angle = math.radians(random.random() * 360)
            distance = random.random() * 80
            x = center_x + math.cos(angle) * distance
            y = center_y + math.sin(angle) * distance
            size = random.random() * 2
            brightness = int(random.random() * 155) + 100
            color = f'#{brightness:02x}{brightness:02x}ff'
            self.animation_canvas.create_oval(x, y, x+size, y+size, fill=color, outline="")
        self.master.after(100, self.draw_galaxy)

    def calculate_leap_years(self):
        try:
            year = int(self.year_entry.get())
            current_year = datetime.now().year

            leap_years = sum(1 for y in range(year, current_year + 1) if calendar.isleap(y))

            result_text = f"Leap years since {year}: {leap_years}"
            self.result_label.config(text=result_text)

            gregorian_start = 1582
            years_passed = current_year - gregorian_start
            years_to_swap = 588710 - years_passed
            swap_text = f"Years until seasons swap: {years_to_swap}"
            self.seasons_swap_label.config(text=swap_text)

        except ValueError:
            self.result_label.config(text="Please enter a valid year")
            self.seasons_swap_label.config(text="")

root = tk.Tk()
calculator = LeapYearCalculator(root)
root.mainloop()