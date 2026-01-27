import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Portal({ isOpen, onClick, children }) {
    const modalRoot = document.getElementById("modal-root");
    const path = useLocation().pathname;
    const isAccount = path.startsWith('/account');

    useEffect(() => {
        if (!isOpen) return;

        const header = document.getElementById('header');
        const footer = document.getElementById('footer');

        const addScrollbarPadding = (el) => {
            if (!el) return;
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            const originalPadding = el.style.paddingRight
                || window.getComputedStyle(el).paddingRight
                || '0px';
            el.style.paddingRight = `calc(${originalPadding} + ${scrollBarWidth}px)`;
            return originalPadding;
        };

        const bodyOriginalPadding = addScrollbarPadding(document.body);
        const headerOriginalPadding = addScrollbarPadding(header);
        const footerOriginalPadding = addScrollbarPadding(footer);

        document.body.style.overflow = "hidden";

        const closeOnEsc = (e) => { if (e.key === 'Escape') onClick(); }
        document.addEventListener('keydown', closeOnEsc);

        return () => {
            document.body.style.paddingRight = bodyOriginalPadding;
            if (header) header.style.paddingRight = headerOriginalPadding;
            if (footer) footer.style.paddingRight = footerOriginalPadding;

            document.body.style.overflow = "";

            document.removeEventListener('keydown', closeOnEsc);
        }
    }, [isOpen, onClick]);

    if (!isOpen) return null;

    return createPortal(
        <>
            <div
                aria-hidden="true"
                onClick={onClick}
                style={{
                    backdropFilter: 'blur(2px)',
                    backgroundColor: isAccount
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(0, 0, 0, 0.8)',
                    position: 'fixed',
                    inset: '0',
                    zIndex: '9500',
                }}></div>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '9900',
                }}>
                {children}
            </div>
        </>,

        modalRoot
    );
};
