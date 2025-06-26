FROM python:3.10-slim

RUN useradd -ms /bin/bash sandboxuser
WORKDIR /home/sandboxuser 

COPY ./Container/main.py ./main.py
RUN chmod +x main.py 

RUN pip install flask==3.1.0

USER sandboxuser

CMD [ "python", "main.py" ]