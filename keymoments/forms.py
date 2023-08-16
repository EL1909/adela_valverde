from django import forms
from .models import key_moments
from django.forms import DateInput


class KeyMomentsForm(forms.ModelForm):
    start_date = forms.DateField(widget=DateInput(attrs={'type': 'date'}))
    end_date = forms.DateField(widget=DateInput(attrs={'type': 'date'}), required=False)

    class Meta:
        model = key_moments
        fields = ['title', 'excerpt', 'description', 'start_date', 'end_date', 'moment_type', 'location', 'image', 'status']
