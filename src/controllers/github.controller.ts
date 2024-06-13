import axios from 'axios';

import { GithubFormData } from '@/interfaces/github.interface';

export const getMergePullRequest = async (payload: GithubFormData) => {
	const config = {
		url: '/api/github',
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		data: payload,
	};

	const result = await axios(config);

	return result.data;
};
