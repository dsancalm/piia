---
title: "Python 3.15 available on GitHub Actions"
summary: "The official build landed in the actions/python-versions repository, so adding \"3.15\" to a workflow matrix now works without custom setup. Simon Willison automated an hourly git pull to catch the moment the stable tag appeared."
lang: en
story: python-3-15-available-on-github-actions
publishedAt: 2026-10-11T13:15:33.238Z
sourceUrl: "https://simonwillison.net/2026/Oct/10/python-actions/"
sourceName: "Simon Willison"
priority: urgent
tags: [python, github-actions, ci, workflow]
generatedBy: nvidia/nemotron-3-ultra-550b-a55b:free
---
Python 3.15.0 is now available in the `actions/python-versions` repository. You can run your test matrix against the new interpreter on GitHub Actions today. Add `"3.15"` to the `python-version` input in your workflow file and the runner will pull the official build. No custom setup steps, no third-party actions, no Docker containers required.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.11", "3.12", "3.13", "3.15"]
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - run: python -m pytest
```

Simon Willison had been waiting for this entry for a couple of days. He configured ChatGPT to clone the `actions/python-versions` repository and run `git pull` once an hour until the stable 3.15 tag appeared, then notify him.

```
Clone https://github.com/actions/python-versions and git pull once an hour until they add the stable 3.15 - then tell me about it
```

The repository is the canonical source that `actions/setup-python` reads to resolve version strings. Once a version lands there, it is immediately usable in any workflow that references it.

What is not known
- The exact release date of Python 3.15.0 upstream.
- The full changelog or new features included in 3.15.0.
- The precise timestamp when the entry was merged to `actions/python-versions`.
- Whether alpha, beta, or release-candidate builds for 3.15 were already published in the repository before the final release.
