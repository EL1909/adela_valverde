from django.shortcuts import render, redirect
from .models import key_moments
from .forms import KeyMomentsForm
from django.http import JsonResponse
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils.datastructures import MultiValueDict


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
            # Get the cropped image data from the form data
            cropped_image_data = request.POST.get('cropped_image')

            # Convert the data URL to a file
            image_data = ContentFile(cropped_image_data.encode('utf-8'))
            image_name = "cropped_image.jpg" # Set a suitable image name
            image_file = SimpleUploadedFile(image_name, image_data.read())

            # Modify the form to replace the uploaded images with the cropped
            form.cleaned_data['image'] = image_file

            new_moment = form.save()
            
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
