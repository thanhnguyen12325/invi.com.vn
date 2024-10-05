(function () {
    var dynamicLoading = {
        css: function (path) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function (path, callback, onFailed) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            script.async = false
            script.onload = script.onreadystatechange = function () {
                callback && callback()
            };
            if (onFailed && typeof (onFailed) == "function") {
                script.onerror = onFailed;
            }
            head.appendChild(script);
        },
        type: 'template',
        time: '1717732938'
    }

    dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/html5_templates/js/deString.js?1717732938');
    dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/html5_templates/js/jquery-3.5.1.min.js')
    dynamicLoading.css('https://static.fliphtml5.com/resourceFiles/html5_templates/template/Popular/style/style.css?1717732938')
    dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/html5_templates/template/Popular/javascript/book.min.js?1717732938')

    var time = new Date().getTime()
    var pageEditorJs = './files/pageEditor.js?' + time;
    var editorTextSvgConfigJs = './files/textSvgConfig.js?' + time;
    var indexEditorAppCss = 'https://static.fliphtml5.com/resourceFiles/yzReader/templates/Slide/css/app.css';
    var indexEditorChunkVendorsCss = 'https://static.fliphtml5.com/resourceFiles/yzReader/templates/Slide/css/chunk-vendors.css';
    var indexEditorAppJs = 'https://static.fliphtml5.com/resourceFiles/yzReader/templates/Slide/js/app.js';
    var indexEditorChunkVendorsJs = 'https://static.fliphtml5.com/resourceFiles/yzReader/templates/Slide/js/chunk-vendors.js';

    window.website_domian_wc = 'https://fliphtml5.com';
    var loadPageEditorJs = true;
    if(typeof htmlConfig != 'undefined' && typeof htmlConfig['fileExist'] != 'undefined' && typeof htmlConfig['fileExist']['pageEditor'] != 'undefined') {
        loadPageEditorJs = htmlConfig['fileExist']['pageEditor'] == 1 ? true : false;
    }
    if(loadPageEditorJs) {
        dynamicLoading.js(pageEditorJs, function () {
            window.readerConfigLoaded = true;
            if (window.readerConfig &&
                window.readerConfig.pages.length > 0
            ) {
                dynamicLoading.css(indexEditorAppCss)
                dynamicLoading.css(indexEditorChunkVendorsCss)
                dynamicLoading.js(editorTextSvgConfigJs)
                dynamicLoading.js(indexEditorAppJs)
                dynamicLoading.js(indexEditorChunkVendorsJs)
            }
        }, function () {
            window.readerConfigLoaded = true;
        })
    } else {
        window.readerConfigLoaded = true;
    }

    if (window.htmlConfig && window.htmlConfig.pageEditor) window.pageEditor = window.htmlConfig.pageEditor;
    window.pageEditorUrl = 'https://static.fliphtml5.com/resourceFiles/html5_templates/js/pageItems.min.js?1717732938';
    if (window.pageEditor &&
        ((!pageEditor.pageAnnos && pageEditor.length > 0) ||
            (pageEditor.pageAnnos && pageEditor.pageAnnos.length > 0))) {
        dynamicLoading.js(pageEditorUrl)
    }
    window.pageEditorUrl = null;

    window.pageSliderUrl = 'https://static.fliphtml5.com/resourceFiles/js/flipHtml5.hiSlider2.min.js';
    window.pageSliderCssUrl = 'https://static.fliphtml5.com/resourceFiles/css/hiSlider2.min.css';
    if (window.sliderJS &&
        window.sliderJS.length > 0) {
        dynamicLoading.js(pageSliderUrl)
        dynamicLoading.css(pageSliderCssUrl)
    }
    window.pageSliderUrl = null;


    // window.pageSliderUrl = 'https://static.fliphtml5.com/resourceFiles/html5_templates/js/LoadSlider.js?1717732938';
    // if (window.sliderJS &&
    //     window.sliderJS.length > 0) {
    //     dynamicLoading.js(pageSliderUrl)
    // }
    // window.pageSliderUrl = null;

    dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/html5_templates/template/Popular/javascript/main.min.js?1717732938')

    var loadPlugin = true;
    if(typeof htmlConfig != 'undefined' && typeof htmlConfig['fileExist'] != 'undefined' && typeof htmlConfig['fileExist']['plugin'] != 'undefined') {
        loadPlugin = htmlConfig['fileExist']['plugin'] == 1 ? true : false;
    }
    var interval = window.setInterval(function () {
        if (!window.bookConfig) return;

        window.clearInterval(interval);
        dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/js/encryption/encryption.min.js?1717732938')
        if(loadPlugin) {
            dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/js/plugin.js?1717732938')
        }
        dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/js/statistic.js?1717732938')
        dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/js/writeLog.js?1717732938')
        dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/js/visitinfo.js?1717732938')
        dynamicLoading.js('https://static.fliphtml5.com/resourceFiles/js/FlipBookPlugins.min.js')
    }, 100);
})();