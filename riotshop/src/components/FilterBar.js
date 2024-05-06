import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

const Tags = {
    SpellBlock:'SpellBlock',
    Jungle:'Jungle',
    Mana:'Mana',
    ManaRegen:'ManaRegen',
    LifeSteal:'LifeSteal',
    OnHit:'OnHit',
    Lane:'Lane',
    Tenacity:'Tenacity',
    CriticalStrike:'CriticalStrike',
    Slow:'Slow',
    Boots:'Boots',
    NonbootsMovement:'NonbootsMovement',
    ArmorPenetration:'ArmorPenetration',
    Consumable:'Consumable',
    SpellDamage:'SpellDamage',
    MagicResist:'MagicResist',
    Stealth:'Stealth',
    Vision:'Vision',
    MagicPenetration:'MagicPenetration',
    Active:'Active',
    SpellVamp:'SpellVamp',
    GoldPer:'GoldPer',
    Health:'Health',
    Aura:'Aura',
    Armor:'Armor',
    AttackSpeed:'AttackSpeed',
    HealthRegen:'HealthRegen',
    Trinket:'Trinket',
    Damage:'Damage',
    AbilityHaste:'AbilityHaste',
    CooldownReduction:'CooldownReduction',
  }

export default function FilterBar({handleTag}) {
    const [tags, setTags] = useState([]);

    const handleChange = (e) => {
        if (e.target.checked){
            setTags([...tags, e.target.labels[0].textContent])
            handleTag([...tags, e.target.labels[0].textContent])
        } else {
            if (tags.includes(e.target.labels[0].textContent)) {
                setTags(tags.filter(tag => tag != e.target.labels[0].textContent))
                handleTag(tags.filter(tag => tag != e.target.labels[0].textContent))
            }
            
        }
    }

    return (
        <FormGroup row>
            {Object.keys(Tags).map(tag => {
                return <FormControlLabel key={`tag-${tag}`} control={<Checkbox />} label={Tags[tag]} onChange={handleChange} />
            })}
        </FormGroup>
    )
}