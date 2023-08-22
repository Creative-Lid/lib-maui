import * as QueryString from 'query-string';

export const assembleLink = (
    params: Parameters<typeof QueryString.stringify>[0],
    baseUrl: string,
    linkText: string,
) => {
    const query = QueryString.stringify(params, { skipNull: true });
    return (
        <a
            href={baseUrl + (query && '?' + query)}
            target='_blank'
            rel='noreferrer'
        >
            {linkText}
        </a>
    );
};

export const createGridLink = (
    id: string,
    baseUrl: string,
    displayText: string,
) => {
    if (!id) return <span>{displayText}</span>;

    return <span>{assembleLink({}, baseUrl + id, displayText)}</span>;
};
