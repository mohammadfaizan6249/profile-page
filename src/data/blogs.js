export const BLOGS = [
    {
        id: 1,
        slug: 'llm-trends-2026',
        title: 'LLM Trends I Am Watching in 2026',
        description:
            'A practical look at where LLMs are moving next: smaller specialist models, better evaluation, agentic workflows, multimodal interfaces, and local-first AI systems.',
        date: 'May 3, 2026',
        readingTime: '6 min read',
        tag: 'AI',
        is_published: true,
        sort_order: 1,
        content: `
Large language models are moving from impressive demos into actual software infrastructure. The most interesting trend is not only bigger models. It is the way teams are building reliable systems around models.

The first shift is toward specialist models. Smaller models fine-tuned for a clear workflow can be faster, cheaper, and easier to evaluate than one massive general-purpose model. For product teams, this means the future stack may include multiple models: one for retrieval, one for extraction, one for reasoning, and one for user-facing responses.

The second shift is evaluation. Prompting alone is not enough when a system affects users, reports, or decisions. Good AI products need test sets, regression checks, hallucination tracking, attribution, and human review loops. That is why I am interested in projects like ModelSentinel and ProvenAI: they focus on monitoring, evidence, and trust instead of only model output.

The third shift is multimodal interaction. Voice, documents, images, and structured data are becoming normal inputs. Products like interview coaches, analytics assistants, and data copilots will feel more natural when they can listen, read, inspect, and explain in one workflow.

My bet: the strongest LLM products in 2026 will look less like chatbots and more like dependable systems with memory, tools, evaluations, and clear user workflows.
        `.trim(),
    },
    {
        id: 2,
        slug: 'can-ai-replace-engineers',
        title: 'Can AI Replace Engineers?',
        description:
            'AI can automate parts of software work, but engineering is broader than writing code. The winners will be engineers who can design systems, verify output, and ship responsibly.',
        date: 'Apr 26, 2026',
        readingTime: '5 min read',
        tag: 'Engineering',
        is_published: true,
        sort_order: 2,
        content: `
The question "Can AI replace engineers?" is too broad. AI is already replacing pieces of engineering work: boilerplate, simple CRUD screens, test scaffolds, documentation drafts, migrations, and quick prototypes. But engineering is not just typing code.

Real engineering includes understanding messy requirements, choosing tradeoffs, protecting data, designing reliable systems, debugging failures, working with users, and deciding what should not be built. AI helps with many of those tasks, but it still needs direction, review, and context.

The engineer's job is shifting from pure implementation to orchestration. A strong engineer can break a vague problem into steps, ask the model for focused work, inspect the output, test the system, and catch subtle bugs. That skill becomes more valuable as AI-generated code becomes more common.

The risk is not that engineers disappear overnight. The risk is that engineers who only do repetitive implementation may get outpaced by engineers who use AI to move faster while still thinking clearly.

My view is simple: AI will replace some engineering tasks, but it will also raise the ceiling for people who understand systems deeply.
        `.trim(),
    },
    {
        id: 3,
        slug: 'vibe-coding-future',
        title: 'Why Vibe Coding Could Become the Future of Prototyping',
        description:
            'Vibe coding is not a replacement for engineering discipline, but it can make early product exploration faster, more creative, and more accessible.',
        date: 'Apr 18, 2026',
        readingTime: '6 min read',
        tag: 'AI',
        is_published: true,
        sort_order: 3,
        content: `
Vibe coding gets criticized because it sounds careless: describe what you want, let AI write code, and keep adjusting until the product feels right. Used badly, that can create fragile software. Used well, it can be a powerful prototyping workflow.

The best version of vibe coding is not "ignore the code." It is fast product exploration with a human still making the important decisions. You can test UI ideas, generate multiple flows, compare interaction patterns, and turn rough concepts into working screens in hours instead of days.

Where vibe coding can improve is structure. Future tools should make it easier to keep requirements, design decisions, tests, and code changes connected. The workflow should include checkpoints: what changed, why it changed, what broke, and what still needs human review.

That is where engineering discipline still matters. A prototype can be vibe-coded, but production software needs architecture, security, accessibility, performance, and testing. The future is likely a blend: fast AI-assisted exploration followed by rigorous engineering hardening.

I think vibe coding will become normal because it lowers the cost of trying ideas. The builders who win will be the ones who can move creatively without losing technical judgment.
        `.trim(),
    },
    {
        id: 4,
        slug: 'claude-code-agentic-development',
        title: 'Claude Code and the Rise of Agentic Development',
        description:
            'Claude Code is part of a bigger shift toward agentic development, where AI tools inspect repositories, make scoped changes, run checks, and help engineers work at a higher level.',
        date: 'Apr 10, 2026',
        readingTime: '5 min read',
        tag: 'Engineering',
        is_published: true,
        sort_order: 4,
        content: `
Claude Code is trending because it points to a more useful kind of developer tool. Instead of only answering questions, agentic coding tools can inspect a repository, understand file relationships, edit code, run tests, and explain the result.

That changes the feel of software work. The engineer becomes more like a technical lead for a small AI teammate: define the task, provide constraints, review changes, and decide what is good enough to ship.

The best agentic tools will not be the ones that write the most code. They will be the ones that preserve context, respect existing project patterns, run verification, and make their reasoning easy to inspect. Trust matters more than raw speed.

This also makes codebases themselves more important. Clean structure, readable tests, clear naming, and strong documentation become fuel for better AI assistance. A messy repo gives an agent less reliable context, while a well-shaped repo lets the tool move with confidence.

My takeaway: Claude Code is not just a coding assistant trend. It is a signal that software development is becoming more collaborative, more automated, and more dependent on engineers who can guide AI with taste and judgment.
        `.trim(),
    },
];
