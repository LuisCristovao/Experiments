from django.shortcuts import render
from django.http import HttpResponse
from .models import Person
from .forms import PersonForm
from django.shortcuts import redirect,get_object_or_404


# Create your views here.
def person_list(request):
    persons = Person.objects.all()
    return render(request, "list_persons.html", {'persons': persons})
    # return HttpResponse("Bla bla it worked even though there is an error importing clients????")


def person_new(request):
    #Sends html form for the Person Model
    #The None input is sending and empty form
    form = PersonForm(request.POST,request.FILES, None)

    if form.is_valid():
        form.save()
        persons = Person.objects.all()
        return redirect('person_list')


    #sending a filled html form
    return render(request, "person_form.html", {'form': form})

def person_update(request,id):
    person= get_object_or_404(Person, pk=id)
    form = PersonForm(request.POST or None, request.FILES or None, instance=person)

    if form.is_valid():
        form.save()
        return redirect('person_list')

    return render(request, 'person_form.html',{'form':form})
    #print(id)
    #return HttpResponse('<h2 style="color:hsl(81, 100%, 50%)">Work in Progress '+str(id)+'</h2>')
