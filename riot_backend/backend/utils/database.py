for key, item in data.items():
    if item['maps']['11'] and item.get('inStore') is None:
       name = item['name']
       short = item['plaintext']
       description = item['description']
       gold = item['gold']['base']
       id = key
       tags = ";".join(item['tags'])
       curr = Item(id=id, name=name, description_short=short, description=description, gold=gold, tags=tags)
       curr.save()

for item in Item.objects.all():
   try:  
    from_field = data[str(item.id)].get('from')
    for from_item in from_field or []:
        from_item = Item.objects.get(id=int(from_item))
        relation = Relation(from_field=from_item, into_field=item)
        relation.save()
   except:
      print(from_item, item)
