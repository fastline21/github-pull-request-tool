'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';

import { GithubFormData, GithubResponse } from '@/interfaces/github.interface';

import { getMergePullRequest } from '@/controllers/github.controller';
import { Key } from 'react';

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE;

const Home = () => {
	const githubDefaultFormData = {
		personal_access_token: '',
		organization: '',
		repository: '',
		label: '',
	};

	const GithubForm = useForm<GithubFormData>({
		defaultValues: githubDefaultFormData,
	});

	const GithubMutation = useMutation({
		mutationFn: (event: GithubFormData) => {
			return getMergePullRequest(event);
		},
		onSuccess: (res) => {
			console.log(res.data);
		},
	});

	const onSubmit = (event: GithubFormData) => {
		GithubMutation.mutate(event);
	};

	if (GithubMutation.isPending) {
		return <p className='mt-3 ml-3'>Loading...</p>;
	}

	return (
		<div className='text-center p-5'>
			<div>
				<h1 className='text-2xl'>{siteTitle}</h1>
			</div>
			<div className='my-5'>
				<form onSubmit={GithubForm.handleSubmit(onSubmit)}>
					<div className='mt-5'>
						<label htmlFor='' className='block'>
							Personal Access Token
						</label>
						<input
							type='text'
							{...GithubForm.register('personal_access_token', {
								required: 'Personal Access Token is required',
							})}
							className='border'
						/>
					</div>
					<div className='mt-5'>
						<label htmlFor='' className='block'>
							Organization
						</label>
						<input
							type='text'
							{...GithubForm.register('organization')}
							className='border'
						/>
					</div>
					<div className='mt-5'>
						<label htmlFor='' className='block'>
							Repository
						</label>
						<input
							type='text'
							{...GithubForm.register('repository', {
								required: 'Repository is required',
							})}
							className='border'
						/>
					</div>
					<div className='mt-5'>
						<label htmlFor='' className='block'>
							Label
						</label>
						<input
							type='text'
							{...GithubForm.register('label')}
							className='border'
						/>
					</div>
					<div className='mt-5'>
						<button
							type='submit'
							className='p-2 bg-blue-500 text-white'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			{GithubMutation.data && (
				<div className='mx-5'>
					{GithubMutation.data.data.pr_count > 0 ? (
						<table className='table-auto border'>
							<thead>
								<tr>
									<th>#</th>
									<th>Title</th>
									<th>Merge Date</th>
									<th>URL</th>
									<th>User</th>
									<th>Merge Commit</th>
								</tr>
							</thead>
							<tbody className='text-center align-top'>
								{GithubMutation.data.data.pr.map(
									(element: GithubResponse, index: Key) => (
										<tr key={index}>
											<td className='border-b p-4'>
												{Number(index) + 1}
											</td>
											<td className='border-b p-4'>
												{element.title}
											</td>
											<td className='border-b p-4'>
												{element.merged_at}
											</td>
											<td className='border-b p-4'>
												<NextLink
													href={element.html_url}
													target='_blank'
												>
													{element.html_url}
												</NextLink>
											</td>
											<td className='border-b p-4'>
												{element.login}
											</td>
											<td className='border-b p-4'>
												{element.merge_commit_sha}
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					) : (
						<p>No Merge Pull Request Found</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Home;
