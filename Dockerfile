FROM python:3.7-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

copy sqlalchemy_example.db sqlalchemy_example.db
COPY app.py app.py
COPY models.py models.py
COPY create.py create.py


ENTRYPOINT ["python", "-u", "/app.py]
