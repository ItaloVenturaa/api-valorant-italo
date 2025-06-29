// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import '../style/login.css'; // usa o mesmo estilo do login

export default function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password.length < 4) {
            setError('A senha deve ter pelo menos 4 caracteres.');
            return;
        }

        if (password !== repeatPassword) {
            return setError('As senhas não coincidem.');
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, password, isAdmin }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao criar usuário');
            }

            setSuccess('Usuário criado com sucesso!');
            setUsername('');
            setPassword('');
            setRepeatPassword('');
            setIsAdmin(false);
            if (onRegister) onRegister();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main>
            <section className="container-pai">
                <div className="card login-Activate">
                    <div className="info-container">
                        <h2 className="text-center mb-4">Criação de Usuário</h2>

                        {error && <div className="alert"><p>{error}</p></div>}
                        {success && <div className="alert success"><p>{success}</p></div>}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="input-container">
                                <i className="fa fa-user"></i>
                                <label>Usuário</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-container">
                                <i className="fa fa-lock"></i>
                                <label>Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-container">
                                <i className="fa fa-lock"></i>
                                <label>Repita a senha</label>
                                <input
                                    type="password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-check mt-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="adminCheck"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="adminCheck">
                                    Administrador
                                </label>
                            </div>


                            <button type="submit" className="btn w-100">Criar Usuário</button>
                        </form>
                    </div>

                    <div className="background-container">
                        <img src="/Fade_Artwork.png" alt="Fundo" />
                    </div>
                </div>
            </section>
        </main>
    );
}
