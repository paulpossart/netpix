import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { server } from '../../../test/server';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../../context/AuthContext';
import Login from '../Login';
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
            <Login setView={vi.fn()} />
            <TestHomePage />
        </AuthProvider>
    );
}

describe('Login', () => {

    it('provides a user object on sign in', async () => {
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

        fireEvent.change(screen.getByLabelText(/enter username/i),
            { target: { value: 'username' } });
        fireEvent.change(screen.getByLabelText(/enter password/i),
            { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/welcome loginUser/i)).toBeInTheDocument();
            expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
        });
    });

    it('shows usernameErr on bad regex', async () => {
        renderDOM();

        fireEvent.change(screen.getByLabelText(/enter username/i),
            { target: { value: '<>' } });
        const usernameErr = await screen.findByText(/username cannot contain these characters/i);
        expect(usernameErr).toBeInTheDocument();
    });

    it('shows submitErr on bad submission', async () => {
        server.use(
            http.post('/api/auth/login', () => {
                return HttpResponse.json(
                    { message: 'Invalid username or password' },
                    { status: 401 }
                );
            })
        );

        renderDOM();

        fireEvent.change(screen.getByLabelText(/enter username/i),
            { target: { value: 'wronguser' }, });
        fireEvent.change(screen.getByLabelText(/enter password/i), {
            target: { value: 'wrongpass' },
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        const submitErr = await screen.findByText(/invalid username or password/i);
        expect(submitErr).toBeInTheDocument();
    });
});
