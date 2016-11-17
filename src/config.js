var config = {};

config.slagthuset = {
    url: 'http://slagthus.se/konferens-och-massor/',
    mapUrl: 'https://www.google.se/maps/place/Slagthuset+-+Malm%C3%B6s+N%C3%B6jeshj%C3%A4rta/@55.6116284,12.9997225,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3fa2f70759b:0x497ccf7efb2b204f!8m2!3d55.6116284!4d13.0019112',
    scraperSelector: '.menu-hide .col-lg-6.menu-box',
    name: 'Slagthuset'
};

config.meck = {
    url: 'http://meckok.se/lunch/',
    mapUrl: 'https://www.google.se/maps/place/Restaurang+M.E.C.K./@55.612262,12.9895263,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a4079f592acd:0x33fae3be661b5707!8m2!3d55.612262!4d12.991715',
    scraperSelector: '#veckanslunch article',
    name: 'M.E.C.K'
};

config.miamarias = {
    url: 'http://www.miamarias.nu/',
    mapUrl: 'https://www.google.se/maps/place/MiaMarias/@55.6120552,12.9920197,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3f87c3eb4c3:0x12b496ca4a390642!8m2!3d55.6120552!4d12.9942084',
    scraperSelector: '.et-tabs-content',
    name: 'MiaMarias'
};

config.valfarden = {
    url: 'http://valfarden.nu/?page_id=14',
    mapUrl: 'https://www.google.se/maps/place/V%C3%A4lf%C3%A4rden/@55.6112911,12.9921112,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3f8852b72df:0x5f5a2569dfadc0bb!8m2!3d55.6112911!4d12.9942999',
    scraperSelector: '.single_inside_content p',
    name: 'Välfärden'
};

config.kolga = {
    url: 'https://gastrogate.com/restaurang/kolga/page/3/',
    mapUrl: 'https://www.google.se/maps/place/Restaurang+Kolga/@55.6122865,12.9959882,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3f98c0ad0d7:0x250938a76d7b8d83!8m2!3d55.6122865!4d12.9981769',
    scraperSelector: '.table.lunch_menu',
    name: 'Kolga'
};

config.akvariet = {
    url: 'http://akvariet-malmo.se/dagens-lunch/',
    mapUrl: 'https://www.google.se/maps/place/Akvariet+Event+%26+Konferens/@55.6143222,12.9874215,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a4063109dd1f:0x6d5e826034d4df3b!8m2!3d55.6143222!4d12.9896102',
    scraperSelector: '.enigma_blog_post_content',
    name: 'Akvariet'
};

config.glasklart = {
    url: 'http://glasklart.eu/lunch/',
    mapUrl: 'https://www.google.se/maps/place/Glasklart/@55.6150564,12.9882601,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a4062a8ec867:0x8f3ef24048062845!8m2!3d55.6150564!4d12.9904488',
    scraperSelector: '.lunch-entries.lunch-entries-r.entriesv.lunch-entry-v1',
    name: 'Glasklart'
};

config.saltimporten = {
    url: 'http://www.saltimporten.com/',
    mapUrl: 'https://www.google.se/maps/place/Saltimporten+Canteen/@55.6161109,12.9948041,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3f7c17d36c7:0x293a371cd61f5451!8m2!3d55.6161109!4d12.9969928',
    scraperSelector: 'ul.list-unstyled',
    name: 'Saltimporten'
};

config.plectrum = {
    url: 'http://plectrum.se/malmo/?page_id=47',
    mapUrl: 'https://www.google.se/maps/place/Plectrum+Malm%C3%B6/@55.6109046,12.9987159,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3fa329d3a63:0x3ee9016dd2b109f!8m2!3d55.6109046!4d13.0009046',
    scraperSelector: '.post-content',
    name: 'Plectrum'
};

config.restaurangP2 = {
    url: 'http://restaurangp2.se/lunch',
    mapUrl: 'https://www.google.se/maps/place/P2/@55.6143877,12.9863253,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a406322f8f6d:0x3f46ec084eaf7219!8m2!3d55.6143877!4d12.988514',
    scraperSelector: '.main_content_menu',
    name: 'Restaurang P2'
};

module.exports = config;