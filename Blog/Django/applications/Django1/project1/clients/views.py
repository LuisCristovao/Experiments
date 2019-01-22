from django.shortcuts import render
from django.http import HttpResponse
from .models import Person


# Create your views here.
def person_list(request):
    persons = Person.objects.all()
    return render(request, "list_persons.html", {'persons': persons})
    # return HttpResponse("Bla bla it worked even though there is an error importing clients????")
