'use server'

import { unstable_cache } from 'next/cache'
import { supabase } from 'lib/supabaseClient'
import { FETCH_REVALIDATE } from 'utils/config.global'

export const getHTMLPage = async (name) => {
  if (!name) {
    return { error: 'Name is required' }
  }

  try {
    const { data: page, error } = await supabase
      .from('system_language')
      .select('*')
      .eq('name', name)
      .is('deleted_at', null)
      .single()

    if (error) {
      return { error: error?.message }
    }

    if (!page) {
      return { error: `${error?.message} with name '${name}' not found` }
    }

    return { data: page, error: null }
  } catch (error) {
    return {
      error,
    }
  }
}

export const getPage = unstable_cache(
  async (name) => await getHTMLPage(name),
  ['getHTMLPage'],
  {
    revalidate: FETCH_REVALIDATE,
  }
)
