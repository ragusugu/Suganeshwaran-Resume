// All portfolio content lives here, taken from the Data Engineer resume.

export const profile = {
  name: 'Suganeshwaran R',
  role: 'Data Engineer',
  location: 'India',
  phone: '+91 6369266589',
  phoneHref: 'tel:+916369266589',
  email: 'suganeshgcesalem@gmail.com',
  linkedin: 'https://linkedin.com/in/suganeshwaran-r-388205233',
  github: 'https://github.com/ragusugu',
  credentials: 'https://drive.google.com/drive/folders/1FLE-2-0lfFPQpUHvOMDe-nQ0RWjxk9Lu',
  resume: 'Suganeshwaran-R-Data-Engineer-Resume.pdf',
  languages: ['English', 'Tamil'],
  lead: 'Data Engineer with 3+ years of experience at Saturam building scalable data pipelines and reliable data platforms on AWS and Azure.',
  summary:
    'Skilled in Python, Apache Airflow, Databricks (PySpark, Spark SQL, Delta Lake), Medallion architecture, and containerized delivery with Docker, Kubernetes, and Jenkins CI/CD. Built an Azure OpenAI-based synthetic data generator and a machine learning fraud-detection pipeline. Committed to delivering high-quality data solutions that support analytics, operational systems, and data-driven decision-making.',
};

export const stats = [
  { value: 3, suffix: '+', decimals: 0, label: 'years building pipelines at Saturam' },
  { value: 3, suffix: '', decimals: 0, label: 'featured end-to-end projects' },
  { value: 99.5, suffix: '%+', decimals: 1, label: 'uptime on the fraud-detection platform' },
  { value: 2, suffix: '', decimals: 0, label: 'clouds in daily use: AWS and Azure' },
];

export const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

// ---------------------------------------------------------------------
// Pipeline diagram: the lifecycle a dataset goes through in my projects.
// Each stage only uses details from the resume and names where it came from.
// ---------------------------------------------------------------------
export type StageKind = 'tide' | 'bronze' | 'silver' | 'gold' | 'muted';

export interface Stage {
  id: string;
  label: string;
  mono: string;
  node: string;
  kind: StageKind;
  body: string;
  tech: string[];
  from: string;
}

export const stages: Stage[] = [
  {
    id: 'sources',
    label: 'Sources',
    mono: 'kaggle / chain / schemas',
    node: 'datasets',
    kind: 'tide',
    body: 'Public Kaggle datasets, Ethereum blockchain data, and table schemas uploaded by authenticated users.',
    tech: ['Kaggle datasets', 'Ethereum data', 'Uploaded schemas'],
    from: 'AWS Data Lake, Fraud Detection and Synthetic Data projects',
  },
  {
    id: 'ingest',
    label: 'Ingest',
    mono: 'web3.py / flask / rds',
    node: 'web3.py · rds',
    kind: 'tide',
    body: 'Asynchronous Web3.py ETL pulls and processes Ethereum data. Raw Kaggle datasets are ingested into RDS. Schemas arrive through Flask/Waitress APIs.',
    tech: ['Web3.py', 'Python', 'Flask', 'Waitress', 'Amazon RDS'],
    from: 'Fraud Detection, AWS Data Lake and Synthetic Data projects',
  },
  {
    id: 'bronze',
    label: 'Bronze',
    mono: 'raw tier',
    node: 'raw',
    kind: 'bronze',
    body: 'Raw datasets ingested into RDS: the first tier of a 3-tier Medallion pipeline.',
    tech: ['Medallion architecture', 'Amazon RDS'],
    from: 'AWS Data Lake project',
  },
  {
    id: 'silver',
    label: 'Silver',
    mono: 'processed tier',
    node: 'glue · spark',
    kind: 'silver',
    body: 'Bronze and Silver layers processed with AWS Glue. Also skilled in Databricks: PySpark, Spark SQL and Delta Lake.',
    tech: ['AWS Glue', 'PySpark', 'Spark SQL', 'Delta Lake'],
    from: 'AWS Data Lake project and technical skills',
  },
  {
    id: 'gold',
    label: 'Gold',
    mono: 'curated tier',
    node: 'curated',
    kind: 'gold',
    body: 'Curated Gold aggregates built for business intelligence.',
    tech: ['Aggregates', 'Business intelligence'],
    from: 'AWS Data Lake project',
  },
  {
    id: 'serve',
    label: 'Serve',
    mono: 'streamlit / react',
    node: 'streamlit',
    kind: 'tide',
    body: 'An interactive Streamlit dashboard visualizes Gold-layer insights in real time. React/Vite frontends sit on Flask/Waitress backends.',
    tech: ['Streamlit', 'React', 'Vite', 'Flask', 'Waitress'],
    from: 'AWS Data Lake and Synthetic Data projects',
  },
  {
    id: 'orchestrate',
    label: 'Orchestrate',
    mono: 'apache airflow',
    node: 'apache airflow',
    kind: 'muted',
    body: 'Complex Apache Airflow workflows with robust dependency handling, architected and monitored so production-grade pipelines stay reliable.',
    tech: ['Apache Airflow', 'Dependency handling', 'Monitoring'],
    from: 'Big Data Engineer at Saturam',
  },
  {
    id: 'platform',
    label: 'Platform',
    mono: 'terraform / k8s / ci-cd',
    node: 'terraform · k8s · ci/cd',
    kind: 'muted',
    body: 'Terraform provisions the AWS environment (VPC, EC2, Lambda). Docker and Kubernetes (Pods, Deployments, Services) run the workloads. Jenkins CI/CD automates deployments across AWS and Azure.',
    tech: ['Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure'],
    from: 'Big Data Engineer at Saturam and AWS Data Lake project',
  },
];

