import React from 'react';

interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

interface LinkListProps {
  links: LinkData[];
  onLinkClick: (id: string) => void;
  onShowStats: (id: string) => void;
  onDelete: (id: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onLinkClick, onShowStats, onDelete }) => {
  return (
    <div>
      <h2>Lyhennetyt linkit</h2>
      <ul style={{ listStyleType: 'none' }}>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" onClick={() => onLinkClick(link.id)}>
            {link.shortUrl.length > 40 ? `${link.shortUrl.substring(0, 40)}...` : link.shortUrl}
            </a>
            <div>
              <button onClick={() => onShowStats(link.id)} style={{ marginLeft: '15px' }} >Tilastot</button>
              <button onClick={() => onDelete(link.id)}>Poista</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
