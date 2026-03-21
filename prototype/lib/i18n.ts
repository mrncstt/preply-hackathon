export type Locale = "en" | "pt" | "es";

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("es")) return "es";
  return "en";
}

export const translations = {
  en: {
    banner: { proven: "Proven progress", sub: "with 1-on-1 tutoring. See how it works" },
    nav: { findTutors: "Find tutors", forBusiness: "For business", becomeTutor: "Become a tutor", provenProgress: "Proven Progress", logIn: "Log In", signUp: "Sign up" },
    hero: {
      h1_1: "Learn faster",
      h1_2: "with your best",
      h1_3: "language tutor.",
      subtitle: "Take 1-on-1 lessons with our AI Discovery Coach, who learns what you love and builds personalized learning plans around your passions.",
      cta: "Find your tutor",
      ctaSub: "90-second voice interview. Personalized results.",
    },
    howItWorks: {
      title: "How it works",
      step1: { title: "Tell us about you", desc: "Our AI Discovery Coach asks about your passions, goals, and learning style in a natural 90-second voice conversation." },
      step2: { title: "Get your learning profile", desc: "We map your interests to create a unique learning bridge connecting what you love to what you need to learn." },
      step3: { title: "Start learning", desc: "Get paired with a tutor who shares your passions and a personalized plan built around your interests." },
    },
    trust: { tutors: "Expert tutors", reviews: "5-star reviews", subjects: "Subjects taught", nationalities: "Tutor nationalities" },
    footer: { hackathon: "Hackathon prototype. Built at Preply x Agora Hackathon, Barcelona 2026." },
    classify: { analyzing: "Analyzing your interview...", building: "Building your personalized learning profile" },
  },
  pt: {
    banner: { proven: "Progresso comprovado", sub: "com aulas particulares. Saiba mais" },
    nav: { findTutors: "Encontrar tutores", forBusiness: "Para empresas", becomeTutor: "Seja um tutor", provenProgress: "Progresso comprovado", logIn: "Entrar", signUp: "Cadastrar" },
    hero: {
      h1_1: "Aprenda mais rapido",
      h1_2: "com o melhor tutor",
      h1_3: "de idiomas para voce.",
      subtitle: "Faca aulas com nosso Discovery Coach, que descobre suas paixoes e cria planos de aprendizado personalizados ao redor dos seus interesses.",
      cta: "Encontre seu tutor",
      ctaSub: "Entrevista por voz de 90 segundos. Resultados personalizados.",
    },
    howItWorks: {
      title: "Como funciona",
      step1: { title: "Conte sobre voce", desc: "Nosso Discovery Coach pergunta sobre suas paixoes, objetivos e estilo de aprendizado em uma conversa natural de 90 segundos." },
      step2: { title: "Receba seu perfil", desc: "Mapeamos seus interesses para criar uma ponte de aprendizado unica conectando o que voce ama ao que precisa aprender." },
      step3: { title: "Comece a aprender", desc: "Seja conectado com um tutor que compartilha suas paixoes e um plano personalizado baseado nos seus interesses." },
    },
    trust: { tutors: "Tutores especializados", reviews: "Avaliacoes 5 estrelas", subjects: "Materias ensinadas", nationalities: "Nacionalidades" },
    footer: { hackathon: "Prototipo de hackathon. Feito no Preply x Agora Hackathon, Barcelona 2026." },
    classify: { analyzing: "Analisando sua entrevista...", building: "Criando seu perfil de aprendizado personalizado" },
  },
  es: {
    banner: { proven: "Progreso comprobado", sub: "con clases particulares. Descubre como" },
    nav: { findTutors: "Encontrar tutores", forBusiness: "Para empresas", becomeTutor: "Ser tutor", provenProgress: "Progreso comprobado", logIn: "Iniciar sesion", signUp: "Registrarse" },
    hero: {
      h1_1: "Aprende mas rapido",
      h1_2: "con tu mejor tutor",
      h1_3: "de idiomas.",
      subtitle: "Toma clases con nuestro Discovery Coach, que descubre tus pasiones y crea planes de aprendizaje personalizados alrededor de tus intereses.",
      cta: "Encuentra tu tutor",
      ctaSub: "Entrevista por voz de 90 segundos. Resultados personalizados.",
    },
    howItWorks: {
      title: "Como funciona",
      step1: { title: "Cuentanos sobre ti", desc: "Nuestro Discovery Coach pregunta sobre tus pasiones, objetivos y estilo de aprendizaje en una conversacion natural de 90 segundos." },
      step2: { title: "Recibe tu perfil", desc: "Mapeamos tus intereses para crear un puente de aprendizaje unico conectando lo que amas con lo que necesitas aprender." },
      step3: { title: "Empieza a aprender", desc: "Conectate con un tutor que comparte tus pasiones y un plan personalizado basado en tus intereses." },
    },
    trust: { tutors: "Tutores expertos", reviews: "Resenas de 5 estrellas", subjects: "Materias ensenadas", nationalities: "Nacionalidades" },
    footer: { hackathon: "Prototipo de hackathon. Hecho en Preply x Agora Hackathon, Barcelona 2026." },
    classify: { analyzing: "Analizando tu entrevista...", building: "Creando tu perfil de aprendizaje personalizado" },
  },
} as const;

export type Translations = typeof translations.en;
