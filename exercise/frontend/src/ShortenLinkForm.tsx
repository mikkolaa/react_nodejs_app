import React, { useState } from 'react';

interface ShortenLinkFormProps {
  onSubmit: (url: string) => void;
}

const ShortenLinkForm: React.FC<ShortenLinkFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() && inputValue.startsWith('http'))  {
      onSubmit(inputValue);
      setInputValue('');
    }
    else
    {
      alert('Anna URL-osoitteeseen protokollana http tai https');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Syötä linkki protokollalla"
      />
      <button type="submit">Lyhennä</button>
    </form>
  );
};

export default ShortenLinkForm;
