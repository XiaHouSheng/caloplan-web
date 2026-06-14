import markdownit from 'markdown-it'

export const markdown = markdownit(
    {
        html: false,
        linkify: true,
        typographer: true,
    }
)

