function Disclaimer({ onClick }) {

    const overlayStyle = {
        backdropFilter: 'blur(2px)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        inset: '0',
        zIndex: '9500'
    };

    const disclaimerStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9900',
        backgroundColor: 'white',
        padding: '1em',
        textAlign: 'center',
        borderRadius: '4px',
        width: 'clamp(3px, 90%, 460px)',
        maxHeight: '90vh',
        overflow: 'auto',
        height: 'fit-content',
        lineHeight: '1.5',
        fontFamily: '"Roboto", Arial, sans-serif',
        fontSize: '1.6rem',
        fontWeight: '500',
        color: 'rgb(20, 20, 20)',
    };

    const h1Style = {
        fontFamily: '"Bebas Neue", Verdana, sans-serif',
        fontSize: '3.2rem',
        fontWeight: '500',
        color: 'rgb(229, 9, 20)',
        margin: '16px 0',
        padding: '0',
    };

    const btnStyle = {
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        borderRadius: '4px',
        color: 'white',
        padding: '0.75em',
        margin: '1em 0 0',
        width: '100%',
        display: 'block',
        transition: 'background-color 0.2s linear, transform 0.2s linear',
        fontSize: '1.6rem',
        fontFamily: '"Roboto", Arial, sans-serif',
        fontWeight: '600',
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

                .Disclaimer p {
                    margin-bottom: 1.6rem;                    
                }

                .Disclaimer span {
                    font-weight: 900;
                }

                .DisclaimerBtn {
                    background-color: rgba(20, 20, 20, 1);
                }

                .DisclaimerBtn:hover {
                    background-color: rgba(20, 20, 20, 0.8);
                }

                .DisclaimerBtn:active {
                    transform: scale(0.99);
                    background-color: rgba(20, 20, 20, 0.8);
                }

                .DisclaimerBtn:focus-visible {
                    box-shadow:
                        0 0 0 2px white,
                        0 0 0 4px black;
                }

                @media (orientation: landscape) {
                    .Disclaimer {
                        width: 460px;
                    }
                }
            `}</style>

            <div style={overlayStyle}></div>
            <aside style={disclaimerStyle} className={'Disclaimer'}>
                <h1 style={h1Style}>GRPR DISCLAIMER</h1>
                <p>This app is for users aged <span>13 and over</span>.</p>
                <p>Your <span>username</span> should <span>not</span> include any <span>personal info</span>.</p>
                <p>User data is stored <span>privately</span> and <span>only</span> used for the app.</p>
                <p>You can <span>delete your account</span> at any time in the settings.</p>

                <button
                    onClick={onClick}
                    style={btnStyle}
                    className={'DisclaimerBtn'}
                    aria-label="acknowledge disclaimer"
                    autoFocus
                >
                    OK
                </button>
            </aside>
        </>
    );
};

export default Disclaimer;
