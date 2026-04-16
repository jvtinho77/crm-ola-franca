import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Home, Target, Users, Megaphone, Mail, Calendar, Settings, Bell, Search, Contact, Sun, Moon, Zap, ChevronRight, LogOut, Lock, ExternalLink, Mountain } from 'lucide-react';
import logoHabitar from './assets/logo-habitar.png';
import DashboardPage from './pages/Dashboard';
import ImoveisPage from './pages/Imoveis';
import FunilPage from './pages/Funil';
import LoginPage from './pages/Login';
import LeadsPage from './pages/Leads';
import MetricasPage from './pages/Metricas';
import EmailMarketingPage from './pages/EmailMarketing';
import AgentesPage from './pages/Agentes';
import AgendaPage from './pages/Agenda';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') === 'true');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', isLocked: false },
    { id: 'imoveis', icon: Home, label: 'Imóveis', isLocked: false },
    { id: 'leads', icon: Users, label: 'Leads', isLocked: true },
    { id: 'anuncios', icon: Megaphone, label: 'Métricas de Anúncios', isLocked: true },
    { id: 'email', icon: Mail, label: 'Email Marketing', isLocked: true },
    { id: 'agentes', icon: Contact, label: 'Agentes de IA', isLocked: true },
    { id: 'agenda', icon: Calendar, label: 'Agenda', isLocked: true },
    { id: 'followup', icon: Target, label: 'Follow-up', isLocked: true },
  ];

  const LockedOverlay = ({ title }) => (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px',
      textAlign: 'center',
      zIndex: 100,
      background: 'rgba(0,0,0,0.1)',
      backdropFilter: 'blur(4px)',
      borderRadius: '32px'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '24px',
        backgroundColor: 'var(--surface-color)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 0 20px rgba(255,255,255,0.05)'
      }}>
        <Lock size={32} color="var(--accent-color)" />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>{title}</h2>
      <p style={{ color: 'var(--text-primary)', maxWidth: '400px', marginBottom: '32px', fontSize: '16px', fontWeight: 500 }}>
        Para desbloquear mais funções, solicite uma expansão do seu plano. Visualize o protótipo abaixo.
      </p>
      <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
        <ExternalLink size={18} /> Liberar acesso com a equipe Aira
      </button>
    </div>
  );

  const renderContent = () => {
    let content;
    switch (activeTab) {
      case 'dashboard': content = <DashboardPage />; break;
      case 'imoveis': content = <ImoveisPage />; break;
      case 'leads': content = <LeadsPage />; break;
      case 'anuncios': content = <MetricasPage />; break;
      case 'email': content = <EmailMarketingPage />; break;
      case 'agentes': content = <AgentesPage />; break;
      case 'agenda': content = <AgendaPage />; break;
      case 'followup': content = <FunilPage />; break;
      default: content = <DashboardPage />;
    }

    const item = menuItems.find(m => m.id === activeTab);
    if (item?.isLocked) {
      return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <div style={{ opacity: 0.2, pointerEvents: 'none', height: '100%', width: '100%', filter: 'grayscale(1)' }}>
            {content}
          </div>
          <LockedOverlay title={item.label} />
        </div>
      );
    }
    return content;
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} theme={theme} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div style={{ position: 'relative' }}>
          {isCollapsed ? (
            <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button 
                className="btn-icon" 
                onClick={() => setIsCollapsed(false)}
                style={{ 
                  borderRadius: '12px',
                  padding: '8px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </div>
          ) : (
            <div style={{ position: 'relative', padding: '0 24px 32px 24px' }}>
              <div className="sidebar-logo" style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={logoHabitar} 
                  alt="Habitar" 
                  style={{ 
                    width: '120px', 
                    objectFit: 'contain',
                    filter: 'grayscale(1) contrast(10) invert(1)',
                    mixBlendMode: 'lighten'
                  }} 
                />
              </div>
              <button 
                className="btn-icon" 
                onClick={() => setIsCollapsed(true)}
                style={{ 
                  position: 'absolute', 
                  top: '0px', 
                  right: '0px', 
                  borderRadius: '12px',
                  padding: '8px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {index === 2 && !isCollapsed && (
                <div style={{ 
                  height: '1px', 
                  background: 'var(--border-color)', 
                  margin: '8px 16px',
                  opacity: 0.5 
                }} />
              )}
              {index === 2 && isCollapsed && (
                <div style={{ margin: '8px 0' }} />
              )}
              <div
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                style={{ opacity: item.isLocked ? 0.5 : 1 }}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="icon" size={20} />
                {!isCollapsed && <span>{item.label}</span>}
                {item.isLocked && !isCollapsed && <Lock className="lock-icon" size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </div>
            </React.Fragment>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', borderTop: isCollapsed ? 'none' : '1px solid var(--border-color)', padding: '16px 0' }}>
          <div className="nav-item" title={isCollapsed ? 'Configurações' : ''}>
            <Settings className="icon" size={20} />
            {!isCollapsed && <span>Configurações</span>}
          </div>
          <div className="nav-item" title={isCollapsed ? 'Sair da Conta' : ''} onClick={handleLogout}>
            <LogOut className="icon" size={20} />
            {!isCollapsed && <span>Sair da Conta</span>}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="header">
          <div>
            <h1 className="page-title">
              {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="page-subtitle">Sistema de Gestão Imobiliária Premium</p>
          </div>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={18} color="var(--text-secondary)" />
              <input type="text" placeholder="Buscar em todo o sistema..." />
            </div>
            <button className="btn btn-icon" onClick={toggleTheme} title={theme === 'dark' ? 'Trocar para modo claro' : 'Trocar para modo escuro'}>
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="btn btn-icon">
              <Bell size={18} />
            </button>
            <button className="btn btn-primary">
              Nova Ação
            </button>
          </div>
        </div>

        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: '100%' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
