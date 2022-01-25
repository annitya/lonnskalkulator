import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders timepris input', () => {
    render(<App />);
    const timeprisLabel = screen.getByText(/timepris/i);
    expect(timeprisLabel).toBeInTheDocument();
});
