import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
	try {
		const token = core.getInput('github-token', {required: true});
		const daysUntilClose = parseInt(core.getInput('days-until-close', {required: true}));
		const triggerLabel = core.getInput('trigger-label', {required: true});
		const closingComment = core.getInput('closing-comment', {required: true});

		const client = github.getOctokit(token);
		const issues = await client.rest.issues.list();
		core.info(`Found ${issues.data.length} issues ${daysUntilClose} ${triggerLabel} ${closingComment}.`);

		core.debug(new Date().toTimeString());
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
