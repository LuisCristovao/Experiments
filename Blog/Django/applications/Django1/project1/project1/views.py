from django.http import HttpResponse
from django.shortcuts import render

people = {
    'Pedro': {'name': 'Pedro', 'age': 25},
    'Tiago': {'name': 'Tiago', 'age': 27},
    'João': {'name': 'João', 'age': 24}
}


def hello(request, name):
    # return HttpResponse("Hello "+name)
    return render(request, "index.html", {'name': name})


def getPerson(name):
    global people
    try:
        return people[name]
    except:
        return None


def person(request, name):
    _person = getPerson(name)
    print(_person)
    if _person is not None:
        return render(request, 'person.html', {'name': _person['name'], 'age': _person['age']})
    else:
        return render(request, 'person.html', {'name': '', 'age': -1})
