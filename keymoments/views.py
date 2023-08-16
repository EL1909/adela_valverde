from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import key_moments
from .forms import KeyMomentsForm


# Create your views here.


def key_moments_list(request):
    """ View to return the Key Moments page"""

    key_moments_list = key_moments.objects.all()

    return render(request, 'keymoments/keymoments.html', {'key_moments_list': key_moments_list})


def create_key_moment(request):
    """ View to create moments"""

    if request.method == 'POST':
        form = KeyMomentsForm(request.POST, request.FILES)
        if form.is_valid():
            new_moment = form.save()

            response_data = {
                'title': new_moment.title,
                'start_date': new_moment.start_date,
                'excerpt': new_moment.excerpt,
                'end_date': new_moment.end_date,
                'description': new_moment.description,
                'moment_type': new_moment.moment_type,
                'image_url': new_moment.image.url if new_moment.image else None,
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
    
    if request.method == 'GET':
        # Extract necessary fields from the 'moment' object and return them in the response
        response_data = {
            'title': moment.title,
            'excerpt': moment.excerpt,
            'description': moment.description,
            'start_date': moment.start_date.strftime('%Y-%m-%d'),
            'end_date': moment.end_date.strftime('%Y-%m-%d') if moment.end_date else None,
            'moment_type': moment.moment_type,
            'location': moment.location,
            'image_url': moment.image.url if moment.image else None,  # Use the original image URL
        }
        return JsonResponse(response_data)
    
    if request.method == 'POST':
        form = KeyMomentsForm(request.POST, instance=moment)
        if form.is_valid():
            # Update the image field with the cropped image (if provided)
            cropped_image_data = form.cleaned_data.get('cropped_image')
            if cropped_image_data:
                moment.image = cropped_image_data
            form.save()

            return JsonResponse({'success': True})
        else:
            # Handle form validation errors
            errors = form.errors.as_json()
            return JsonResponse({'errors': errors}, status=400)

