import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
	try {
		const token = core.getInput('github-token', {required: true});
		const daysUntilClose = parseInt(core.getInput('days-until-close', {required: true}));
		const triggerLabel = core.getInput('trigger-label', {required: true});
		const closingComment = core.getInput('closing-comment', {required: true});
		core.info(`Running with params ${daysUntilClose} ${closingComment}.`);

		const repository = github.context.payload.repository?.full_name;
		if (!repository) {
			core.error('Unable to run action; was not associated to any repository.');
			return;
		}
		const [owner, repositoryName] = repository.split('/');
		core.info(`Running for ${owner} / ${repositoryName}`);

		const client = github.getOctokit(token);
		const issues = await client.rest.issues.listForRepo({owner, repo: repositoryName});
		const changesRequestedIssues = issues.data.filter(e => e.labels.some(l => l.name === triggerLabel));
		core.info(`Found ${changesRequestedIssues.length} issues: ${changesRequestedIssues.map(e => e.title).join(', ')}.`);

		core.debug(new Date().toTimeString());
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
