FROM python:3

RUN mkdir /app

WORKDIR /app

ADD riot_backend/ /app/

RUN python3 -m pip install --no-cache-dir -r requirements.txt

RUN python3 manage.py migrate
EXPOSE 8000
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
