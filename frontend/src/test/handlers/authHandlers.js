import { http, HttpResponse } from 'msw';

export const authHandlers = [
    http.get('/api/auth/authenticate-user', (req, rs) => {
        return HttpResponse.json(
            {
                message: 'User authenticated.',
                user: {
                    id: 1,
                    username: 'username',
                    created_at: '2025-01-01T00:00:00.000Z',
                    updated_at: '2025-01-01T00:00:00.000Z'
                }
            },
            { status: 200 }
        );
    }),
];
