import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()
  const name = formData.get('name')?.toString()

  if (!name) {
    return new Response('Name is required', { status: 400 })
  }

  const { error } = await supabase.auth.updateUser({
    data: { display_name: name },
  })

  if (error) {
    return new Response(error.message, { status: 500 })
  }

  return redirect('/signin')
}
