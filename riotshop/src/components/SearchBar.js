import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SearchBar({handleSearch}) {
    const [text, setText] = useState('')
    const handleChange = (e) => {
        const newText = e.target.value
        setText(newText)
        handleSearch(newText)
    }
    return (
        <div>
            <TextField id="outlined-basic" label="Item" variant="outlined" value={text} onChange={handleChange} />
        </div>
    )
}