import os
from googleapiclient.discovery import build
from django.shortcuts import render
from decouple import config


def simple_view(request):
    return render(request, 'youtube_posts/simple_template.html')
    

def youtube_posts(request):
    youtube_api_key = config('YOUTUBE_API_KEY')  # Get your API key from settings
    youtube = build('youtube', 'v3', developerKey=youtube_api_key)

    # Replace 'channelId' with your channel's ID or 'mine' to fetch your own videos
    response = youtube.search().list(
        channelId='UCMZJj9l4TvNnNDifpjEno9g',
        type='video',
        order='date',
        part='id',
        maxResults=10  # You can adjust the number of videos to display
    ).execute()

    video_ids = [item['id']['videoId'] for item in response['items']]
    video_details = []

    for video_id in video_ids:
        video_response = youtube.videos().list(
            id=video_id,
            part='snippet'
        ).execute()
        video_details.append(video_response['items'][0])

    context = {
        'video_details': video_details,
    }

    return render(request, 'youtube_posts.html', context)
