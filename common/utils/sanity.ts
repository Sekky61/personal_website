export async function getSanityContent({ query, variables = {} }: any) {
    let url = new URL(process.env.SANITY_GRAPHQL_URL);
    const { data } = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        },
    ).then((response) => response.json());

    // todo errors
    return data;
}