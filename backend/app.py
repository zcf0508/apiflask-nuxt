from pathlib import Path

from apiflask import APIFlask
from apiflask.fields import String
from flask_cors import CORS

app = APIFlask(__name__)
CORS(app)
app.config["SYNC_LOCAL_SPEC"] = True
app.config["LOCAL_SPEC_PATH"] = Path(app.root_path) / "openapi.json"


@app.get("/")
@app.output({"message": String()})
def index():
    return {"message": "hello from backend"}
