import { useMemo, useState } from "react";
import { Award, Calendar, Building } from "lucide-react";
import ExpandableCard from "../ExpandableCard/ExpandableCard";
import Modal from "../Modal/Modal";
import TiltCard from "../TiltCard/TiltCard";

const Certificates = () => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("todos");

  const pdfUrl = (fileName) => encodeURI(`/certificados/${fileName}`);

  const certificates = [
    {
      id: 1,
      category: "certificado",
      title: "C# Básico",
      institution: "Udemy",
      date: "2023",
      hours: 7.5,
      description: "Fundamentos de C#, lógica de programação e algoritmos para base sólida.",
      image: null,
      tags: ["C#", "Lógica", "Algoritmos", "Fundamentos"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("CSharp Básico.pdf") }],
      details: "Conteúdo voltado para iniciar no C# e reforçar lógica/algoritmos com exercícios.",
    },
    {
      id: 2,
      category: "certificado",
      title: "Desenvolvimento de Aplicativos Android usando Java",
      institution: "Udemy",
      date: "2022",
      hours: 30.5,
      description: "Base de Android nativo com Java, construindo apps e entendendo o ecossistema.",
      image: null,
      tags: ["Android", "Java", "Mobile"],
      links: [
        {
          label: "Abrir certificado (PDF)",
          url: pdfUrl("Desenvolvimento de Aplicativos Android Usando Java.pdf"),
        },
      ],
      details: "Curso focado em fundamentos do Android, estrutura de projetos e práticas comuns em apps.",
    },
    {
      id: 3,
      category: "certificado",
      title: "Desenvolvimento de Aplicativos Android usando Kotlin",
      institution: "Udemy",
      date: "2022",
      hours: 40.5,
      description: "Android nativo com Kotlin, reforçando boas práticas e desenvolvimento mobile moderno.",
      image: null,
      tags: ["Android", "Kotlin", "Mobile"],
      links: [
        {
          label: "Abrir certificado (PDF)",
          url: pdfUrl("Desenvolvimento de Aplicativos Android Usando Kotlin.pdf"),
        },
      ],
      details: "Kotlin aplicado ao Android com foco em produtividade e organização do código.",
    },
    {
      id: 4,
      category: "certificado",
      title: "Docker",
      institution: "Udemy",
      date: "2023",
      hours: 5.5,
      description: "Conceitos essenciais de containers, imagens, volumes e uso prático no dia a dia.",
      image: null,
      tags: ["Docker", "DevOps", "Containers"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("Docker.pdf") }],
      details: "Aplicação prática de Docker para ambientes de desenvolvimento e deploy.",
    },
    {
      id: 5,
      category: "certificado",
      title: "Gestão Ágil com Scrum",
      institution: "Udemy",
      date: "2022",
      hours: 6.5,
      description: "Fundamentos de agilidade e Scrum: cerimônias, papéis, artefatos e fluxo.",
      image: null,
      tags: ["Agile", "Scrum", "Gestão"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("Gestão Ágil com Scrum.pdf") }],
      details: "Visão prática do Scrum aplicado a times e projetos de software.",
    },
    {
      id: 6,
      category: "certificado",
      title: "Git",
      institution: "Udemy",
      date: "2023",
      hours: 7.0,
      description: "Versionamento com Git: commits, branches, merges e boas práticas no fluxo.",
      image: null,
      tags: ["Git", "Versionamento", "Workflow"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("Git.pdf") }],
      details: "Fluxo completo do básico ao avançado para colaboração em repositórios.",
    },
    {
      id: 7,
      category: "certificado",
      title: "Postman",
      institution: "Udemy",
      date: "2023",
      hours: 1.0,
      description: "Testes de API e coleções no Postman: requests, variáveis e ambientes.",
      image: null,
      tags: ["API", "Postman", "HTTP"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("Postman.pdf") }],
      details: "Uso do Postman para validação rápida de endpoints e organização de rotinas.",
    },
    {
      id: 8,
      category: "certificado",
      title: "Spring Boot Expert",
      institution: "Udemy",
      date: "2023",
      hours: 15.5,
      description: "Backend com Spring Boot: APIs REST, JPA e tópicos de segurança/autenticação.",
      image: null,
      tags: ["Spring Boot", "Java", "API", "Backend"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("SpringBoot Expert.pdf") }],
      details: "Conteúdo voltado para construção de APIs e boas práticas com Spring.",
    },
    {
      id: 9,
      category: "certificado",
      title: "UML",
      institution: "Udemy",
      date: "2022",
      hours: 5.0,
      description: "Modelagem e análise: diagramas UML para apoiar design e entendimento do sistema.",
      image: null,
      tags: ["UML", "Modelagem", "Análise"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("UML.pdf") }],
      details: "Base para documentação e comunicação técnica entre times.",
    },
    {
      id: 10,
      category: "certificado",
      title: "Figma",
      institution: "Udemy",
      date: "2022",
      hours: 13.5,
      description: "Design de interfaces no Figma: componentes, prototipação e organização.",
      image: null,
      tags: ["Figma", "UI", "UX", "Design"],
      links: [{ label: "Abrir certificado (PDF)", url: pdfUrl("Figma.pdf") }],
      details: "Do zero ao uso mais profissional do Figma para interfaces e protótipos.",
    },
  ];

  const tabs = [
    { key: "todos", label: "Todos" },
    { key: "certificado", label: "Certificados" },
    { key: "certificacao", label: "Certificações" },
  ];

  const filteredCertificates = useMemo(() => {
    if (activeTab === "todos") return certificates;
    return certificates.filter((c) => c.category === activeTab);
  }, [activeTab, certificates]);

  const stats = useMemo(() => {
    const total = certificates.length;
    const institutions = new Set(certificates.map((c) => c.institution)).size;
    const totalHours = certificates.reduce((acc, c) => acc + (c.hours ?? 0), 0);
    return { total, institutions, totalHours };
  }, [certificates]);

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
            Cursos e certificados que reforçam minha base técnica e aprendizado contínuo.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500/20">
            <Award className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stats.total}+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Itens</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500/20">
            <Building className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stats.institutions}+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Instituições</p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-purple-500/20">
            <Calendar className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {stats.totalHours > 0 ? `${Math.round(stats.totalHours)}+` : "—"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Horas de Estudo</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2 rounded-full border transition ${
                activeTab === t.key
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-transparent"
                  : "border-white/10 text-gray-300 hover:text-white hover:border-white/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
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
            <span className="font-semibold">Próxima meta: AWS Certified Cloud Practitioner (CLF-C02)</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </section>
  );
};

export default Certificates;
