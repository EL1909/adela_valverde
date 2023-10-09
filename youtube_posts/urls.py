from django.urls import path
from . import views

urlpatterns = [
    path('youtube_posts/', views.youtube_posts, name='youtube_posts'),
    path('simple/', views.simple_view, name='simple_view'),
]
