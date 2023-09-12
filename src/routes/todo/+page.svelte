<script lang="ts">
    import { enhance } from '$app/forms'
    import { Alert, Button, FloatingLabelInput, Listgroup, ListgroupItem } from 'flowbite-svelte'
    export let data
    export let form

    let creating = false
    let deleting: any[] = []
</script>

<div class="w-96">
    <form
        method="POST"
        action="?/create"
        use:enhance={() => {
            creating = true

            return async ({ update }) => {
                await update()
                creating = false
            }
        }}
    >
        <FloatingLabelInput
            style="outlined"
            label={creating ? 'saving...' : 'New todo'}
            disabled={creating}
            name="description"
            value={form?.description ?? ''}
            required
        />
    </form>
    <Listgroup>
        {#each data.todos.filter(todo => !deleting.includes(todo.id)) as todo (todo.id)}
            <ListgroupItem>
                <form
                    method="POST"
                    action="?/delete"
                    use:enhance={() => {
                        deleting = [...deleting, todo.id]
                        return async ({ update }) => {
                            await update()
                            deleting = deleting.filter(id => id !== todo.id)
                        }
                    }}
                >
                    <Button type="hidden" name="id" value={todo.id}>✔</Button>
                    {todo.description}
                </form>
            </ListgroupItem>
        {/each}
    </Listgroup>
    {#if form?.error}
        <Alert dismissable>
            {form.error}
        </Alert>
    {/if}
</div>
