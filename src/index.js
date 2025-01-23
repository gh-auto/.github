const fs = require('fs').promises;
const path = require('path');
const PLACEHOLDER = require('./constants').default;
const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
}

// Function to fetch actions with most stars
async function getGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc', {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const data = await response.json();
        const { items } = data;
        const topActions = items.slice(0, 5);
        return topActions.map(action => {
            return `- [${action.full_name}](${action.html_url}) - ⭐️ ${action.stargazers_count}`;
        }).join('\n');
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return '';
    }
}


// Function to update the README

async function updateReadme() {
    try {
        // Get GitHub token from environment variable

        // Read the template file
        const templatePath = path.join(__dirname, '../profile/README.md.tpl');
        const outputPath = path.join(__dirname, '../profile/README.md');
        
        const template = await fs.readFile(templatePath, 'utf8');

        // Here you can add any dynamic content processing
        // For example, replacing placeholders in the template
        let content = template;
        content = content.replace(PLACEHOLDER.POPULAR, await getGitHubStats());

        
        // You can fetch GitHub stats or other dynamic data here
        // Example: content = content.replace('{{STARS}}', await getGitHubStats());

        // Write the processed content to README.md
        await fs.writeFile(outputPath, content, 'utf8');
        
        console.log('README.md has been updated successfully');
    } catch (error) {
        console.error('Error updating README:', error);
        process.exit(1);
    }
}

// Run the update function
updateReadme();