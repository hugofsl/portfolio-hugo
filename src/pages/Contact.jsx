import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, User, Mail, MessageSquare, Code2, Database, Lightbulb, Rocket, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState({
    nome: '', email: '', tipo: '', mensagem: ''
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "mensagens"), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setIsDone(true);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { id: 'dev', label: t('contact.type_web'), icon: <Code2 size={20} /> },
    { id: 'data', label: t('contact.type_data'), icon: <Database size={20} /> },
    { id: 'strategy', label: t('contact.type_strategy'), icon: <Lightbulb size={20} /> },
    { id: 'other', label: t('contact.type_other'), icon: <Rocket size={20} /> },
  ];

  return (
    <div 
      className="bg-slate-950 min-h-screen text-slate-50 pt-32 pb-24 relative overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
    <SEO 
      title={t('navbar.contact')} 
      description={t('contact.subtitle')}
      url="/contact"
    />
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.07), transparent 80%)
          `,
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-2xl mx-auto">
          
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 italic">
              {t('contact.title')} <span className="text-blue-500">{t('contact.title_highlight')}</span>
            </h1>
            <p className="text-slate-400">{t('contact.subtitle')}</p>
          </header>

          <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
            {!isDone && (
              <div className="flex gap-2 mb-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`} />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {isDone ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{t('contact.success_title')}</h2>
                  <p className="text-slate-400 mb-8">{t('contact.success_desc')}</p>
                  <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors font-bold">
                    {t('contact.btn_home')}
                  </button>
                </motion.div>
              ) : (
                <>
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h2 className="text-2xl font-bold flex items-center gap-3"><User className="text-blue-400" /> {t('contact.step1_title')}</h2>
                      <div className="space-y-4">
                        <input 
                          type="text" placeholder={t('contact.input_name')} value={formData.nome} 
                          onChange={e => setFormData({...formData, nome: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                          type="email" placeholder={t('contact.input_email')} value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <button 
                        disabled={!formData.nome || !formData.email} onClick={nextStep}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        {t('contact.btn_next')} <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h2 className="text-2xl font-bold flex items-center gap-3"><Code2 className="text-purple-400" /> {t('contact.step2_title')}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {projectTypes.map(type => (
                          <button
                            key={type.id}
                            onClick={() => { setFormData({...formData, tipo: type.label}); nextStep(); }}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${formData.tipo === type.label ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                          >
                            {type.icon} <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                      <button onClick={prevStep} className="text-slate-500 hover:text-slate-300 flex items-center gap-1 text-sm font-mono tracking-tighter">
                        <ChevronLeft size={14} /> {t('contact.btn_back')}
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h2 className="text-2xl font-bold flex items-center gap-3"><MessageSquare className="text-emerald-400" /> {t('contact.step3_title')}</h2>
                      <textarea 
                        placeholder={t('contact.input_message')} value={formData.mensagem}
                        onChange={e => setFormData({...formData, mensagem: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-emerald-500 transition-colors min-h-[150px] resize-none"
                      />
                      <div className="flex flex-col gap-4">
                        <button 
                          onClick={handleSubmit} disabled={isSubmitting || !formData.mensagem}
                          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        >
                          {isSubmitting ? t('contact.btn_sending') : t('contact.btn_submit')} <Send size={18} />
                        </button>
                        <button onClick={prevStep} className="text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 text-sm font-mono">
                          <ChevronLeft size={14} /> {t('contact.btn_review')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}