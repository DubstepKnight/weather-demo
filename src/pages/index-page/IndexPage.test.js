import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IndexPage from './IndexPage';

// Mock the toast function
jest.mock('sonner', () => ({
  toast: jest.fn(),
}));

// Mock the getCurrentPosition function
const mockGetCurrentPosition = jest.fn();

beforeAll(() => {
  // Mocking navigator.geolocation
  global.navigator.geolocation = {
    getCurrentPosition: mockGetCurrentPosition,
  };
});

test('renders loading state initially', () => {
  render(<IndexPage />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders the page with data after loading', async () => {
  render(<IndexPage />);

  // Simulate a successful geolocation response
  const mockLocationData = {
    coords: {
      latitude: 60.12,
      longitude: 24.24,
    },
  };
  mockGetCurrentPosition.mockImplementationOnce((success) =>
    success(mockLocationData),
  );

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('weather-card')).toBeInTheDocument();
  });
});

test('handles geolocation error', async () => {
  render(<IndexPage />);

  // Simulate an error in geolocation
  mockGetCurrentPosition.mockImplementationOnce((_, error) => error({}));

  await waitFor(() => {
    expect(
      screen.getByText(/error getting current location/i),
    ).toBeInTheDocument();
  });
});

test('opens and closes the location search dialog on header click', () => {
  render(<IndexPage />);

  fireEvent.click(screen.getByTestId('header'));

  expect(screen.getByTestId('location-search-dialog')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('header'));

  expect(
    screen.queryByTestId('location-search-dialog'),
  ).not.toBeInTheDocument();
});
