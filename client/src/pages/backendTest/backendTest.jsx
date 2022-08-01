export function BackendTest() {
    return (
        <form action="/upload" method="POST" encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Send</button>
        </form>
    )
}