import { useState } from 'react';
import { User, Code, Briefcase, GraduationCap, Award, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const [activeTab, setActiveTab] = useState('sobre');

  const skills = [
    { name: 'Java', level: 95 },
    { name: 'Kotlin', level: 90 },
    { name: 'Spring Boot', level: 88 },
    { name: 'Microsserviços / REST APIs', level: 90 },
    { name: 'React', level: 85 },
    { name: 'React-Native', level: 85 },
    { name: 'SQL (MySQL/PostgreSQL)', level: 85 },
    { name: 'Git/GitHub/Bitbucket', level: 90 },
    { name: 'Firebase', level: 78 }
  ];

  const experiences = [
  {
      title: 'Desenvolvedor Mobile React Native',
      company: 'Level 33',
      period: '2025 - 2026',
      description:
        'Atuação no desenvolvimento e manutenção de aplicações mobile com React Native e Expo. Criação e ajuste de telas e fluxos, consumo e integração com APIs REST, formulários e validações com React Hook Form + Zod, melhorias de UX/UI, correção de bugs e ajustes de navegação. Colaboração em time ágil (sprints), seguindo boas práticas e versionamento com Git (GitHub).'
  },
  {
    title: 'Desenvolvedor Java Android',
    company: 'Capgemini Brasil',
    period: '2022 - 2023',
    description: 'Atuação no desenvolvimento de aplicações Web e Mobile. Utilização de Java no backend, Angular no frontend e Android nativo para mobile, seguindo boas práticas de arquitetura e metodologias ágeis.'
  },
  {
    title: 'Atendente de Call Center',
    company: 'AlmavivA do Brasil',
    period: '2018 - 2022',
    description: 'Atendimento ao cliente, com foco em soluções técnicas, financeiras e tratativas de cancelamento.'
  },
  {
    title: 'Estagiário em TI',
    company: 'Lacen/AL',
    period: '02/2017 - 05/2017',
    description: 'Auxílio em atividades de suporte técnico e manutenção de sistemas internos.'
  }
  ];

  const education = [

    {
      title: 'Pós-Graduação em Projetos de Aplicativos Móveis Multiplataforma',
      institution: 'Descomplica - Faculdade Digital',
      period: '2024 - 2025',
      description: 'Formação avançada em desenvolvimento de aplicativos móveis utilizando tecnologias modernas multiplataforma.'
    },
    {
      title: 'Técnologo em Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade de Ciências da Saúde de Alagoas (UNCISAL)',
      period: '2015 - 2017',
      description: 'Formação sólida em algoritmos, estruturas de dados e engenharia de software.'
    }
  ];

  const tabs = [
    { id: 'sobre', label: 'Sobre Mim', icon: User },
    { id: 'habilidades', label: 'Habilidades', icon: Code },
    { id: 'experiencia', label: 'Experiência', icon: Briefcase },
    { id: 'educacao', label: 'Educação', icon: GraduationCap }
  ];

  return (
    <section id="sobre" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Sobre Mim
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conheça minha trajetória, habilidades e experiências que me tornaram 
            o profissional que sou hoje.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-gray-100 dark:bg-gray-900 rounded-lg p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 m-1 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:from-cyan-500 hover:to-purple-600'
                      : 'text-gray-600 dark:text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 border-2 border-purple-500/20">
            {activeTab === 'sobre' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                      Desenvolvedor Apaixonado por Tecnologia
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      Sou um desenvolvedor apaixonado por tecnologia com experiência em arquitetura e desenvolvimento de microsserviços em Java e Kotlin, 
                      além de sólida atuação em React, Flutter e Android nativo. Trabalhei em projetos que integraram backend, frontend e mobile, 
                      sempre aplicando boas práticas como SOLID, APIs REST, testes automatizados e metodologias ágeis.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                     Busco constantemente evoluir, seja em desafios técnicos de alta complexidade, 
                     seja em soluções inovadoras que entreguem valor real para as pessoas e empresas.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Criativo', 'Dedicado', 'Inovador', 'Colaborativo'].map((trait) => (
                        <span
                          key={trait}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 
                                   text-cyan-400 rounded-full text-sm border border-cyan-400/30"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                    
                    {/* Botão de Download do Currículo */}
                    <div className="mt-6">
                      <a
                        href="/CV-ArthurAmorimDué.pdf"
                        download="CV-ArthurAmorimDué.pdf"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-purple-500 
                                 text-black font-semibold px-6 py-3 rounded-lg hover:scale-105 
                                 transition-transform duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download Currículo</span>
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-cyan-400/20 to-purple-500/20 
                                  rounded-full flex items-center justify-center border-4 border-purple-500/30">
                      <User className="w-32 h-32 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'habilidades' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                  Minhas Principais Habilidades
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-cyan-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 
                                   transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'experiencia' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                  Experiência Profissional
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-6 border-l-2 border-purple-500/30 
                               last:border-l-0 last:pb-0"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r 
                                    from-cyan-400 to-purple-500 rounded-full" />
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border 
                                    border-purple-500/20 hover:border-purple-500/40 
                                    transition-all duration-300">
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                          {exp.title}
                        </h4>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-cyan-400 font-semibold">
                            {exp.company}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'educacao' && (
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                  Formação Acadêmica
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg border 
                               border-purple-500/20 hover:border-purple-500/40 
                               transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 
                                      rounded-lg">
                          <GraduationCap className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                            {edu.title}
                          </h4>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-cyan-400 font-semibold">
                              {edu.institution}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400">
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

