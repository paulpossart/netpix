import styles from './svgs.module.scss';

const HomeIcon = ({ isActive }) => (
    <svg
        className={isActive ? styles.active : styles.inactive}
        viewBox="0 0 16 16"

        xmlns="http://www.w3.org/2000/svg"
    ><g
        id="SVGRepo_bgCarrier"
        strokeWidth="0"
    >
        </g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
        </g>
        <g
            id="SVGRepo_iconCarrier"
        >
            <path
                d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"

            >
            </path>
        </g>
    </svg>
);

const SecurityIcon = ({ isActive }) => (
    <svg
        className={isActive ? styles.active : styles.inactive}
        viewBox="0 0 16 16"

        xmlns="http://www.w3.org/2000/svg"
    >
        <g
            id="SVGRepo_bgCarrier"
            strokeWidth="0"
        >
        </g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
        </g>
        <g id="SVGRepo_iconCarrier">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16L4.35009 13.3929C2.24773 11.8912 1 9.46667 1 6.88306V3L8 0L15 3V6.88306C15 9.46667 13.7523 11.8912 11.6499 13.3929L8 16ZM12.2071 5.70711L10.7929 4.29289L7 8.08579L5.20711 6.29289L3.79289 7.70711L7 10.9142L12.2071 5.70711Z"

            >
            </path>
        </g>
    </svg>
);

const MemberIcon = ({ isActive }) => (
    <svg
        className={isActive ? styles.active : styles.inactive}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        transform="matrix(-1, 0, 0, 1, 0, 0)"
    >
        <g
            id="SVGRepo_bgCarrier"
            strokeWidth="0"
        >
        </g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
        </g>
        <g id="SVGRepo_iconCarrier"
        >
            <path
                d="M3 9H21M7 15H9M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={isActive ? 'white' : 'black'}
            >
            </path>
        </g>
    </svg>
);

export { HomeIcon, SecurityIcon, MemberIcon };