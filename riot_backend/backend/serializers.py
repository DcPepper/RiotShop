from rest_framework import serializers
from .models import Item, Relation

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('name', 'description_short', 'description', 'gold', 'tags', 'pk', 'depth')

class RelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relation
        fields = ('from_field', 'into_field')
