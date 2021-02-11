from flask import Flask, redirect, url_for, render_template, request, jsonify
from models import db,Users,Items,Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Flask
app = Flask(__name__)
# app.config['SECRET_KEY'] = '\x14B~^\x07\xe1\x197\xda\x18\xa6[[\x05\x03QVg\xce%\xb2<\x80\xa4\x00'
app.config['DEBUG'] = True

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy_example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)
db.create_all()


# Session
engine = create_engine('sqlite:///sqlalchemy_example.db')
Base.metadata.bind = engine
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

# Routes

# Index
@app.route("/")
def index():
    '''
    Home page
    '''
    return "Hello World"

# Insert
@app.route("/insert/item/todo", methods = ['POST'])
def todo():
    '''
    insert item todo
    '''
    recievedItem = request.form.get("item")
    new_item = Items(item=recievedItem)
    session.add(new_item)
    session.commit()

    return "thank you"

# Get Items
@app.route("/get/items", methods = ['GET'])
def items():
    '''
    items
    '''
    recievedItems = session.query(Items).all()
    temp = []
    for itm in recievedItems:
        print(itm.item)
        temp.append(itm.item)
    return jsonify(temp)

if __name__ == "__main__":
    app.run(port=3000)