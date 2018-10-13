from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import Mission_to_Mars_Flask

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_information"
mongo = PyMongo(app)


@app.route("/")
def index():
# check mongo database for a row
    mars = mongo.db.mars_info.find_one()
    return render_template("index.html", mars=mars)


@app.route("/scrape")
def scraper():
    mars = Mission_to_Mars_Flask.scrape()   
    mars_info = mongo.db.mars_info
    mars_info.update({}, mars, upsert=True)
    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)