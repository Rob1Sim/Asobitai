# 📂 Commit Guide for Asobitai

To keep our commit history clean, readable, and compatible with semantic-release, we follow the **Conventional Commits** specification.

---

## 💰 Format

```
<type>(optional scope): short description
```

### Examples:
```
feat: add support for gamepad input
fix: prevent crash when OCR fails
refactor(ocr): clean up bbox sorting logic
docs: update README for install instructions
```

---

## 🔹 Types

| Type       | Description                                     | Triggers Version Bump |
|------------|-------------------------------------------------|------------------------|
| `feat`     | A new feature                                    | Minor (`x.Y.0`)        |
| `fix`      | A bug fix                                       | Patch (`x.y.Z`)        |
| `chore`    | Build process, deps, tooling (no logic change)  | No                     |
| `docs`     | Documentation only changes                      | No                     |
| `style`    | Code formatting, no logic change                | No                     |
| `refactor` | Code change that neither fixes a bug nor adds a feature | No           |
| `test`     | Adding or correcting tests                      | No                     |
| `perf`     | Performance improvements                         | Patch                  |

---

## ⚡ Breaking Changes

To indicate a breaking change, add `BREAKING CHANGE:` in the **body** of your commit message:

```
feat: switch to new OCR engine

BREAKING CHANGE: removed PaddleOCR support on macOS
```

➡️ This will trigger a **Major bump**: `2.0.0`

---

## 🔄 Git Tips

- Amend a commit message:
  ```
  git commit --amend -m "feat: add support for Japanese OCR"
  ```
- Interactive rebase to clean history:
  ```
  git rebase -i HEAD~3
  ```

---

Happy committing! 🎉