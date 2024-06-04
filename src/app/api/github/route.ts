import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

interface Label {
	name: string;
	url: string;
}

interface Data {
	url: string;
	labels: Label[];
	merged_at: string;
}

interface RequestPullRequest {
	data: Data[];
}

export const POST = async (request: NextRequest) => {
	try {
		const payload = await request.json();
		const {
			token,
			organization,
			repository,
			label,
			max_page: maxPage = 100,
		} = payload;

		const axiosInstance = axios.create({
			baseURL: 'https://api.github.com',
			headers: {
				Authorization: `token ${token}`,
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
			console.log('end pulling data');

			allPullRequests.push(...resultPullRequest.data);
			page++;
		} while (resultPullRequest.data.length === maxPage);

		const filterData = allPullRequests
			.filter((datum: { labels: Label[] }) =>
				datum.labels.some(
					(element: Label) => element.name === String(label)
				)
			)
			.map((element: Data) => {
				const { url, merged_at } = element;
				return {
					url,
					merged_at,
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
