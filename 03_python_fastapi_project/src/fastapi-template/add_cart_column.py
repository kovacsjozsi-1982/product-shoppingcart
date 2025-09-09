import sqlite3

DB_PATH = "app.db"  # Update path if needed

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE products ADD COLUMN cart_quantity INTEGER DEFAULT 0;")
    print("cart_quantity column added successfully.")
except sqlite3.OperationalError as e:
    print(f"Error: {e}")
finally:
    conn.commit()
    conn.close()
