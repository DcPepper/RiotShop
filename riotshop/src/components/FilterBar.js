import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

const Tags = {
    Damage:'Damage', // OK
    CriticalStrike:'CriticalStrike', // OK
    AttackSpeed:'AttackSpeed', // OK
    OnHit:'OnHit', //OK
    ArmorPenetration:'ArmorPenetration', // OK

    SpellDamage:'SpellDamage', //OK
    ManaAndRegen:'Mana_ManaRegen', //OK
    MagicPenetration:'MagicPenetration', //OK

    HealthAndRegen:'Health_HealthRegen', // OK
    Armor:'Armor', //OK
    MagicResist:'MagicResist_SpellBlock', // OK

    CooldownReduction:'CooldownReduction_AbilityHaste', // OK
    Movement:'Slow_Boots_NonbootsMovement', // OK 
    LifeStealAndSpellVamp:'LifeSteal_SpellVamp', // OK
    Jungle:'Jungle',    
    Lane:'Lane',
    
    Tenacity:'Tenacity',
    
    Consumable:'Consumable',
    Stealth:'Stealth',
    Vision:'Vision',
    
    Trinket:'Trinket',

  }

export default function FilterBar({handleTag}) {
    const [tags, setTags] = useState([]);

    const handleChange = (e) => {
        if (e.target.checked){
            setTags([...tags, Tags[e.target.labels[0].textContent]])
            handleTag([...tags, Tags[e.target.labels[0].textContent]])
        } else {
            if (tags.includes(Tags[e.target.labels[0].textContent])) {
                setTags(tags.filter(tag => tag != Tags[e.target.labels[0].textContent]))
                handleTag(tags.filter(tag => tag != Tags[e.target.labels[0].textContent]))
            }
            
        }
    }

    return (
        <FormGroup row>
            <ul>
            {Object.keys(Tags).map((tag, idx) => {
                return <li><FormControlLabel key={`tag-${tag}-${idx}`} control={<Checkbox />} label={tag} onChange={handleChange} /></li>
            })}
            </ul>
        </FormGroup>
    )
}