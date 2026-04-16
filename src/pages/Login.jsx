import React, { useState } from 'react';
import { Mail, Lock, LogIn, Github, Chrome } from 'lucide-react';
import logoHabitar from '../assets/logo-habitar.png';

export default function Login({ onLogin, theme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating login delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-color)',
      backgroundImage: theme === 'dark' 
        ? 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #030303 100%)'
        : 'radial-gradient(circle at 50% 50%, #f5f5f5 0%, #ffffff 100%)',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: 'var(--surface-color)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '40px' }}>
          <img 
            src={logoHabitar} 
            alt="Habitar" 
            style={{ 
              width: '140px', 
              objectFit: 'contain', 
              filter: theme === 'dark' ? 'invert(1) brightness(2)' : 'none',
              marginBottom: '20px'
            }} 
          />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>Bem-vindo ao Habitar</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>Gerencie seus imóveis com elegância.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', marginLeft: '4px' }}>E-mail</label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={18} 
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} 
              />
              <input 
                type="email" 
                required
                placeholder="seu@parceirohabitar.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', marginLeft: '4px' }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={18} 
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} 
              />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 500 }}>Esqueci minha senha</span>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-color)',
              border: 'none',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px',
              transition: 'transform 0.2s, opacity 0.2s'
            }}
          >
            {isLoading ? (
              <div style={{ width: '20px', height: '20px', border: '3px solid rgba(0,0,0,0.1)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                Entrar
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          input:focus {
            border-color: var(--text-primary) !important;
          }
          button:active {
            transform: scale(0.98);
          }
        `}</style>
      </div>
    </div>
  );
}
