import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO users (username, password, token, is_admin) VALUES (?, ?, ?, ?)",
            ('123456', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 'token1', 0)
            )

cur.execute("INSERT INTO users (username, password, token, is_admin) VALUES (?, ?, ?, ?)",
            ('000000', 'fb131bc57a477c8c9d068f1ee5622ac304195a77164ccc2d75d82dfe1a727ba8d674ed87f96143b2b416aacefb555e3045c356faa23e6d21de72b85822e39fdd', 'token2', 1)
            )

connection.commit()
connection.close()