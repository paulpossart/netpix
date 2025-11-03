import { Outlet } from "react-router-dom";

function Root({ user }) {
    return (
        <>
            <header>
                Header
            </header>
            <Outlet context={{ user }} />
        </>
    )
};

export default Root;