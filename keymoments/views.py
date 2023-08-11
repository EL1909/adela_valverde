from django.shortcuts import render, redirect, get_object_or_404
from .models import key_moments
from .forms import KeyMomentsForm
from django.http import JsonResponse


# Create your views here.


def key_moments_list(request):
    """ A view to return the Key Moments page"""

    key_moments_list = key_moments.objects.all()

    return render(request, 'keymoments/keymoments.html', {'key_moments_list': key_moments_list})


def create_key_moment(request):
    """ A view to create moments"""

    if request.method == 'POST':
        form = KeyMomentsForm(request.POST, request.FILES)
        if form.is_valid():
            new_moment.save()

            response_data = {
                'title': new_moment.title,
                'start_date': new_moment.start_date,
                'image': new_moment.image.url,
                'excerpt': new_moment.excerpt,
                'end_date': new_moment.end_date,
                'description': new_moment.description,
                'moment_type': new_moment.moment_type,
            }
            return JsonResponse(response_data)
        else:
            # Handle form validation errors
            errors = form.errors.as_json()
            return JsonResponse({'errors': errors}, status=400)
    else:
        form = KeyMomentsForm()

    return render(request, 'keymoments/create_key_moment.html', {'form': form})


def edit_key_moment(request, moment_id):
    moment = get_object_or_404(key_moments, id=moment_id)
    
    # Extract necessary fields from the 'moment' object and return them in the response
    response_data = {
        'title': moment.title,
        'excerpt': moment.excerpt,
        'description': moment.description,
        'start_date': moment.start_date,
        'end_date': moment.end_date,
        'moment_type': moment.moment_type,
        'location': moment.location,
        'cropped_image_data': moment.cropped_image.url if moment.cropped_image else None,
    }
    
    return JsonResponse(response_data)
    