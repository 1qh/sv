import * as db from '$lib/server/database.js'
import { fail } from '@sveltejs/kit'

export function load({ cookies }) {
    const id = cookies.get('userid')

    if (!id) {
        cookies.set('userid', crypto.randomUUID(), { path: '/' })
    }

    return {
        todos: db.getTodos(id) ?? []
    }
}

export const actions = {
    create: async ({ cookies, request }) => {
        await new Promise(fulfil => setTimeout(fulfil, 200))

        const data = await request.formData()

        try {
            db.createTodo(cookies.get('userid'), data.get('description'))
        } catch (error) {
            return fail(422, {
                description: data.get('description'),
                error: error.message
            })
        }
    },

    delete: async ({ cookies, request }) => {
        await new Promise(fulfil => setTimeout(fulfil, 200))

        const data = await request.formData()
        db.deleteTodo(cookies.get('userid'), data.get('id'))
    }
}
