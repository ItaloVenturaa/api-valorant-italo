import React, { useState } from 'react';
import '../style/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Usuário ou senha inválidos. Tente novamente.');
    } else {
      setError('');
      console.log('Login enviado:', { username, password });
    }
  };

  return (
    <main>
      <section className="container-pai">
        <div className="card login-Activate">

          <div className="info-container">
            <h2 className="text-center mb-4">Fazer Login</h2>

            {error && (
              <div className="alert">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} noValidate>
              <div className="input-wrapper">
                <img src="/icons/user-solid.svg" alt="usuário" className="icon" />
                <input
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-wrapper">
                <img src="/icons/lock-solid.svg" alt="senha" className="icon" />
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>


              <button type="submit" className="btn w-100">Entrar</button>

            </form>
          </div>

          <div className="background-container">
            <img src="/Neon_Artwork.png" alt="Neon Valorant" />
          </div>

        </div>
      </section>
    </main>
  );
};

export default Login;
