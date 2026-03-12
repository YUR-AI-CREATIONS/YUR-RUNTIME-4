import { VerticalConfig } from '../vertical.config';

const taskWorker: VerticalConfig = {
  id: 'yur-task-worker',
  name: 'YUR Task Worker',
  tagline: 'Background Processing — Queue, Execute, Report',
  icon: '⚙️',
  primaryColor: '#FF8F00',
  accentColor: '#FFE082',
  bgGradient: 'linear-gradient(135deg, #1A1210 0%, #FF8F00 50%, #3E2723 100%)',
  systemInstruction: `You are YUR Task Worker, the background processing engine of the YUR ecosystem. You consume tasks from priority queues, execute them with retry logic and timeout management, report results back to originating services, and ensure no task is dropped or executed twice. You handle long-running operations that cannot block HTTP request cycles — PDF generation, email batch sends, data imports, report compilation, and ML inference jobs.`,
  complianceStandards: [
    'SOC 2 Type II (Processing Integrity)',
    'Idempotency Standards (At-Least-Once / Exactly-Once)',
    'Dead Letter Queue Management',
    'SLA Compliance for Background Processing',
    'GDPR Article 17 (Right to Erasure in Queues)'
  ],
  agents: [
    {
      name: 'QUEUE_MANAGER',
      role: 'Priority Queue & Dead Letter Management Agent',
      systemPrompt: 'You manage task queues — implementing priority lanes (critical, normal, batch), enforcing FIFO within priority levels, routing failed tasks to dead letter queues with diagnostic context, and managing queue depth alerts. You ensure backpressure propagates upstream before queues overflow.',
      model: 'gemini-2.5-flash',
      thinkingBudget: 8192
    },
    {
      name: 'JOB_EXECUTOR',
      role: 'Task Execution & Retry Logic Agent',
      systemPrompt: 'You execute queued tasks with robust error handling — implementing exponential backoff retries, enforcing per-task timeouts, managing concurrent execution limits, and ensuring idempotency so duplicate messages do not cause duplicate side effects. Capture execution traces for debugging and performance analysis.',
      model: 'gemini-2.5-flash',
      thinkingBudget: 8192
    },
    {
      name: 'RETRY_HANDLER',
      role: 'Failure Recovery & Retry Strategy Agent',
      systemPrompt: 'You manage retry strategies for failed tasks — configuring per-task-type retry policies (count, backoff curve, jitter), distinguishing retryable from terminal failures, implementing circuit breakers for downstream dependencies, and escalating persistent failures to operators. Analyze retry patterns to identify systemic issues.',
      model: 'gemini-2.5-flash',
      thinkingBudget: 4096
    },
    {
      name: 'DEAD_LETTER_ANALYST',
      role: 'Dead Letter Queue Analysis & Recovery Agent',
      systemPrompt: 'You analyze dead letter queues — classifying failure reasons, identifying common failure patterns, recommending fixes, and orchestrating bulk reprocessing after root causes are resolved. Maintain DLQ dashboards, track mean time to resolution, and prevent DLQ growth through proactive failure pattern detection.',
      model: 'gemini-2.5-flash',
      thinkingBudget: 4096
    }
  ],
  dataSources: [
    {
      name: 'Task Queue',
      type: 'realtime',
      description: 'Priority task queues — pending, in-progress, completed, failed, and dead-lettered tasks'
    },
    {
      name: 'Execution Log',
      type: 'database',
      description: 'Task execution history — start/end times, retry counts, error messages, and result payloads'
    },
    {
      name: 'Worker Pool State',
      type: 'realtime',
      description: 'Active worker instances — current task, CPU/memory usage, tasks completed, and error rate'
    }
  ],
  outputFormats: [
    'Queue Depth Dashboards',
    'Task Execution Reports',
    'Dead Letter Queue Analysis',
    'Worker Utilization Metrics',
    'Retry Pattern Analytics',
    'SLA Compliance Reports',
    'Failure Classification Reports'
  ],
  defaultModel: 'CORE_FAST',
  features: {
    videoGen: false,
    tts: false,
    imageGen: false,
    maps: false,
    search: false,
    governance: true,
    stripe: false
  }
};

export default taskWorker;
