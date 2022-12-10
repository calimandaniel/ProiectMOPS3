import { render, screen } from '@testing-library/react';
import {add} from './Add';
import App from '../App.js';
import { Connect } from './Add';

test('renders the landing page', async () => {
    const id = add("da555", "da555", "da555", "da555")
   
    const response = await fetch(`http://localhost:5000/record/${id}`);
    if(response.status != 200)
    {
        return;
    }
    expect(response.data).not.toBeNull();
});
