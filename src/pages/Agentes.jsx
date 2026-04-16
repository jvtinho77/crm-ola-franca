import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, Phone, Mail, MoreHorizontal } from 'lucide-react';

const agents = [
    { id: 1, name: 'Roberto Silva', role: 'Broker Sênior', sales: 'R$ 14.500.000', leads: 45, convRate: '5.2%', activeListings: 12, avatar: 'RS', targetProgress: 95 },
    { id: 2, name: 'Carla Mendes', role: 'Especialista Coberturas', sales: 'R$ 9.200.000', leads: 62, convRate: '4.8%', activeListings: 8, avatar: 'CM', targetProgress: 75 },
    { id: 3, name: 'João Santos', role: 'Broker Pleno', sales: 'R$ 6.100.000', leads: 38, convRate: '3.5%', activeListings: 5, avatar: 'JS', targetProgress: 45 },
    { id: 4, name: 'Ana Souza', role: 'Consultora Locação', sales: 'R$ 2.400.000 (Anual)', leads: 85, convRate: '8.2%', activeListings: 18, avatar: 'AS', targetProgress: 110 },
];

export default function Agentes() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } }
    };

    const getProgressColor = (progress) => {
        if (progress >= 100) return 'var(--success)';
        if (progress >= 70) return 'var(--accent-color)';
        return 'var(--danger)';
    };

    return (
        <div style={{ paddingBottom: '24px' }}>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <button className="btn btn-primary">Adicionar Agente +</button>
                <button className="btn btn-secondary">Metas Globais</button>
            </div>

            <motion.div
                className="dashboard-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {agents.map(agent => (
                    <motion.div key={agent.id} className="card col-span-4" variants={itemVariants}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    backgroundColor: 'var(--surface-color)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                                    fontWeight: 700, color: 'var(--accent-color)',
                                    border: '2px solid var(--accent-color)',
                                    boxShadow: '0 0 15px rgba(255,193,7,0.2)'
                                }}>
                                    {agent.avatar}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>{agent.name}</h3>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{agent.role}</div>
                                </div>
                            </div>
                            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: 'var(--surface-light)', padding: '12px', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Award size={14} /> Vendas
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{agent.sales}</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--surface-light)', padding: '12px', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Target size={14} /> Leads (Mês)
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{agent.leads} processados</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--surface-light)', padding: '12px', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <TrendingUp size={14} /> Conversão
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-color)' }}>{agent.convRate}</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--surface-light)', padding: '12px', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Target size={14} /> Imóveis
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{agent.activeListings} ativos</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Meta Mensal (VGV)</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{agent.targetProgress}%</span>
                            </div>
                            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--surface-light)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${Math.min(agent.targetProgress, 100)}%`, backgroundColor: getProgressColor(agent.targetProgress), borderRadius: '3px' }}></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}><Phone size={16} /></button>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}><Mail size={16} /></button>
                            <button className="btn btn-primary" style={{ flex: 3, padding: '8px' }}>Ver Perfil</button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
