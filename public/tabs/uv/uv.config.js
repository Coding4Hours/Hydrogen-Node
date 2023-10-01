self.__uv$config = {
    prefix: '/service/',
    bare: ['https://geoquiz.gq/bare/','https://uv.radon.games/', 'https://tomp.app/', 'https://uv.holyubofficial.net/bare1/', 'https://uv.holyubofficial.net/bare2/', 'https://uv.holyubofficial.net/bare3/', 'https://uv.holyubofficial.net/bare4/']
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js'
};