// ---------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------
export const job = {
  title: 'Big Data Engineer',
  company: 'Saturam',
  period: '2023 – Present',
  tagline: 'Advanced Data Engineering for Cloud & ML Ecosystem',
};

export const jobEntries = [
  {
    topic: 'Orchestration',
    text: 'Architected and monitored complex data workflows in Apache Airflow with robust dependency handling, keeping production-grade pipelines reliable.',
  },
  {
    topic: 'Containers',
    text: 'Managed scalable environments using Docker and Kubernetes (Pods, Deployments, Services).',
  },
  {
    topic: 'CI/CD',
    text: 'Implemented CI/CD processes with Jenkins to automate deployments across AWS and Azure.',
  },
  {
    topic: 'Reliability',
    text: 'Troubleshot frontend and backend environments to maintain stability and performance during high-traffic periods.',
  },
  {
    topic: 'AI pilot',
    text: 'Built and deployed the AI Synthetic Data Generator, an Azure OpenAI-based pilot for multi-table synthetic data.',
  },
];

// ---------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------
export type ProjectArtId = 'synthetic' | 'medallion' | 'fraud';

export interface Project {
  id: ProjectArtId;
  title: string;
  outcome: string;
  tech: string[];
  points: string[];
}

export const projects: Project[] = [
  {
    id: 'synthetic',
    title: 'AI Synthetic Data Generator',
    outcome: 'Upload a schema, get realistic multi-table synthetic data, exported as CSV, ZIP or Excel.',
    tech: [
      'Azure OpenAI',
      'Flask',
      'Waitress',
      'React',
      'Vite',
      'PostgreSQL',
      'Azure Blob Storage',
      'Azure Key Vault',
      'Microsoft Entra ID',
    ],
    points: [
      'Built and deployed an Azure-based pilot that lets authenticated users upload schemas, analyze table relationships with Azure OpenAI, generate realistic multi-table synthetic datasets, and export results as CSV, ZIP, or Excel files.',
      'Developed a React/Vite frontend and a Flask/Waitress backend with APIs for schema ingestion, parallel AI analysis, row-count recommendations, error-rate suggestions, LLM seed previews, full data generation, background jobs, and Blob-based downloads.',
      'Integrated PostgreSQL, Blob Storage, Key Vault, Microsoft Entra ID OAuth and Google SSO, managed identity, audit logging, SAS-token downloads, and Azure Marketplace SaaS fulfillment for secure authentication, secrets management, subscription handling, and scalable cloud deployment.',
    ],
  },
  {
    id: 'medallion',
    title: 'Automated AWS Data Lake',
    outcome: 'A Terraform-provisioned lake where raw Kaggle data is refined through Bronze, Silver and Gold.',
    tech: ['Terraform', 'AWS EC2', 'AWS Glue', 'AWS Lambda', 'VPC', 'RDS', 'Python', 'Streamlit'],
    points: [
      'Used Terraform (Infrastructure as Code) to provision a full-stack AWS environment including VPC, EC2 instances, and serverless Lambda functions.',
      'Developed a 3-tier Medallion data pipeline: ingested raw Kaggle datasets into RDS, processed Bronze and Silver layers with AWS Glue, and curated Gold aggregates for business intelligence.',
      'Built an interactive Streamlit dashboard to visualize Gold-layer insights in real time.',
      'Applied AI-driven natural language programming (vibe coding) to accelerate development cycles and improve code quality.',
    ],
  },
  {
    id: 'fraud',
    title: 'Blockchain ML Fraud Detection Platform',
    outcome: 'Real-time fraud analysis on Ethereum data, running at 99.5%+ uptime.',
    tech: ['Web3.py', 'Ethereum data', 'Flask', 'React', 'PostgreSQL', 'Kubernetes'],
    points: [
      'Built high-performance ETL pipelines to extract and process Ethereum blockchain data using asynchronous APIs.',
      'Integrated a machine learning model to detect high-risk crypto transactions, with automated fallback handling.',
      'Deployed with containerization, full logging, and monitoring, ensuring 99.5%+ uptime for real-time fraud analysis.',
    ],
  },
];

