import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider } from '../../../context/AuthContext';
import AuthMain from '../AuthMain';

describe('AuthMain', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <AuthMain />
            </AuthProvider>
        );
    });

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
});
