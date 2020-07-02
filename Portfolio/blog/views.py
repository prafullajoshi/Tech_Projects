from django.shortcuts import render, get_object_or_404  ## get_object_or_404 is for detail function

# Create your views here.
from .models import Blog


def allblogs(request):
    blogs = Blog.objects        # this is to get the blog from database
    return render(request,'blog/allblogs.html',{'blogs':blogs})     # these blogs are forwarded to allblogs.html as a dictionary in which 'blogs' is a key and blogs that we got as a value. This is why django is cool.

def detail(request, blog_id):
    detailblog = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'blog/detail.html', {'blog' : detailblog})

def aboutme(request):
    return render(request,'blog/aboutme.html')

def projects(request):
    return render(request,'blog/projects.html')

def certificates(request):
    return render(request, 'blog/certificates.html')

def otherwork(request):
    return render(request, 'blog/otherwork.html')
