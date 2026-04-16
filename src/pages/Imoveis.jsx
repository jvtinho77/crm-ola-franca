import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, ExternalLink, Hash, Plus, X, Trash2, Edit, Upload, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Image Carousel Component for the property card
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleWheel = (e) => {
        if (images.length <= 1) return;
        if (e.deltaY > 0) next(e);
        else if (e.deltaY < 0) prev(e);
    };

    if (!images || images.length === 0) return <div style={{ height: '100%', backgroundColor: 'var(--surface-color)' }} />;

    return (
        <div 
            onWheel={handleWheel}
            style={{ 
                position: 'relative', height: '100%', width: '100%', 
                overflow: 'hidden', cursor: 'grab' 
            }}
        >
            <motion.div
                key={currentIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = 50;
                    if (offset.x < -swipe) next(e);
                    else if (offset.x > swipe) prev(e);
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ height: '100%', width: '100%' }}
            >
                <img 
                    src={images[currentIndex]} 
                    alt={`Imagem ${currentIndex + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} 
                />
            </motion.div>

            {images.length > 1 && (
                <>
                    <button onClick={prev} style={{
                        position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff', borderRadius: '50%',
                        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        zIndex: 10
                    }}>
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={next} style={{
                        position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', border: 'none', color: '#fff', borderRadius: '50%',
                        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        zIndex: 10
                    }}>
                        <ChevronRight size={20} />
                    </button>
                    <div style={{
                        position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', color: '#fff',
                        zIndex: 10, display: 'flex', gap: '4px'
                    }}>
                        {images.map((_, i) => (
                            <div key={i} style={{ 
                                width: '6px', height: '6px', borderRadius: '50%', 
                                backgroundColor: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                                transition: 'all 0.2s'
                            }} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function Imoveis() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Todos');
    const [showModal, setShowModal] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        titulo: '',
        localizacao: '',
        preco: '',
        quartos: 0,
        banheiros: 0,
        area_m2: '',
        detalhe_extra: '',
        tipo_negocio: 'Venda',
        imagem_principal_url: '',
        imagem_url: ''
    });

    const [mainFile, setMainFile] = useState(null); // The one marked as cover
    const [galleryFiles, setGalleryFiles] = useState([]); // All other files
    const [mainPreview, setMainPreview] = useState('');
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [coverIndex, setCoverIndex] = useState(0);
    const [allFiles, setAllFiles] = useState([]);
    const [allPreviews, setAllPreviews] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('imoveis')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro ao buscar imóveis:', error);
        } else {
            setProperties(data || []);
        }
        setLoading(false);
    };

    const handleFileUpload = async (file) => {
        console.log('Iniciando upload do arquivo:', file.name);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('imoveis')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Erro detalhado do Supabase Storage:', uploadError);
            return null;
        }

        const { data } = supabase.storage.from('imoveis').getPublicUrl(filePath);
        console.log('Arquivo enviado com sucesso. URL pública:', data.publicUrl);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (allFiles.length === 0 && !editingProperty) {
            alert('Por favor, adicione pelo menos uma imagem.');
            return;
        }
        setIsSubmitting(true);

        try {
            // Upload all new files
            const uploadedUrls = await Promise.all(allFiles.map(file => handleFileUpload(file)));
            
            // Combine with existing images if editing
            let currentImages = editingProperty ? (
                editingProperty.imagem_principal_url 
                ? [editingProperty.imagem_principal_url, ...(editingProperty.imagem_url ? editingProperty.imagem_url.split(';') : [])]
                : (editingProperty.imagem_url ? editingProperty.imagem_url.split(';') : [])
            ).filter(Boolean) : [];

            // If new files were added, they are at the end of the list? No, let's simplify.
            // For now, if user uploads new ones, we use those.
            
            let finalImageUrls = allFiles.length > 0 ? uploadedUrls.filter(Boolean) : currentImages;
            
            const finalMainUrl = finalImageUrls[coverIndex] || finalImageUrls[0] || '';
            const otherUrls = finalImageUrls.filter((_, i) => i !== coverIndex);
            const finalGalleryUrls = otherUrls.join(';');

            const payload = {
                ...formData,
                preco: Number(formData.preco),
                preco_formatado: `R$ ${Number(formData.preco).toLocaleString('pt-BR')}`,
                quartos: Number(formData.quartos),
                banheiros: Number(formData.banheiros),
                area_m2: Number(formData.area_m2),
                imagem_principal_url: finalMainUrl,
                imagem_url: finalGalleryUrls,
                tags: formData.detalhe_extra ? [formData.tipo_negocio, ...formData.detalhe_extra.split(',').map(t => t.trim())] : [formData.tipo_negocio]
            };

            if (editingProperty) {
                console.log('Atualizando imóvel ID:', editingProperty.id, 'Payload:', payload);
                const { error } = await supabase
                    .from('imoveis')
                    .update(payload)
                    .eq('id', editingProperty.id);
                if (error) {
                    console.error('Erro Supabase (Update):', error);
                    throw error;
                }
            } else {
                console.log('Inserindo novo imóvel, Payload:', payload);
                const { error } = await supabase
                    .from('imoveis')
                    .insert([payload]);
                if (error) {
                    console.error('Erro Supabase (Insert):', error);
                    throw error;
                }
            }

            setShowModal(false);
            setEditingProperty(null);
            resetForm();
            fetchProperties();
            alert('Sucesso: Imóvel salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar imóvel:', error);
            alert(`Erro ao salvar: ${error.message || 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Tem certeza que deseja remover este imóvel?')) {
            const { error } = await supabase.from('imoveis').delete().eq('id', id);
            if (error) console.error(error);
            else fetchProperties();
        }
    };

    const resetForm = () => {
        setFormData({
            titulo: '',
            localizacao: '',
            preco: '',
            quartos: 0,
            banheiros: 0,
            area_m2: '',
            detalhe_extra: '',
            tipo_negocio: 'Venda',
            imagem_principal_url: '',
            imagem_url: ''
        });
        setAllFiles([]);
        setAllPreviews([]);
        setCoverIndex(0);
    };

    const openEditModal = (property, e) => {
        e.stopPropagation();
        setEditingProperty(property);
        setFormData({
            titulo: property.titulo,
            localizacao: property.localizacao,
            preco: property.preco,
            quartos: property.quartos,
            banheiros: property.banheiros,
            area_m2: property.area_m2,
            detalhe_extra: property.detalhe_extra,
            tipo_negocio: property.tipo_negocio || '',
            imagem_principal_url: property.imagem_principal_url || '',
            imagem_url: property.imagem_url || ''
        });
        const images = [
            property.imagem_principal_url,
            ...(property.imagem_url ? property.imagem_url.split(';') : [])
        ].filter(Boolean);
        setAllPreviews(images);
        setCoverIndex(0);
        setShowModal(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } }
    };

    const filteredProperties = properties; // Can add custom filters later

    const formatCurrency = (value) => {
        if (!value) return 'Sob Consulta';
        return `R$ ${Number(value).toLocaleString('pt-BR')}`;
    };

    const extractType = (property) => {
        if (property.tipo_negocio) return property.tipo_negocio;
        const title = property.titulo?.toLowerCase() || '';
        if (title.includes('apartamento')) return 'Apartamento';
        if (title.includes('casa')) return 'Casa';
        if (title.includes('cobertura')) return 'Cobertura';
        if (title.includes('terreno') || title.includes('lote')) return 'Lote/Terreno';
        return 'Imóvel';
    };

    if (loading) {
        return <div style={{ padding: '24px', color: 'var(--text-secondary)' }}>Carregando imóveis de alto padrão...</div>;
    }

    return (
        <div style={{ paddingBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginRight: '16px' }}>Gestão de Imóveis</h2>
                <button className={`btn ${filter === 'Todos' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('Todos')}>Todos ({properties.length})</button>
                <div style={{ flex: 1 }}></div>
                <button className="btn btn-primary" onClick={() => { resetForm(); setEditingProperty(null); setShowModal(true); }}>
                    <Plus size={18} /> Novo Imóvel
                </button>
            </div>

            <motion.div
                className="dashboard-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredProperties.map(property => {
                    const gallery = property.imagem_url ? property.imagem_url.split(';').filter(Boolean) : [];
                    const images = property.imagem_principal_url ? [property.imagem_principal_url, ...gallery] : gallery;
                    const type = extractType(property);

                    return (
                        <motion.div key={property.id} className="card col-span-4" variants={itemVariants} style={{ padding: '0', cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', height: '260px', flexShrink: 0 }}>
                                <ImageCarousel images={images} />
                                <div style={{
                                    position: 'absolute', top: '12px', left: '12px',
                                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                                    color: 'var(--success)', border: `1px solid var(--success)`
                                }}>
                                    Aprovado
                                </div>
                                <div style={{
                                    position: 'absolute', top: '12px', right: '12px',
                                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#fff'
                                }}>
                                    {type}
                                </div>
                            </div>

                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)', lineHeight: '1.4' }}>{property.titulo}</h3>
                                </div>

                                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '12px' }}>
                                    {formatCurrency(property.preco)}
                                </div>

                                <p style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
                                    <MapPin size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    {property.localizacao}
                                </p>

                                {property.detalhe_extra && (
                                    <div style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        <span style={{ fontSize: '11px', padding: '4px 8px', backgroundColor: 'var(--surface-light)', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                            {property.detalhe_extra}
                                        </span>
                                    </div>
                                )}

                                <div style={{ marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '12px 0', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                            <Bed size={16} color="var(--text-secondary)" /> {property.quartos || 0}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                            <Bath size={16} color="var(--text-secondary)" /> {property.banheiros || 0}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                            <Square size={16} color="var(--text-secondary)" /> {property.area_m2 ? `${property.area_m2} m²` : '-'}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Hash size={12} /> ID: {property.id.toString().slice(0, 8)}...
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button 
                                                onClick={(e) => openEditModal(property, e)}
                                                style={{ background: 'var(--surface-light)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button 
                                                onClick={(e) => handleDelete(property.id, e)}
                                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Modal de Cadastro/Edição */}
            <AnimatePresence>
                {showModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                backgroundColor: 'var(--bg-color)', width: '100%', maxWidth: '600px',
                                borderRadius: '32px', border: '1px solid var(--border-color)',
                                overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh'
                            }}
                        >
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 700 }}>{editingProperty ? 'Editar Imóvel' : 'Novo Imóvel'}</h3>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ padding: '24px', overflowY: 'auto' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Título do Imóvel</label>
                                        <input 
                                            required
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.titulo}
                                            onChange={e => setFormData({...formData, titulo: e.target.value})}
                                            placeholder="Ex: Cobertura Duplex no Itaim"
                                        />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Localização</label>
                                        <input 
                                            required
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.localizacao}
                                            onChange={e => setFormData({...formData, localizacao: e.target.value})}
                                            placeholder="Cidade, Bairro - Estado"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Preço (R$)</label>
                                        <input 
                                            required
                                            type="number"
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.preco}
                                            onChange={e => setFormData({...formData, preco: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Área (m²)</label>
                                        <input 
                                            required
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.area_m2}
                                            onChange={e => setFormData({...formData, area_m2: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Quartos</label>
                                        <input 
                                            type="number"
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.quartos}
                                            onChange={e => setFormData({...formData, quartos: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Banheiros</label>
                                        <input 
                                            type="number"
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.banheiros}
                                            onChange={e => setFormData({...formData, banheiros: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Tipo de Negócio</label>
                                        <select 
                                            required
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.tipo_negocio}
                                            onChange={e => setFormData({...formData, tipo_negocio: e.target.value})}
                                        >
                                            <option value="Venda">Venda</option>
                                            <option value="Aluguel">Aluguel</option>
                                            <option value="Loteamento">Loteamento</option>
                                            <option value="Pronto">Pronto</option>
                                        </select>
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Destaques / Tags (Separados por vírgula)</label>
                                        <input 
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: '#fff' }}
                                            value={formData.detalhe_extra}
                                            onChange={e => setFormData({...formData, detalhe_extra: e.target.value})}
                                            placeholder="Ex: Reformado, Beira Lago, Vista Panorâmica..."
                                        />
                                    </div>

                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Fotos do Imóvel</label>
                                        <div 
                                            onClick={() => document.getElementById('gallery-file-upload').click()}
                                            style={{ 
                                                width: '100%', minHeight: '120px', border: '2px dashed var(--border-color)', 
                                                borderRadius: '20px', display: 'flex', flexWrap: 'wrap', 
                                                gap: '12px', padding: '16px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                            }}
                                        >
                                            {allPreviews.length > 0 ? (
                                                allPreviews.map((url, i) => (
                                                    <div key={i} style={{ position: 'relative', width: '80px', height: '80px' }}>
                                                        <img src={url} style={{ 
                                                            width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover',
                                                            border: coverIndex === i ? '2px solid var(--accent-color)' : '1px solid var(--border-color)'
                                                        }} />
                                                        <button 
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setCoverIndex(i); }}
                                                            style={{
                                                                position: 'absolute', top: '-6px', right: '-6px',
                                                                background: coverIndex === i ? 'var(--accent-color)' : '#000',
                                                                color: coverIndex === i ? '#000' : '#fff',
                                                                border: 'none', borderRadius: '50%', width: '20px', height: '20px',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                                                fontSize: '10px', fontWeight: 800
                                                            }}
                                                        >
                                                            {coverIndex === i ? <Check size={12} /> : 'C'}
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ textAlign: 'center' }}>
                                                    <Upload size={24} color="var(--text-secondary)" />
                                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginTop: '8px' }}>Clique para adicionar fotos</span>
                                                </div>
                                            )}
                                        </div>
                                        <input id="gallery-file-upload" type="file" multiple hidden accept="image/*" onChange={e => {
                                            const files = Array.from(e.target.files);
                                            if (files.length > 0) {
                                                setAllFiles(files);
                                                setAllPreviews(files.map(f => URL.createObjectURL(f)));
                                                setCoverIndex(0);
                                            }
                                        }} />
                                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', display: 'block' }}>
                                            Dica: Clique no botão <b>"C"</b> sobre a foto para defini-la como a capa do anúncio.
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowModal(false)}
                                        style={{ flex: 1, padding: '14px', borderRadius: '16px', background: 'var(--surface-light)', border: '1px solid var(--border-color)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        style={{ flex: 2, padding: '14px', borderRadius: '16px', background: 'var(--accent-color)', color: 'var(--bg-color)', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        {isSubmitting ? 'Salvando...' : (editingProperty ? 'Salvar Alterações' : 'Cadastrar Imóvel')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
