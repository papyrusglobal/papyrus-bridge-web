import React from 'react';

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="footer-rights">© 2019 Papyrus Foundation Pte. Ltd.</p>
      <a href="/"><i className="footer-logo" /></a>
      <div className="socials">
        <a href="https://twitter.com/papyrus_global" target="_blank" className="socials-item" rel="noopener noreferrer"><i className="socials-i socials-i_twitter" /></a>
        <a href="https://t.me/papyrusglobal" target="_blank" className="socials-item" rel="noopener noreferrer"><i className="socials-i socials-i_telegram" /></a>
        <a href="https://github.com/papyrusglobal" target="_blank" className="socials-item" rel="noopener noreferrer"><i className="socials-i socials-i_github" /></a>
      </div>
    </div>
  </footer>
);
