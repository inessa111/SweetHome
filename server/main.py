from flask import Flask, jsonify, request
import sqlite3
app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/auth", methods=["GET"])
def auth():
    username = request.args.get("username", None)
    password = request.args.get("password", None)
    if username and password:
        conn = get_db_connection()
        token = conn.execute('SELECT token FROM users WHERE username=? AND password=?', 
        (username, password)).fetchone()
        conn.close()
        if token:
            return jsonify(token=token[0], success=True)
        else:
            return jsonify(reason="Неверный логин или пароль", success=False)
    else:
        return jsonify(reason="Логин или пароль не были отправлены", success=False)
    


@app.route("/is_admin", methods=["GET"])
def is_admin():
    token = request.args.get("token", None)
    conn = get_db_connection()
    is_admin = conn.execute('SELECT is_admin FROM users WHERE token=?', (token,)).fetchone()
    conn.close()
    if is_admin:
        return jsonify(result=is_admin[0])
    else:
        return jsonify(result=False)
    


    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
    