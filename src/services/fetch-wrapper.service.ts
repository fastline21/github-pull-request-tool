import axios from 'axios';

const fetchWrapperService = async ({
    method = 'get',
    url,
    headers,
    data,
    accessToken,
}: {
    method?: string;
    url: string;
    headers?: object;
    data?: object;
    accessToken: string;
}) => {
    const config = {
        method,
        url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...headers,
        },
        data,
    };
    const result = await axios(config);
    return result.data;
};

export default fetchWrapperService;
