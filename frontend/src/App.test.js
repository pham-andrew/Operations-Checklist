import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';
import { createMemoryHistory } from 'history';


test('renders home link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders login link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders create checklist link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create a checklist/i);
  expect(linkElement).toBeInTheDocument();
});

it('routes to a new route', async () => {
  render(<App />);
  const history = createMemoryHistory();
  history.push = jest.fn();

  const linkElement = screen.getByText(/Login/i);
  fireEvent.click(linkElement);

  expect(history.push).toHaveBeenCalledWith('/login');
});
