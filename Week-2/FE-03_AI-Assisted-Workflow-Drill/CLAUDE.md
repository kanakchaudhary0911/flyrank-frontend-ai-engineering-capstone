# CLAUDE.md

## Project Overview

This assignment focuses on comparing two AI-assisted development workflows:
1. A vague prompt with minimal guidance.
2. A detailed prompt including planning, constraints, verification, and testing.

The goal is to evaluate how prompt quality affects implementation quality, correctness, and review effort.

---

# AI Development Rules

## Prompting

- Always explore the task before writing code.
- Use detailed prompts with clear requirements and constraints.
- Reference relevant project files whenever possible.

## Implementation

- Follow the existing project structure.
- Keep code simple, readable, and modular.
- Reuse existing patterns instead of creating inconsistent implementations.

## Verification

- Write tests for every new feature whenever applicable.
- Run tests after implementation and fix any failures before considering the task complete.
- Verify accessibility for forms by using labels, keyboard navigation, and meaningful validation messages.

## Review

- Review AI-generated code before accepting it.
- Never assume AI output is correct without verification.
- Document important implementation decisions when necessary.

---

# Preferred Workflow

Explore → Plan → Implement → Test → Review → Commit