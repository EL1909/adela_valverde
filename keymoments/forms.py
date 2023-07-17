from django import forms
from .models import key_moments


class KeyMomentsForm(forms.ModelForm):
    class Meta:
        model = key_moments
        fields = '__all__'
