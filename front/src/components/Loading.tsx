import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const DataComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Erro ao carregar dados');
      }

      // await response.json(); // Usar se for tratar os dados
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro inesperado');
      }
    } finally {
      setLoading(false);
    }
  };


  // Estado: carregando
  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
        <ClipLoader color="#007bff" size={60} loading={true} />
        <p style={{ marginTop: 10 }}>Carregando dados...</p>
      </div>
    );
  }

  // Estado: erro
  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p style={{ color: 'red' }}>Ocorreu um erro: {error}</p>
        <button onClick={fetchData}>Tentar novamente</button>
      </div>
    );
  }

  // Estado: carregado com sucesso (sem renderizar dados)
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <p>Dados carregados com sucesso.</p>
    </div>
  );
};

export default DataComponent;
