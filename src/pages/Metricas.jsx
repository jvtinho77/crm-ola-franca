import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend as RechartsLegend,
    LineChart, Line
} from 'recharts';
import { Facebook, Chrome, Smartphone, ExternalLink, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const trendData = [
    { name: 'Jan', Meta: 120, Google: 45, CPL: 155 },
    { name: 'Fev', Meta: 140, Google: 55, CPL: 150 },
    { name: 'Mar', Meta: 155, Google: 85, CPL: 142 },
    { name: 'Abr', Meta: 210, Google: 90, CPL: 135 },
    { name: 'Mai', Meta: 190, Google: 110, CPL: 128 },
    { name: 'Jun', Meta: 240, Google: 145, CPL: 120 },
];

const roiData = [
    { name: 'Meta Ads', Gasto: 45000, Retorno: 3200000, ROI: 71 },
    { name: 'Google Ads', Gasto: 32000, Retorno: 2100000, ROI: 65 },
    { name: 'ZAP Imóveis', Gasto: 15000, Retorno: 1250000, ROI: 83 },
    { name: 'Viva Real', Gasto: 12000, Retorno: 850000, ROI: 70 },
];

export default function Metricas() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } }
    };

    const formatCurrency = (value) => `R$ ${(value / 1000).toFixed(0)}k`;

    return (
        <motion.div className="dashboard-grid" variants={containerVariants} initial="hidden" animate="visible" style={{ paddingBottom: '24px' }}>

            {/* Cards de Plataforma */}
            <motion.div className="card col-span-4" variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#1877F2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Facebook color="#fff" size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Meta Ads</h3>
                            <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>Conectado <span className="status-dot status-active"></span></span>
                        </div>
                    </div>
                    <ExternalLink size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Gasto (Mês)</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>R$ 15.420</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Leads</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>184</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CPL</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-color)' }}>R$ 83,80 <ArrowDownRight size={12} /></div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ROI</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>71x <ArrowUpRight size={12} /></div>
                    </div>
                </div>
            </motion.div>

            <motion.div className="card col-span-4" variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#EA4335', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Chrome color="#fff" size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Google Ads</h3>
                            <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>Conectado <span className="status-dot status-active"></span></span>
                        </div>
                    </div>
                    <ExternalLink size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Gasto (Mês)</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>R$ 11.200</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Leads</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>92</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CPL</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-color)' }}>R$ 121,70 <ArrowUpRight size={12} color="var(--danger)" /></div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ROI</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>65x <ArrowUpRight size={12} /></div>
                    </div>
                </div>
            </motion.div>

            <motion.div className="card col-span-4" variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#F8A83A', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Smartphone color="#fff" size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Portais (ZAP, VivaReal)</h3>
                            <span style={{ fontSize: '12px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>Conectado <span className="status-dot status-active"></span></span>
                        </div>
                    </div>
                    <ExternalLink size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Mensalidade</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>R$ 6.500</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Leads</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>65</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>CPL</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-color)' }}>R$ 100,00 <ArrowDownRight size={12} /></div>
                    </div>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ROI</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)' }}>76x <ArrowUpRight size={12} /></div>
                    </div>
                </div>
            </motion.div>

            {/* Gráfico 1: Evolução de Leads vs CPL */}
            <motion.div className="card col-span-6" variants={itemVariants}>
                <div className="card-title">Tendência: Leads Gerados vs. CPL Médio</div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `R$${v}`} stroke="var(--accent-color)" tick={{ fill: 'var(--accent-color)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <RechartsTooltip
                                contentStyle={{ backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <RechartsLegend verticalAlign="top" height={36} />
                            <Line yAxisId="left" type="monotone" dataKey="Meta" stroke="#1877F2" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Leads Meta" />
                            <Line yAxisId="left" type="monotone" dataKey="Google" stroke="#EA4335" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Leads Google" />
                            <Line yAxisId="right" type="monotone" dataKey="CPL" stroke="var(--accent-color)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} strokeDasharray="5 5" name="CPL Geral" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Gráfico 2: Retorno sobre Investimento */}
            <motion.div className="card col-span-6" variants={itemVariants}>
                <div className="card-title">Retorno (VGV) vs Gasto por Canal</div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={roiData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" tickFormatter={formatCurrency} stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}x`} stroke="var(--success)" tick={{ fill: 'var(--success)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <RechartsTooltip
                                contentStyle={{ backgroundColor: 'var(--surface-light)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <RechartsLegend verticalAlign="top" height={36} />
                            <Bar yAxisId="left" dataKey="Gasto" fill="#f59e0b" name="Gasto Total" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="left" dataKey="Retorno" fill="#10b981" name="Faturamento (VGV)" radius={[4, 4, 0, 0]} />
                            <Line yAxisId="right" type="monotone" dataKey="ROI" stroke="var(--accent-color)" strokeWidth={2} name="Multiplicador ROI" dot={{ r: 4, fill: 'var(--accent-color)' }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

        </motion.div>
    );
}
