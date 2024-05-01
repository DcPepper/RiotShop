from django.contrib import admin
from django.urls import path
from .views import items_list, relation_list, item_view

urlpatterns = [
    path('items', items_list),
    path('items/<int:id>', item_view ),
    path('relations', relation_list),
]