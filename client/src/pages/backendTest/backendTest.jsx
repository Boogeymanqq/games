export function BackendTest() {
    return (
        <form action="/upload" method="post" encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Send</button>
        </form>
    )
}