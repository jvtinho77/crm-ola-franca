import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Clock, DollarSign, MapPin } from 'lucide-react';

const initialData = {
    columns: {
        'novo-lead': { id: 'novo-lead', title: 'Novo Lead', taskIds: ['task-1', 'task-2'] },
        'contato-realizado': { id: 'contato-realizado', title: 'Contato Realizado', taskIds: ['task-3'] },
        'visita-agendada': { id: 'visita-agendada', title: 'Visita Agendada', taskIds: ['task-4'] },
        'visita-realizada': { id: 'visita-realizada', title: 'Visita Realizada', taskIds: [] },
        'proposta-enviada': { id: 'proposta-enviada', title: 'Proposta Enviada', taskIds: ['task-5'] },
        'negociacao': { id: 'negociacao', title: 'Negociação', taskIds: ['task-6'] },
        'fechado': { id: 'fechado', title: 'Fechado Ganho', taskIds: [] },
    },
    columnOrder: ['novo-lead', 'contato-realizado', 'visita-agendada', 'visita-realizada', 'proposta-enviada', 'negociacao', 'fechado'],
    tasks: {
        'task-1': { id: 'task-1', name: 'João Dória', property: 'Cobertura Itaim Bibi', value: '12.500.000', agent: 'Roberto Silva', daysIdle: 1, score: 'Quente' },
        'task-2': { id: 'task-2', name: 'Maria F.', property: 'Apartamento Pinheiros', value: '35.000/mês', agent: 'Carla Mendes', daysIdle: 4, score: 'Morno' },
        'task-3': { id: 'task-3', name: 'Carlos S.', property: 'Mansão Jardim Europa', value: '28.000.000', agent: 'Roberto Silva', daysIdle: 2, score: 'Quente' },
        'task-4': { id: 'task-4', name: 'Ana B.', property: 'Casa Joá', value: '22.000.000', agent: 'João Santos', daysIdle: 8, score: 'Frio' },
        'task-5': { id: 'task-5', name: 'Paulo T.', property: 'Fazenda Itu', value: '55.000.000', agent: 'Carla Mendes', daysIdle: 1, score: 'Quente' },
        'task-6': { id: 'task-6', name: 'Empresa X', property: 'Laje Corporativa', value: '120.000/mês', agent: 'João Santos', daysIdle: 5, score: 'Morno' },
    }
};

export default function Funil() {
    const [data, setData] = useState(initialData);

    const getScoreColor = (score) => {
        switch (score) {
            case 'Quente': return 'var(--danger)';
            case 'Morno': return 'var(--warning)';
            case 'Frio': return 'var(--info)';
            default: return 'var(--text-secondary)';
        }
    };

    const getDaysIdleColor = (days) => {
        if (days > 7) return 'var(--danger)';
        if (days > 3) return 'var(--warning)';
        return 'var(--success)';
    };

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };
            setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        setData({
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        });
    };

    return (
        <div style={{ height: 'calc(100vh - 160px)', overflowX: 'auto' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'flex', gap: '16px', height: '100%', alignItems: 'flex-start' }}>
                    {data.columnOrder.map(columnId => {
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                        return (
                            <div key={column.id} style={{
                                minWidth: '280px',
                                backgroundColor: 'var(--surface-color)',
                                borderRadius: 'var(--border-radius-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                maxHeight: '100%',
                                border: '1px solid var(--border-color)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}>
                                <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{column.title}</h3>
                                    <div style={{ background: 'var(--surface-light)', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', color: 'var(--accent-color)', fontWeight: 600 }}>
                                        {tasks.length}
                                    </div>
                                </div>

                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{
                                                padding: '16px',
                                                flexGrow: 1,
                                                overflowY: 'auto',
                                                backgroundColor: snapshot.isDraggingOver ? 'var(--surface-light)' : 'transparent',
                                                transition: 'background-color 0.2s ease'
                                            }}
                                        >
                                            {tasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                padding: '16px',
                                                                marginBottom: '12px',
                                                                backgroundColor: 'var(--bg-color)',
                                                                borderRadius: 'var(--border-radius-sm)',
                                                                border: '1px solid var(--border-color)',
                                                                boxShadow: snapshot.isDragging ? '0 8px 16px var(--accent-glow)' : '0 2px 4px rgba(0,0,0,0.1)',
                                                                borderLeft: `3px solid ${getScoreColor(task.score)}`,
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{task.name}</div>
                                                                <MoreVertical size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                                                            </div>

                                                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                <MapPin size={12} /> {task.property}
                                                            </div>

                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                    <DollarSign size={14} /> {task.value}
                                                                </div>
                                                                <div style={{
                                                                    fontSize: '11px',
                                                                    padding: '2px 6px',
                                                                    borderRadius: '4px',
                                                                    backgroundColor: 'var(--surface-light)',
                                                                    color: getDaysIdleColor(task.daysIdle),
                                                                    display: 'flex', alignItems: 'center', gap: '4px'
                                                                }}>
                                                                    <Clock size={10} /> {task.daysIdle} d
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>
                                                                    {task.agent.charAt(0)}
                                                                </div>
                                                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                                    {task.agent}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
