import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MoreHorizontal, MessageCircle, AlertCircle } from 'lucide-react';

const leadsData = [
    { id: 1, name: 'João Dória', email: 'joao@empresa.com', phone: '(11) 98765-4321', origin: 'Meta Ads', status: 'Novo', score: 'Quente', agent: 'Roberto', date: '05/03/2026' },
    { id: 2, name: 'Maria F.', email: 'maria@gmail.com', phone: '(11) 91234-5678', origin: 'Site', status: 'Em atendimento', score: 'Morno', agent: 'Carla', date: '04/03/2026' },
    { id: 3, name: 'Carlos Santos', email: 'carlos@outlook.com', phone: '(21) 99999-8888', origin: 'Indicação', status: 'Novo', score: 'Quente', agent: 'Roberto', date: '03/03/2026' },
    { id: 4, name: 'Ana Beatriz', email: 'ana.b@hotmail.com', phone: '(11) 97777-6666', origin: 'ZAP', status: 'Desqualificado', score: 'Frio', agent: 'João', date: '01/03/2026' },
    { id: 5, name: 'Paulo T.', email: 'paulo@empresa.com.br', phone: '(19) 95555-4444', origin: 'Google Ads', status: 'Qualificado', score: 'Quente', agent: 'Carla', date: '28/02/2026' },
    { id: 6, name: 'Empresa X', email: 'contato@empresax.com', phone: '(11) 4000-1234', origin: 'Site', status: 'Convertido', score: 'Quente', agent: 'João', date: '20/02/2026' },
];

export default function Leads() {
    const [searchTerm, setSearchTerm] = useState('');

    const getScoreColor = (score) => {
        switch (score) {
            case 'Quente': return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' };
            case 'Morno': return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' };
            case 'Frio': return { bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' };
            default: return { bg: 'var(--surface-light)', color: 'var(--text-secondary)' };
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Novo': return 'var(--accent-color)';
            case 'Em atendimento': return 'var(--info)';
            case 'Qualificado': return 'var(--warning)';
            case 'Convertido': return 'var(--success)';
            case 'Desqualificado': return 'var(--danger)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div style={{ paddingBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px', display: 'flex', alignItems: 'center', background: 'var(--surface-color)', borderRadius: 'var(--border-radius-sm)', padding: '0 16px', border: '1px solid var(--border-color)' }}>
                    <Search size={18} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, background: 'none', border: 'none', color: '#fff', padding: '12px', outline: 'none' }}
                    />
                </div>
                <button className="btn btn-secondary"><Filter size={18} /> Filtros (3 ativos)</button>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={18} /> Distribuir Leads (2)
                </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <th style={{ padding: '16px' }}>Nome & Contato</th>
                            <th style={{ padding: '16px' }}>Origem</th>
                            <th style={{ padding: '16px' }}>Status</th>
                            <th style={{ padding: '16px' }}>Score</th>
                            <th style={{ padding: '16px' }}>Agente</th>
                            <th style={{ padding: '16px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leadsData.map(lead => (
                            <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-light)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{lead.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Mail size={12} /> {lead.email}
                                    </div>
                                </td>
                                <td style={{ padding: '16px', color: 'var(--text-primary)', fontSize: '14px' }}>
                                    {lead.origin}
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lead.date}</div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getStatusColor(lead.status) }}></span>
                                        {lead.status}
                                    </div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        backgroundColor: getScoreColor(lead.score).bg,
                                        color: getScoreColor(lead.score).color,
                                        border: `1px solid ${getScoreColor(lead.score).color}`
                                    }}>
                                        {lead.score}
                                    </div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                                            {lead.agent.charAt(0)}
                                        </div>
                                        <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{lead.agent}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
                                        <Phone size={18} style={{ cursor: 'pointer' }} className="hover-accent" />
                                        <MessageCircle size={18} style={{ cursor: 'pointer' }} className="hover-accent" />
                                        <MoreHorizontal size={18} style={{ cursor: 'pointer' }} className="hover-accent" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    <span>Exibindo 1 a 6 de 342 leads</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Anterior</button>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>1</button>
                        <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>2</button>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>3</button>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Próximo</button>
                    </div>
                </div>
            </div>
            <style>{`
        .hover-accent:hover { color: var(--accent-color); transition: color 0.2s; }
      `}</style>
        </div>
    );
}
