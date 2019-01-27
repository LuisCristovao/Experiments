"""
Content used here can be seen in this page: https://docs.djangoproject.com/en/2.1/topics/forms/modelforms/
"""

from django.forms import ModelForm
from .models import Person


# Create the form class.
class PersonForm(ModelForm):
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'age', 'salary', 'bio', 'photo']
