var audio = new Audio("https://dl.vgmdownloads.com/soundtracks/homebrew-browser-background-music-wii-homebrew/ixmkbgpnxa/Homebrew%20Browser.mp3");
audio.volume = 0.2;
audio.loop = true;

//audio.play();

$(document).keypress(function (event) {
    switch (event.key) {
        case "1":
            genBuy(1);
            break;
        case "2":
            genBuy(2);
            break;
        case "3":
            genBuy(3);
            break;
        case "4":
            genBuy(4);
            break;
        case "5":
            genBuy(5);
            break;
        case "6":
            genBuy(6);
            break;
        case "7":
            genBuy(7);
            break;
        case "8":
            genBuy(8);
            break;
        case "9":
            genBuy(9);
            break;
        case "0":
            genBuy(10);
            break;
        case "m":
            for (let i = 10; i >= 1; i--) {
                genBuy(i);
            }
    }
})

var openTab = function(x) {
    $("#content").children().hide();
    $("#" + x).show();
}

var isDark = false;
var toggleDark = function() {
    if (isDark) {
        $("body").css("background-color", "white");
        $(".genHr").css("border-color", "black");
        $("body, button, h1, h2, h3, h4, h5, h6").css("color", "black");
    }
    else {
        $("body").css("background-color", "black");
        $(".genHr").css("border-color", "white");
        $("body, button, h1, h2, h3, h4, h5, h6").css("color", "white");
    }

    isDark = !isDark;
}

var blocks = { count: 1, rate: 0 };
var genArray = [
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "10" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e3" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e7" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e15" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e31" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e63" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e127" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e255" },
    { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e511" }
];
var upgArray = [
    { count: 0, power: 0, basePrice: "1e10" }
];
var multBase = 2;

var genCost = function(x) {
    let y = genArray[x - 1];
    return Decimal.mul(y.basePrice, Decimal.pow(10, Decimal.mul(Decimal.pow(2, Decimal.sub(x, 1)), y.purchased)));
}
var genBuy = function(x) {
    if (Decimal.cmp(blocks.count, genCost(x)) != -1) {
        let y = genArray[x - 1];
        blocks.count = Decimal.sub(blocks.count, genCost(x));
        y.count = Decimal.add(y.count, 1);
        y.purchased = Decimal.add(y.purchased, 1);
        y.mult = Decimal.mul(y.mult, multBase);
        y.power = Decimal.mul(y.count, y.mult);
    }
}

var upgCost = function(x) {
    let y = upgArray[x - 1];
    if (x == 1) {
        return Decimal.pow("1e10", Decimal.pow(2, y.count))
    }
}
var upgBuy = function(x) {
    if (Decimal.cmp(blocks.count, upgCost(x)) != -1) {
        let y = upgArray[x - 1];
        blocks.count = Decimal.sub(blocks.count, upgCost(x));
        y.count = Decimal.add(y.count, 1);

        if (x == 1) {
            y.power = Decimal.mul(y.count, 0.5);
            multBase = Decimal.add(multBase, 0.5);

            blocks = { count: 1, rate: 0 };
            genArray = [
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "10" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e3" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e7" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e15" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e31" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e63" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e127" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e255" },
                { count: 0, purchased: 0, mult: 1, power: 0, basePrice: "1e511" }
            ];
        }
    }
}

var checkCost = function(x, type) {
    if (type == "gen") {
        if (Decimal.cmp(blocks.count, genCost(x)) != -1) {
            $("#gen" + x + "Buy").addClass("w3-black");
            $("#gen" + x + "Buy").addClass("w3-text-cyan");
            $("#gen" + x + "Buy").addClass("w3-hover-cyan");
            $("#gen" + x + "Buy").addClass("w3-hover-text-black");
        }
        else {
            $("#gen" + x + "Buy").removeClass("w3-black");
            $("#gen" + x + "Buy").removeClass("w3-text-cyan");
            $("#gen" + x + "Buy").removeClass("w3-hover-cyan");
            $("#gen" + x + "Buy").removeClass("w3-hover-text-black");
        }
    }
    else if (type == "upg") {
        if (Decimal.cmp(blocks.count, upgCost(x)) != -1) {
            $("#upg" + x + "Buy").addClass("w3-black");
            $("#upg" + x + "Buy").addClass("w3-text-green");
            $("#upg" + x + "Buy").addClass("w3-hover-green");
            $("#upg" + x + "Buy").addClass("w3-hover-text-black");
        }
        else {
            $("#upg" + x + "Buy").removeClass("w3-black");
            $("#upg" + x + "Buy").removeClass("w3-text-green");
            $("#upg" + x + "Buy").removeClass("w3-hover-green");
            $("#upg" + x + "Buy").removeClass("w3-hover-text-black");
        }
    }
}

var twoDP = function(x) {
    if (Decimal.cmp(x, 1e3) != -1) {
        return x.toExponential(2).replace("+", "");
    }
    else {
        return x.toFixed(2).replace("+", "");
    }
}

var generate = function(x) {
    if (x) {
        genArray[x - 1].count = Decimal.add(genArray[x - 1].count,
            Decimal.div(Decimal.mul(genArray[x].count, genArray[x].mult), 75));

        genArray[x - 1].power = Decimal.mul(genArray[x - 1].count, genArray[x - 1].mult);
    }
    else {
        blocks.rate = genArray[0].power;
        blocks.count = Decimal.add(blocks.count,
            Decimal.div(blocks.rate, 75));
    }
}

var update = function() {
    for (let i = 10; i > 0; i--) {
        generate(i - 1);
    }

    for (let i = 1; i <= 10; i++) {
        $("#gen" + i + "Count").html(twoDP(genArray[i - 1].count));
        $("#gen" + i + "Mult").html(twoDP(genArray[i - 1].mult));
        $("#gen" + i + "Power").html(twoDP(genArray[i - 1].power));
        $("#gen" + i + "Buy").html(`Power up for ${twoDP(genCost(i))} &#9723;`);
        checkCost(i, "gen");
    }

    $(".blockCount").html(twoDP(blocks.count));
    $(".blockRate").html(twoDP(blocks.rate));

    for (let i = 1; i <= 1; i++) {
        $("#upg" + i + "Count").html(upgArray[i - 1].count.toFixed(0));
        $("#upg" + i + "Power").html(twoDP(upgArray[i - 1].power));
        $("#upg" + i + "Buy").html(`Upgrade for ${twoDP(upgCost(i))} &#9723;`);
        checkCost(i, "upg");
    }
}

var gameLoop = setInterval(update, 1000 / 75);