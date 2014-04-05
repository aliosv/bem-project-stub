module.exports = function(config) {
    config.node('desktop.bundles/index');

    config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
        nodeConfig.setLanguages(['ru', 'en']);
        nodeConfig.addTechs([
            new (require('enb/techs/file-provider'))({ target: '?.bemjson.js' }),
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/files'))(),

            // BEMDECL
            new (require('enb/techs/bemdecl-from-bemjson'))(),

            // DEPS
            new (require('enb-modules/techs/deps-with-modules')),

            // CSS
            // TODO: roole urls bug(example: blocks form bem-components)
            [ require('enb-roole/techs/css-roole'), { target: '?.roo' } ],
            new (require('enb-autoprefixer/techs/css-autoprefixer'))({
                sourceTarget: "?.roo",
                destTarget: "?.css",
                browserSupport: ['last 2 versions']
            }),

            // KEYSETS
            [ require("enb/techs/i18n-merge-keysets"), { lang: "all" }],
            [ require("enb/techs/i18n-merge-keysets"), { lang: "{lang}" }],

            // LANG
            [ require("enb/techs/i18n-lang-js"), { lang: "all" } ],
            [ require("enb/techs/i18n-lang-js"), { lang: "{lang}" } ],

            // JS
            new (require('enb-diverse-js/techs/vanilla-js'))(),
            new (require('enb-diverse-js/techs/node-js'))(),
            new (require('enb-diverse-js/techs/browser-js'))(),
            // add module system js to browser.js
            // TODO: not working modules.define({ block: ... })
            new (require('enb-modules/techs/prepend-modules'))({ source: '?.browser.js' }),
            // add i18n to js
            // TODO: use use SourceFilename instead useFileList
            [ require('../.bem/techs/js-i18n'), { lang: '{lang}' } ],

            // BEMHTML
            new (require('enb-bemxjst/techs/bemhtml'))(),

            // HTML
            // TODO: i18n not work
            [ require('enb/techs/html-from-bemjson-i18n'), { destTarget: '?.{lang}.html' } ]
        ]);
        nodeConfig.addTargets([
            '_?.css',
            '_?.{lang}.js',
            '?.{lang}.html'
        ]);
    });

    config.mode('development', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/file-copy'), { sourceTarget: '?.{lang}.js', destTarget: '_?.{lang}.js' }],
                [require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '_?.css' }]
            ]);
        });
    });
    config.mode('production', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/borschik'), { sourceTarget: '?.{lang}.js', destTarget: '_?.{lang}.js' }],
                [require('enb/techs/borschik'), { sourceTarget: '?.css', destTarget: '_?.css' }]
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'libs/bem-core/common.blocks',
        'libs/bem-core/desktop.blocks',
        'libs/bem-components/common.blocks',
        'libs/bem-components/desktop.blocks',
        'libs/bem-components/design/common.blocks',
        'libs/bem-components/design/desktop.blocks',

        'common.blocks',
        'desktop.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
