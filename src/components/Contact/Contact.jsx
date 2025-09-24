import { useState } from 'react';
import { Mail, Phone, User, Building, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_REASONS } from '../../utils/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    personType: '',
    email: '',
    phone: '',
    reason: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const personTypes = [
    { value: 'fisica', label: 'Pessoa Física' },
    { value: 'juridica', label: 'Pessoa Jurídica' }
  ];

  const contactReasons = [
    { value: 'contratar', label: 'Contratar Serviços' },
    { value: 'reuniao', label: 'Marcar Reunião' },
    { value: 'duvidas', label: 'Dúvidas/Sugestões' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.personType) {
      newErrors.personType = 'Tipo de pessoa é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Número para contato é obrigatório';
    }

    if (!formData.reason) {
      newErrors.reason = 'Motivo do contato é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Descrição deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você integraria com um serviço de email como EmailJS
      console.log('Dados do formulário:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        personType: '',
        email: '',
        phone: '',
        reason: '',
        description: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    icon: Icon, 
    placeholder, 
    required = true,
    as = 'input'
  }) => {
    const Component = as;
    
    return (
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <Icon className="w-4 h-4 text-cyan-400" />
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
        <Component
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
            errors[name] 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-purple-500/30 focus:border-cyan-400 hover:border-purple-500/50'
          }`}
          rows={as === 'textarea' ? 4 : undefined}
        />
        {errors[name] && (
          <p className="text-red-500 text-sm flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors[name]}</span>
          </p>
        )}
      </div>
    );
  };

  const SelectField = ({ label, name, options, icon: Icon, placeholder, required = true }) => (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <Icon className="w-4 h-4 text-cyan-400" />
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
          errors[name] 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-purple-500/30 focus:border-cyan-400 hover:border-purple-500/50'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <AlertCircle className="w-4 h-4" />
          <span>{errors[name]}</span>
        </p>
      )}
    </div>
  );

  return (
    <section id="contato" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tem um projeto em mente? Vamos conversar sobre como posso ajudar 
            a transformar suas ideias em realidade.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                  Vamos trabalhar juntos!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Estou sempre aberto a discutir novos projetos, oportunidades 
                  criativas ou parcerias. Preencha o formulário ao lado e entrarei 
                  em contato o mais breve possível.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 
                              rounded-lg border-2 border-purple-500/20">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">E-mail</h4>
                    <p className="text-gray-600 dark:text-gray-300">duetech.al@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 
                              rounded-lg border-2 border-purple-500/20">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">WhatsApp</h4>
                    <p className="text-gray-600 dark:text-gray-300">+55 (82) 98775-8569</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                <h4 className="font-semibold text-cyan-400 mb-2">Tempo de Resposta</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Normalmente respondo em até 24 horas durante dias úteis.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border-2 border-purple-500/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <InputField
                  label="Nome Completo"
                  name="name"
                  icon={User}
                  placeholder="Digite seu nome completo"
                />

                {/* Person Type */}
                <SelectField
                  label="Tipo de Pessoa"
                  name="personType"
                  icon={Building}
                  placeholder="Selecione o tipo"
                  options={personTypes}
                />

                {/* Email */}
                <InputField
                  label="E-mail"
                  name="email"
                  type="email"
                  icon={Mail}
                  placeholder="seu.email@exemplo.com"
                />

                {/* Phone */}
                <InputField
                  label="Número para Contato"
                  name="phone"
                  type="tel"
                  icon={Phone}
                  placeholder="(11) 99999-9999"
                />

                {/* Reason */}
                <SelectField
                  label="Motivo do Contato"
                  name="reason"
                  icon={MessageSquare}
                  placeholder="Selecione o motivo"
                  options={contactReasons}
                />

                {/* Description */}
                <InputField
                  label="Descrição"
                  name="description"
                  icon={MessageSquare}
                  placeholder="Descreva detalhadamente seu projeto ou necessidade..."
                  as="textarea"
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'btn-portfolio text-black hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Enviar Mensagem</span>
                    </div>
                  )}
                </Button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 p-4 bg-green-500/10 
                                border border-green-500/30 rounded-lg text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Mensagem enviada com sucesso! Entrarei em contato em breve.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 p-4 bg-red-500/10 
                                border border-red-500/30 rounded-lg text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <span>Erro ao enviar mensagem. Tente novamente.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

