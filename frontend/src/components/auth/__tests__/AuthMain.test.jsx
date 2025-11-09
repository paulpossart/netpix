import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { server } from '../../../test/server';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../../context/AuthContext';
import AuthMain from '../AuthMain';

beforeEach(() => {
    render(
        <AuthProvider>
            <AuthMain />
        </AuthProvider>
    );
});

describe('AuthMain', () => {
    it('renders Login by default', () => {
        expect(screen.getByText(/you are on the sign in page/i)).toBeInTheDocument();
        expect(screen.queryByText(/you are on the user registration page/i)).not.toBeInTheDocument();
    });

    it('changes view on click', () => {
        expect(screen.getByText(/you are on the sign in page/i)).toBeInTheDocument();
        expect(screen.queryByText(/you are on the user registration page/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(/sign up now/i));
        expect(screen.getByText(/you are on the user registration page/i)).toBeInTheDocument();
        expect(screen.queryByText(/you are on the sign in page/i)).not.toBeInTheDocument();
    });

    it('shows usernameErr on bad regex', async () => {
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
