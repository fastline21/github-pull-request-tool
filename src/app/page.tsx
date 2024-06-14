'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { format } from 'date-fns';

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
	});

	const onSubmit = (event: GithubFormData) => {
		GithubMutation.mutate(event);
	};

	return (
		<div className='container mx-auto p-5'>
			<div>
				<h1 className='text-5xl'>{siteTitle}</h1>
			</div>
			<div className='py-5'>
				<form onSubmit={GithubForm.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4'>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register(
									'personal_access_token',
									{
										required:
											'Personal Access Token is required',
									}
								)}
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Personal Access Token'
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('organization')}
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Organization'
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('repository', {
									required: 'Repository is required',
								})}
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Repository'
							/>
						</div>
						<div className='mt-5'>
							<input
								type='text'
								{...GithubForm.register('label')}
								className='border px-5 py-4 text-md rounded-md border-slate-400 block w-full'
								placeholder='Label'
							/>
						</div>
					</div>
					<div className='mt-5'>
						<button
							type='submit'
							className={`p-2 bg-blue-500 text-white w-full text-xl rounded-md px-5 py-4 ${
								GithubMutation.isPending && 'cursor-not-allowed'
							}`}
							disabled={GithubMutation.isPending}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			{GithubMutation.isPending && (
				<div className='border-t-2'>
					<p className='pt-5'>Loading...</p>
				</div>
			)}
			{GithubMutation.data && (
				<div className='border-t-2 pt-5'>
					<div>
						{GithubMutation.data.data.pr_count > 0 ? (
							<div className='bg-slate-100'>
								<table className='table-auto'>
									<thead className='bg-slate-300 text-neutral-700'>
										<tr>
											<th className='py-3'>#</th>
											<th className='py-3'>Title</th>
											<th className='py-3'>Merge Date</th>
											<th className='py-3'>URL</th>
											<th className='py-3'>User</th>
											<th className='py-3'>
												Merge Commit
											</th>
										</tr>
									</thead>
									<tbody className='text-center align-top'>
										{GithubMutation.data.data.pr.map(
											(
												element: GithubResponse,
												index: Key
											) => (
												<tr key={index}>
													<td className='p-4'>
														{Number(index) + 1}
													</td>
													<td className='p-4'>
														{element.title}
													</td>
													<td className='p-4'>
														{format(
															element.merged_at,
															'MM/dd/yyyy hh:mm:ss aa'
														)}
													</td>
													<td className='p-4'>
														<NextLink
															href={
																element.html_url
															}
															target='_blank'
															className='hover:underline'
														>
															{element.html_url}
														</NextLink>
													</td>
													<td className='p-4'>
														{element.login}
													</td>
													<td className='p-4'>
														{
															element.merge_commit_sha
														}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						) : (
							<p>No Merge Pull Request Found</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
