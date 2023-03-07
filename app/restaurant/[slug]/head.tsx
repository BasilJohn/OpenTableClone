export default function Head({params}:{params:{slug:string}}) {
    return (
        <>
            <title>{params.slug.toUpperCase()}</title>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <meta name="description" content="Generated" />
        </>
    )
}