<script>
    let username = "jbcarreon123";
</script>

<div>
    {#await fetch(`https://status.cafe/users/${username}/status.json`)}
        <p>Loading status...</p>
    {:then out}
        {#await out.json()}
            <p>Loading status...</p>
        {:then status}
            <p><a href="https://status.cafe/users/{username}"
                >{status.author}</a
            >: {status.face} ({status.timeAgo})</p>
            <p>{status.content}</p>
        {/await}
    {:catch err}
        <p>Error occured. {err}</p>
    {/await}
</div>
