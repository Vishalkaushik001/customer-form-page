from flask import Flask, render_template, request, redirect
import mysql.connector
import math
import pymysql

app = Flask(__name__)

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='your_password_here',
    database='customerdb'
)
cursor = conn.cursor()

@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    per_page = 100
    offset = (page - 1) * per_page

    cursor.execute("SELECT * FROM customers ORDER BY id DESC LIMIT %s OFFSET %s", (per_page, offset))
    customers = cursor.fetchall()

    cursor.execute("SELECT COUNT(*) FROM customers")
    total = cursor.fetchone()[0]
    total_pages = math.ceil(total / per_page)

    return render_template('form.html', customers=customers, page=page, total_pages=total_pages)

@app.route('/add', methods=['POST'])
def add_customer():
    name = request.form['name']
    address = request.form['address']
    mobileno = request.form['mobileno']

    # Check if already exists
    cursor.execute("SELECT * FROM customers WHERE name=%s AND address=%s AND mobileno=%s",
                   (name, address, mobileno))
    existing = cursor.fetchone()
    if existing:
        return redirect('/')  # Skip insert if exists

    cursor.execute("INSERT INTO customers (name, address, mobileno) VALUES (%s, %s, %s)",
                   (name, address, mobileno))
    conn.commit()
    return redirect('/')





if __name__ == '__main__':
    app.run(debug=True)
