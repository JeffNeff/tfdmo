# Jeff Naef Test Project

## Local Setup and Testing

```cmd
pip (or pip3) install -r requirements.txt 
python (or python3) create.py (initiate a database)
python (or python3) app.py 
```

In the `static` folder, populate the `./static/src/auth_config.json` with the proper AUTH0 creds and info. 

```cmd
cd static
npm install
npm start
```

## Kubernetes Deployment
not finished implementing

```
ko apply -f config/
```

## Live Project Preview
not finished implementing
s
