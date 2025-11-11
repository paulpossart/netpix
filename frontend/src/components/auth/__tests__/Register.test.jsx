import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { server } from '../../../test/server';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../../context/AuthContext';
import Register from '../Register';
import { useAuth } from '../../../context/AuthContext';

function TestHomePage() {
    const { user } = useAuth();
    return (
        <div>
            {user ? `Welcome ${user.username}` : 'no user'}
        </div>
    );
};

const renderDOM = () => {
    render(
        <AuthProvider>
            <Register setView={vi.fn()} />
            <TestHomePage />
        </AuthProvider>
    );
}

describe('Register', () => {
    it('provides a user object on registration', async () => {
        server.use(
            http.get('/api/auth/authenticate-user', () => {
                return HttpResponse.json(
                    {
                        message: 'Not authenticated.',
                        user: null
                    },
                    { status: 401 }
                );
            }),
        );

        renderDOM();

        expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
        expect(screen.getByText(/no user/i)).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/register a new username/i),
            { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/register a new password/i),
            { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/confirm your new password/i),
            { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /become a member/i }));

        await waitFor(() => {
            expect(screen.getByText(/welcome regUser/i)).toBeInTheDocument();
            expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
        });
    });

    it('shows confirmPasswordErr on password mismatch', async () => {
        renderDOM();

        fireEvent.change(screen.getByLabelText(/register a new password/i),
            { target: { value: 'password' } });
        fireEvent.change(screen.getByLabelText(/confirm your new password/i),
            { target: { value: 'wrongpass' } });

        const confirmPasswordErr = await screen.findByText(/passwords do not match/i);
        expect(confirmPasswordErr).toBeInTheDocument();
    });

    it('shows submitErr on bad submission', async () => {
        server.use(
            http.post('/api/auth/register-user', () => {
                return HttpResponse.json(
                    { message: 'Invalid username or password' },
                    { status: 401 }
                );
            })
        );

        renderDOM();

        fireEvent.change(screen.getByLabelText(/register a new username/i),
            { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/register a new password/i),
            { target: { value: 'wrongpass' } });
        fireEvent.change(screen.getByLabelText(/confirm your new password/i),
            { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByRole('button', { name: /become a member/i }));

        const submitErr = await screen.findByText(/invalid username or password/i);
        expect(submitErr).toBeInTheDocument();
    });
});
