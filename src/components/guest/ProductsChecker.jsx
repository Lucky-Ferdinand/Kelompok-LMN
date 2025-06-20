import React, { useState } from 'react';
import produk from '../../data/products.json';
import { ShoppingCart, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

export default function ProductChecker() {
  const [kode, setKode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!kode) {
      setError('Kode produk tidak boleh kosong.');
      return;
    }

    if (kode.length < 4) {
      setError('Kode produk minimal 4 karakter.');
      return;
    }

    const found = produk.find(
      (item) => item.kode_produk.toLowerCase() === kode.toLowerCase()
    );

    if (found) {
      if (found.stok > 0) {
        setResult({
          status: 'tersedia',
          message: `✅ Produk ${found.nama_produk} tersedia dengan harga Rp${found.harga.toLocaleString()}.`,
          stok: found.stok,
          nama: found.nama_produk
        });
      } else {
        setResult({
          status: 'habis',
          message: `⚠️ Produk ${found.nama_produk} saat ini sedang habis.`,
          nama: found.nama_produk
        });
      }
    } else {
      setResult({
        status: 'tidak_ditemukan',
        message: '❌ Kode produk tidak ditemukan.'
      });
    }
  };

  const getResultStyle = (status) => {
    switch (status) {
      case 'tersedia':
        return 'bg-green-50 text-green-800 border border-green-300';
      case 'habis':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-300';
      default:
        return 'bg-red-50 text-red-800 border border-red-300';
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case 'tersedia':
        return <CheckCircle className="inline mr-2" />;
      case 'habis':
        return <AlertTriangle className="inline mr-2" />;
      default:
        return <XCircle className="inline mr-2" />;
    }
  };

  return (
    <section className="bg-yellow-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-12 text-center">
        <h2 className="text-[37px] text-left text-4xl font-extrabold text-gray-900 mb-4 font-montserrat-B">
          Cek Ketersediaan Produk
        </h2>
        <p className="text-left text-gray-600 text-lg mb-10 font-open-sans-L">
          Masukkan kode produk untuk mengetahui stok dan harga secara cepat.
        </p>

        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Masukkan kode produk"
            className="w-full sm:flex-1 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 text-lg font-medium"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
          />
          <button
            type="submit"
            className="font-montserrat-R bg-green-600 hover:bg-green-700 text-white text-lg rounded-lg px-8 py-4 transition-shadow duration-300 shadow-md hover:shadow-lg"
          >
            Cek
          </button>
        </form>

        {error && (
          <p className="mt-6 text-red-600 font-semibold">{error}</p>
        )}

        {result && (
          <div className={`mt-8 p-6 rounded-xl font-medium inline-block ${getResultStyle(result.status)}`}>
            <div className="flex flex-col items-center gap-3 text-center">
              {getIcon(result.status)}
              <p>{result.message}</p>
              {result.status === 'tersedia' && (
                <>
                  <p>Stok tersedia: <strong>{result.stok}</strong></p>
                  <ShoppingCart className="w-12 h-12 text-green-600 mt-2" />
                </>
              )}
              {result.status === 'habis' && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1048/1048943.png"
                  alt="Out of Stock"
                  className="w-12 h-12 mt-2"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
