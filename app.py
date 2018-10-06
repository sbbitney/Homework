from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def welcome():
    return (
        f"Welcome to the Climate App API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"


@app.route("/api/v1.0/precipitation")
def precipitation():
    most_recent = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
    year_ago = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    temps = session.query(Measurement.date, Measurement.tobs).\
        filter(Measurement.date > year_ago).\
        order_by(Measurement.date).all()

    dates_temps = []
    for ch in temps:
        row = {}
        row["date"] = temps[0]
        row["temp"] = temps[1]
        dates_temps.append(row)

    """Query for the dates and temperature observations from the last year.

Convert the query results to a Dictionary using date as the key and tobs as the value.

Return the JSON representation of your dictionary."""

    return jsonify(dates_temps)


@app.route("/api/v1.0/stations")
def stations():