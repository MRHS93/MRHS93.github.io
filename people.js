Array.prototype.vlookup = function(needle,index,exactmatch){
    index = index || 0;
    exactmatch = exactmatch || false;
    for (var i = 0; i < this.length; i++){
        var row = this[i];
        
        if ((exactmatch && row[0]===needle) || row[0].indexOf(needle) != -1)
            return (index < row.length ? row[index] : row);
    }
    return null;
}

var people = [ 
    ['April Anderson',1],
    ['Jeffery Barton',2],
    ['Chris Bordonaro',3],
    ['Daniel Berndt',4],
    ['Andrea (Apisa) Dilts',5],
    ['Tami Burkhart',6],
    ['Darrell Booker',7],
    ['Irene Burns',8],
    ['Jesse Butler',9],
    ['Dawn Centofanti',10],
    ['Daniel Calko',11],
    ['Joseph Butcher',12],
    ['Amy Cozadd',13],
    ['Lyle Carpenter',14],
    ['Angela (Cramer) Ciarniello',15],
    ['Daniel DiRando',16],
    ['James Dowdy',17],
    ['Christopher Dickenson',18],
    ['Nathan Crocker',19],
    ['Stacie (Donchatz) Gerberry',20],
    ['Melissa Duttle',21],
    ['Alessandro Ferone',22],
    ['Melanie Gogle',23],
    ['Megan Garris',24],
    ['Stephanie Fortner',25],
    ['Jeffrey Fisher',26],
    ['Craig Hamer',27],
    ['Christine Gartner',28],
    ['Richard Heltebran',29],
    ['Teresa (Hernandez) Bott',30],
    ['Kristy Holdash',31],
    ['Mark Hixson',32],
    ['Bernard Herbert',33],
    ['Joseph Hladiuk',34],
    ['Darren Hood',35],
    ['John Jarman',36],
    ['Teresa (Hopper) Gearheart',37],
    ['Julie Ladd',38],
    ['Michelle Kokoski',39],
    ['Shannyn Leake',40],
    ['Neil Huda',41],
    ['Melanie Kovach',42],
    ['Patricia (Lowery) Collins',43],
    ['Jerome McConnell',44],
    ['Christopher Mikovich',45],
    ['Ace McBride',46],
    ['Daniel McElhaney',47],
    ['Patricia (Miller) Scott',48],
    ['Brian Merkich',49],
    ['Diana Molina',50],
    ['Jonathan Morgan',51],
    ['Joielle Nutter',52],
    ['Rodney Polling',53],
    ['Michael Monroe',54],
    ['Michael Raub',55],
    ['Michelle (Oliver) Pounds',56],
    ['Jason Reese',57],
    ['Jennifer Russell',58],
    ['Chalet Seidel',59],
    ['Edward Sallustio',60],
    ['Kara (Stoddard) Calderon',61],
    ['Robert Samuels',62],
    ['Christopher Rose',63],
    ['Otto Stohmeyer',64],
    ['Carl Tracy',65],
    ['Teresa (Ward) Langley',66],
    ['Lynnette Sanders',67],
    ['Stephanie Torksy',68],
    ['Amy Whittaker',69],
    ['Ann (Walton) Mannix',70],
    ['Eric Wiscott',71],
    ['Jason (Wodagaza) Beckham',72],
    ['Scott Zembower',73],
    ['Chriss Todd',74],
    ['Michael Albright',75],
    ['Chris Wildman',76],
    ['Jason Grimaldi',77]
];

var autocomplete = ["April Anderson",
"Jeffery Barton",
"Chris Bordonaro",
"Daniel Berndt",
"Andrea Apisa",
"Tami Burkhart",
"Darrell Booker",
"Irene Burns",
"Jesse Butler",
"Dawn Centofanti",
"Daniel Calko",
"Joseph Butcher",
"Amy Cozadd",
"Lyle Carpenter",
"Angela Cramer",
"Daniel DiRando",
"James Dowdy",
"Christopher Dickenson",
"Nathan Crocker",
"Stacie Donchatz",
"Melissa Duttle",
"Alessandro Ferone",
"Melanie Gogle",
"Megan Garris",
"Stephanie Fortner",
"Jeffrey Fisher",
"Craig Hamer",
"Christine Gartner",
"Richard Heltebran",
"Teresa Hernandez",
"Kristy Holdash",
"Mark Hixson",
"Bernard Herbert",
"Joseph Hladiuk",
"Darren Hood",
"John Jarman",
"Teresa Hopper",
"Julie Ladd",
"Michelle Kokoski",
"Shannyn Leake",
"Neil Huda",
"Melanie Kovach",
"Patricia Lowery",
"Jerome McConnell",
"Christopher Mikovich",
"Ace McBride",
"Daniel McElhaney",
"Patricia Miller",
"Brian Merkich",
"Diana Molina",
"Jonathan Morgan",
"Joielle Nutter",
"Rodney Polling",
"Michael Monroe",
"Michael Raub",
"Michelle Oliver",
"Jason Reese",
"Jennifer Russell",
"Chalet Seidel",
"Edward Sallustio",
"Kara Stoddard",
"Robert Samuels",
"Christopher Rose",
"Otto Stohmeyer",
"Carl Tracy",
"Teresa Ward",
"Lynnette Sanders",
"Stephanie Torksy",
"Amy Whittaker",
"Ann Walton",
"Eric Wiscott",
"Jason Wodagaza",
"Scott Zembower",
"Chriss Todd",
"Michael Albright",
"Chris Wildman",
"Jason Grimaldi"];

