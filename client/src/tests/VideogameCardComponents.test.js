import React from 'react';
import { render, screen } from '@testing-library/react';
import VideogameCard from '../components/VideogameCard';

describe('VideogameCard component', () => {
  const videogame = {
    id: 1,
    name: 'Super Mario Bros.',
    released: '1985-09-13',
    rating: 4.5,
    background_image: 'https://example.com/super-mario-bros.jpg'
  };

  test('renders properly', () => {
    render(<VideogameCard videogame={videogame} />);
    const name = screen.getByText('Super Mario Bros.');
    const released = screen.getByText('Released: 1985-09-13');
    const rating = screen.getByText('Rating: 4.5');
    expect(name).toBeInTheDocument();
    expect(released).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  });

  test('clicking on the card calls the callback function', () => {
    const handleClick = jest.fn();
    render(<VideogameCard videogame={videogame} onClick={handleClick} />);
    const card = screen.getByRole('button');
    card.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
/*En este ejemplo, se está probando que el componente VideogameCard se 
renderice correctamente con los datos del videojuego y que el evento onClick se dispare cuando se hace clic en la tarjeta.*/