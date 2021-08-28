import React from 'react';

function Footer () {
    return (
        <footer className="footer">
            <p className="copyright">&copy; {new Date().getFullYear()} Mesto Russia by Tikhonov</p>
        </footer>
    );
}

export default Footer;