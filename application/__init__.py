from flask import Flask, url_for, flash, redirect, render_template, request, session, Blueprint
from timedelta import Timedelta

from systems.otus import otus_route


def initapp() -> Flask:
    ap = Flask(__name__)
    ap.config['SECRET_KEY'] = 'secret'
    ap.config['DEBUG'] = True
    ap.config['PERMANENT_SESSION_LIFETIME'] = Timedelta(minutes=5)
    ap.config['COOKIE_SECURE'] = 'Secure'
    ap.config['PREFERRED_URL_SCHEME'] = 'http'
    ap.config['COOKIE_DURATION'] = Timedelta(days=365)
    ap.register_blueprint(otus_route.otus)
    return ap
