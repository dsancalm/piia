---
title: "Cloudflare launches Artifacts and a $25K contest for AI-native Git"
summary: "Artifacts is a versioned filesystem that speaks Git and scales to millions of repositories. It entered open beta this week for Workers Paid customers. A competition with a $25,000 credit prize and a trip to Cloudflare Connect asks developers to build the next Git platform..."
lang: en
story: cloudflare-launches-artifacts-and-a-25k-contest
publishedAt: 2026-10-04T12:45:22.626Z
sourceUrl: "https://blog.cloudflare.com/next-git-platform-on-cloudflare/"
sourceName: "Hacker News (portada)"
priority: routine
tags: [cloudflare, workers, git, ai]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Cloudflare has opened a competition to build the next Git platform on Workers and a new primitive called Artifacts. The goal is a system designed for an era where AI agents, not just humans, write and coordinate code. Artifacts is a versioned filesystem that speaks the Git protocol and scales to millions of repositories. It entered open beta this week for customers on a Workers Paid plan.

Artifacts handles repository creation and forking programmatically. It stores versioned code and agent context, and it exposes native Git operations. New capabilities include deploying Artifacts repositories directly to Workers via Workers Builds for both production and preview environments. Workers can bind to Artifacts to manage repositories and tokens programmatically. The system emits events for pushes, forks, and clones, which can trigger workflows. Namespaces can be created with data jurisdiction locked to the US or EU. Metrics are visible in the dashboard and via API. Billing for Artifacts starts October 15, 2026, based on repository operations and stored data.

The competition requires a 5 to 10 minute demo video, source code under a permissive license (MIT, Apache, or BSD), and run instructions. The deadline is October 14, 2026. The top three projects send up to two members each to Cloudflare Connect in San Francisco. The first-place winner receives $25,000 in Cloudflare credits and an invitation to the Monday VIP dinner.

The provided code samples illustrate the intended workflow. A Worker can fetch a project, read the default branch, fork a new workspace for a specific task, and read an `AGENTS.md` file to pass instructions to an agent:

```javascript
using project = await env.ARTIFACTS.get("my-project");
const { defaultBranch } = await project.info();
const workspace = await project.fork(`task-${crypto.randomUUID()}`);
using repo = await env.ARTIFACTS.get(workspace.name);
const instructions = await repo.readFile({
  ref: defaultBranch,
  path: "AGENTS.md",
});
const agentTask = {
  remote: workspace.remote,
  token: workspace.token,
  instructions: instructions ? await instructions.text() : null,
};
```

A second example shows a queue consumer reacting to a push event by spinning up a review workflow:

```javascript
export default {
  async queue(batch, env) {
    for (const message of batch.messages) {
      const event = message.body;
      if (event.type !== "cf.artifacts.repo.pushed") continue;
      await env.REVIEW_WORKFLOW.create({
        params: {
          namespace: event.source.namespace,
          repo: event.source.repoName,
          ref: event.payload.ref,
          commit: event.payload.after,
        },
      });
    }
  },
};
```

Creating a namespace with EU data jurisdiction uses the REST API:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/artifacts/namespaces" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{"namespace":"my-eu-namespace","jurisdiction":"eu"}'
```

What is not known:
- Exact judging criteria and weighting (creativity, completeness, demo quality, code quality).
- Concrete Artifacts pricing (cost per operation, per GB stored, free tier inclusion).
- Technical limits (max repositories per namespace, max repository size, API rate limits, latency).
- Whether solo participation is allowed or if there are geographic/legal restrictions.
- Full event payload schemas beyond the `cf.artifacts.repo.pushed` example.
- Artifacts availability on Workers Free or Enterprise plans and associated quotas.
- Intellectual property handling for submitted code beyond the permissive license requirement.
