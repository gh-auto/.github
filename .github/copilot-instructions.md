# GitHub Copilot Instructions

## Project Overview
This is an automated GitHub profile README updater for the gh-auto organization. It fetches and displays popular GitHub Actions based on stars and usage.

## Key Components

### 1. Main Script (src/index.js)
- Fetches GitHub Actions repositories using the GitHub API
- Filters repositories to ensure they contain action.yml
- Updates README.md from README.md.tpl template
- Uses environment variables for authentication

### 2. Constants (src/constants.js)
- Defines placeholder strings for template replacement
- Current placeholders:
  - %{{TOP_ACTIONS_STAR}} - Most starred actions
  - %{{TOP_ACTIONS_USED}} - Most used actions

### 3. GitHub Workflow (.github/workflows/main.yml)
- Runs every 5 minutes or manually
- Updates the profile README with latest stats
- Commits changes automatically

## Development Guidelines

1. **API Interaction**
- Always include proper authentication headers
- Handle rate limiting appropriately
- Use proper error handling for API calls

2. **File Operations**
- Use async/await for file operations
- Maintain template structure in README.md.tpl
- Preserve existing markdown formatting

3. **Code Style**
- Use ES modules
- Follow async/await patterns
- Implement proper error handling
- Use environment variables for sensitive data

4. **Documentation**
- Document new placeholders in constants.js
- Update README.md.tpl for new sections
- Follow existing markdown structure

## Security Considerations
- Never expose GitHub tokens
- Validate API responses
- Use proper permission scopes
- Handle errors securely

## Testing
Focus on:
- API response handling
- File operation error cases
- Template replacement accuracy
- GitHub workflow functionality