// ---------------------------------------------------------------------
// Stack, grouped by where it sits in the pipeline
// ---------------------------------------------------------------------
export interface StackGroup {
  title: string;
  note: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    title: 'Ingest & orchestrate',
    note: 'Getting data in, on schedule',
    items: ['Python', 'SQL', 'Shell Scripting', 'Apache Airflow', 'AWS Glue', 'ETL/ELT', 'Web3.py'],
  },
  {
    title: 'Process & model',
    note: 'Turning raw into trusted',
    items: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake', 'Medallion Architecture'],
  },
  {
    title: 'Store',
    note: 'Where the data lives',
    items: ['PostgreSQL', 'MySQL', 'Snowflake', 'AWS S3', 'Amazon RDS', 'Azure Blob Storage'],
  },
  {
    title: 'Serve',
    note: 'Getting it to people',
    items: ['Flask', 'React', 'Vite', 'Streamlit', 'AI-assisted development'],
  },
  {
    title: 'Cloud platform',
    note: 'AWS and Azure',
    items: ['AWS Lambda', 'EC2', 'VPC', 'IAM', 'Azure OpenAI', 'Key Vault', 'Microsoft Entra ID'],
  },
  {
    title: 'DevOps & AI',
    note: 'Shipping it safely',
    items: [
      'Docker',
      'Kubernetes',
      'Jenkins',
      'CI/CD',
      'Terraform',
      'Git',
      'ML model integration',
      'Web3',
      'Ethereum data extraction',
    ],
  },
];

// ---------------------------------------------------------------------
// Education and certifications
// ---------------------------------------------------------------------
export const education = [
  {
    degree: 'Bachelor of Engineering (B.E.), Computer Science and Engineering',
    school: 'Government College of Engineering, Salem',
    years: '2020 – 2023',
  },
  {
    degree: 'Diploma in Computer Science and Engineering',
    school: 'Muthayammal Polytechnic Institution',
    years: '2018 – 2020',
  },
];

export const certifications = [
  { name: 'Databricks Fundamentals', issuer: 'Databricks Academy Accreditation' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks Academy' },
  { name: 'Generative AI Course', issuer: 'Simplilearn' },
  { name: 'TCS NQT National Level Test', issuer: 'Score: 77.80%' },
  { name: 'Blockchain & Web 3.0 Workshop', issuer: 'EPNS SDE, MIT Chennai' },
  { name: 'IoT and Blockchain: Challenges and Applications Workshop', issuer: 'GCE Salem' },
];
