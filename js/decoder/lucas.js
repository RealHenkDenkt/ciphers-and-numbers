let LucasManager = function () {

}

LucasManager.prototype.isLucas = function (n) {
    n = parseInt(n);
    for (let i = 1; i <= n; i++) {
        let lucas = this.getNthLucas(i);

        if (lucas === n) {
            return i;
        }
    }
    return 0;
}

LucasManager.prototype.isLucasNumber = function (number) {
    return LUCAS.indexOf(parseInt(number)) > -1;
}

LucasManager.prototype.getIndex = function (number) {
    return LUCAS.indexOf(number);
}
LucasManager.prototype.getNthLucas = function (n) {
    if (n < 113) return LUCAS[(n-1)]
}

const LUCAS = [
    2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, 199, 322, 521, 843, 1364, ,2207, 3571, 5778, 9349, 15127, 24476, 39603, 64079, 103682,
    167761, 271443, 439204, 710647, 1149851, 1860498, 3010349, 4870847, 7881196, 12752043, 20633239, 33385282, 54018521, 87403803,
    141422324, 228826127, 370248451, 599074578, 969323029, 1568397607, 2537720636, 4106118243, 6643838879, 10749957122, 17393796001, 28143753123,
    45537549124, 73681302247, 119218851371, 192900153618, 312119004989, 505019158607, 817138163596, 1322157322203, 2139295485799, 3461452808002,
    5600748293801, 9062201101803, 14662949395604, 23725150497407, 38388099893011, 62113250390418, 100501350283429, 162614600673847, 263115950957276,
    425730551631123, 688846502588399, 1114577054219522, 1803423556807921, 2918000611027443, 4721424167835364, 7639424778862807, 12360848946698171,
    20000273725560978, 32361122672259149,52361396397820127, 84722519070079276, 137083915467899403, 221806434537978679, 358890350005878082, 580696784543856761,
    939587134549734843, 1520283919093591604, 2459871053643326447, 3980154972736918051, 6440026026380244498, 10420180999117162549, 16860207025497407047,
    27280388024614569596, 44140595050111976643, 71420983074726546239, 115561578124838522882, 186982561199565069121, 302544139324403592003, 489526700523968661124,
    792070839848372253127, 1281597540372340914251, 2073668380220713167378, 3355265920593054081629, 5428934300813767249007, 8784200221406821330636, 14213134522220588579643,
    22997334743627409910279, 37210469265847998489922, 60207804009475408400201, 97418273275323406890123, 157626077284798815290324];
