export interface GithubFormData {
	personal_access_token: string;
	organization: string;
	repository: string;
	label: string;
}

export interface GithubResponse {
	html_url: string;
	title: string;
	merged_at: string;
	merge_commit_sha: string;
	login: string | null;
}
