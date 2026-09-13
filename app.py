from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

todos_db = [
    {
        "id": 1,
        "name": "Mancing",
        "date": "17-08-1945",
        "time": "18:00",
        "description": "Mancing mania mantap di danau infinits"
    },
    {
        "id": 2,
        "name": "Menggulingkan pem-",
        "date": "17-08-2027",
        "time": "10:00",
        "description": "menggulingkan pemeran utama"
    },
    {
        "id": 3,
        "name": "Belajar PWEB",
        "date": "12-09-2026",
        "time": "10:00",
        "description": "Ngeweb lagi deh"
    },
    {
        "id": 4,
        "name": "Final gemastik",
        "date": "mepet",
        "time": "pagi",
        "description": "soro soro jikan da"
    }
]

@app.route('/')
def home():
    return render_template('index.html', todos=todos_db)

@app.route('/edit', methods=['POST'])
def edit():
    todo_id = request.form.get('todo_id')
    nama = request.form.get('todo_name')
    tanggal = request.form.get('todo_date')
    waktu = request.form.get('todo_time')
    deskripsi = request.form.get('description')
    
    for item in todos_db:
        if item['id'] == int(todo_id):
            item['name'] = nama
            item['date'] = tanggal
            item['time'] = waktu
            item['description'] = deskripsi
            break
        
    return redirect(url_for('home'))

@app.route('/add', methods=['POST'])
def add():
    todo_id = request.form.get('new_id')
    nama = request.form.get('new_name')
    tanggal = request.form.get('new_date')
    waktu = request.form.get('new_time')
    deskripsi = request.form.get('new_desc')
    
    new_id = len(todos_db) + 1
    todos_db.append({
        "id": new_id,
        "name": nama,
        "date": tanggal,
        "time": waktu,
        "description": deskripsi
    })
        
    return redirect(url_for('home'))

@app.route('/delete', methods=['POST'])
def delete():
    todo_id = request.form.get('todo_id')

    if todo_id:
        global todos_db
        todos_db = [item for item in todos_db if item['id'] != int(todo_id)]

    return redirect(url_for('home'))



if __name__ == '__main__':
    app.run(debug=True)