var config = {};

config.slagthuset = {
    url: 'http://slagthusetmmx.se/konferens-och-massor/',
    mapUrl: 'https://www.google.se/maps/place/K%C3%B6ket+Hemma+Hos+Oss/@55.6109089,13.0009985,18.75z/data=!4m12!1m6!3m5!1s0x4653a359e6044aef:0x7ef5846d43d9e5d!2sSlagthuset+MMX!8m2!3d55.6109945!4d13.0032367!3m4!1s0x4653a3fa31e557ef:0x35bb638a67554565!8m2!3d55.61138!4d13.0026586',
    scraperSelector: '.menu-hide .col-lg-6.menu-box',
    name: 'Slagthuset'
};

config.storavarvsgatan = {
    url: 'http://storavarvsgatan6.se/projects.html',
    mapUrl: 'https://www.google.se/maps/place/Media+Evolution/@55.6124811,12.9912092,18.82z/data=!4m13!1m7!3m6!1s0x4653a4079f7b933b:0x14136ff54618c5d4!2sStora+Varvsgatan+6A,+211+19+Malm%C3%B6!3b1!8m2!3d55.6123845!4d12.9915055!3m4!1s0x4653a3f88fcb575b:0x283b008711377c95!8m2!3d55.6123507!4d12.9917146',
    scraperSelector: '.self.mobile-leaf.text.textnormal',
    name: 'Stora Varvsgatan 6A'
};

config.miamarias = {
    url: 'http://www.miamarias.nu/',
    mapUrl: 'https://www.google.se/maps/place/MiaMarias/@55.6120552,12.9920197,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3f87c3eb4c3:0x12b496ca4a390642!8m2!3d55.6120552!4d12.9942084',
    scraperSelector: '.et_pb_row.et_pb_row_2',
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
    scraperSelector: '.alacarte_dish',
    name: 'Akvariet'
};

config.glasklart = {
    url: 'https://glasklart.eu/sv/lunch/',
    mapUrl: 'https://www.google.se/maps/place/Glasklart/@55.6150564,12.9882601,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a4062a8ec867:0x8f3ef24048062845!8m2!3d55.6150564!4d12.9904488',
    scraperSelector: '#glasklartlunchwidget-2',
    name: 'Glasklart'
};

config.saltimporten = {
    url: 'http://www.saltimporten.com/',
    mapUrl: 'https://www.google.se/maps/place/Saltimporten+Canteen/@55.6161109,12.9948041,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a3f7c17d36c7:0x293a371cd61f5451!8m2!3d55.6161109!4d12.9969928',
    scraperSelector: 'ul.list-unstyled',
    name: 'Saltimporten'
};

config.restaurangP2 = {
    url: 'http://restaurangp2.se/lunch',
    mapUrl: 'https://www.google.se/maps/place/P2/@55.6143877,12.9863253,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a406322f8f6d:0x3f46ec084eaf7219!8m2!3d55.6143877!4d12.988514',
    scraperSelector: '.col-md-12',
    name: 'Restaurang P2'
};

module.exports = config;