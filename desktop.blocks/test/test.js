modules.define('i-bem__dom', function(provide, BEMDOM) {
    BEMDOM.decl('test', {
        onSetMod: {
            'js': {
                'inited': function() {
                    console.log(BEM.I18N('test', 'lang'));
                }
            }
        }
    });
})
