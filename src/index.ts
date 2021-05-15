import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
	try {
		const token = core.getInput('github-token', {required: true});
		const daysUntilClose = parseInt(core.getInput('days-until-close', {required: true}));
		const triggerLabel = core.getInput('trigger-label', {required: true});
		const closingComment = core.getInput('closing-comment', {required: true});
		core.info(`Running with params ${daysUntilClose} ${triggerLabel} ${closingComment}.`);

		const repository = github.context.payload.repository?.full_name;
		if (!repository) {
			core.error('Unable to run action; was not associated to any repository.');
			return;
		}
		const [owner, repositoryName] = repository.split('/');
		core.info(`Running for ${owner} / ${repositoryName}`);

		const client = github.getOctokit(token);
		const issues = await client.rest.issues.listForRepo({owner, repo: repositoryName});
		core.info(`Found ${issues.data.length} issues: ${issues.data[0].labels.map(e => e.name).join(', ')}.`);

		core.debug(new Date().toTimeString());
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
