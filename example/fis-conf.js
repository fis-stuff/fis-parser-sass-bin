fis.match('*', {
    release: false
});

fis.match('test.scss', {
    parser: 'sass-bin',
    release: 'dist/$0',
    rExt: 'css'
});