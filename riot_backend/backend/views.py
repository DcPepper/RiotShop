from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Item, Relation
from .serializers import ItemSerializer, RelationSerializer

@api_view(['GET'])
def items_list(request):
    items = Item.objects.all()
    s = request.GET.get('s')
    tag = request.GET.get('tag')    
    if tag:
        tag = tag.split('-')
        items_filtered = [item.id for item in items if all(t in item.get_tags() for t in tag)]
        items = Item.objects.filter(id__in=items_filtered)
    if s and len(s):
        items = items.filter(name__icontains=s)
    serializer = ItemSerializer(items, context={'request':request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def relation_list(request):
    relations = Relation.objects.all()
    serializer = RelationSerializer(relations, context={'request':request}, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def item_view(request, id):
    item = get_object_or_404(Item, id=id)
    serializer = ItemSerializer(item, context={'request':request})
    return Response(serializer.data)