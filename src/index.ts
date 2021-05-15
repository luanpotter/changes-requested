import core from '@actions/core';
import github from '@actions/github';

async function run(): Promise<void> {
	try {
		const daysUntilClose = parseInt(core.getInput('daysUntilClose'));
		const triggerLabel = core.getInput('triggerLabel');
		const closingComment = core.getInput('closingComment');

		core.info(`Variables: ${daysUntilClose} ${triggerLabel} ${closingComment} ${github}`);

		core.debug(new Date().toTimeString());
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
