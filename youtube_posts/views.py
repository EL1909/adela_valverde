import os
from googleapiclient.discovery import build
from django.shortcuts import render
from django_embed_video.fields import EmbedVideoField
from youtube_data_api import YouTubeDataApi
from decouple import config


def simple_view(request):
    return render(request, 'youtube_posts/simple_template.html')

def video_list(request):
    youtube_api = YoutubeDataApi()

    # Retrieve a list of all the videos on the Youtube Channel with this ID
    videos = youtube_api.videos_list(part='snippet', channelId='UCvxBjb0KE26mADhgkECn8rQ')

    # Iterate over the list of videos and display each video on the Template
    context = {
        'videos' = videos
    }
    
    return render (request, 'youtube_posts/simple_template.html', context)



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

    print(response)

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

    return render(request, 'youtube_posts/youtube_posts.html', context)
