import json
import re
import random
from flask import Blueprint, render_template, request, session,redirect,url_for, flash
from testparse import googlepars
otus = Blueprint('otus',__name__)


class Item:
  def __init__(self, vals):
    self.__dict__ = vals




@otus.route('/',methods=['GET','POST'])
def home():
	return render_template('find.html')

@otus.route('/inf',methods=['GET','POST'])
def inf():
    case = request.form.get('account')
    return redirect(f'/info/{case}')

@otus.route('/info/<string:case>',methods=['GET','POST'])
def info(case):
    title='Что мы нашли'
    all=[]
    googlepars(case,all)
    return render_template("image.html",title=title,all=all)