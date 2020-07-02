from django.contrib import admin

# Register your models here.
from .models import Job     # .models means indicates current directory

admin.site.register(Job)
