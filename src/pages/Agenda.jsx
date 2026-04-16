import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, Filter, MoreHorizontal } from 'lucide-react';

const events = [
    { id: 1, title: 'Visita - Cobertura Itaim', time: '10:00 - 11:30', date: new Date(), type: 'Visita', agent: 'Roberto Silva', client: 'João Dória', property: 'Cobertura Duplex Itaim', location: 'Av. Europa, SP' },
    { id: 2, name: 'Reunião de Fechamento', time: '14:00 - 15:00', date: new Date(), type: 'Reunião', agent: 'Carla Mendes', client: 'Paulo T.', property: 'Fazenda Itu', location: 'Escritório Habitar' },
    { id: 3, name: 'Follow-up Mansão Joá', time: '16:30 - 17:00', date: addDays(new Date(), 1), type: 'Follow-up', agent: 'João Santos', client: 'Ana B.', property: 'Casa Joá', location: 'Telefone' },
    { id: 4, name: 'Visita - Apto Alto Pinheiros', time: '09:00 - 10:30', date: addDays(new Date(), 2), type: 'Visita', agent: 'Roberto Silva', client: 'Maria F.', property: 'Apartamento Alto Pinheiros', location: 'Alto Pinheiros, SP' },
];

export default function Agenda() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
    const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

    const getTypeColor = (type) => {
        switch (type) {
            case 'Visita': return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: 'var(--danger)' };
            case 'Reunião': return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: 'var(--success)' };
            case 'Follow-up': return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', border: 'var(--warning)' };
            default: return { bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)', border: 'var(--info)' };
        }
    };

    const selectedEvents = events.filter(e => isSameDay(e.date, selectedDate));

    return (
        <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 180px)' }}>

            {/* Calendário e Filtros */}
            <div className="card" style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Março 2026</h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary" style={{ padding: '6px' }}>&lt;</button>
                        <button className="btn btn-secondary" style={{ padding: '6px' }}>&gt;</button>
                    </div>
                </div>

                {/* Custom Mini Calendar View (simplified) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '16px', textAlign: 'center' }}>
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                        <div key={day} style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>{day}</div>
                    ))}
                    {[...Array(35)].map((_, i) => {
                        const dayNum = i - 1; // offset starts from march 1st being sunday
                        const isToday = dayNum === 5; // mock day 5 as today for visual
                        const isSelected = dayNum === selectedDate.getDate();
                        const isValid = dayNum > 0 && dayNum <= 31;

                        if (!isValid) return <div key={i} />

                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    const newDate = new Date();
                                    newDate.setDate(dayNum);
                                    setSelectedDate(newDate);
                                }}
                                style={{
                                    aspectRatio: '1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    backgroundColor: isSelected ? 'var(--accent-color)' : isToday ? 'var(--surface-light)' : 'transparent',
                                    color: isSelected ? '#000' : isToday ? 'var(--accent-color)' : 'var(--text-primary)',
                                    fontWeight: isSelected || isToday ? 700 : 400,
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                {dayNum}
                                {/* Dot for events */}
                                {events.some(e => e.date.getDate() === dayNum) && !isSelected && (
                                    <span style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }}></span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '24px 0' }}>
                    <Plus size={18} /> Novo Evento
                </button>

                <div style={{ flex: 1, overflowY: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={14} /> Filtros de Agenda
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked /> Visitas ({events.filter(e => e.type === 'Visita').length})
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked /> Reuniões ({events.filter(e => e.type === 'Reunião').length})
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked /> Follow-ups ({events.filter(e => e.type === 'Follow-up').length})
                        </label>
                    </div>
                </div>
            </div>

            {/* Lista de Eventos do Dia */}
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)' }}>
                        <CalendarIcon size={24} color="var(--accent-color)" />
                        {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                    </h2>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {selectedEvents.length} atividades agendadas
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {selectedEvents.length === 0 ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                            <CalendarIcon size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                            <p>Nenhum evento agendado para este dia.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {selectedEvents.map(event => (
                                <div key={event.id} style={{
                                    padding: '20px',
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--surface-light)',
                                    borderLeft: `4px solid ${getTypeColor(event.type).border}`,
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }} className="hover:transform hover:translate-x-1">

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>{event.title || event.name}</h3>
                                            <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, backgroundColor: getTypeColor(event.type).bg, color: getTypeColor(event.type).color }}>{event.type}</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--accent-color)', fontWeight: 600 }}>
                                            <Clock size={16} /> {event.time}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '14px', color: 'var(--text-secondary)', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Users size={16} /> {event.agent} & {event.client}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={16} /> {event.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CalendarIcon size={16} /> {event.property}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
