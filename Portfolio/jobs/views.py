from django.shortcuts import render

# Create your views here.
from .models import Job

def home(request):
    jobs = Job.objects      # this is to get jobs from database
    return render(request,'jobs/home.html',{'jobs':jobs})   # These jobs are forwarded to home.html in dictionary with 'jobs' as a key and jobs that we got as a value. This is why django is so cool
