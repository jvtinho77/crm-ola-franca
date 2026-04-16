import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Target, Users, TrendingUp, TrendingDown, DollarSign, MousePointerClick, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

const revenueData = [
    { name: 'Jan', value: 4500000 },
    { name: 'Fev', value: 5200000 },
    { name: 'Mar', value: 4800000 },
    { name: 'Abr', value: 6100000 },
    { name: 'Mai', value: 5900000 },
    { name: 'Jun', value: 7500000 },
    { name: 'Jul', value: 8200000 }
];

const sourceData = [
    { name: 'Meta Ads', value: 45 },
    { name: 'Google Ads', value: 25 },
    { name: 'Portais', value: 20 },
    { name: 'Indicação', value: 10 }
];

const COLORS = ['#000000', '#333333', '#666666', '#999999'];

const agents = [
    { id: 1, name: 'Roberto Silva', role: 'Broker Sênior', sales: 'R$ 14M', leads: 45 },
    { id: 2, name: 'Carla Mendes', role: 'Especialista Coberturas', sales: 'R$ 9M', leads: 62 },
    { id: 3, name: 'João Santos', role: 'Broker Pleno', sales: 'R$ 6M', leads: 38 },
];

export default function Dashboard() {
    const [topProperties, setTopProperties] = useState([]);

    useEffect(() => {
        const fetchTopProperties = async () => {
            const { data, error } = await supabase
                .from('imoveis')
                .select('*')
                .order('cliques', { ascending: false })
                .limit(3);
            
            if (error) {
                console.error('Erro ao buscar imóveis em destaque:', error);
            } else {
                setTopProperties(data);
            }
        };

        fetchTopProperties();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } }
    };

    const formatCurrency = (value) => {
        if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
        return `R$ ${value.toLocaleString('pt-BR')}`;
    };

    return (
        <motion.div className="dashboard-grid" variants={containerVariants} initial="hidden" animate="visible">
            {/* Disclaimer Banner */}
            <motion.div className="col-span-12" variants={itemVariants} style={{ marginBottom: '-8px' }}>
                <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 16px', 
                    backgroundColor: 'var(--surface-color)', 
                    color: 'var(--text-secondary)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    border: '1px solid var(--border-color)',
                    fontWeight: 500
                }}>
                    <Info size={14} /> Nota: Os dados exibidos neste ambiente são estritamente fictícios para fins de demonstração.
                </div>
            </motion.div>

            {/* Top Metric Cards */}
            <motion.div className="card col-span-3" variants={itemVariants}>
                <div className="metric-header">
                    <span className="metric-title">Faturamento no Mês</span>
                    <div className="metric-icon"><DollarSign size={24} /></div>
                </div>
                <div className="metric-value">R$ 14.8M</div>
                <div className="metric-trend trend-up">
                    <TrendingUp size={14} />
                    <span>+18.2% vs mês anterior</span>
                </div>
            </motion.div>

            <motion.div className="card col-span-3" variants={itemVariants}>
                <div className="metric-header">
                    <span className="metric-title">Novos Leads</span>
                    <div className="metric-icon"><Users size={24} /></div>
                </div>
                <div className="metric-value">342</div>
                <div className="metric-trend trend-up">
                    <TrendingUp size={14} />
                    <span>+5.4% vs mês anterior</span>
                </div>
            </motion.div>

            <motion.div className="card col-span-3" variants={itemVariants}>
                <div className="metric-header">
                    <span className="metric-title">Taxa de Conversão</span>
                    <div className="metric-icon"><Target size={24} /></div>
                </div>
                <div className="metric-value">4.2%</div>
                <div className="metric-trend trend-up">
                    <TrendingUp size={14} />
                    <span>+1.1% vs mês anterior</span>
                </div>
            </motion.div>

            <motion.div className="card col-span-3" variants={itemVariants}>
                <div className="metric-header">
                    <span className="metric-title">Custo por Lead (CPL)</span>
                    <div className="metric-icon"><MousePointerClick size={24} /></div>
                </div>
                <div className="metric-value">R$ 142</div>
                <div className="metric-trend trend-down">
                    <TrendingDown size={14} />
                    <span>-12.5% vs mês anterior</span>
                </div>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div className="card col-span-8" variants={itemVariants}>
                <div className="card-title">Evolução de Faturamento</div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={formatCurrency} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--accent-color)' }}
                                formatter={(value) => formatCurrency(value)}
                            />
                            <Area type="monotone" dataKey="value" stroke="var(--accent-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Funnel Chart */}
            <motion.div className="card col-span-4" variants={itemVariants}>
                <div className="card-title">Origem de Leads</div>
                <div className="chart-container" style={{ height: '280px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={sourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="var(--surface-color)"
                                strokeWidth={4}
                            >
                                {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Imóveis Destaque */}
            <motion.div className="card col-span-6" variants={itemVariants}>
                <div className="card-title">Imóveis em Destaque</div>
                <div className="list-container">
                    {topProperties.length > 0 ? topProperties.map((prop, i) => (
                        <div className="list-item" key={prop.id}>
                            <div className="item-details" style={{ paddingLeft: '8px' }}>
                                <div className="item-title">{prop.titulo}</div>
                                <div className="item-subtitle">
                                    <span className="status-dot" style={{ backgroundColor: i === 0 ? 'var(--success)' : i === 1 ? 'var(--warning)' : 'var(--accent-color)' }}></span>
                                    {prop.tipo_negocio} • {Math.floor(Math.random() * 50) + 10} leads ativos
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 600, color: 'var(--accent-color)' }}>{prop.preco_formatado || `R$ ${Number(prop.preco).toLocaleString('pt-BR')}`}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    {prop.cliques >= 1000 ? `${(prop.cliques / 1000).toFixed(1)}k` : prop.cliques} views
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Carregando imóveis...
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Top Agentes */}
            <motion.div className="card col-span-6" variants={itemVariants}>
                <div className="card-title">Top Agentes do Mês</div>
                <div className="list-container">
                    {agents.map((agent, i) => (
                        <div className="list-item" key={agent.id}>
                            <div className="avatar" style={{ border: i === 0 ? '2px solid var(--accent-color)' : '2px solid var(--border-color)' }}>
                                {agent.name.charAt(0)}
                            </div>
                            <div className="item-details">
                                <div className="item-title">{agent.name}</div>
                                <div className="item-subtitle">{agent.role}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{agent.sales}</div>
                                <div style={{ fontSize: '12px', color: 'var(--success)' }}>{agent.leads} conv.</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </motion.div>
    );
}
