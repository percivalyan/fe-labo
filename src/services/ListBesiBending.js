import React, { useEffect, useState } from 'react';
import { listBesiBendings } from './services/BesiBending';

const ListBesiBendings = () => {
  const [besiBendings, setBesiBendings] = useState([]);

  useEffect(() => {
    listBesiBendings()
      .then(response => {
        setBesiBendings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the besi bendings!', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Besi Bendings</h1>
      <ul>
        {besiBendings.map(besiBending => (
          <li key={besiBending.id}>{besiBending.code}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListBesiBendings;
