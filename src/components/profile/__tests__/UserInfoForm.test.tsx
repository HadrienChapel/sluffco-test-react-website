import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../test/utils';
import UserInfoForm from '../UserInfoForm';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  addresses: [],
};

describe('UserInfoForm', () => {
  it('renders with user data', () => {
    renderWithProviders(
      <UserInfoForm user={mockUser} onSuccess={() => {}} />
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue(mockUser.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(mockUser.email);
    expect(screen.getByLabelText(/phone/i)).toHaveValue(mockUser.phone);
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <UserInfoForm user={mockUser} onSuccess={() => {}} />
    );

    await user.clear(screen.getByLabelText(/name/i));
    await user.clear(screen.getByLabelText(/email/i));
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText(/name must be/i)).toBeInTheDocument();
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('calls onSuccess after successful submission', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    renderWithProviders(
      <UserInfoForm user={mockUser} onSuccess={onSuccess} />
    );

    await user.type(screen.getByLabelText(/name/i), 'New Name');
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Wait for mutation to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    
    expect(onSuccess).toHaveBeenCalled();
  });
});