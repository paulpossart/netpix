import { Link } from 'react-router-dom';
//import Header

function NotFound() {
    return (
        <main aria-labelledby='not-found-title'>
            <header>
                {
                    //import Header
                }
            </header>

            <h2 id='not-found-title'>Page not found</h2>

            <div>
                <p>Lost your way?</p>
                <p>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
                <Link to='/' replace>Netpix Home</Link>
                <aside>FROM <span>LOST IN SPACE</span></aside>
            </div>
        </main>
    )
};

export default NotFound;