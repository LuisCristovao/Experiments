from django.db import models


# Create your models here.


class Person( models.Model):
    # buzz word is field types
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    age = models.IntegerField()
    salary = models.DecimalField(max_digits=5, decimal_places=2)
    bio = models.TextField()
    photo = models.ImageField(upload_to='imgs', null=True, blank=True)

    def __str__(self):
        return str(self.first_name + " " + self.last_name)

    def getFirstLastName(self):
        return str(self.first_name + "_" + self.last_name)
