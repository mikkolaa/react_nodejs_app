import React from 'react';

interface StatisticsTableProps {
  clicks: { [date: string]: number };
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ clicks }) => {
  const dates = Object.keys(clicks);

  return (
    <table>
      <thead>
        <tr>
          <th>Päivämäärä</th>
          <th>Klikkaukset</th>
        </tr>
      </thead>
      <tbody>
        {dates.length > 0 ? (
          dates.map(date => (
            <tr key={date}>
              <td>{formatDate(date)}</td>
              <td>{clicks[date]}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={2}>Ei klikkauksia</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const formatDate = (dateString: String): String => {
    const [year, month, day] = dateString.split('-'); 
    return `${day}.${month}.${year}`; 
}

export default StatisticsTable;
