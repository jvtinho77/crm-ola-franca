import React from 'react';
import { Mail, Edit3, Send, Archive, PieChart as PieChartIcon, Users } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const campaigns = [
    { id: 1, name: 'Lançamento Mansão Alphaville', status: 'Enviado', sent: 12500, opened: 4800, clicked: 1200, date: '04/03/2026' },
    { id: 2, name: 'Newsletter Alto Padrão - Março', status: 'Enviado', sent: 28000, opened: 9500, clicked: 2100, date: '01/03/2026' },
    { id: 3, name: 'Open House Jardim Europa', status: 'Agendado', sent: 5000, opened: 0, clicked: 0, date: '10/03/2026' },
    { id: 4, name: 'Follow-up Leads Frios', status: 'Rascunho', sent: 0, opened: 0, clicked: 0, date: '-' },
    { id: 5, name: 'Feliz Aniversário 2026 (Automação)', status: 'Ativo', sent: 340, opened: 280, clicked: 50, date: 'Contínuo' },
];

export default function EmailMarketing() {
    const openRateData = [
        { name: 'Abertos', value: 34, color: 'var(--accent-color)' },
        { name: 'Não abertos', value: 66, color: 'var(--surface-light)' }
    ];

    const clickRateData = [
        { name: 'Clicaram', value: 8, color: 'var(--success)' },
        { name: 'Não Clicaram', value: 92, color: 'var(--surface-light)' }
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Enviado': return <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>{status}</span>;
            case 'Agendado': return <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>{status}</span>;
            case 'Rascunho': return <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'var(--surface-light)', color: 'var(--text-secondary)' }}>{status}</span>;
            case 'Ativo': return <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: 'var(--surface-light)', color: 'var(--accent-color)' }}>{status}</span>;
            default: return null;
        }
    };

    return (
        <div style={{ paddingBottom: '24px' }}>

            {/* Overview */}
            <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
                <div className="card col-span-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card-title" style={{ width: '100%', textAlign: 'left', marginBottom: '8px' }}>Média de Abertura</div>
                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={openRateData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                                    {openRateData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>34%</div>
                    </div>
                </div>

                <div className="card col-span-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="card-title" style={{ width: '100%', textAlign: 'left', marginBottom: '8px' }}>Média de Cliques (CTR)</div>
                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={clickRateData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                                    {clickRateData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>8.5%</div>
                    </div>
                </div>

                <div className="card col-span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="card-title">Ações Rápidas</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}><Edit3 size={18} /> Criar Nova Campanha</button>
                        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}><Archive size={18} /> Gerenciar Templates</button>
                        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}><Users size={18} /> Segmentação de Listas</button>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Campanhas e Automações</h2>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-light)', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <th style={{ padding: '16px' }}>Nome da Campanha</th>
                            <th style={{ padding: '16px' }}>Status</th>
                            <th style={{ padding: '16px' }}>Enviados</th>
                            <th style={{ padding: '16px' }}>Aberturas</th>
                            <th style={{ padding: '16px' }}>Cliques</th>
                            <th style={{ padding: '16px' }}>Data</th>
                            <th style={{ padding: '16px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(camp => {
                            const openPercent = camp.sent > 0 ? ((camp.opened / camp.sent) * 100).toFixed(1) : 0;
                            const clickPercent = camp.opened > 0 ? ((camp.clicked / camp.opened) * 100).toFixed(1) : 0;

                            return (
                                <tr key={camp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Mail size={16} color="var(--accent-color)" /> {camp.name}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>{getStatusBadge(camp.status)}</td>
                                    <td style={{ padding: '16px', color: 'var(--text-primary)' }}>{camp.sent.toLocaleString('pt-BR')}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ color: 'var(--text-primary)' }}>{camp.opened.toLocaleString('pt-BR')}</div>
                                        {camp.sent > 0 && <div style={{ fontSize: '12px', color: 'var(--success)' }}>{openPercent}%</div>}
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ color: 'var(--text-primary)' }}>{camp.clicked.toLocaleString('pt-BR')}</div>
                                        {camp.opened > 0 && <div style={{ fontSize: '12px', color: 'var(--info)' }}>{clickPercent}%</div>}
                                    </td>
                                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{camp.date}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="btn btn-secondary" style={{ padding: '6px', minWidth: 'auto' }}><PieChartIcon size={16} /></button>
                                            {camp.status === 'Rascunho' && <button className="btn btn-primary" style={{ padding: '6px', minWidth: 'auto' }}><Send size={16} /></button>}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
