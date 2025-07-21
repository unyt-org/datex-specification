# Functionality

| Workflow Name            | Description                                                                       | How to Execute (Console)                                             | Input Parameters                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Create Chapter**       | Creates a new chapter file with an optional index (position).                     | `deno run -A /scripts/create-chapter.ts <title> <index>`             | - `title`: Title (required) <br> - `index`: Position (optional)                                                      |
| **Deploy Specification** | Automatically builds and deploys the specification on push to `main` or manually. | `gh workflow run deploy.yml` (manual trigger)                        | None (auto-triggered on push)                                                                                        |
| **Move Chapter**         | Moves an existing chapter to a new index (position).                              | `deno run -A ./scripts/move-chapter.ts <filename> <index>`           | - `filename`: Exact filename (required) <br> - `index`: New position (required)                                      |
| **Rename Chapter**       | Renames a chapter file and optionally updates its heading.                        | `deno run -A ./scripts/rename-chapter.ts  <index> <title> <heading>` | - `index`: Chapter index (required) <br> - `title`: New filename (required) <br> - `heading`: New heading (optional) |

---
