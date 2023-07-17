from django.shortcuts import render, redirect
from .models import key_moments
from .forms import KeyMomentsForm

# Create your views here.


def key_moments_list(request):
    """ A view to return the Key Moments page"""

    key_moments_list = key_moments.objects.all()
    print(key_moments_list)

    return render(request, 'keymoments/keymoments.html', {'key_moments_list': key_moments_list})


def create_key_moment(request):
    """ A view to create moments"""

    if request.method == 'POST':
        form = KeyMomentsForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('keymoments')
    else:
        form = KeyMomentsForm()

    return render(request, 'keymoments/create_key_moment.html', {'form': form})
