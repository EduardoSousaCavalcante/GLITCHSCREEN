import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente de Card Exemplo
const CardExemplo = ({ titulo, foto, gratuito, preco }) => {
  return (
    <div className="flex flex-col w-90 bg-stone-800 rounded-lg shadow-lg overflow-hidden h-full transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="h-60 bg-lime-600 flex items-center justify-center transition duration-300 hover:bg-lime-500">
        {/* Exibindo a foto do card */}
        <img src={foto} alt={titulo} className="h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">{titulo}</h3>
        {gratuito ? (
          <span className="text-lime-600 font-bold">Gratuito</span>
        ) : (
          <span className="text-lime-600 font-bold">R$ {preco}</span>
        )}
      </div>
    </div>
  );
};

// Componente que exibe os cards
const ThreeCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Usando useEffect para carregar os dados do banco
  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/3card");
        setCards(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os cards");
        setLoading(false);
      }
    };

    fetchCardsData();
  }, []);

  // Caso ainda esteja carregando os dados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Caso ocorra um erro ao carregar os dados
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="flex">
            <CardExemplo
              titulo={card.nome}
              foto={card.foto}
              gratuito={card.gratuito || false}
              preco={card.preco || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { ThreeCards };
