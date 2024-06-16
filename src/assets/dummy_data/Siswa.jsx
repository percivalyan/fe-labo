// Siswa.jsx

import React from 'react';

const dataSiswa = [
  { id: 1, nama: 'Andi', kelas: 'XII-A' },
  { id: 2, nama: 'Budi', kelas: 'XII-B' },
  { id: 3, nama: 'Citra', kelas: 'XII-C' },
  { id: 4, nama: 'Deni', kelas: 'XII-A' },
  // Tambahkan siswa lain sesuai kebutuhan
];

const Siswa = () => {
  return (
    <div>
      <h2>Tabel Nama Siswa</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Kelas</th>
          </tr>
        </thead>
        <tbody>
          {dataSiswa.map((siswa) => (
            <tr key={siswa.id}>
              <td>{siswa.id}</td>
              <td>{siswa.nama}</td>
              <td>{siswa.kelas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Siswa;
