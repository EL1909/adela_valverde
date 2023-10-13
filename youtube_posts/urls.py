from django.urls import path
from . import views

urlpatterns = [
    path('youtube_posts/<str:playlist_id>/', views.youtube_playlist_videos, name='youtube_posts'),
    path('simple/', views.simple_view, name='simple_view'),
]
