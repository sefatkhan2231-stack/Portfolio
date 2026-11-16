import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react"; // Optional: npm i lucide-react

const projectData = [
  {
    title: "CineMatch",
    image: "/assets/cinematch-home.png",
    desc: "CineMatch is a full-stack movie recommendation platform that helps users discover movies through personalized recommendations, similar-movie suggestions, and movie search.",
    tags: ["React", "FastAPI", "PostgreSQL", "Machine Learning"],
    link: "https://cine-match-henna.vercel.app",
    github: "https://github.com/sefatkhan2231-stack/CineMatch.git",
  },
  {
    title: "sql-analytics-dashboard",
    image: "/assets/product-&-regional-analysis.png",
    desc: "This project analyzes historical Superstore sales data from January 2014 to December 2017. The goal is to transform transactional data into actionable business insights through SQL analysis and a five-page interactive Power BI report.The analysis covers overall business performance, customer segmentation (RFM), cohort retention, product profitability, discount-related losses, and regional performance.",
    tags: ["PostgreSQL", "SQL", "Power BI"],
    github:
      "https://github.com/sefatkhan2231-stack/sql-analytics-dashboard.git",
  },
  {
    title: "AI Resume Rag",
    image: "/assets/ai-resume-home.png",
    desc: "A RAG based AI Resume screening application which can process, store and fetch information from multiple PDF Resumes.",
    tags: [
      "Generative AI",
      "Retrieval-Augmented Generation (RAG)",
      "Natural Language Processing (NLP)",
      "Python",
      "FastAPI",
      "ChromaDB",
    ],
    link: "https://ai-resume-rag-rho.vercel.app",
    github: "https://github.com/sefatkhan2231-stack/ai-resume-rag.git",
  },
  {
    title: "BariDam",
    image: "/assets/home.png",
    desc: "An end-to-end machine learning web application that predicts real estate sale prices in Bangladesh using an XGBoost regression model. The project includes a FastAPI backend for serving predictions and model insights, and a React (Vite + TypeScript) frontend for interacting with the model — including single predictions, CSV batch predictions, and model explainability (SHAP) visualizations.",
    tags: ["React", "Tailwind", "FastAPI", "XGBoost", "Pandas"],
    link: "https://bangladesh-real-estate-price-predic.vercel.app",
    github:
      "https://github.com/sefatkhan2231-stack/Bangladesh-real-estate-price-prediction.git",
  },
  {
    title: "Credit Card Fraud",
    image: "/assets/dashboard.png",
    desc: "An end-to-end Machine Learning project that detects fraudulent credit card transactions using a Random Forest Classifier trained on an imbalanced dataset. The project includes data preprocessing, SMOTE oversampling, model evaluation, feature importance analysis, and an interactive Streamlit dashboard for real-time predictions.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Streamlit"],
    link: "https://credit-card-fraud-jrvqt2glbkq6oj25dkuuqt.streamlit.app",
    github: "https://github.com/sefatkhan2231-stack/credit-card-fraud.git",
  },
  {
    title: "customer-churn-platform",
    image: "/assets/churn-home.png",
    desc: "An end-to-end Machine Learning web application that predicts customer churn using customer demographic and service information.",
    tags: [
      "Python",
      "Pandas",
      "NumPy",
      "XGBoost",
      "FastAPI",
      "React",
      "Tailwind CSS",
    ],
    link: "https://customer-churn-platform-mu.vercel.app",
    github:
      "https://github.com/sefatkhan2231-stack/customer-churn-platform.git",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-32 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-2">
              Portfolio
            </h3>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Featured <span className="text-slate-500">Works</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            A selection of my favorite projects, ranging from full-stack
            platforms to experimental UI experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {projectData.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition-all hover:border-emerald-500/50"
            >
              {/* Project Image */}
              <div className="aspect-video w-full overflow-hidden bg-slate-800">
                <div className="h-full w-full bg-linear-to-br from-slate-800 to-slate-900 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center text-slate-700 font-bold">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white break-words group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {project.desc}
                </p>

                {/* Footer Links */}
                <div className="mt-auto pt-6 flex items-center gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-bold text-white hover:underline"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="p-1 text-slate-500 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Shimmer Effect */}
              <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-emerald-500/20 rounded-2xl transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
