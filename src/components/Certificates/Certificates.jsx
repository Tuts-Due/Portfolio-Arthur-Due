import { useState } from 'react';
import { Award, Calendar, Building } from 'lucide-react';
import ExpandableCard from '../ExpandableCard/ExpandableCard';
import Modal from '../Modal/Modal';
import TiltCard from '../TiltCard/TiltCard';

const Certificates = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados de exemplo dos certificados
  const certificates = [
    {
      id: 1,
      title: 'React Developer Certification',
      institution: 'Meta',
      date: '2023',
      description: 'Certificação completa em desenvolvimento React, cobrindo hooks, context API, performance optimization e melhores práticas.',
      image: '/api/placeholder/400/300',
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Context API'],
      links: [
        { label: 'Ver Certificado', url: '#' },
        { label: 'Verificar Autenticidade', url: '#' }
      ],
      details: 'Este certificado foi obtido após completar um curso intensivo de 40 horas sobre desenvolvimento React avançado, incluindo projetos práticos e avaliações rigorosas.'
    },
    {
      id: 2,
      title: 'AWS Cloud Practitioner',
      institution: 'Amazon Web Services',
      date: '2023',
      description: 'Certificação fundamental em serviços de nuvem AWS, cobrindo conceitos básicos de cloud computing, segurança e arquitetura.',
      image: '/api/placeholder/400/300',
      tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure'],
      links: [
        { label: 'Ver Certificado', url: '#' },
        { label: 'Badge Digital', url: '#' }
      ],
      details: 'Certificação que valida conhecimentos fundamentais sobre a plataforma AWS, incluindo serviços principais, modelos de preços e melhores práticas de segurança.'
    },
    {
      id: 3,
      title: 'Node.js Application Development',
      institution: 'OpenJS Foundation',
      date: '2022',
      description: 'Certificação em desenvolvimento de aplicações Node.js, incluindo APIs REST, autenticação, banco de dados e deploy.',
      image: '/api/placeholder/400/300',
      tags: ['Node.js', 'JavaScript', 'Backend', 'API', 'MongoDB'],
      links: [
        { label: 'Ver Certificado', url: '#' }
      ],
      details: 'Programa abrangente cobrindo desenvolvimento backend com Node.js, desde conceitos básicos até aplicações complexas em produção.'
    },
    {
      id: 4,
      title: 'UI/UX Design Fundamentals',
      institution: 'Google',
      date: '2022',
      description: 'Certificação em fundamentos de design de interface e experiência do usuário, incluindo prototipagem e testes de usabilidade.',
      image: '/api/placeholder/400/300',
      tags: ['UI/UX', 'Design', 'Figma', 'Prototipagem', 'Usabilidade'],
      links: [
        { label: 'Ver Certificado', url: '#' },
        { label: 'Portfolio de Design', url: '#' }
      ],
      details: 'Curso completo sobre princípios de design, pesquisa de usuário, criação de wireframes e protótipos, e testes de usabilidade.'
    },
    {
      id: 5,
      title: 'Python for Data Science',
      institution: 'IBM',
      date: '2021',
      description: 'Certificação em Python para ciência de dados, cobrindo análise de dados, visualização e machine learning básico.',
      image: '/api/placeholder/400/300',
      tags: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Matplotlib'],
      links: [
        { label: 'Ver Certificado', url: '#' }
      ],
      details: 'Programa focado no uso de Python para análise e visualização de dados, incluindo bibliotecas essenciais e projetos práticos.'
    },
    {
      id: 6,
      title: 'Agile Project Management',
      institution: 'Scrum Alliance',
      date: '2021',
      description: 'Certificação em metodologias ágeis e gerenciamento de projetos, incluindo Scrum, Kanban e práticas de desenvolvimento ágil.',
      image: '/api/placeholder/400/300',
      tags: ['Agile', 'Scrum', 'Kanban', 'Project Management'],
      links: [
        { label: 'Ver Certificado', url: '#' }
      ],
      details: 'Certificação que valida conhecimentos em metodologias ágeis, facilitação de cerimônias Scrum e liderança de equipes de desenvolvimento.'
    }
  ];

  const openModal = (certificate) => {
    setModalContent(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <section id="certificados" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Certificados e Certificações
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Minhas principais certificações e cursos que demonstram meu 
            comprometimento com o aprendizado contínuo e excelência técnica.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500/20">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {certificates.length}+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Certificações</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500/20">
            <Building className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              5+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Instituições</p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500/20">
            <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              200+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Horas de Estudo</p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <TiltCard 
              key={certificate.id} 
              className="group"
              tiltOptions={{ maxTilt: 6, scale: 1.02, glare: true }}
            >
              <ExpandableCard
                title={certificate.title}
                description={certificate.description}
                image={certificate.image}
                tags={certificate.tags}
                links={certificate.links}
                type="certificate"
                onOpenModal={() => openModal(certificate)}
              />
              
              {/* Certificate Info */}
              <div className="mt-3 px-2">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>{certificate.institution}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{certificate.date}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Sempre em busca de novos conhecimentos e certificações
          </p>
          <div className="inline-flex items-center space-x-2 text-cyan-400">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Próxima meta: Kubernetes Administrator (CKA)</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
      />
    </section>
  );
};

export default Certificates;

