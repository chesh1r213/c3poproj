FROM python:3.9


USER root


RUN apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y libsasl2-dev python3-dev libldap2-dev libssl-dev krb5-user libkrb5-dev ldap-utils ntp nano

RUN mkdir /app

COPY ./requirements.txt /app/requirements.txt



RUN python3 -m pip install --upgrade pip 

RUN python3 -m pip install -r /app/requirements.txt

WORKDIR /app

COPY . .

EXPOSE 80

CMD python3 /app/main.py
