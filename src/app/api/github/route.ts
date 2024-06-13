import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

interface Assignee {
	login: string;
}
interface Label {
	name: string;
}

interface Data {
	html_url: string;
	labels: Label[];
	merged_at: string;
	merge_commit_sha: string;
	title: string;
	assignee: Assignee;
}

interface RequestPullRequest {
	data: Data[];
}

interface Payload {
	personal_access_token: string;
	organization: string;
	repository: string;
	label: string;
	max_page: number;
}

export const POST = async (request: NextRequest) => {
	try {
		const payload = await request.json();
		const {
			personal_access_token: personalAccessToken,
			organization,
			repository,
			label,
			max_page: maxPage = 100,
		} = payload as Payload;

		const axiosInstance = axios.create({
			baseURL: process.env.GITHUB_API_BASE_URL,
			headers: {
				Authorization: `token ${personalAccessToken}`,
			},
		});

		let resultPullRequest: RequestPullRequest;
		let allPullRequests: Data[] = [];
		let page = 1;

		do {
			console.log('page:', page);

			console.log('start pulling data');

			resultPullRequest = await axiosInstance.get(
				`repos/${organization}/${repository}/pulls`,
				{ params: { state: 'closed', per_page: maxPage, page } }
			);
			console.log('resultPullRequest:', resultPullRequest);

			console.log('end pulling data');

			allPullRequests.push(...resultPullRequest.data);
			page++;
		} while (resultPullRequest.data.length === maxPage);

		const filterData = allPullRequests
			.filter((datum: { labels: Label[] }) =>
				datum.labels.some((element: Label) => element.name === label)
			)
			.map((element: Data) => {
				const {
					html_url,
					merged_at,
					merge_commit_sha,
					title,
					assignee,
				} = element;

				const { login } = assignee || { login: null };

				return {
					html_url,
					title,
					merged_at,
					merge_commit_sha,
					login,
				};
			})
			.sort((a, b) => {
				return (
					new Date(a.merged_at).getTime() -
					new Date(b.merged_at).getTime()
				);
			});

		return NextResponse.json(
			{
				data: {
					organization,
					repository,
					pr: filterData,
					pr_count: filterData.length,
					total_page: page,
				},
				status: StatusCodes.OK,
				message: getReasonPhrase(StatusCodes.OK),
			},
			{ status: StatusCodes.OK }
		);
	} catch (error) {
		console.error('Error:', error);

		return NextResponse.json(
			{
				data: null,
				status: StatusCodes.INTERNAL_SERVER_ERROR,
				message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			},
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
};
