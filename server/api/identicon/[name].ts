import * as jdenticon from 'jdenticon'

export default defineEventHandler(async (event) => {
  try {
    // Get name parameter from URL
    const name = getRouterParam(event, 'name')
    
    // Validate input
    if (!name || name.length > 100) {
      throw createError({
        statusCode: 400,
        message: 'Invalid input. Name must be between 1 and 100 characters.'
      })
    }

    // Get query parameters
    const query = getQuery(event)
    
    // Validate and sanitize size (between 16 and 1000)
    const size = Math.min(Math.max(parseInt(String(query.size)) || 200, 16), 1000)
    
    // Validate and sanitize padding (between 0 and 50)
    const padding = Math.min(Math.max(parseInt(String(query.padding)) || 0, 0), 50)

    // Generate SVG
    const svg = jdenticon.toSvg(name, size, padding)

    // Set response headers
    setResponseHeaders(event, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*'
    })

    return svg

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})