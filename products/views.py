from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib import messages
from django.urls import reverse_lazy
from django.db.models import Q
from django.views.generic.edit import CreateView
from .models import Product, Category


# Create your views here.


def all_products(request):
    """ A View to show all products, including sorting and search queries """

    products = Product.objects.all()
    query = None
    categories = None

    if request.GET:
        if 'category' in request.GET:
            categories = request.GET['category'].split(',')
            products = products.filter(category__name__in=categories)
            categories = Category.objects.filter(name__in=categories)

        if 'q' in request.GET:
            query = request.GET['q']
            if not query:
                messages.error(request, "You did not enter any search criteria!")
                return redirect(reverse('products'))

            queries = Q(name__icontains=query) | Q(description__icontains=query)
            products = products.filter(queries)

    context = {
        'products': products,
        'search_term': query,
        'current_categories': categories,
    }

    return render(request, 'products/products.html', context)


def product_detail(request, product_id):
    """ A View to show individual product details """
    product = get_object_or_404(Product, pk=product_id)
    context = {
        'product': product,
    }

    return render(request, 'products/product_detail.html', context)


class product_create_view(UserPassesTestMixin, CreateView):
    model = Product
    fields = ['category', 'name', 'description', 'price', 'image_url', 'image', 'created_by']
    success_url = reverse_lazy('products')

    def test_func(self):
        return self.request.user.is_superuser  # Allow only superuser to access this view