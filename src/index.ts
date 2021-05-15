import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
	try {
		const token = core.getInput('github-token', {required: true});
		const daysUntilClose = parseInt(core.getInput('days-until-close', {required: true}));
		const triggerLabel = core.getInput('trigger-label', {required: true});
		const closingComment = core.getInput('closing-comment', {required: true});
		core.info(`Running with params ${daysUntilClose} ${triggerLabel} ${closingComment}.`);

		const client = github.getOctokit(token);
		core.info(`Client: ${client}.`);
		const issues = await client.rest.issues.list({baseUrl: 'luanpotter/changes-requested'});
		core.info(`Client: ${issues.status}.`);
		core.info(`Found ${issues.data.length} issues.`);

		core.debug(new Date().toTimeString());
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
