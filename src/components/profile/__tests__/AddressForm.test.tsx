import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import AddressForm from '../AddressForm';

const mockAddress = {
  id: '1',
  userId: '1',
  street: '123 Main St',
  city: 'City',
  postalCode: '12345',
  country: 'Country',
};

describe('AddressForm', () => {
  it('renders empty form when no address provided', () => {
    renderWithProviders(
      <AddressForm
        onSubmit={() => {}}
        onCancel={() => {}}
        isSubmitting={false}
      />
    );

    expect(screen.getByLabelText(/street/i)).toHaveValue('');
    expect(screen.getByLabelText(/city/i)).toHaveValue('');
    expect(screen.getByLabelText(/postal code/i)).toHaveValue('');
    expect(screen.getByLabelText(/country/i)).toHaveValue('');
  });

  it('renders with address data when provided', () => {
    renderWithProviders(
      <AddressForm
        address={mockAddress}
        onSubmit={() => {}}
        onCancel={() => {}}
        isSubmitting={false}
      />
    );

    expect(screen.getByLabelText(/street/i)).toHaveValue(mockAddress.street);
    expect(screen.getByLabelText(/city/i)).toHaveValue(mockAddress.city);
    expect(screen.getByLabelText(/postal code/i)).toHaveValue(mockAddress.postalCode);
    expect(screen.getByLabelText(/country/i)).toHaveValue(mockAddress.country);
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <AddressForm
        onSubmit={() => {}}
        onCancel={() => {}}
        isSubmitting={false}
      />
    );

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText(/street is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/city is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/postal code is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/country is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderWithProviders(
      <AddressForm
        onSubmit={onSubmit}
        onCancel={() => {}}
        isSubmitting={false}
      />
    );

    await user.type(screen.getByLabelText(/street/i), '123 Main St');
    await user.type(screen.getByLabelText(/city/i), 'City');
    await user.type(screen.getByLabelText(/postal code/i), '12345');
    await user.type(screen.getByLabelText(/country/i), 'Country');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      street: '123 Main St',
      city: 'City',
      postalCode: '12345',
      country: 'Country',
    });
  });

  it('disables form when submitting', () => {
    renderWithProviders(
      <AddressForm
        onSubmit={() => {}}
        onCancel={() => {}}
        isSubmitting={true}
      />
    );

    expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
  });
});