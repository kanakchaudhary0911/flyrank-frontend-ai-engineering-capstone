# AI-Assisted Workflow Comparison

## Overview

This assignment explored how prompt quality influences the overall software development process. I implemented the same feature twice using different prompting strategies and compared the results based on correctness, accessibility, testing, edge-case handling, and review effort.

---

## Round 1 – Vague Prompt

For the first implementation, I intentionally used a minimal prompt with very little context.

**Prompt Example**

> "Create a React settings form with validation."

The AI generated a functional form, but the implementation lacked several important details. Validation was basic, accessibility considerations were limited, and no automated tests were included. Although the feature worked, it required significant manual review and additional corrections before it could be considered complete.

### Observations

- Basic implementation
- Limited validation
- No testing
- Minimal accessibility support
- Higher manual review effort

---

## Round 2 – Detailed Prompt

For the second implementation, I started with a fresh AI session and followed a structured workflow.

The prompt included:

- Project context
- File references
- Technical constraints
- Expected behavior
- Accessibility requirements
- Verification instructions
- Testing requirements

The AI first planned the implementation before writing code. After development, it generated tests, verified the feature, and corrected issues where necessary.

### Observations

- Cleaner project structure
- Better validation
- Improved accessibility
- Included testing
- Easier review process
- More reliable implementation

---

## AI Mistake I Identified

During review, I noticed that the generated validation logic did not correctly compare the **Password** and **Confirm Password** fields. This issue required a manual correction before the implementation met the expected behavior.

This reinforced the importance of reviewing AI-generated code instead of assuming it is always correct.

---

## Comparison

| Area | Round 1 | Round 2 |
|-------|---------|---------|
| Prompt Quality | Minimal | Detailed |
| Planning | None | Included |
| Validation | Basic | Comprehensive |
| Accessibility | Limited | Improved |
| Testing | Not Included | Included |
| Manual Review | High | Low |

---

## Conclusion

This exercise demonstrated that investing additional time in writing a detailed prompt significantly improves AI-generated code quality. Although the second workflow required more planning at the beginning, it reduced debugging time, minimized manual corrections, and produced a more maintainable implementation. The experience showed that effective AI-assisted development depends not only on using AI, but also on providing clear requirements, verification steps, and structured guidance.