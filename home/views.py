from django.shortcuts import render
import json

# Create your views here.


def index(request):
    """ A View to return the index page"""
    svgPaths = [
        'CanvaContent/1.svg',
        'CanvaContent/5.svg',
    ]

    context = {
        'svgPaths': svgPaths,
    }

    return render(request, 'home/home.html', context)
