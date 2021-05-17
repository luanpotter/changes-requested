import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
	try {
		const token = core.getInput('github-token', {required: true});
		const daysUntilClose = parseInt(core.getInput('days-until-close', {required: true}));
		const triggerLabel = core.getInput('trigger-label', {required: true});
		const closingComment = core.getInput('closing-comment', {required: true});
		const dryRun = core.getInput('dry-run', {required: true}) !== 'false';

		const {owner, repo} = github.context.repo;
		core.info(`Running for ${owner} / ${repo}`);

		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - daysUntilClose);
		core.info(`Looking for issues older than ${cutoffDate.toISOString()}.`);

		const client = github.getOctokit(token).rest;
		const issues = await client.issues.listForRepo({owner, repo});
		const outstandingIssues = issues.data.filter(e => e.labels.some(l => l.name === triggerLabel)).filter(e => e.updated_at < cutoffDate.toISOString());
		core.info(`Found ${outstandingIssues.length} outstanding issues to be closed.`);

		const promises = outstandingIssues.map(async e => {
			core.info(`Will close issue ${e.number}`);
			if (dryRun) {
				core.info('Skipping because of dry-run=true.');
				return;
			}
			await client.issues.createComment({
				owner,
				repo,
				// eslint-disable-next-line camelcase
				issue_number: e.number,
				body: closingComment,
			});
			await client.issues.update({
				owner,
				repo,
				// eslint-disable-next-line camelcase
				issue_number: e.number,
				state: 'closed',
			});
		});
		await Promise.all(promises);
	} catch (error) {
		core.error(error.message);
		core.setFailed(error.message);
	}
}

run();
