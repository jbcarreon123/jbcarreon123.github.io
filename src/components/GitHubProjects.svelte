<script>
    async function loadRepos() {
        let repoResponse = await fetch(`https://api.github.com/users/jbcarreon123/repos?per_page=100`);

        if (!repoResponse.ok) throw new Error(`Recieved ${repoResponse.status} from GitHub. Please try again later.`)

        /** @type {any[]} */
        let repos = await repoResponse.json();
        repos = repos.concat(await loadReposWithFilter());

        repos.sort(function(a,b){
            return new Date(b.pushed_at) - new Date(a.pushed_at);
        });

        return repos;
    }

    async function loadReposWithFilter() {
        let repoResponse = await fetch(`https://api.github.com/users/indiefellas/repos`);
        /** @type {any[]} */
        let repos = await repoResponse.json();

        let indiefellas = [
            'astro-adapter-nekoweb',
            'svelte-adapter-nekoweb',
            'inaccessible',
            'nekoweb-api',
            'jAPI',
            'neko',
        ]

        repos = repos.filter((v) => indiefellas.includes(v.name));

        let repo2Response = await fetch(`https://api.github.com/users/Macro-Deck-App/repos`);
        /** @type {any[]} */
        let repos2 = await repo2Response.json();

        let macroDeck = [
            'Macro-Bot'
        ]

        repos2 = repos2.filter((v) => macroDeck.includes(v.name));
        repos = repos.concat(repos2);

        repos = repos.concat(await (await fetch(`https://api.github.com/users/liberation-dev/repos`)).json());
        repos = repos.concat(await (await fetch(`https://api.github.com/users/Y2DL/repos`)).json());
        repos = repos.concat(await (await fetch(`https://api.github.com/users/customWin/repos`)).json());

        return repos;
    }
</script>

{#await loadRepos()}
    <p>Loading repositories...</p>
{:then d} 
    {#if d}
        {#each d as data}
            {#if data.name !== ".github" && !data.fork && data.description && (data.topics.length == 0 || !data.topics.includes('wip'))}
            <a href={data.html_url}>
                <div class="projects-item">
                    <h2>{#if data.owner.login !== 'jbcarreon123'}<span class="user">{data.owner.login}/</span>{/if}{data.name}</h2>
                    <p>{data.description}</p>
                    <p class="small">{#if data.language}{data.language} -{/if} {data.stargazers_count} stars</p>
                </div>
            </a>
            {/if}
        {/each}
    {:else}
        <p>Cannot get repo data.</p>
    {/if}
{:catch error}
    <p>Cannot get repo data, {error}</p>
{/await}