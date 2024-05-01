from django.db import models
from enum import Enum
from django.core.exceptions import ValidationError

class TagsEnum(Enum):
    SpellBlock='SpellBlock'
    Jungle='Jungle'
    Mana='Mana'
    ManaRegen='ManaRegen'
    LifeSteal='LifeSteal'
    OnHit='OnHit'
    Lane='Lane'
    Tenacity='Tenacity'
    CriticalStrike='CriticalStrike'
    Slow='Slow'
    Boots='Boots'
    NonbootsMovement='NonbootsMovement'
    ArmorPenetration='ArmorPenetration'
    Consumable='Consumable'
    SpellDamage='SpellDamage'
    MagicResist='MagicResist'
    Stealth='Stealth'
    Vision='Vision'
    MagicPenetration='MagicPenetration'
    Active='Active'
    SpellVamp='SpellVamp'
    GoldPer='GoldPer'
    Health='Health'
    Aura='Aura'
    Armor='Armor'
    AttackSpeed='AttackSpeed'
    HealthRegen='HealthRegen'
    Trinket='Trinket'
    Damage='Damage'
    AbilityHaste='AbilityHaste'
    CooldownReduction='CooldownReduction'

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

    @classmethod
    def values(cls):
        return [key.name for key in cls]

def validate_tags(tags):
    try:
        tags = tags.split(';')
        for tag in tags:
            if tag not in TagsEnum.values():
                raise ValidationError('tag not supported')
    except:
        raise ValidationError('tag unsupported')

class Item(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    description_short = models.TextField()
    description = models.TextField()
    gold = models.IntegerField()
    tags = models.CharField(max_length=200, blank=True, validators=[validate_tags])

    def __str__(self) -> str:
        return f'{self.id}: {self.name}'

    def get_tags(self):
        return self.tags.split(';')
# Create your models here.

class Relation(models.Model):
    from_field = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='%(class)s_from')
    into_field = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='%(class)s_into')

    class Meta:
        unique_together = (("from_field", "into_field"),)
    
    def __str__(self) -> str:
        return f'from {self.from_field} to {self.into_field}'