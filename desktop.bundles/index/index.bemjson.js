({
    block: 'b-page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block: 'i-bem',
            elem: 'i18n',
            keyset: 'test',
            key: 'lang'
        },

        { elem: 'js', url: '_index.js' }
    ]
})
