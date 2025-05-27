import React, { useState } from 'react';
import '../style/Login.css'; // ou ../style/style.css, se preferir

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // if (username === 'admin' && password === 'admin') {
    //  console.log('Autenticação bem-sucedida!');
    //} else {
    //   setError('Usuário ou senha inválidos. Tente novamente.');
    //}
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
              <div className="input-container">
                <i className="fa fa-user"></i>
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <i className="fa fa-lock"></i>
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn w-100">Entrar</button>

              <div className="options">
                <p>Não tem uma conta?</p>
                <a href="/register">Registre-se aqui</a>
              </div>
            </form>
          </div>

          <div className="background-container">
            <img src="public/background.png" alt="Fundo" />
          </div>

        </div>
      </section>
    </main>
  );
};

export default Login;