/*
 255044350560122222180447 = 223 x 449 x 2207 x 1154149773784223
 412670427844921037470771
 667714778405043259651218 = 2 x 32 x 227 x 26449 x 29134601 x 212067587
 1080385206249964297121989 = 11 x 139 x 461 x 1151 x 5981 x 324301 x 686551
 1748099984655007556773207 = 7 x 299281 x 834428410879506721
 2828485190904971853895196 = 22 x 19 x 79 x 521 x 859 x 1052645985555841
 4576585175559979410668403 = 3 x 15247723 x 100049587197598387
 7405070366464951264563599 = 29 x 239 x 3571 x 10711 x 27932732439809
 11981655542024930675232002 = 2 x 47 x 1103 x 1601 x 3041 x 23735900452321
 19386725908489881939795601 = 199 x 97420733208491869044199
 31368381450514812615027603 = 3 x 19763 x 21291929 x 24848660119363
 50755107359004694554823204 = 22 x 4767481 x 370248451 x 7188487771
 82123488809519507169850807 = 7 x 743 x 467729 x 33758740830460183
 132878596168524201724674011 = 11 x 101 x 151 x 251 x 112128001 x 28143378001
 215002084978043708894524818 = 2 x 33 x 83 x 107 x 281 x 1427 x 1461601 x 764940961
 347880681146567910619198829 = 509 x 5081 x 487681 x 13822681 x 19954241
 562882766124611619513723647 = 119809 x 4698167634523379875583
 910763447271179530132922476 = 22 x 6709 x 144481 x 308311 x 761882591401
 1473646213395791149646646123 = 3 x 41 x 3121 x 90481 x 42426476041450801
 2384409660666970679779568599 = 1049 x 414988698461 x 5477332620091
 3858055874062761829426214722 = 2 x 7 x 23 x 263 x 881 x 967 x 5281 x 66529 x 152204449
 6242465534729732509205783321 = 29 x 9349 x 10694421739 x 2152958650459
 10100521408792494338631998043 = 3 x 6163 x 201912469249 x 2705622682163
 16342986943522226847837781364 = 22 x 11 x 19 x 31 x 181 x 271 x 541 x 811 x 5779 x 42391 x 119611
 26443508352314721186469779407 = 47 x 562627837283291940137654881
 42786495295836948034307560771 = 541721291 x 78982487870939058281
 69230003648151669220777340178 = 2 x 32 x 4969 x 16561 x 162563 x 275449 x 1043766587
 112016498943988617255084900949 = 30859 x 253279129 x 14331800109223159
 181246502592140286475862241127 = 72 x 2161 x 14503 x 118021448662479038881
 293263001536128903730947142076 = 22 x 79099591 x 6643838879 x 139509555271
 474509504128269190206809383203 = 3 x 283 x 569 x 2820403 x 9799987 x 35537616083
 767772505664398093937756525279 = 199 x 521 x 1957099 x 2120119 x 1784714380021
 1242282009792667284144565908482 = 2 x 769 x 2207 x 3167 x 115561578124838522881
 2010054515457065378082322433761 = 11 x 59 x 19489 x 120196353941 x 1322154751061
 3252336525249732662226888342243 = 3 x 29201 x 37125857850184727260788881
 5262391040706798040309210776004 = 22 x 29 x 211 x 65269 x 620929 x 8844991 x 599786069
 8514727565956530702536099118247 = 7 x 10661921 x 114087288048701953998401
 13777118606663328742845309894251 = 952111 x 4434539 x 3263039535803245519
 22291846172619859445381409012498 = 2 x 32 x 41 x 401 x 601 x 2521 x 570601 x 87129547172401
 36068964779283188188226718906749 = 1511 x 109734721 x 217533000184835774779
 58360810951903047633608127919247 = 47 x 562766385967 x 2206456200865197103
 94429775731186235821834846825996 = 22 x 19 x 919 x 3469 x 3571 x 13159 x 8293976826829399
 152790586683089283455442974745243 = 3 x 43 x 281 x 307 x 15252467 x 900164950225760603
 247220362414275519277277821571239 = 11 x 311 x 3010349 x 29138888651 x 823837075741
 400010949097364802732720796316482 = 2 x 7 x 23 x 103 x 1249 x 102193207 x 94491842183551489
 647231311511640322009998617887721 = 39980051 x 16188856575286517818849171
 1047242260609005124742719414204203 = 3 x 21803 x 5924683 x 14629892449 x 184715524801
 1694473572120645446752718032091924 = 22 x 785461 x 119218851371 x 4523819299182451
 2741715832729650571495437446296127 = 641 x 1087 x 4481 x 878132240443974874201601
 4436189404850296018248155478388051 = 29 x 139 x 461 x 1289 x 1917511 x 965840862268529759
    7177905237579946589743592924684178 = 2 x 35 x 107 x 11128427 x 1828620361 x 6782976947987
    11614094642430242607991748403072229 = 1043201 x 6601501 x 1686454671192230445929
    18791999880010189197735341327756407 = 7 x 2684571411430027028247905903965201
    30406094522440431805727089730828636 = 22 x 112 x 31 x 199 x 331 x 9901 x 39161 x 51164521 x 1550853481
    49198094402450621003462431058585043 = 3 x 6464041 x 245329617161 x 10341247759646081
    79604188924891052809189520789413679 = 766531 x 103849927693584542320127327909
    128802283327341673812651951847998722 = 2 x 47 x 1103 x 10745088481 x 115613939510481515041
    208406472252232726621841472637412401 = 521 x 596107814364089 x 671040394220849329
    337208755579574400434493424485411123 = 3 x 41 x 67 x 1361 x 40801 x 63443 x 11614654211954032961
    545615227831807127056334897122823524 = 22 x 192 x 229 x 9349 x 95419 x 162451 x 1617661 x 7038398989
    882823983411381527490828321608234647 = 7 x 126117711915911646784404045944033521
    1428439211243188654547163218731058171 = 78889 x 6248069 x 16923049609 x 171246170261359
    2311263194654570182037991540339292818 = 2 x 32 x 347 x 97787 x 528295667 x 1270083883 x 5639710969
    3739702405897758836585154759070350989 = 11 x 29 x 71 x 101 x 151 x 911 x 54601 x 560701 x 7517651 x 51636551
    6050965600552329018623146299409643807 = 1409 x 2207 x 6086461133983 x 319702847642258783
    9790668006450087855208301058479994796 = 22 x 709 x 8969 x 336419 x 10884439 x 105117617351706859
    15841633607002416873831447357889638603 = 3 x 5280544535667472291277149119296546201
    25632301613452504729039748416369633399 = 359 x 1066737847220321 x 66932254279484647441
    41473935220454921602871195774259272002 = 2 x 7 x 23 x 241 x 2161 x 8641 x 20641 x 103681 x 13373763765986881
    67106236833907426331910944190628905401 = 97379 x 21373261504197751 x 32242356485644069
    108580172054362347934782139964888177403 = 3 x 281 x 90481 x 232961 x 6110578634294886534808481
    175686408888269774266693084155517082804 = 22 x 14686239709 x 5600748293801 x 533975715909289
    284266580942632122201475224120405260207 = 47 x 367 x 37309023160481 x 441720958100381917103
    459952989830901896468168308275922343011 = 11 x 54018521 x 265272771839851 x 2918000731816531
    744219570773534018669643532396327603218 = 2 x 32 x 15917507 x 3020733700601 x 859886421593527043
    1204172560604435915137811840672249946229 = 199 x 1871 x 3571 x 905674234408506526265097390431
    1948392131377969933807455373068577549447 = 7 x 18049 x 100769 x 153037630649666194962091443041
    3152564691982405848945267213740827495676 = 22 x 19 x 29 x 211 x 379 x 1009 x 5779 x 31249 x 85429 x 912871 x 1258740001
    5100956823360375782752722586809405045123 = 3 x 41 x 2281 x 4561 x 29134601 x 782747561 x 174795553490801
    8253521515342781631697989800550232540799 = 22921 x 395586472506832921 x 910257559954057439
    13354478338703157414450712387359637585922 = 2 x 127 x 383 x 5662847 x 6803327 x 19073614849 x 186812208641
    21607999854045939046148702187909870126721 = 303011 x 76225351 x 935527893146187207403151261
    34962478192749096460599414575269507712643 = 3 x 195163 x 4501963 x 5644065667 x 2350117027000544947
    56570478046795035506748116763179377839364 = 22 x 11 x 31 x 79 x 131 x 521 x 859 x 1951 x 2081 x 2731 x 24571 x 866581 x 37928281
    91532956239544131967347531338448885552007 = 73 x 14503 x 3016049 x 6100804791163473872231629367
    148103434286339167474095648101628263391371 = 31498587119111339 x 4701907222895068350249889
    239636390525883299441443179440077148943378 = 2 x 33 x 43 x 107 x 307 x 261399601 x 11166702227 x 1076312899454363
    387739824812222466915538827541705412334749 = 2389 x 4503769 x 36036960414811969810787847118289
    627376215338105766356982006981782561278127 = 47 x 1601 x 3041 x 124001 x 6996001 x 3160438834174817356001
*/