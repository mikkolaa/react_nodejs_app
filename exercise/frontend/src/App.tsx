import React, { useState } from 'react';
import ShortenLinkForm from './ShortenLinkForm';
import LinkList from './LinkList';
import LinkStats from './LinkStats';
import axios from 'axios';
import './App.css';


interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: { [date: string]: number }; // Tallentaa klikkausten määrän päivittäin
}

const App: React.FC = () => {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [showStats, setShowStats] = useState<string | null>(null);

  // Kutsuu palvelua joka lyhentää URL:n
  const handleShortenLink = async (originalUrl: string) => {
    try {
      // Lähetetään POST-pyyntö URL-lyhentimen API:lle
      const response = await axios.post('http://localhost:7000/urlshorter', {
        url: originalUrl,
      });
  
      // Vastauksesta saatu lyhyt URL-osoite
      const shortUrl = response.data.shortUrl; 
      const id = (links.length + 1).toString();
  
      // Päivitetään linkit
      setLinks([...links, { id, originalUrl, shortUrl, clicks: {} }]);
    } catch (error) {
      console.error('Error shortening the URL:', error);
    }
  };
 
  
  // Käsittelee klikkauksen linkistä
  const handleLinkClick = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setLinks(links.map(link =>
      link.id === id
        ? { ...link, clicks: { ...link.clicks, [today]: (link.clicks[today] || 0) + 1 } }
        : link
    ));
  };

  // Käsittelee tilastosivun näyttämisen
  const handleShowStats = (id: string) => {
    setShowStats(id);
  };

  // Poistaa linkin
  const handleDeleteLink = async (id: string) => {        
    // Jos näytetään juuri poistettavan linkin tilastoja, nollataan showStats
    if (showStats === id) {
      setShowStats(null);
    }
  
    setLinks(links.filter(link => link.id !== id));
  };
  
  return (
    <div>
      <center>
      <h1>Linkin lyhennin</h1>
      <ShortenLinkForm onSubmit={handleShortenLink} />
      {showStats ? (
        <LinkStats 
          link={links.find(link => link.id === showStats)!} 
          onBack={() => setShowStats(null)} 
          onDelete={handleDeleteLink} 
        />
      ) : (
        <LinkList 
          links={links} 
          onLinkClick={handleLinkClick} 
          onShowStats={handleShowStats} 
          onDelete={handleDeleteLink} 
        />
      )}
      </center>
    </div>
  );
}

export default App;
