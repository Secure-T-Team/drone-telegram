# Drone plugin for telegram notify

## Settings reference

```yaml
steps:
  - name: notify
    image: bibasoft/drone-telegram
    settings:
      token:
        from_secret: telegram_token
      to:
        from_secret: telegram_to
      link: 'https://{{branch}}.dev.example.com'
      authors:
        github_user: 'telegram_user'
        lupa: pupa
      authors: "{ \"lupa\": \"pupa\" }"
```

## placeholders in link:

- `{{build_number}}` — `Int`, number of build
- `{{repo_name}}` – `String`, name of repo
- `{{branch}}` — `String`, escaped source branch
- `{{commit_message}}` – `String`, message from commit
- `{{default_branch}}` – `String`, main branch in repo (usually `master`)
- `{{build_status}}` – `String`, status of build. May be `seccess` of `failure`
- `{{author}}` – `String`, author of commit
- `{{tag}}` — `String`, parsed jira task-id or escaped branch
