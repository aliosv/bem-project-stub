({
    block: 'page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block : 'test',
            js : true,
            content : {
                block : 'i-bem',
                elem : 'i18n',
                keyset : 'test',
                key : 'lang'
            }
        },

        {
            block : 'spin',
            mods : {
                theme : 'normal',
                size: 'xs'
            }
        },

//        { elem: 'js', elemMods: { i18n: true }, url: '_index.js' }
        { elem: 'js', url: '_index.en.js' }
    ]
})
