from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('keymoments/', views.key_moments_list, name='keymoments'),
    path('create_key_moment/', views.create_key_moment, name='create_key_moment'),
]
