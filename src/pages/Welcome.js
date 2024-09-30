import React from 'react';
import './App.css'; // Certifique-se de que os estilos estão no mesmo arquivo

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Bem-vindo ao FarmaEasy!</h1>
      <p>Encontre e cadastre medicamentos facilmente.</p>
      <img 
        src="https://img.freepik.com/psd-gratuitas/icone-3d-de-cancer-com-frasco-de-remedio_23-2150749846.jpg?t=st=1726789846~exp=1726793446~hmac=f1a15d32d5b92fce864d88d902af59895314002a2077306506ff4af07e0bcff7&w=740" // Substitua pela URL da imagem do remédio
        alt="Remédio"
        className="welcome-image"
      />
    </div>
  );
};

export default Welcome;
