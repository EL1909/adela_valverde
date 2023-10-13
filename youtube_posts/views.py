import os
from django.shortcuts import render
from googleapiclient.discovery import build
from decouple import config


def simple_view(request):
    return render(request, 'youtube_posts/simple_template.html')


def youtube_playlist_videos(request, playlist_id):
    youtube_api_key = config('YOUTUBE_API_KEY')  # Get your API key from settings
    youtube = build('youtube', 'v3', developerKey=youtube_api_key)

    playlist_items = youtube.playlistItems().list(
        playlistId=playlist_id,
        part='snippet',
        maxResults=10
    ).execute()

    video_data = playlist_items['items']

    context = {
        'video_data': video_data,
    }

    return render(request, 'youtube_posts/youtube_posts.html', context)

