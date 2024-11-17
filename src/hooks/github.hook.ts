import fetchWrapperService from '@/services/fetch-wrapper.service';

export const getGithubPR = async ({ payload }) => {
    const result = await fetchWrapperService({
        url: '/api/github',
        accessToken: '',
        method: 'post',
        data: payload
    });

    return result;
};
