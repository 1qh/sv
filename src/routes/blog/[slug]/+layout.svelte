<script>
    export let data
    import { A, Heading, Listgroup, ListgroupItem } from 'flowbite-svelte'
</script>

<div class="layout">
    <main>
        <slot />
    </main>

    <aside>
        <Heading tag="h5">More posts</Heading>
        <Listgroup>
            {#each data.summaries as { slug, title }}
                <ListgroupItem>
                    <A href="/blog/{slug}">{title}</A>
                </ListgroupItem>
            {/each}
        </Listgroup>
    </aside>
</div>

<style>
    @media (min-width: 640px) {
        .layout {
            display: grid;
            gap: 2em;
            grid-template-columns: 1fr 16em;
        }
    }
</style>
