import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') || '/dashboard'

  if (!code) {
    return new Response('No auth code provided', { status: 400 })
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return new Response(error.message, { status: 500 })
  }

  const { access_token, refresh_token } = data.session

  cookies.set('sb-access-token', access_token, {
    path: '/',
  })
  cookies.set('sb-refresh-token', refresh_token, {
    path: '/',
  })

  return redirect(next)
}
