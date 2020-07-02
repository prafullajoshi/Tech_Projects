
from django.urls import path

from . import views

urlpatterns = [

    path('', views.allblogs, name = 'allblogs'),
    path('<int:blog_id>/',views.detail, name = 'detail'),
    path('/aboutme', views.aboutme, name = 'aboutme'),
    path('/projects', views.projects, name = 'projects'),
    path('/certificates',views.certificates, name = 'certificates'),
    path('/otherwork', views.otherwork, name = 'otherwork'),
]
