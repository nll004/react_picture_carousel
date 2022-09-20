import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';


it('renders card component successfully', () => {
    render(<Card />);
});

it('matches snapshot', () => {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});
