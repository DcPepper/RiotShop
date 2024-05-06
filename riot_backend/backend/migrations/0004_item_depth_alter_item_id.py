# Generated by Django 5.0.4 on 2024-05-06 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_relation'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='depth',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
    ]
