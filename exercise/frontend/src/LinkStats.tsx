import React from 'react';
import StatisticsTable from './StatisticsTable';

interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: { [date: string]: number };
}

interface LinkStatsProps {
  link: LinkData;
  onBack: () => void;
  onDelete: (id: string) => void;
}

const LinkStats: React.FC<LinkStatsProps> = ({ link, onBack, onDelete }) => {
  return (
    <div>
      <h2>Tilastot: {link.shortUrl}</h2>
      <p>Alkuperäinen linkki: {link.originalUrl}</p>
      <StatisticsTable clicks={link.clicks} />
      <button onClick={onBack}>Takaisin</button>
      <button onClick={() => onDelete(link.id)}>Poista linkki</button>
    </div>
  );
};

export default LinkStats;
