let Element = function (number) {
	this.number;
	if (undefined !== number) {
		this.number = number;
	} else {
		this.number = 0;
	}

	// Clone the elements object so we can make on the fly changes
	this.Elements = Object.assign({}, Elements);
	this.element;

	if (this.number > 0 && this.number < 119) {
		this.name = this.Elements[number].name;
	}

};

Element.prototype.getHtml = function (id, image = false) {
	let html = '<div data-toggle="modal" data-target="#elementDetailModal" data-tooltip="' + this.element.value + '" class="col-xs-4 ' + this.element.color + '">';
	html += '<div id="' + id + '"><el class="elementName"><el class="elementProp">' + this.element.value + '</el>' + this.element.ab + '</el><br />';
	html += '<el class="elementProp">' + this.element.mass + '</el>';
	if (undefined !== this.element.isAlternativeMass && true === this.element.isAlternativeMass) {
		html += '<sup>' + this.element.alternativeMass + '</sup>';
	}
	html += '<br /></div>';
    if (true === image) {
        html += '<img alt="' + this.element.name + '" class="element-small-image" src="img/' + this.element.value + '.jpg" />';
    }

	html += '</div>';

	return html;
};

Element.prototype.getPopupHtmlForElementWithNumber = function (number) {
	if (undefined !== number) {
		this.number = number;
		this.element = this.Elements[this.number];

		if (ApiEnabled) {
			let handler = new ApiHandler();
			handler.setElementInfo(this.element, this.number);

		} else {
			$('#elementUrl').html("<a href='https://www.rsc.org/periodic-table/element/" + this.name.toLowerCase() + '/' + number + "'>" + this.name + "</a>");
		}
	}
}

Element.prototype.searchByNumber = function (number) {
	if (this.Elements[number]) {
		this.number = number;
		this.name = this.Elements[number].name;
		this.element = this.Elements[number];
		return this.getHtml('element-by-number');
	}
}

Element.prototype.makeElementPopup = function (id) {

	$(id).parent().click(function () {
		// Retrieve the element number
		let data = $(this).filter(function() {
			return $(this).data("tooltip");
		}).eq(0);
		let number = data[0].dataset.tooltip,

		element = new Element(number);

		if (undefined !== element) {

		$('#elementImage').attr('src', 'img/'+number+'.jpg');
			$('#elementName').html(number + ' ' + element.name);

			$('#elementAbundance').html(element.Elements[number].abundance);
			$('#elementMostAbundantWeight').html(element.Elements[number].mass);
				let url = 'https://www.rsc.org/periodic-table/element/' + number  + '/' + element.name.toLowerCase();
				$('#elementAppearance').html('<a href="' + url + '" target="_blank">View ' + element.name + ' on rsc.org</a>');

			/*}*/

		}
	});
}

Element.prototype.searchByMass = function (mass) {
	let number, floor;
	for (number in this.Elements) {
		if (this.Elements.hasOwnProperty(number)) {
			floor = Math.floor(this.Elements[number].mass);
			if (floor === mass) {
				this.element = this.Elements[number];
				this.element.isAlternativeMass = false;
				return this.getHtml('element-by-mass');
			}
		}
	}

	return this.searchAlternativeMasses(mass);
}

Element.prototype.searchAlternativeMasses = function (mass) {
	let number, floor, i;

	for (number in this.Elements) {
		if (this.Elements.hasOwnProperty(number)) {
			if (undefined !== this.Elements[number].masses) {
				for (i = 0; i < this.Elements[number].masses.length; i++) {
					floor = Math.floor(this.Elements[number].masses[i][0]);
					if (floor === mass) {
						this.element = this.Elements[number];
						this.element.isAlternativeMass = true;
						this.element.alternativeMass = this.Elements[number].masses[i][0];
						return this.getHtml('element-by-mass');
					}
				}
			}
		}
	}
	return -1;
}

//Here are the COMPOSITE NUMBERS indexed to the individual numbers of Protons/Neutrons in each of the first 37 atomic elements (with COMPOSITE NUMBERS in parentheses):
const ElementComposite = {
	Hydrogen : {P: [1, 4],N: [0, 0],},
	Helium : {P: [2, 6],N: [2, 6],},
	Lithium: {P : [3, 8],N : [4, 9]},
	Beryllium: {P : [4, 9],N : [5, 10]},
	Boron: {P : [5, 10],N : [6, 12]},
	Carbon: {P : [6,12],N : [6, 12]},
	Nitrogen: {P : [7 ,14],N : [7, 14]},
	Oxygen: {P : [8, 15],N : [8,15]},
	Fluorine: {P : [9, 16],N : [10, 18]},
	Neon: {P : [10, 18],N : [10, 18]},
	Sodium: {P : [11, 20],N : [12, 21]},
	Magnesium: {P : [12, 21],N : [12, 21]},
	Aluminium: {P : [13, 22],N : [14, 24]},
	Silicon: {P : [14, 24],N : [14, 24]},
	Phosphorus: {P : [15, 25] ,N :[16, 26]},
	Sulfur: {P : [ 16 ,26],N : [ 16 ,26]} ,
	Chlorine: {	P : [ 17 ,27] ,N : [ 18 ,28]},
	Argon: {P : [ 18 ,28] , N : [ 22 ,34]},
	Potassium: {P : [ 19 ,30] , N : [ 20 ,32]},
	Calcium: {P : [ 20 ,32] , N : [ 20 ,32]},
	Scandium: {P : [ 21 ,33] , N : [ 24 ,36]},
	Titanium: {P : [ 22 ,34] , N : [ 26 ,39]},
	Vanadium: {P : [ 23 ,35] , N : [ 28 ,42]},
	Chromium: {P : [ 24 ,36] , N : [ 28 ,42]},
	Manganese: {P : [ 25 ,38] , N : [ 30 ,45]},
	Iron: {P : [ 26 ,39] , N : [ 30 ,45]},
	Cobalt: {P : [ 27 ,40] , N : [ 32 ,48]},
	Nickel: {P : [ 28 ,42] , N : [ 31 ,46]},
	Copper: {P : [ 29 ,44] , N : [ 35 ,51]},
	Zinc: {P : [ 30 ,45] , N : [ 35 ,51]},
	Gallium: {P : [ 31 ,46] , N : [ 39 ,56]},
	Germanium: {P : [ 32 ,48] , N : [ 41 ,58]},
	Arsenic: {P : [ 33 ,49] , N : [ 42 ,60]},
	Selenium: {P : [ 34 ,50] , N : [ 45 ,64]},
	Bromine: {P : [ 35 ,51] , N : [ 45 ,64]},
	Krypton: {P : [ 36 ,52] , N : [ 48 ,68]},
	Rubidium: {P : [ 37 ,54] , N : [ 48 ,68]}
};

let Elements = {
	1 : {
		ab : 'H',
		name : 'Hydrogen',
		mass : 1.008,
		masses : [
			[2.014, 0.0115],
			[3.016, 0]
		],
		abundance : 99.9885,
		color : 'blue',
		value : 1,
		origin : 'The name is derived from the Greek \'hydro\' and \'genes\' meaning water forming.',
		appearance : 'A colourless, odourless gas. It has the lowest density of all gases.\n',
		history : 'In the early 1500s the alchemist Paracelsus noted that the bubbles given off when iron filings ' +
			'were added to sulfuric acid were flammable. In 1671 Robert Boyle made the same observation. Neither ' +
			'followed up their discovery of hydrogen, and so Henry Cavendish gets the credit. In 1766 he collected ' +
			'the bubbles and showed that they were different from other gases. He later showed that when hydrogen' +
			' burns it forms water, thereby ending the belief that water was an element. The gas was given its name ' +
			'hydro-gen, meaning water-former, by Antoine Lavoisier.\n' +
			'\n' +
			'In 1931, Harold Urey and his colleagues at Columbia University in the US detected a second, rarer,' +
			' form of hydrogen. This has twice the mass of normal hydrogen, and they named it deuterium.',
		imageText : 'The image is based on the iconic atomic model first proposed by Niels Bohr in 1913.\n',
		biological : 'Hydrogen is an essential element for life. It is present in water and in almost all the molecules in living things. However, hydrogen itself does not play a particularly active role. It remains bonded to carbon and oxygen atoms, while the chemistry of life takes place at the more active sites involving, for example, oxygen, nitrogen and phosphorus.',
		natural : 'Hydrogen is easily the most abundant element in the universe. It is found in the sun and most of the stars, and the planet Jupiter is composed mostly of hydrogen.\n' +
			'\n' +
			'On Earth, hydrogen is found in the greatest quantities as water. It is present as a gas in the atmosphere only in tiny amounts – less than 1 part per million by volume. Any hydrogen that does enter the atmosphere quickly escapes the Earth’s gravity into outer space.\n' +
			'\n' +
			'Most hydrogen is produced by heating natural gas with steam to form syngas (a mixture of hydrogen and carbon monoxide). The syngas is separated to give hydrogen. Hydrogen can also be produced by the electrolysis of water.',
		uses : 'Hydrogen is easily the most abundant element in the universe. It is found in the sun and most of the stars, and the planet Jupiter is composed mostly of hydrogen.\n' +
			'\n' +
			'On Earth, hydrogen is found in the greatest quantities as water. It is present as a gas in the atmosphere only in tiny amounts – less than 1 part per million by volume. Any hydrogen that does enter the atmosphere quickly escapes the Earth’s gravity into outer space.\n' +
			'\n' +
			'Most hydrogen is produced by heating natural gas with steam to form syngas (a mixture of hydrogen and carbon monoxide). The syngas is separated to give hydrogen. Hydrogen can also be produced by the electrolysis of water.'
	},
	2: {
		ab : 'He',
		name : 'Helium',
		mass : 4.003,
		masses : [
			[3.016, 0.000134]
		],
		abundance : 99.9999,
		color: 'yellow',
		value : 2,
		origin : 'The name is derived from the Greek, \'helios\' meaning sun, as it was in the sun\'s corona that helium was first detected. ',
		appearance : 'A colourless, odourless gas that is totally unreactive.',
		history : 'In 1868, Pierre J. C. Janssen travelled to India to measure the solar spectrum during a total eclipse and observed a new yellow line which indicated a new element. Joseph Norman Lockyer recorded the same line by observing the sun through London smog and, assuming the new element to be a metal, he named it helium.\n' +
			'\n' +
			'In 1882, the Italian Luigi Palmieri found the same line the spectrum of gases emitted by Vesuvius, as did the American William Hillebrand ' +
			'in 1889 when he collected the gas given off by the mineral uraninite (UO2) as it dissolves in acid. However, it was Per Teodor ' +
			'Cleve and Nils Abraham Langer at Uppsala, Sweden, in 1895, who repeated that experiment and confirmed it was helium and measured its ' +
			'atomic weight.',
		uses : 'Helium is used as a cooling medium for the Large Hadron Collider (LHC), and the superconducting magnets in MRI scanners and NMR spectrometers. It is also used to keep satellite instruments cool and was used to cool the liquid oxygen and hydrogen that powered the Apollo space vehicles.\n' +
			'\n' +
			'Because of its low density helium is often used to fill decorative balloons, weather balloons and airships. Hydrogen was once used to fill balloons but it is dangerously reactive.\n' +
			'\n' +
			'Because it is very unreactive, helium is used to provide an inert protective atmosphere for making fibre optics and semiconductors, and for arc welding. Helium is also used to detect leaks, such as in car air-conditioning systems, and because it diffuses quickly it is used to inflate car airbags after impact.\n' +
			'\n' +
			'A mixture of 80% helium and 20% oxygen is used as an artificial atmosphere for deep-sea divers and others working under pressurised conditions.\n' +
			'\n' +
			'Helium-neon gas lasers are used to scan barcodes in supermarket checkouts. A new use for helium is a helium-ion microscope that gives better ' +
			'image resolution than a scanning electron microscope.\n',
		imageText : 'The image is of the sun because helium gets its name from ‘helios’, the Greek word for the sun. Helium was detected in the sun by its spectral lines many years before it was found on Earth.',
		biological : 'Helium has no known biological role. It is non-toxic.',
		natural : 'After hydrogen, helium is the second most abundant element in the universe. It is present in all stars. It was, and is still being, formed from alpha-particle decay of radioactive elements in the Earth. Some of the helium formed escapes into the atmosphere, which contains about 5 parts per million by volume. This is a dynamic balance, with the low-density helium continually escaping to outer space.\n' +
			'\n' +
			'It is uneconomical to extract helium from the air. The major source is natural gas, which can contain up to 7% helium.'
	},
	3: {
		ab : 'Li',
		name : 'Lithium',
		mass : 7.016,
		masses : [
			[6.015, 7.59]
		],
		abundance : 92.41,
		color : 'pink',
		value : 3,
		origin : 'The name is derived from the Greek \'lithos\' meaning stone. ',
		appearance : 'A soft, silvery metal. It has the lowest density of all metals. It reacts vigorously with water.',
		imageText : 'Lithium was discovered from a mineral, while other common alkali metals were discovered from plant material. This is thought to explain the origin of the element’s name; from ‘lithos’ (Greek for ‘stone’). The image is based on an alchemical symbol for stone.',
		uses : 'The most important use of lithium is in rechargeable batteries for mobile phones, laptops, digital cameras and electric vehicles. Lithium is also used in some non-rechargeable batteries for things like heart pacemakers, toys and clocks.\n' +
			'\n' +
			'Lithium metal is made into alloys with aluminium and magnesium, improving their strength and making them lighter. A magnesium-lithium alloy is used for armour plating. Aluminium-lithium alloys are used in aircraft, bicycle frames and high-speed trains.\n' +
			'\n' +
			'Lithium oxide is used in special glasses and glass ceramics. Lithium chloride is one of the most hygroscopic materials known, and is used in air conditioning and industrial drying systems (as is lithium bromide). Lithium stearate is used as an all-purpose and high-temperature lubricant. Lithium carbonate is used in drugs to treat manic depression, although its action on the brain is still not fully understood. Lithium hydride is used as a means of storing hydrogen for use as a fuel.',
		biological : 'Lithium has no known biological role. It is toxic, except in very small doses.',
		natural : 'Lithium does not occur as the metal in nature, but is found combined in small amounts in nearly all igneous rocks and in the waters of many mineral springs. Spodumene, petalite, lepidolite, and amblygonite are the more important minerals containing lithium.\n' +
			'\n' +
			'Most lithium is currently produced in Chile, from brines that yield lithium carbonate when treated with sodium carbonate. The metal is produced by the electrolysis of molten lithium chloride and potassium chloride.',
		history : 'The first lithium mineral petalite, LiAlSi4O10, was discovered on the Swedish island of Utö by the Brazilian, Jozé Bonifácio de Andralda e Silva in the 1790s. It was observed to give an intense crimson flame when thrown onto a fire. In 1817, Johan August Arfvedson of Stockholm analysed it and deduced it contained a previously unknown metal, which he called lithium. He realised this was a new alkali metal and a lighter version of sodium. However, unlike sodium he was not able to separate it by electrolysis. In 1821 William Brande obtained a tiny amount this way but not enough on which to make measurements. It was not until 1855 that the German chemist Robert Bunsen and the British chemist Augustus Matthiessen obtained it in bulk by the electrolysis of molten lithium chloride.'
	},
	4: {
		ab : 'Be',
		name : 'Beryllium',
		mass : 9.012,
		abundance : 100,
		color : 'pinkl',
		value : 4,
		origin : 'The name is derived from the Greek name for beryl, \'beryllo\'. ',
		imageText : 'Beryllium is used in gears and cogs particularly in the aviation industry.',
		appearance : 'Beryllium is a silvery-white metal. It is relatively soft and has a low density.',
		uses : 'Beryllium is used in alloys with copper or nickel to make gyroscopes, springs, electrical contacts, spot-welding electrodes and non-sparking tools. Mixing beryllium with these metals increases their electrical and thermal conductivity.\n' +
			'\n' +
			'Other beryllium alloys are used as structural materials for high-speed aircraft, missiles, spacecraft and communication satellites.\n' +
			'\n' +
			'Beryllium is relatively transparent to X-rays so ultra-thin beryllium foil is finding use in X-ray lithography. Beryllium is also used in nuclear reactors as a reflector or moderator of neutrons.\n' +
			'\n' +
			'The oxide has a very high melting point making it useful in nuclear work as well as having ceramic applications.',
		biological : 'Beryllium and its compounds are toxic and carcinogenic. If beryllium dust or fumes are inhaled, it can lead to an incurable inflammation of the lungs called berylliosis.',
		natural : 'Beryllium is found in about 30 different mineral species. The most important are beryl (beryllium aluminium silicate) and bertrandite (beryllium silicate). Emerald and aquamarine are precious forms of beryl.\n' +
			'\n' +
			'The metal is usually prepared by reducing beryllium fluoride with magnesium metal.',
		history : 'The gemstones beryl and emerald are both forms of beryllium aluminium silicate, Be3Al2(SiO3)6. The French mineralogist Abbé René-Just Haüy thought they might harbour a new element, and he asked Nicholas Louis Vauquelin, to analyse them and he realised they harboured a new metal and he investigated it. In February 1798 Vauquelin announced his discovery at the French Academy and named the element glaucinium (Greek glykys = sweet) because its compounds tasted sweet. Others preferred the name beryllium, based on the gemstone, and this is now the official name.\n' +
			'\n' +
			'Beryllium metal was isolated in 1828 by Friedrich Wöhler at Berlin and independently by Antoine-Alexandere-Brutus Bussy at Paris, both of whom extracted it from beryllium chloride (BeCl2) by reacting this with potassium.',
	},
	5: {
		ab : 'B',
		name : 'Boron',
		mass : 11.009,
		masses : [
			[10.013, 19.9]
		],
		abundance : 80.1,
		color : 'lime',
		value : 5,
		origin : 'The name is derived from the Arabic \'buraq\', which was the name for borax. ',
		appearance : 'Pure boron is a dark amorphous powder.',
		uses : 'Amorphous boron is used as a rocket fuel igniter and in pyrotechnic flares. It gives the flares a distinctive green colour.\n' +
			'\n' +
			'The most important compounds of boron are boric (or boracic) acid, borax (sodium borate) and boric oxide. These can be found in eye drops, mild antiseptics, washing powders and tile glazes. Borax used to be used to make bleach and as a food preservative.\n' +
			'\n' +
			'Boric oxide is also commonly used in the manufacture of borosilicate glass (Pyrex). It makes the glass tough and heat resistant. Fibreglass textiles and insulation are made from borosilcate glass.\n' +
			'\n' +
			'Sodium octaborate is a flame retardant.\n' +
			'\n' +
			'The isotope boron-10 is good at absorbing neutrons. This means it can be used to regulate nuclear reactors. It also has a role in instruments used to detect neutrons.',
		biological : 'Boron is essential for the cell walls of plants. It is not considered poisonous to animals, but in higher doses it can upset the body’s metabolism. We take in about 2 milligrams of boron each day from our food, and about 60 grams in a lifetime. Some boron compounds are being studied as a possible treatment for brain tumours.\n',
		natural : 'Boron occurs as an orthoboric acid in some volcanic spring waters, and as borates in the minerals borax and colemanite. Extensive borax deposits are found in Turkey. However, by far the most important source of boron is rasorite. This is found in the Mojave Desert in California, USA.\n' +
			'\n' +
			'High-purity boron is prepared by reducing boron trichloride or tribromide with hydrogen, on electrically heated filaments. Impure, or amorphous, boron can be prepared by heating the trioxide with magnesium powder.',
		imageText : 'An image reflecting the importance of boron as an essential mineral for plants. The tree and its strange metallic foliage ‘grow’ from a ‘pure’ dark powdered cone of the element.\n',
		history : 'For centuries the only source of borax, Na2B2O5(OH)4, was the crystallized deposits of Lake Yamdok Cho, in Tibet. It was used as a flux used by goldsmiths.\n' +
			'\n' +
			'In 1808, Louis-Josef Gay-Lussac and Louis-Jacques Thénard working in Paris, and Sir Humphry Davy in London, independently extracted boron by heating borax with potassium metal. In fact, neither had produced the pure element which is almost impossible to obtain. A purer type of boron was isolated in 1892 by Henri Moissan. Eventually, E. Weintraub in the USA produced totally pure boron by sparking a mixture of boron chloride, BCl3 vapour, and hydrogen. The material so obtained boron was found to have very different properties to those previously reported.',
	},
	6: {
		ab : 'C',
		name : 'Carbon',
		mass : 12.000,
		masses : [
			[13.003, 1.07],
			[14.003, 0]
		],
		abundance : 98.93,
		color : 'purple',
		value : 6,
		origin : 'The name is derived from the Latin ‘carbo’, charcoal ',
		appearance : 'There are a number of pure forms of this element including graphite, diamond, fullerenes and graphene.\n' +
			'\n' +
			'Diamond is a colourless, transparent, crystalline solid and the hardest known material. Graphite is black and shiny but soft. The nano-forms, fullerenes and graphene, appear as black or dark brown, soot-like powders.\n',
		uses : 'Carbon is unique among the elements in its ability to form strongly bonded chains, sealed off by hydrogen atoms. These hydrocarbons, extracted naturally as fossil fuels (coal, oil and natural gas), are mostly used as fuels. A small but important fraction is used as a feedstock for the petrochemical industries producing polymers, fibres, paints, solvents and plastics etc.\n' +
			'\n' +
			'Impure carbon in the form of charcoal (from wood) and coke (from coal) is used in metal smelting. It is particularly important in the iron and steel industries.\n' +
			'\n' +
			'Graphite is used in pencils, to make brushes in electric motors and in furnace linings. Activated charcoal is used for purification and filtration. It is found in respirators and kitchen extractor hoods.\n' +
			'\n' +
			'Carbon fibre is finding many uses as a very strong, yet lightweight, material. It is currently used in tennis rackets, skis, fishing rods, rockets and aeroplanes.\n' +
			'\n' +
			'Industrial diamonds are used for cutting rocks and drilling. Diamond films are used to protect surfaces such as razor blades.\n' +
			'\n' +
			'The more recent discovery of carbon nanotubes, other fullerenes and atom-thin sheets of graphene has revolutionised hardware developments in the electronics industry and in nanotechnology generally.\n' +
			'\n' +
			'150 years ago the natural concentration of carbon dioxide in the Earth’s atmosphere was 280 ppm. In 2013, as a result of combusting fossil fuels with oxygen, there was 390 ppm. Atmospheric carbon dioxide allows visible light in but prevents some infrared escaping (the natural greenhouse effect). This keeps the Earth warm enough to sustain life. However, an enhanced greenhouse effect is underway, due to a human-induced rise in atmospheric carbon dioxide. This is affecting living things as our climate changes.',
		biological : 'Carbon is essential to life. This is because it is able to form a huge variety of chains of different lengths. It was once thought that the carbon-based molecules of life could only be obtained from living things. They were thought to contain a ‘spark of life’. However, in 1828, urea was synthesised from inorganic reagents and the branches of organic and inorganic chemistry were united.\n' +
			'\n' +
			'Living things get almost all their carbon from carbon dioxide, either from the atmosphere or dissolved in water. Photosynthesis by green plants and photosynthetic plankton uses energy from the sun to split water into oxygen and hydrogen. The oxygen is released to the atmosphere, fresh water and seas, and the hydrogen joins with carbon dioxide to produce carbohydrates.\n' +
			'\n' +
			'Some of the carbohydrates are used, along with nitrogen, phosphorus and other elements, to form the other monomer molecules of life. These include bases and sugars for RNA and DNA, and amino acids for proteins.\n' +
			'\n' +
			'Living things that do not photosynthesise have to rely on consuming other living things for their source of carbon molecules. Their digestive systems break carbohydrates into monomers that they can use to build their own cellular structures. Respiration provides the energy needed for these reactions. In respiration oxygen rejoins carbohydrates, to form carbon dioxide and water again. The energy released in this reaction is made available for the cells.',
		natural : 'Carbon is found in the sun and other stars, formed from the debris of a previous supernova. It is built up by nuclear fusion in bigger stars.\n' +
			'\n' +
			'It is present in the atmospheres of many planets, usually as carbon dioxide. On Earth, the concentration of carbon dioxide in the atmosphere is currently 390 ppm and rising.\n' +
			'\n' +
			'Graphite is found naturally in many locations. Diamond is found in the form of microscopic crystals in some meteorites. Natural diamonds are found in the mineral kimberlite, sources of which are in Russia, Botswana, DR Congo, Canada and South Africa.\n' +
			'\n' +
			'In combination, carbon is found in all living things. It is also found in fossilised remains in the form of hydrocarbons (natural gas, crude oil, oil shales, coal etc) and carbonates (chalk, limestone, dolomite etc).',
		imageText : 'The three crowns represent the three major forms of the element in nature and carbon’s status as ‘King of the Elements’ in the periodic table.',
		history : 'Carbon occurs naturally as anthracite (a type of coal), graphite, and diamond. More readily available historically was soot or charcoal. Ultimately these various materials were recognised as forms of the same element. Not surprisingly, diamond posed the greatest difficulty of identification. Naturalist Giuseppe Averani and medic Cipriano Targioni of Florence were the first to discover that diamonds could be destroyed by heating. In 1694 they focussed sunlight on to a diamond using a large magnifying glass and the gem eventually disappeared. Pierre-Joseph Macquer and Godefroy de Villetaneuse repeated the experiment in 1771. Then, in 1796, the English chemist Smithson Tennant finally proved that diamond was just a form of carbon by showing that as it burned it formed only CO2.'
	},
	7: {
		ab : 'N',
		name : 'Nitrogen',
		mass : 14.003,
		masses : [
			[15.000, 0.364]
		],
		abundance : 99.636,
		color : 'grey',
		value : 7,
		origin : 'The name is derived from the Greek \'nitron\' and \'genes\' meaning nitre forming. ',
		appearance : 'A colourless, odourless gas.\n',
		uses : 'Nitrogen is important to the chemical industry. It is used to make fertilisers, nitric acid, nylon, dyes and explosives. To make these products, nitrogen must first be reacted with hydrogen to produce ammonia. This is done by the Haber process. 150 million tonnes of ammonia are produced in this way every year.\n' +
			'\n' +
			'Nitrogen gas is also used to provide an unreactive atmosphere. It is used in this way to preserve foods, and in the electronics industry during the production of transistors and diodes. Large quantities of nitrogen are used in annealing stainless steel and other steel mill products. Annealing is a heat treatment that makes steel easier to work.\n' +
			'\n' +
			'Liquid nitrogen is often used as a refrigerant. It is used for storing sperm, eggs and other cells for medical research and reproductive technology. It is also used to rapidly freeze foods, helping them to maintain moisture, colour, flavour and texture.\n',
		biological : 'Nitrogen is cycled naturally by living organisms through the ‘nitrogen cycle’. It is taken up by green plants and algae as nitrates, and used to build up the bases needed to construct DNA, RNA and all amino acids. Amino acids are the building blocks of proteins.\n' +
			'\n' +
			'Animals obtain their nitrogen by consuming other living things. They digest the proteins and DNA into their constituent bases and amino acids, reforming them for their own use.\n' +
			'\n' +
			'Microbes in the soil convert the nitrogen compounds back to nitrates for the plants to re-use. The nitrate supply is also replenished by nitrogen-fixing bacteria that ‘fix’ nitrogen directly from the atmosphere.\n' +
			'\n' +
			'Crop yields can be greatly increased by adding chemical fertilisers to the soil, manufactured from ammonia. If used carelessly the fertiliser can leach out of the soil into rivers and lakes, causing algae to grow rapidly. This can block out light preventing photosynthesis. The dissolved oxygen soon gets used up and the river or lake dies.\n',
		natural : 'Nitrogen makes up 78% of the air, by volume. It is obtained by the distillation of liquid air. Around 45 million tonnes are extracted each year. It is found, as compounds, in all living things and hence also in coal and other fossil fuels.',
		imageText : 'The wheat sheaf symbol and lightning reflect the importance of nitrogen to living things. Nitrogen is important for plant growth and can be ‘fixed’ by lightning or added to soils in fertilisers.\n',
		history : 'Nitrogen in the form of ammonium chloride, NH4Cl, was known to the alchemists as sal ammonia. It was manufactured in Egypt by heating a mixture of dung, salt and urine. Nitrogen gas itself was obtained in the 1760s by both Henry Cavendish and Joseph Priestley and they did this by removing the oxygen from air. They noted it extinguished a lighted candle and that a mouse breathing it would soon die. Neither man deduced that it was an element. The first person to suggest this was a young student Daniel Rutherford in his doctorate thesis of September 1772 at Edinburgh, Scotland.'
	},
	8: {
		ab : 'O',
		name : 'Oxygen',
		mass : 15.995,
		masses : [
			[16.999, 0.038],
			[17.999, 0.205]
		],
		abundance : 99.757,
		color: 'orange',
		value : 8,
		origin : 'The name comes from the Greek \'oxy genes\', meaning acid forming. ',
		appearance : 'A colourless, odourless gas.',
		uses : 'The greatest commercial use of oxygen gas is in the steel industry. Large quantities are also used in the manufacture of a wide range of chemicals including nitric acid and hydrogen peroxide. It is also used to make epoxyethane (ethylene oxide), used as antifreeze and to make polyester, and chloroethene, the precursor to PVC.\n' +
			'\n' +
			'Oxygen gas is used for oxy-acetylene welding and cutting of metals. A growing use is in the treatment of sewage and of effluent from industry.',
		biological : 'Oxygen first appeared in the Earth’s atmosphere around 2 billion years ago, accumulating from the photosynthesis of blue-green algae. Photosynthesis uses energy from the sun to split water into oxygen and hydrogen. The oxygen passes into the atmosphere and the hydrogen joins with carbon dioxide to produce biomass.\n' +
			'\n' +
			'When living things need energy they take in oxygen for respiration. The oxygen returns to the atmosphere in the form of carbon dioxide.\n' +
			'\n' +
			'Oxygen gas is fairly soluble in water, which makes aerobic life in rivers, lakes and oceans possible.',
		natural : 'Oxygen makes up 21% of the atmosphere by volume. This is halfway between 17% (below which breathing for unacclimatised people becomes difficult) and 25% (above which many organic compounds are highly flammable). The element and its compounds make up 49.2% by mass of the Earth’s crust, and about two-thirds of the human body.\n' +
			'\n' +
			'There are two key methods used to obtain oxygen gas. The first is by the distillation of liquid air. The second is to pass clean, dry air through a zeolite that absorbs nitrogen and leaves oxygen. A newer method, which gives oxygen of a higher purity, is to pass air over a partially permeable ceramic membrane.\n' +
			'\n' +
			'In the laboratory it can be prepared by the electrolysis of water or by adding a manganese(IV) oxide catalyst to aqueous hydrogen peroxide.',
		imageText : 'The image represents the fundamental importance of the element in air and, when bonded to hydrogen, in water.',
		history : 'In 1608, Cornelius Drebbel had shown that heating saltpetre (potassium nitrate, KNO3) released a gas. This was oxygen although it was not identified as such.\n' +
			'\n' +
			'The credit for discovering oxygen is now shared by three chemists: an Englishman, a Swede, and a Frenchman. Joseph Priestley was the first to publish an account of oxygen, having made it in 1774 by focussing sunlight on to mercuric oxide (HgO), and collecting the gas which came off. He noted that a candle burned more brightly in it and that it made breathing easier. Unknown to Priestly, Carl Wilhelm Scheele had produced oxygen in June 1771. He had written an account of his discovery but it was not published until 1777. Antoine Lavoisier also claimed to have discovered oxygen, and he proposed that the new gas be called oxy-gène, meaning acid-forming, because he thought it was the basis of all acids.'
	},
	9: {
		ab : 'F',
		name : 'Fluorine',
		mass : 18.998,
		abundance : 100,
		color : 'tangerine',
		value : 9,
		origin : 'The name is derived form the Latin \'fluere\', meaning to flow ',
		appearance : 'A very pale yellow-green, dangerously reactive gas. It is the most reactive of all the elements and quickly attacks all metals. Steel wool bursts into flames when exposed to fluorine.\n',
		uses : 'There was no commercial production of fluorine until the Second World War, when the development of the atom bomb, and other nuclear energy projects, made it necessary to produce large quantities. Before this, fluorine salts, known as fluorides, were for a long time used in welding and for frosting glass.\n' +
			'\n' +
			'The element is used to make uranium hexafluoride, needed by the nuclear power industry to separate uranium isotopes. It is also used to make sulfur hexafluoride, the insulating gas for high-power electricity transformers.\n' +
			'\n' +
			'In fact, fluorine is used in many fluorochemicals, including solvents and high-temperature plastics, such as Teflon (poly(tetrafluoroethene), PTFE). Teflon is well known for its non-stick properties and is used in frying pans. It is also used for cable insulation, for plumber’s tape and as the basis of Gore-Tex® (used in waterproof shoes and clothing).\n' +
			'\n' +
			'Hydrofluoric acid is used for etching the glass of light bulbs and in similar applications.\n' +
			'\n' +
			'CFCs (chloro-fluoro-carbons) were once used as aerosol propellants, refrigerants and for ‘blowing’ expanded polystyrene. However, their inertness meant that, once in the atmosphere, they diffused into the stratosphere and destroyed the Earth’s ozone layer. They are now banned.\n',
		biological : 'Fluoride is an essential ion for animals, strengthening teeth and bones. It is added to drinking water in some areas. The presence of fluorides below 2 parts per million in drinking water is believed to prevent dental cavities. However, above this concentration it may cause children’s tooth enamel to become mottled. Fluoride is also added to toothpaste.\n' +
			'\n' +
			'The average human body contains about 3 milligrams of fluoride. Too much fluoride is toxic. Elemental fluorine is highly toxic.\n',
		natural : 'The most common fluorine minerals are fluorite, fluorspar and cryolite, but it is also rather widely distributed in other minerals. It is the 13th most common element in the Earth’s crust.\n' +
			'\n' +
			'Fluorine is made by the electrolysis of a solution of potassium hydrogendifluoride (KHF2) in anhydrous hydrofluoric acid.',
		imageText : 'The image reflects the highly reactive nature of the element.',
		history : 'The early chemists were aware that metal fluorides contained an unidentified element similar to chlorine, but they could not isolate it. (The French scientist, André Ampère coined the name fluorine in 1812.) Even the great Humphry Davy was unable to produce the element, and he became ill by trying to isolate it from hydrofluoric acid.\n' +
			'\n' +
			'The British chemist George Gore in 1869 passed an electric current through liquid HF but found that the gas which was liberated reacted violently with his apparatus. He thought it was fluorine but was unable to collect it and prove it. Then in 1886 the French chemist Henri Moissan obtained it by the electrolysis of potassium bifluoride (KHF2) dissolved in liquid HF.'
	},
	10: {
		ab : 'Ne',
		name : 'Neon',
		mass : 19.992,
		masses : [
			[20.994, 0.27],
			[21.991, 9.25]
		],
		abundance : 90.48,
		color : 'yellow',
		value : 10,
		origin : 'The name comes from the Greek \'neos\', meaning new. ',
		appearance : 'A colourless, odourless gas. Neon will not react with any other substance.',
		uses : 'The largest use of neon is in making the ubiquitous ‘neon signs’ for advertising. In a vacuum discharge tube neon glows a reddish orange colour. Only the red signs actually contain pure neon. Others contain different gases to give different colours.\n' +
			'\n' +
			'Neon is also used to make high-voltage indicators and switching gear, lightning arresters, diving equipment and lasers.\n' +
			'\n' +
			'Liquid neon is an important cryogenic refrigerant. It has over 40 times more refrigerating capacity per unit volume than liquid helium, and more than 3 times that of liquid hydrogen.',
		biological : 'Neon has no known biological role. It is non-toxic.',
		natural : 'Neon is the fifth most abundant element in the universe. However, it is present in the Earth’s atmosphere at a concentration of just 18 parts per million. It is extracted by fractional distillation of liquid air. This gives a fraction that contains both helium and neon. The helium is removed from the mixture with activated charcoal.',
		imageText : 'The images of Las Vegas and the neon ‘dollar’ symbol reflect the use of the gas in neon lighting for advertising.',
		history : 'In 1898, William Ramsay and Morris Travers at University College London isolated krypton gas by evaporating liquid argon. They had been expecting to find a lighter gas which would fit a niche above argon in the periodic table of the elements. They then repeated their experiment, this time allowing solid argon to evaporate slowly under reduced pressure and collected the gas which came off first. This time they were successful, and when they put a sample of the new gas into their atomic spectrometer it startled them by the brilliant red glow that we now associate with neon signs. Ramsay named the new gas neon, basing it on neos, the Greek word for new.'
	},
	11: {
		ab : 'Na',
		name : 'Sodium',
		mass : 22.990,
		abundance : 100,
		color : 'pink',
		value : 11,
		origin : '\tThe name is derived from the English word \'soda\'. ',
		appearance : 'Sodium is a soft metal that tarnishes within seconds of being exposed to the air. It also reacts vigorously with water.',
		uses : 'Sodium is used as a heat exchanger in some nuclear reactors, and as a reagent in the chemicals industry. But sodium salts have more uses than the metal itself.\n' +
			'\n' +
			'The most common compound of sodium is sodium chloride (common salt). It is added to food and used to de-ice roads in winter. It is also used as a feedstock for the chemical industry.\n' +
			'\n' +
			'Sodium carbonate (washing soda) is also a useful sodium salt. It is used as a water softener.\n',
		biological : 'Sodium is essential to all living things, and humans have known this since prehistoric times. Our bodies contain about 100 grams, but we are constantly losing sodium in different ways so we need to replace it. We can get all the sodium we need from our food, without adding any extra. The average person eats about 10 grams of salt a day, but all we really need is about 3 grams. Any extra sodium may contribute to high blood pressure. Sodium is important for many different functions of the human body. For example, it helps cells to transmit nerve signals and regulate water levels in tissues and blood.\n',
		natural : 'Sodium is the sixth most common element on Earth, and makes up 2.6% of the Earth’s crust. The most common compound is sodium chloride. This very soluble salt has been leached into the oceans over the lifetime of the planet, but many salt beds or ‘lakes’ are found where ancient seas have evaporated. It is also found in many minerals including cryolite, zeolite and sodalite.\n' +
			'\n' +
			'Because sodium is so reactive it is never found as the metal in nature. Sodium metal is produced by electrolysis of dry molten sodium chloride.',
		imageText : 'The two lines in a circle represents sodium, and is one of the element symbols developed by John Dalton in the 19th century. The orange glow is like the colour of sodium street lighting and the spiked ‘flash’ symbol reflects the element\'s high reactivity.',
		history : 'Salt (sodium chloride, NaCl) and soda (sodium carbonate, Na2CO3) had been known since prehistoric times, the former used as a flavouring and preservative, and the latter for glass manufacture. Salt came from seawater, while soda came from the Natron Valley in Egypt or from the ash of certain plants. Their composition was debated by early chemists and the solution finally came from the Royal Institution in London in October 1807 where Humphry Davy exposed caustic soda (sodium hydroxide, NaOH) to an electric current and obtained globules of sodium metal, just as he had previously done for potassium, although he needed to use a stronger current.\n' +
			'\n' +
			'The following year, Louis-Josef Gay-Lussac and Louis-Jacques Thénard obtained sodium by heating to red heat a mixture of caustic soda and iron filings.'
	},
	12: {
		ab : 'Mg',
		name : 'Magnesium',
		mass : 23.985,
		masses : [
			[24.986, 10],
			[25.983, 11.01]
		],
		abundance : 78.99,
		color: 'pinkl',
		value : 12,
		origin : 'The name is derived from Magnesia, a district of Eastern Thessaly in Greece. ',
		appearance : 'A silvery-white metal that ignites easily in air and burns with a bright light.\n',
		uses : 'Magnesium is one-third less dense than aluminium. It improves the mechanical, fabrication and welding characteristics of aluminium when used as an alloying agent. These alloys are useful in aeroplane and car construction.\n' +
			'\n' +
			'Magnesium is used in products that benefit from being lightweight, such as car seats, luggage, laptops, cameras and power tools. It is also added to molten iron and steel to remove sulfur.\n' +
			'\n' +
			'As magnesium ignites easily in air and burns with a bright light, it’s used in flares, fireworks and sparklers.\n' +
			'\n' +
			'Magnesium sulfate is sometimes used as a mordant for dyes. Magnesium hydroxide is added to plastics to make them fire retardant. Magnesium oxide is used to make heat-resistant bricks for fireplaces and furnaces. It is also added to cattle feed and fertilisers. Magnesium hydroxide (milk of magnesia), sulfate (Epsom salts), chloride and citrate are all used in medicine.\n' +
			'\n' +
			'Grignard reagents are organic magnesium compounds that are important for the chemical industry.',
		biological : 'Magnesium is an essential element in both plant and animal life. Chlorophyll is the chemical that allows plants to capture sunlight, and photosynthesis to take place. Chlorophyll is a magnesium-centred porphyrin complex. Without magnesium photosynthesis could not take place, and life as we know it would not exist.\n' +
			'\n' +
			'In humans, magnesium is essential to the working of hundreds of enzymes. Humans take in about 250–350 milligrams of magnesium each day. We each store about 20 grams in our bodies, mainly in the bones.\n',
		natural : 'Magnesium is the eighth most abundant element in the Earth’s crust, but does not occur uncombined in nature. It is found in large deposits in minerals such as magnesite and dolomite. The sea contains trillions of tonnes of magnesium, and this is the source of much of the 850,000 tonnes now produced each year. It is prepared by reducing magnesium oxide with silicon, or by the electrolysis of molten magnesium chloride.',
		imageText : 'The image is inspired by chlorophyll, the molecule contained in green plants that enables them to photosynthesise. Chlorophyll contains a single atom of magnesium at its centre.\n',
		history : 'The first person to recognise that magnesium was an element was Joseph Black at Edinburgh in 1755. He distinguished magnesia (magnesium oxide, MgO) from lime (calcium oxide, CaO) although both were produced by heating similar kinds of carbonate rocks, magnesite and limestone respectively. Another magnesium mineral called meerschaum (magnesium silicate) was reported by Thomas Henry in 1789, who said that it was much used in Turkey to make pipes for smoking tobacco.\n' +
			'\n' +
			'An impure form of metallic magnesium was first produced in 1792 by Anton Rupprecht who heated magnesia with charcoal. A pure, but tiny, amount of the metal was isolated in 1808 by Humphry Davy by the electrolysis of magnesium oxide. However, it was the French scientist, Antoine-Alexandre-Brutus Bussy who made a sizeable amount of the metal in 1831 by reacting magnesium chloride with potassium, and he then studied its properties.'
	},
	13: {
		ab : 'Al',
		name : 'Aluminium',
		mass : 26.982,
		abundance : 100,
		color : 'lime',
		value : 13,
		origin : 'The name is derived from the Latin name for alum, \'alumen\' meaning bitter salt. ',
		appearance : 'Aluminium is a silvery-white, lightweight metal. It is soft and malleable.',
		uses : 'Aluminium is used in a huge variety of products including cans, foils, kitchen utensils, window frames, beer kegs and aeroplane parts. This is because of its particular properties. It has low density, is non-toxic, has a high thermal conductivity, has excellent corrosion resistance and can be easily cast, machined and formed. It is also non-magnetic and non-sparking. It is the second most malleable metal and the sixth most ductile.\n' +
			'\n' +
			'It is often used as an alloy because aluminium itself is not particularly strong. Alloys with copper, manganese, magnesium and silicon are lightweight but strong. They are very important in the construction of aeroplanes and other forms of transport.\n' +
			'\n' +
			'Aluminium is a good electrical conductor and is often used in electrical transmission lines. It is cheaper than copper and weight for weight is almost twice as good a conductor.\n' +
			'\n' +
			'When evaporated in a vacuum, aluminium forms a highly reflective coating for both light and heat. It does not deteriorate, like a silver coating would. These aluminium coatings have many uses, including telescope mirrors, decorative paper, packages and toys.\n',
		biological : 'Aluminium has no known biological role. In its soluble +3 form it is toxic to plants. Acidic soils make up almost half of arable land on Earth, and the acidity speeds up the release of Al3+ from its minerals. Crops can then absorb the Al3+ leading to lower yields.\n' +
			'\n' +
			'Our bodies absorb only a small amount of the aluminium we take in with our food. Foods with above average amounts of aluminium are tea, processed cheese, lentils and sponge cakes (where it comes from the raising agent). Cooking in aluminium pans does not greatly increase the amount in our diet, except when cooking acidic foods such as rhubarb. Some indigestion tablets are pure aluminium hydroxide.\n' +
			'\n' +
			'Aluminium can accumulate in the body, and a link with Alzheimer’s disease (senile dementia) has been suggested but not proven.',
		natural : 'Aluminium is the most abundant metal in the Earth’s crust (8.1%) but is rarely found uncombined in nature. It is usually found in minerals such as bauxite and cryolite. These minerals are aluminium silicates.\n' +
			'\n' +
			'Most commercially produced aluminium is extracted by the Hall–Héroult process. In this process aluminium oxide is dissolved in molten cryolite and then electrolytically reduced to pure aluminium. Making aluminium is very energy intensive. 5% of the electricity generated in the USA is used in aluminium production. However, once it has been made it does not readily corrode and can be easily recycled.',
		imageText : 'Aircraft fuselages and aluminium foil are just two of the many and varied uses of this element\n',
		history : 'The analysis of a curious metal ornament found in the tomb of Chou-Chu, a military leader in 3rd century China, turned out to be 85% aluminium. How it was produced remains a mystery. By the end of the 1700s, aluminium oxide was known to contain a metal, but it defeated all attempts to extract it. Humphry Davy had used electric current to extract sodium and potassium from their so-called ‘earths’ (oxides), but his method did not release aluminium in the same way. The first person to produce it was Hans Christian Oersted at Copenhagen, Denmark, in 1825, and he did it by heating aluminium chloride with potassium. Even so, his sample was impure. It fell to the German chemist Friedrich Wöhler to perfect the method in 1827, and obtain pure aluminium for the first time by using sodium instead of potassium.'
	},
	14: {
		ab : 'Si',
		name : 'Silicon',
		mass : 27.977,
		masses : [
			[28.976, 4.685],
			[29.974, 3.092]
		],
		abundance : 92.223,
		color : 'purple',
		value : 14,
		origin : 'The name is derived from the Latin \'silex\' or \'silicis\', meaning flint. ',
		appearance : 'The element, when ultrapure, is a solid with a blue-grey metallic sheen.\n',
		uses : 'Silicon is one of the most useful elements to mankind. Most is used to make alloys including aluminium-silicon and ferro-silicon (iron-silicon). These are used to make dynamo and transformer plates, engine blocks, cylinder heads and machine tools and to deoxidise steel.\n' +
			'\n' +
			'Silicon is also used to make silicones. These are silicon-oxygen polymers with methyl groups attached. Silicone oil is a lubricant and is added to some cosmetics and hair conditioners. Silicone rubber is used as a waterproof sealant in bathrooms and around windows, pipes and roofs.\n' +
			'\n' +
			'The element silicon is used extensively as a semiconductor in solid-state devices in the computer and microelectronics industries. For this, hyperpure silicon is needed. The silicon is selectively doped with tiny amounts of boron, gallium, phosphorus or arsenic to control its electrical properties.\n' +
			'\n' +
			'Granite and most other rocks are complex silicates, and these are used for civil engineering projects. Sand (silicon dioxide or silica) and clay (aluminium silicate) are used to make concrete and cement. Sand is also the principal ingredient of glass, which has thousands of uses. Silicon, as silicate, is present in pottery, enamels and high-temperature ceramics.\n' +
			'\n' +
			'Silicon carbides are important abrasives and are also used in lasers.',
		biological : 'Silicon is essential to plant life but its use in animal cells is uncertain. Phytoliths are tiny particles of silica that form within some plants. Since these particles do not rot they remain in fossils and provide us with useful evolutionary evidence.\n' +
			'\n' +
			'Silicon is non-toxic but some silicates, such as asbestos, are carcinogenic. Workers, such as miners and stonecutters, who are exposed to siliceous dust can develop a serious lung disease called silicosis.',
		natural : 'Silicon makes up 27.7% of the Earth’s crust by mass and is the second most abundant element (oxygen is the first). It does not occur uncombined in nature but occurs chiefly as the oxide (silica) and as silicates. The oxide includes sand, quartz, rock crystal, amethyst, agate, flint and opal. The silicate form includes asbestos, granite, hornblende, feldspar, clay and mica.\n' +
			'\n' +
			'Elemental silicon is produced commercially by reducing sand with carbon in an electric furnace. High-purity silicon, for the electronics industry, is prepared by the thermal decomposition of ultra-pure trichlorosilane, followed by recrystallisation.',
		imageText : 'The image is based on a diatom. Diatoms are photosynthesising algae. They are unique in that their cell walls are made of silica (hydrated silicon dioxide).\n',
		history : 'Silica (SiO2) in the form of sharp flints were among the first tools made by humans. The ancient civilizations used other forms of silica such as rock crystal, and knew how to turn sand into glass. Considering silicon’s abundance, it is somewhat surprising that it aroused little curiosity among early chemists.\n' +
			'\n' +
			'Attempts to reduce silica to its components by electrolysis had failed. In 1811, Joseph Gay Lussac and Louis Jacques Thénard reacted silicon tetrachloride with potassium metal and produced some very impure form of silicon. The credit for discovering silicon really goes to the Swedish chemist Jöns Jacob Berzelius of Stockholm who, in 1824, obtained silicon by heating potassium fluorosilicate with potassium. The product was contaminated with potassium silicide, but he removed this by stirring it with water, with which it reacts, and thereby obtained relatively pure silicon powder.'
	},
	15: {
		ab : 'P',
		name : 'Phosphorus',
		mass : 30.974,
		abundance : 100,
		color : 'grey',
		value : 15,
		origin : 'The name is derived from the Greek \'phosphoros\', meaning bringer of light. ',
		appearance : 'The two main forms of phosphorus are white phosphorus and red phosphorus. White phosphorus is a poisonous waxy solid and contact with skin can cause severe burns. It glows in the dark and is spontaneously flammable when exposed to air. Red phosphorus is an amorphous non-toxic solid.\n',
		uses : 'White phosphorus is used in flares and incendiary devices. Red phosphorus is in the material stuck on the side of matchboxes, used to strike safety matches against to light them.\n' +
			'\n' +
			'By far the largest use of phosphorus compounds is for fertilisers. Ammonium phosphate is made from phosphate ores. The ores are first converted into phosphoric acids before being made into ammonium phosphate.\n' +
			'\n' +
			'Phosphorus is also important in the production of steel. Phosphates are ingredients in some detergents, but are beginning to be phased out in some countries. This is because they can lead to high phosphate levels in natural water supplies causing unwanted algae to grow. Phosphates are also used in the production of special glasses and fine chinaware.\n',
		biological : 'Phosphorus is essential to all living things. It forms the sugar-phosphate backbone of DNA and RNA. It is important for energy transfer in cells as part of ATP (adenosine triphosphate), and is found in many other biologically important molecules. We take in about 1 gram of phosphate a day, and store about 750 grams in our bodies, since our bones and teeth are mainly calcium phosphate. Over-use of phosphates from fertilisers and detergents can cause them to pollute rivers and lakes causing algae to grow rapidly. The algae block out light stopping further photosynthesis. Oxygen dissolved in the water soon gets used up and the lake dies.',
		natural : 'Phosphorus is not found uncombined in nature, but is widely found in compounds in minerals. An important source is phosphate rock, which contains the apatite minerals and is found in large quantities in the USA and elsewhere. There are fears that ‘peak phosphorus’ will occur around 2050, after which our sources will dwindle.\n' +
			'\n' +
			'White phosphorus is manufactured industrially by heating phosphate rock in the presence of carbon and silica in a furnace. This produces phosphorus as a vapour, which is then collected under water. Red phosphorus is made by gently heating white phosphorus to about 250°C in the absence of air.',
		imageText : 'The image is of a ball-and-stick model of white phosphorus. It has a tetrahedral shape and has the formula P4.',
		history : 'Phosphorus was first made by Hennig Brandt at Hamburg in 1669 when he evaporated urine and heated the residue until it was red hot, whereupon phosphorus vapour distilled which he collected by condensing it in water. Brandt kept his discovery secret, thinking he had discovered the Philosopher’s Stone that could turn base metals into gold. When he ran out of money, he sold phosphorus to Daniel Kraft who exhibited it around Europe including London where Robert Boyle was fascinated by it. He discovered how it was produced and investigated it systematically. (His assistant Ambrose Godfrey set up his own business making and selling phosphorus and became rich.)\n' +
			'\n' +
			'When it was realised that bone was calcium phosphate, and could be used to make phosphorus, and it became more widely available. Demand from match manufacturers in the 1800s ensured a ready market.'
	},
	16: {
		ab : 'S',
		name : 'Sulfur',
		mass : 31.972,
		masses : [
			[32.971, 0.75],
			[33.968, 4.25],
			[35.967, 0.01]
		],
		abundance : 94.99,
		color : 'orange',
		value : 16,
		origin : 'The name is derived either from the Sanskrit \'sulvere\', or the Latin \'sulfurium\'. ',
		appearance : 'There are several allotropes of sulfur. The most common appears as yellow crystals or powder.',
		uses : 'Sulfur is used in the vulcanisation of black rubber, as a fungicide and in black gunpowder. Most sulfur is, however, used in the production of sulfuric acid, which is perhaps the most important chemical manufactured by western civilisations. The most important of sulfuric acid’s many uses is in the manufacture of phosphoric acid, to make phosphates for fertilisers.\n' +
			'\n' +
			'Mercaptans are a family of organosulfur compounds. Some are added to natural gas supplies because of their distinctive smell, so that gas leaks can be detected easily. Others are used in silver polish, and in the production of pesticides and herbicides.\n' +
			'\n' +
			'Sulfites are used to bleach paper and as preservatives for many foodstuffs. Many surfactants and detergents are sulfate derivatives. Calcium sulfate (gypsum) is mined on the scale of 100 million tonnes each year for use in cement and plaster.',
		biological : 'Sulfur is essential to all living things. It is taken up as sulfate from the soil (or seawater) by plants and algae. It is used to make two of the essential amino acids needed to make proteins. It is also needed in some co-enzymes. The average human contains 140 grams and takes in about 1 gram a day, mainly in proteins.\n' +
			'\n' +
			'Sulfur and sulfate are non-toxic. However, carbon disulfide, hydrogen sulfide and sulfur dioxide are all toxic. Hydrogen sulfide is particularly dangerous and can cause death by respiratory paralysis.\n' +
			'\n' +
			'Sulfur dioxide is produced when coal and unpurified oil are burned. Sulfur dioxide in the atmosphere causes acid rain. This can cause lakes to die, partly by making toxic aluminium salts soluble, so that they are taken up by living things.',
		natural : 'Sulfur occurs naturally as the element, often in volcanic areas. This has traditionally been a major source for human use. It is also widely found in many minerals including iron pyrites, galena, gypsum and Epsom salts.\n' +
			'\n' +
			'Elemental sulfur was once commercially recovered from wells by the Frasch process. This involved forcing super-heated steam into the underground deposits to melt the sulfur, so it could be pumped to the surface as a liquid.\n' +
			'\n' +
			'Modern sulfur production is almost entirely from the various purification processes used to remove sulfur from natural gas, oil and tar sands. All living things contain sulfur and when fossilised (as in fossil fuels) the sulfur remains present. If unpurified fossil fuels are burnt, sulfur dioxide can enter the atmosphere, leading to acid rain.',
		imageText : 'The alchemical symbol for sulfur is shown against a ‘fire and brimstone’ background.',
		history : 'Sulfur is mentioned 15 times in the Bible, and was best known for destroying Sodom and Gomorrah. It was also known to the ancient Greeks, and burnt as a fumigant. Sulfur was mined near Mount Etna in Sicily and used for bleaching cloth and preserving wine, both of which involved burning it to form sulfur dioxide, and allowing this to be absorbed by wet clothes or the grape juice. For centuries, sulfur along with mercury and salt, was believed to be a component of all metals and formed the basis of alchemy whereby one metal could be transmuted into another.\n' +
			'\n' +
			'Antoine Lavoisier thought that sulfur was an element, but in 1808 Humphry Davy said it contained hydrogen. However, his sample was impure and when Louis-Josef Gay-Lussac and Louis-Jacques Thénard proved it to be an element the following year, Davy eventually agreed.'
	},
	17: {
		ab : 'Cl',
		name : 'Chlorine',
		mass : 34.969,
		masses : [
			[36.966, 24.24]
		],
		abundance : 75.76,
		color : 'tangerine',
		value : 17,
		origin : 'The name is derived from the Greek \'chloros\', meaning greenish yellow. \n',
		appearance : 'A yellowy-green dense gas with a choking smell.\n',
		uses : 'Chlorine kills bacteria – it is a disinfectant. It is used to treat drinking water and swimming pool water. It is also used to make hundreds of consumer products from paper to paints, and from textiles to insecticides.\n' +
			'\n' +
			'About 20% of chlorine produced is used to make PVC. This is a very versatile plastic used in window frames, car interiors, electrical wiring insulation, water pipes, blood bags and vinyl flooring.\n' +
			'\n' +
			'Another major use for chlorine is in organic chemistry. It is used as an oxidising agent and in substitution reactions. 85% of pharmaceuticals use chlorine or its compounds at some stage in their manufacture.\n' +
			'\n' +
			'In the past chlorine was commonly used to make chloroform (an anaesthetic) and carbon tetrachloride (a dry-cleaning solvent). However, both of these chemicals are now strictly controlled as they can cause liver damage.\n' +
			'\n' +
			'Chlorine gas is itself very poisonous, and was used as a chemical weapon during the First World War.\n',
		biological : 'The chloride ion is essential to life. It is mostly present in cell fluid as a negative ion to balance the positive (mainly potassium) ions. It is also present in extra-cellular fluid (eg blood) to balance the positive (mainly sodium) ions.\n' +
			'\n' +
			'We get most of the chloride we need from salt. Typical daily salt intake is about 6 grams, but we could manage with half this amount.\n',
		natural : 'Chlorine is not found uncombined in nature. Halite (sodium chloride or ‘common salt’) is the main mineral that is mined for chlorine. Sodium chloride is a very soluble salt that has been leached into the oceans over the lifetime of the Earth. Several salt beds, or ‘lakes’ are found where ancient seas have evaporated, and these can be mined for chloride.\n' +
			'\n' +
			'Chlorine is also found in the minerals carnallite (magnesium potassium chloride) and sylvite (potassium chloride).\n' +
			'\n' +
			'40 million tonnes of chlorine gas are made each year from the electrolysis of brine (sodium chloride solution). This process also produces useful sodium hydroxide.',
		imageText : 'The symbol shows a gas mask. This is because chlorine is a toxic gas, and has been used as a chemical weapon. Chlorine is yellowy-green in colour, as is the image.\n',
		history : 'Hydrochloric acid (HCl) was known to the alchemists. The gaseous element itself was first produced in 1774 by Carl Wilhelm Scheele at Uppsala, Sweden, by heating hydrochloric acid with the mineral pyrolusite which is naturally occuring manganese dioxide, MnO2. A dense, greenish-yellow gas was evolved which he recorded as having a choking smell and which dissolved in water to give an acid solution. He noted that it bleached litmus paper, and decolourised leaves and flowers.\n' +
			'\n' +
			'Humphry Davy investigated it in 1807 and eventually concluded not only that it was a simple substance, but that it was truly an element. He announced this in 1810 and yet it took another ten years for some chemists finally to accept that chlorine really was an element.'
	},
	18: {
		ab : 'Ar',
		name : 'Argon',
		mass : 39.962,
		masses : [
			[35.968, 0.3336],
			[37.963, 0.0629]
		],
		abundance : 99.6035,
		color : 'yellow',
		value : 18,
		origin : 'The name is derived from the Greek, \'argos\', meaning idle. \n',
		appearance : 'Argon is a colourless, odourless gas that is totally inert to other substances.\n',
		uses : 'Argon is often used when an inert atmosphere is needed. It is used in this way for the production of titanium and other reactive elements. It is also used by welders to protect the weld area and in incandescent light bulbs to stop oxygen from corroding the filament.\n' +
			'\n' +
			'Argon is used in fluorescent tubes and low-energy light bulbs. A low-energy light bulb often contains argon gas and mercury. When it is switched on an electric discharge passes through the gas, generating UV light. The coating on the inside surface of the bulb is activated by the UV light and it glows brightly.\n' +
			'\n' +
			'Double-glazed windows use argon to fill the space between the panes. The tyres of luxury cars can contain argon to protect the rubber and reduce road noise.\n',
		biological : 'Argon has no known biological role.\n',
		natural : 'Argon makes up 0.94% of the Earth’s atmosphere and is the third most abundant atmospheric gas. Levels have gradually increased since the Earth was formed because radioactive potassium-40 turns into argon as it decays. Argon is obtained commercially by the distillation of liquid air.',
		imageText : 'The image reflects the use of the element in the welding industry. Argon provides an inert atmosphere in which welded metals will not oxidise.\n',
		history : 'Although argon is abundant in the Earth’s atmosphere, it evaded discovery until 1894 when Lord Rayleigh and William Ramsay first separated it from liquid air. In fact the gas had been isolated in 1785 by Henry Cavendish who had noted that about 1% of air would not react even under the most extreme conditions. That 1% was argon.\n' +
			'\n' +
			'Argon was discovered as a result of trying to explain why the density of nitrogen extracted from air differed from that obtained by the decomposition of ammonia.\n' +
			'\n' +
			'Ramsay removed all the nitrogen from the gas he had extracted from air, and did this by reacting it with hot magnesium, forming the solid magnesium nitride. He was then left with a gas that would not react and when he examined its spectrum he saw new groups of red and green lines, confirming that it was a new element.'
	},
	19: {
		ab : 'K',
		name : 'Potassium',
		mass : 38.964,
		masses : [
			[39.964, 0.0117],
			[40.962, 6.7302]
		],
		abundance : 93.2581,
		color : 'pink',
		value : 19,
		origin : 'The name is derived from the English word \'potash\'. \n',
		appearance : 'A soft, silvery metal that tarnishes in air within minutes.',
		uses : 'The greatest demand for potassium compounds is in fertilisers. Many other potassium salts are of great importance, including the nitrate, carbonate, chloride, bromide, cyanide and sulfate. Potassium carbonate is used in the manufacture of glass. Potassium hydroxide is used to make detergent and liquid soap. Potassium chloride is used in pharmaceuticals and saline drips.',
		biological : 'Potassium is essential to life. Potassium ions are found in all cells. It is important for maintaining fluid and electrolyte balance.\n' +
			'\n' +
			'Plant cells are particularly rich in potassium, which they get from the soil. Agricultural land, from which harvests are taken every year, needs to have its potassium replenished by adding potassium-based fertilisers.\n' +
			'\n' +
			'The average human consumes up to 7 grams of potassium a day, and stores about 140 grams in the body cells. A normal healthy diet contains enough potassium, but some foods such as instant coffee, sardines, nuts, raisins, potatoes and chocolate have above average potassium content.\n' +
			'\n' +
			'The naturally occurring isotope potassium-40 is radioactive and, although this radioactivity is mild, it may be one natural cause of genetic mutation in humans.',
		natural : 'Potassium is the seventh most abundant metal in the Earth’s crust. It makes up 2.4% by mass. There are deposits of billions of tonnes of potassium chloride throughout the world. Mining extracts about 35 million tonnes a year.\n' +
			'\n' +
			'Most potassium minerals are found in igneous rocks and are sparingly soluble. The metal is difficult to obtain from these minerals. There are, however, other minerals such as sylvite (potassium chloride), sylvinite (a mixture of potassium and sodium chloride) and carnallite (potassium magnesium chloride) that are found in deposits formed by evaporation of old seas or lakes. The potassium salts can be easily recovered from these. Potassium salts are also found in the ocean but in smaller amounts compared with sodium.',
		imageText : 'The image features the alchemical symbol for potash, from which the element was first isolated.',
		history : 'Potassium salts in the form of saltpetre (potassium nitrate, KNO3), alum (potassium aluminium sulfate, KAl(SO4)2), and potash (potassium carbonate, K2CO3) have been known for centuries. They were used in gunpowder, dyeing, and soap making. They were scraped from the walls of latrines, manufactured from clay and sulfuric acid, and collected as wood ash respectively. Reducing them to the element defeated the early chemists and potassium was classed as an ‘earth’ by Antoine Lavoisier. Then in 1807, Humphry Davy exposed moist potash to an electric current and observed the formation of metallic globules of a new metal, potassium. He noted that when they were dropped into water they skimmed around on the surface, burning with a lavender-coloured flame.'
	},
	20: {
		ab : 'Ca',
		name : 'Calcium',
		mass : 39.963,
		masses : [
			[41.959, 0.647],
			[42.959, 0.135],
			[43.955, 2.086],
			[45.954, 0.004],
			[47.953, 0.187]
		],
		abundance : 96.941,
		color : 'pinkl',
		value : 20,
		origin : 'The name is derived from the Latin \'calx\' meaning lime. \n',
		appearance : 'Calcium is a silvery-white, soft metal that tarnishes rapidly in air and reacts with water.\n',
		uses : 'Calcium metal is used as a reducing agent in preparing other metals such as thorium and uranium. It is also used as an alloying agent for aluminium, beryllium, copper, lead and magnesium alloys.\n' +
			'\n' +
			'Calcium compounds are widely used. There are vast deposits of limestone (calcium carbonate) used directly as a building stone and indirectly for cement. When limestone is heated in kilns it gives off carbon dioxide gas leaving behind quicklime (calcium oxide). This reacts vigorously with water to give slaked lime (calcium hydroxide). Slaked lime is used to make cement, as a soil conditioner and in water treatment to reduce acidity, and in the chemicals industry. It is also used in steel making to remove impurities from the molten iron ore. When mixed with sand, slaked lime takes up carbon dioxide from the air and hardens as lime plaster.\n' +
			'\n' +
			'Gypsum (calcium sulfate) is used by builders as a plaster and by nurses for setting bones, as ‘plaster of Paris’.\n',
		biological : 'Calcium is essential to all living things, particularly for the growth of healthy teeth and bones. Calcium phosphate is the main component of bone. The average human contains about 1 kilogram of calcium.\n' +
			'\n' +
			'Children and pregnant women are encouraged to eat foods rich in calcium, such as milk and dairy products, leafy green vegetables, fish and nuts and seeds.\n',
		natural : 'Calcium is the fifth most abundant metal in the Earth’s crust (4.1%). It is not found uncombined in nature, but occurs abundantly as limestone (calcium carbonate), gypsum (calcium sulfate), fluorite (calcium fluoride) and apatite (calcium chloro- or fluoro-phosphate).\n' +
			'\n' +
			'Hard water contains dissolved calcium bicarbonate. When this filters through the ground and reaches a cave, it precipitates out to form stalactites and stalagmites.\n' +
			'\n' +
			'Calcium metal is prepared commercially by heating lime with aluminium in a vacuum.\n',
		imageText : 'The spiral shell and bones reflect the essential presence of calcium in all living things.',
		history : 'Lime (calcium oxide, CaO) was the useful material obtained by heating limestone and used for centuries to make plaster and mortar. Antoine Lavoisier classified it as an ‘earth’ because it seemed impossible to reduce it further, but he suspected it was the oxide of an unknown element. In 1808, Humphry Davy tried to reduce moist lime by electrolysis, just as he had done with sodium and potassium, but he was not successful. So he tried a mixture of lime and mercury oxide and while this produced an amalgam of calcium and mercury, it was not enough to confirm that he’d obtained a new element. (Jöns Jacob Berzelius had conducted a similar experiment and also obtained the amalgam.) Davy tried using more lime in the mixture and produced more of the amalgam from which he distilled off the mercury leaving just calcium.\n'
	},
	21: {
		ab : 'Sc',
		name : 'Scandium',
		mass : 44.956,
		abundance : 100,
		color : 'blue',
		value : 21,
		origin : 'The name derives from \'Scandia\', the Latin name for Scandinavia. \n',
		appearance : 'A silvery metal that tarnishes in air, burns easily and reacts with water.\n',
		uses : 'Scandium is mainly used for research purposes. It has, however, great potential because it has almost as low a density as aluminium and a much higher melting point. An aluminium-scandium alloy has been used in Russian MIG fighter planes, high-end bicycle frames and baseball bats.\n' +
			'\n' +
			'Scandium iodide is added to mercury vapour lamps to produce a highly efficient light source resembling sunlight. These lamps help television cameras to reproduce colour well when filming indoors or at night-time.\n' +
			'\n' +
			'The radioactive isotope scandium-46 is used as a tracer in oil refining to monitor the movement of various fractions. It can also be used in underground pipes to detect leaks.\n',
		biological : 'Scandium has no known biological role. It is a suspected carcinogen.\n',
		natural : 'Scandium is very widely distributed, and occurs in minute quantities in over 800 mineral species. It is the main component of the very rare and collectable mineral thortveitite, found in Scandinavia.\n' +
			'\n' +
			'Scandium can be recovered from thortveitite or extracted as a by-product from uranium mill tailings (sandy waste material). Metallic scandium can be prepared by reducing the fluoride with calcium metal. It can also be prepared by electrolysing molten potassium, lithium and scandium chlorides, using electrodes of tungsten wire and molten zinc.',
		imageText : 'The element’s name is derived from the Latin name for Scandinavia. The image reflects this with an ancient Scandinavian figurine and carved runic standing stone.\n',
		history : 'In 1869, Mendeleev noticed that there was a gap in atomic weights between calcium (40) and titanium (48) and predicted there was an undiscovered element of intermediate atomic weight. He forecast that its oxide would be X2O3. It was discovered as scandium in 1879, by Lars Frederik Nilson of the University of Uppsala, Sweden. He extracted it from euxenite, a complex mineral containing eight metal oxides. He had already extracted erbium oxide from euxenite, and from this oxide he obtained ytterbium oxide and then another oxide of a lighter element whose atomic spectrum showed it to be an unknown metal. This was the metal that Mendeleev had predicted and its oxide was Sc2O3.\n' +
			'\n' +
			'Scandium metal itself was only produced in 1937 by the electrolysis of molten scandium chloride.'
	},
	22: {
		ab : 'Ti',
		name : 'Titanium',
		mass : 47.948,
		masses : [
			[45.953, 8.25],
			[46.952, 7.44],
			[48.948, 5.41],
			[49.945, 5.18]
		],
		abundance : 73.72,
		color : 'blue',
		value : 22,
		origin : 'The name is derived from the Titans, the sons of the Earth goddess of Greek mythology. \n',
		appearance : 'A hard, shiny and strong metal.\n',
		uses : 'Titanium is as strong as steel but much less dense. It is therefore important as an alloying agent with many metals including aluminium, molybdenum and iron. These alloys are mainly used in aircraft, spacecraft and missiles because of their low density and ability to withstand extremes of temperature. They are also used in golf clubs, laptops, bicycles and crutches.\n' +
			'\n' +
			'Power plant condensers use titanium pipes because of their resistance to corrosion. Because titanium has excellent resistance to corrosion in seawater, it is used in desalination plants and to protect the hulls of ships, submarines and other structures exposed to seawater.\n' +
			'\n' +
			'Titanium metal connects well with bone, so it has found surgical applications such as in joint replacements (especially hip joints) and tooth implants.\n' +
			'\n' +
			'The largest use of titanium is in the form of titanium(IV) oxide. It is extensively used as a pigment in house paint, artists’ paint, plastics, enamels and paper. It is a bright white pigment with excellent covering power. It is also a good reflector of infrared radiation and so is used in solar observatories where heat causes poor visibility.\n' +
			'\n' +
			'Titanium(IV) oxide is used in sunscreens because it prevents UV light from reaching the skin. Nanoparticles of titanium(IV) oxide appear invisible when applied to the skin.\n',
		biological : 'Titanium has no known biological role. It is non-toxic. Fine titanium dioxide dust is a suspected carcinogen.\n',
		natural : 'Titanium is the ninth most abundant element on Earth. It is almost always present in igneous rocks and the sediments derived from them. It occurs in the minerals ilmenite, rutile and sphene and is present in titanates and many iron ores.\n' +
			'\n' +
			'Titanium is produced commercially by reducing titanium(IV) chloride with magnesium. Titanium(IV) oxide is produced commercially by either the ‘sulfate process’ or the ‘chloride process’, both of which use the mineral ilmenite as a starting material.\n',
		imageText : 'The symbol is representative of the Titans of Greek mythology, after which the element is named. It is based on early votive offering figurines.\n',
		history : 'The first titanium mineral, a black sand called menachanite, was discovered in 1791 in Cornwall by the Reverend William Gregor. He analysed it and deduced it was made up of the oxides of iron and an unknown metal, and reported it as such to the Royal Geological Society of Cornwall.\n' +
			'\n' +
			'In 1795, the German scientist Martin Heinrich Klaproth of Berlin investigated a red ore known as Schörl from Hungary. This is a form of rutile (TiO2) and Klaproth realised it was the oxide of a previously unknown element which he named titanium. When he was told of Gregor’s discovery he investigated menachanite and confirmed it too contained titanium.\n' +
			'\n' +
			'It was not until 1910 that M. A. Hunter, working for General Electric in the USA, made pure titanium metal by heating titanium tetrachloride and sodium metal.\n'
	},
	23: {
		ab : 'V',
		name : 'Vanadium',
		mass : 50.944,
		masses : [49.947, 0.25],
		abundance : 99.75,
		color : 'blue',
		value : 23,
		origin : 'The element is named after \'Vanadis\', the old Norse name for the Scandinavian goddess Freyja. \n',
		appearance : 'A silvery metal that resists corrosion.\n',
		uses : 'About 80% of the vanadium produced is used as a steel additive. Vanadium-steel alloys are very tough and are used for armour plate, axles, tools, piston rods and crankshafts. Less than 1% of vanadium, and as little chromium, makes steel shock resistant and vibration resistant. Vanadium alloys are used in nuclear reactors because of vanadium’s low neutron-absorbing properties.\n' +
			'\n' +
			'Vanadium(V) oxide is used as a pigment for ceramics and glass, as a catalyst and in producing superconducting magnets.\n',
		biological : 'Vanadium is essential to some species, including humans, although we need very little. We take in just 0.01 milligrams each day, and this is more than sufficient for our needs. In some compounds vanadium can become toxic.\n',
		natural : 'Vanadium is found in about 65 different minerals including vanadinite, carnotite and patronite. It is also found in phosphate rock, certain iron ores and some crude oils in the form of organic complexes.\n' +
			'\n' +
			'Vanadium metal is obtained by reducing vanadium(V) oxide with calcium in a pressure vessel. Vanadium of high purity can be obtained by reducing vanadium(III) chloride with magnesium.\n',
		imageText : 'The symbol is based on an 8th-century figurine of the Scandinavian goddess Freyja, after whom the element is named. It is set against a text from an Icelandic saga written in the 13th century.\n',
		history : 'Vanadium was discovered twice. The first time was in 1801 by Andrés Manuel del Rio who was Professor of Mineralogy in Mexico City. He found it in a specimen of vanadite, Pb5(VO4)3Cl and sent a sample to Paris. However, French chemists concluded that it was a chromium mineral.\n' +
			'\n' +
			'The second time vanadium was discovered was in 1831 by the Swedish chemist Nil Gabriel Selfström at Stockholm. He separated it from a sample of cast iron made from ore that had been mined at Småland. He was able to show that it was a new element, and in so doing he beat a rival chemist, Friedrich Wöhler, to the discovery He was also working another vanadium mineral from Zimapan.\n' +
			'\n' +
			'Pure vanadium was produced by Henry Roscoe at Manchester, in 1869, and he showed that previous samples of the metal were really vanadium nitride (VN).'
	},
	24: {
		ab : 'Cr',
		name : 'Chromium',
		mass : 51.941,
		masses : [
			[49.946, 4.345],
			[52.941, 9.501],
			[53.939,2.365]
		],
		abundance : 83.789,
		color : 'blue',
		value : 24,
		origin : 'The name is derived from the Greek \'chroma\', meaning colour. \n',
		appearance : 'A hard, silvery metal with a blue tinge.\n',
		uses : 'Chromium is used to harden steel, to manufacture stainless steel (named as it won’t rust) and to produce several alloys.\n' +
			'\n' +
			'Chromium plating can be used to give a polished mirror finish to steel. Chromium-plated car and lorry parts, such as bumpers, were once very common. It is also possible to chromium plate plastics, which are often used in bathroom fittings.\n' +
			'\n' +
			'About 90% of all leather is tanned using chrome. However, the waste effluent is toxic so alternatives are being investigated.\n' +
			'\n' +
			'Chromium compounds are used as industrial catalysts and pigments (in bright green, yellow, red and orange colours). Rubies get their red colour from chromium, and glass treated with chromium has an emerald green colour.\n',
		biological : 'Chromium is an essential trace element for humans because it helps us to use glucose. However, it is poisonous in excess. We take in about 1 milligram a day. Foods such as brewer’s yeast, wheat germ and kidney are rich in chromium.',
		natural : 'Chromium is found mainly in chromite. This ore is found in many places including South Africa, India, Kazakhstan and Turkey. Chromium metal is usually produced by reducing chromite with carbon in an electric-arc furnace, or reducing chromium(III) oxide with aluminium or silicon.',
		imageText : 'The image reflects the toxic nature of the metal and its ‘mirror shine’ when polished.\n',
		history : 'Chromium was discovered by the French chemist Nicholas Louis Vauquelin at Paris in1798. He was intrigued by a bright red mineral that had been discovered in a Siberian gold mine in 1766 and was referred to as Siberian red lead. It is now known as crocoite and is a form of lead chromate. Vauquelin analysed it and confirmed that it was a lead mineral. Then he dissolved it in acid, precipitated the lead, filtered this off, and focused his attention on the remaining liquor from which he succeeded in isolating chromium. Intrigued by the range of colours that it could produce in solution, he named it chromium from the Greek word chroma meaning colour. He then discovered that the green colouration of emeralds was also due to chromium'
	},
	25: {
		ab : 'Mn',
		name : 'Manganese',
		mass : 54.938,
		abundance : 100,
		color : 'blue',
		value : 25,
		origin : 'The derivation of Manganese may have come from one of two routes: either from the Latin \'magnes\', meaning magnet, or from the black magnesium oxide, \'magnesia nigra\'.  \n',
		appearance : 'A hard, brittle, silvery metal.\n',
		uses : 'Manganese is too brittle to be of much use as a pure metal. It is mainly used in alloys, such as steel.\n' +
			'\n' +
			'Steel contains about 1% manganese, to increase the strength and also improve workability and resistance to wear.\n' +
			'\n' +
			'Manganese steel contains about 13% manganese. This is extremely strong and is used for railway tracks, safes, rifle barrels and prison bars.\n' +
			'\n' +
			'Drinks cans are made of an alloy of aluminium with 1.5% manganese, to improve resistance to corrosion. With aluminium, antimony and copper it forms highly magnetic alloys.\n' +
			'\n' +
			'Manganese(IV) oxide is used as a catalyst, a rubber additive and to decolourise glass that is coloured green by iron impurities. Manganese sulfate is used to make a fungicide. Manganese(II) oxide is a powerful oxidising agent and is used in quantitative analysis. It is also used to make fertilisers and ceramics.\n',
		biological : 'Manganese is an essential element in all known living organisms. Many types of enzymes contain manganese. For example, the enzyme responsible for converting water molecules to oxygen during photosynthesis contains four atoms of manganese.\n' +
			'\n' +
			'Some soils have low levels of manganese and so it is added to some fertilisers and given as a food supplement to grazing animals.\n' +
			'\n' +
			'The average human body contains about 12 milligrams of manganese. We take in about 4 milligrams each day from such foods as nuts, bran, wholegrain cereals, tea and parsley. Without it, bones grow spongier and break more easily. It is also essential for utilisation of vitamin B1.\n',
		natural : 'Manganese is the fifth most abundant metal in the Earth’s crust. Its minerals are widely distributed, with pyrolusite (manganese dioxide) and rhodochrosite (manganese carbonate) being the most common.\n' +
			'\n' +
			'The main mining areas for manganese are in China, Africa, Australia and Gabon. The metal is obtained by reducing the oxide with sodium, magnesium or aluminium, or by the electrolysis of manganese sulfate.\n' +
			'\n' +
			'Manganese nodules have been found on the floor of the oceans. These nodules contain about 24% manganese, along with smaller amounts of many other elements.',
		imageText : 'The image is of an antique electromagnet and a cow. The electromagnet is because manganese may have got its name from the Latin word for magnet. The cow reflects the importance of the element as a food supplement for grazing animals.\n',
		history : 'Manganese in the form of the black ore pyrolucite (manganese dioxide, MnO2) was used by the pre-historic cave painters of the Lascaux region of France around 30,000 years ago. In more recent times was used by glass makers to remove the pale greenish tint of natural glass.\n' +
			'\n' +
			'In 1740, the Berlin glass technologist Johann Heinrich Pott investigated it chemically and showed that it contained no iron as has been assumed. From it he was able to make potassium permanganate (KMnO4), one of the strongest oxidising agents known. Several chemists in the 1700s tried unsuccessfully to isolate the metal component in pyrolusite. The first person to do this was the Swedish chemist and mineralogist Johan Gottlieb Gahn in 1774. However, a student at Vienna, Ignatius Kaim, had already described how he had produced manganese metal, in his dissertation written in 1771.'
	},
	26: {
		ab : 'Fe',
		name : 'Iron',
		mass : 55.935,
		masses : [
			[53.940, 5.845],
			[56.935, 2.119],
			[57.933,0.282]
		],
		abundance : 91.754,
		color : 'blue',
		value : 26,
		origin : 'The name comes from the Anglo-Saxon name \'iren\'. \n',
		appearance : 'A shiny, greyish metal that rusts in damp air.\n',
		uses : 'Iron is an enigma – it rusts easily, yet it is the most important of all metals. 90% of all metal that is refined today is iron.\n' +
			'\n' +
			'Most is used to manufacture steel, used in civil engineering (reinforced concrete, girders etc) and in manufacturing.\n' +
			'\n' +
			'There are many different types of steel with different properties and uses. Ordinary carbon steel is an alloy of iron with carbon (from 0.1% for mild steel up to 2% for high carbon steels), with small amounts of other elements.\n' +
			'\n' +
			'Alloy steels are carbon steels with other additives such as nickel, chromium, vanadium, tungsten and manganese. These are stronger and tougher than carbon steels and have a huge variety of applications including bridges, electricity pylons, bicycle chains, cutting tools and rifle barrels.\n' +
			'\n' +
			'Stainless steel is very resistant to corrosion. It contains at least 10.5% chromium. Other metals such as nickel, molybdenum, titanium and copper are added to enhance its strength and workability. It is used in architecture, bearings, cutlery, surgical instruments and jewellery.\n' +
			'\n' +
			'Cast iron contains 3–5% carbon. It is used for pipes, valves and pumps. It is not as tough as steel but it is cheaper. Magnets can be made of iron and its alloys and compounds.\n' +
			'\n' +
			'Iron catalysts are used in the Haber process for producing ammonia, and in the Fischer–Tropsch process for converting syngas (hydrogen and carbon monoxide) into liquid fuels.',
		biological : 'Iron is an essential element for all forms of life and is non-toxic. The average human contains about 4 grams of iron. A lot of this is in haemoglobin, in the blood. Haemoglobin carries oxygen from our lungs to the cells, where it is needed for tissue respiration.\n' +
			'\n' +
			'Humans need 10–18 milligrams of iron each day. A lack of iron will cause anaemia to develop. Foods such as liver, kidney, molasses, brewer’s yeast, cocoa and liquorice contain a lot of iron.\n',
		natural : 'Iron is the fourth most abundant element, by mass, in the Earth’s crust. The core of the Earth is thought to be largely composed of iron with nickel and sulfur.\n' +
			'\n' +
			'The most common iron-containing ore is haematite, but iron is found widely distributed in other minerals such as magnetite and taconite.\n' +
			'\n' +
			'Commercially, iron is produced in a blast furnace by heating haematite or magnetite with coke (carbon) and limestone (calcium carbonate). This forms pig iron, which contains about 3% carbon and other impurities, but is used to make steel. Around 1.3 billion tonnes of crude steel are produced worldwide each year.',
		imageText : 'The image is of the alchemical symbol for iron. The symbol is shown against a rusty mild steel plate.\n',
		history : 'Iron objects have been found in Egypt dating from around 3500 BC. They contain about 7.5% nickel, which indicates that they were of meteoric origin.\n' +
			'\n' +
			'The ancient Hittites of Asia Minor, today’s Turkey, were the first to smelt iron from its ores around 1500 BC and this new, stronger, metal gave them economic and political power. The Iron Age had begun. Some kinds of iron were clearly superior to others depending on its carbon content, although this was not appreciated. Some iron ore contained vanadium producing so-called Damascene steel, ideal for swords.\n' +
			'\n' +
			'The first person to explain the various types of iron was René Antoine Ferchault de Réaumur who wrote a book on the subject in 1722. This explained how steel, wrought iron, and cast iron, were to be distinguished by the amount of charcoal (carbon) they contained. The Industrial Revolution which began that same century relied extensively on this metal.'
	},
	27: {
		ab : 'Co',
		name : 'Cobalt',
		mass : 58.933,
		abundance : 100,
		color : 'blue',
		value : 27,
		origin : 'The name is derived from the German word \'kobald\', meaning goblin. ',
		appearance : 'A lustrous, silvery-blue metal. It is magnetic.\n',
		uses : 'Cobalt, like iron, can be magnetised and so is used to make magnets. It is alloyed with aluminium and nickel to make particularly powerful magnets.\n' +
			'\n' +
			'Other alloys of cobalt are used in jet turbines and gas turbine generators, where high-temperature strength is important.\n' +
			'\n' +
			'Cobalt metal is sometimes used in electroplating because of its attractive appearance, hardness and resistance to corrosion.\n' +
			'\n' +
			'Cobalt salts have been used for centuries to produce brilliant blue colours in paint, porcelain, glass, pottery and enamels.\n' +
			'\n' +
			'Radioactive cobalt-60 is used to treat cancer and, in some countries, to irradiate food to preserve it.',
		biological : 'Cobalt is an essential trace element, and forms part of the active site of vitamin B12. The amount we need is very small, and the body contains only about 1 milligram. Cobalt salts can be given to certain animals in small doses to correct mineral deficiencies. In large doses cobalt is carcinogenic.\n' +
			'\n' +
			'Cobalt-60 is a radioactive isotope. It is an important source of gamma-rays. It is widely used in cancer treatment, as a tracer and for radiotherapy.',
		natural : 'Cobalt is found in the minerals cobaltite, skutterudite and erythrite. Important ore deposits are found in DR Congo, Canada, Australia, Zambia and Brazil. Most cobalt is formed as a by-product of nickel refining.\n' +
			'\n' +
			'A huge reserve of several transition metals (including cobalt) can be found in strange nodules on the floors of the deepest oceans. The nodules are manganese minerals that take millions of years to form, and together they contain many tonnes of cobalt.',
		imageText : 'The image shows a goblin or ‘kobold’ (often accused of leading German miners astray in their search for tin). In the background is some early Chinese porcelain, which used the element cobalt to give it its blue glaze.\n',
		history : 'The tomb of Pharaoh Tutankhamen, who ruled from 1361-1352 BC, contained a small glass object coloured deep blue with cobalt. Cobalt blue was known even earlier in China and was used for pottery glazes.\n' +
			'\n' +
			'In 1730, chemist Georg Brandt of Stockholm became interested in a dark blue ore from some local copper workings and he eventually proved that it contained a hitherto unrecognised metal and he gave it the name by which its ore was cursed by miners in Germany, where it was sometimes mistaken for a silver ore. He published his results in 1739. For many years his claim to have uncovered a new metal was disputed by other chemists who said his new element was really a compound of iron and arsenic, but eventually it was recognised as an element in its own right.'
	},
	28: {
		ab : 'Ni',
		name : 'Nickel',
		mass : 57.935,
		masses : [
			[59.931, 26.223],
			[60.931, 1.1399],
			[61.928, 3.6346],
			[63.928, 0.9255]
		],
		abundance : 68.077,
		color : 'blue',
		value : 28,
		origin : 'The name is the shortened for of the German \'kupfernickel\' meaning either devil\'s copper or St. Nicholas\'s copper. ',
		appearance : 'A silvery metal that resists corrosion even at high temperatures.\n',
		uses : 'Nickel resists corrosion and is used to plate other metals to protect them. It is, however, mainly used in making alloys such as stainless steel. Nichrome is an alloy of nickel and chromium with small amounts of silicon, manganese and iron. It resists corrosion, even when red hot, so is used in toasters and electric ovens. A copper-nickel alloy is commonly used in desalination plants, which convert seawater into fresh water. Nickel steel is used for armour plating. Other alloys of nickel are used in boat propeller shafts and turbine blades.\n' +
			'\n' +
			'Nickel is used in batteries, including rechargeable nickel-cadmium batteries and nickel-metal hydride batteries used in hybrid vehicles.\n' +
			'\n' +
			'Nickel has a long history of being used in coins. The US five-cent piece (known as a ‘nickel’) is 25% nickel and 75% copper.\n' +
			'\n' +
			'Finely divided nickel is used as a catalyst for hydrogenating vegetable oils. Adding nickel to glass gives it a green colour.',
		biological : 'The biological role of nickel is uncertain. It can affect the growth of plants and has been shown to be essential to some species.\n' +
			'\n' +
			'Some nickel compounds can cause cancer if the dust is inhaled, and some people are allergic to contact with the metal.\n' +
			'\n' +
			'Nickel cannot be avoided completely. We take in nickel compounds with our diet. It is an essential element for some beans, such as the navy bean that is used for baked beans.',
		natural : 'The minerals from which most nickel is extracted are iron/nickel sulfides such as pentlandite. It is also found in other minerals, including garnierite.\n' +
			'\n' +
			'A substantial amount of the nickel on Earth arrived with meteorites. One of these landed in the region near Ontario, Canada, hundreds of millions of years ago. This region is now responsible for about 15% of the world’s production.',
		imageText : 'The image is of baked beans, which contain a surprising amount of nickel.\n',
		history : 'Meteorites contain both iron and nickel, and earlier ages used them as a superior form of iron. Because the metal did not rust, it was regarded by the natives of Peru as a kind of silver. A zinc-nickel alloy called pai-t’ung (white copper) was in use in China as long ago as 200 BC. Some even reached Europe.\n' +
			'\n' +
			'In 1751, Axel Fredrik Cronstedt, working at Stockholm, investigated a new mineral – now called nickeline (NiAs) – which came from a mine at Los, Hälsingland, Sweden. He thought it might contain copper but what he extracted was a new metal which he announced and named nickel in 1754. Many chemists thought it was an alloy of cobalt, arsenic, iron and copper – these elements were present as trace contaminants. It was not until 1775 that pure nickel was produced by Torbern Bergman and this confirmed its elemental nature.',
		notes : 'Known als Devils gold'
	},
	29: {
		ab : 'Cu',
		name : 'Copper',
		mass : 62.930,
		masses : [
			[64.928,30.85]
		],
		abundance : 69.15,
		color : 'blue',
		value : 29,
		origin : 'The name is derived from the Old English name \'coper\' in turn derived from the Latin \'Cyprium aes\', meaning a metal from Cyprus ',
		appearance : 'A reddish-gold metal that is easily worked and drawn into wires.\n',
		uses : 'Historically, copper was the first metal to be worked by people. The discovery that it could be hardened with a little tin to form the alloy bronze gave the name to the Bronze Age.\n' +
			'\n' +
			'Traditionally it has been one of the metals used to make coins, along with silver and gold. However, it is the most common of the three and therefore the least valued. All US coins are now copper alloys, and gun metals also contain copper.\n' +
			'\n' +
			'Most copper is used in electrical equipment such as wiring and motors. This is because it conducts both heat and electricity very well, and can be drawn into wires. It also has uses in construction (for example roofing and plumbing), and industrial machinery (such as heat exchangers).\n' +
			'\n' +
			'Copper sulfate is used widely as an agricultural poison and as an algicide in water purification.\n' +
			'\n' +
			'Copper compounds, such as Fehling’s solution, are used in chemical tests for sugar detection.\n',
		biological : 'Copper is an essential element. An adult human needs around 1.2 milligrams of copper a day, to help enzymes transfer energy in cells. Excess copper is toxic.\n' +
			'\n' +
			'Genetic diseases, such as Wilson’s disease and Menkes’ disease, can affect the body’s ability to use copper properly.\n' +
			'\n' +
			'Unlike mammals, which use iron (in haemoglobin) to transport oxygen around their bodies, some crustaceans use copper complexes.\n',
		natural : 'Copper metal does occur naturally, but by far the greatest source is in minerals such as chalcopyrite and bornite. Copper is obtained from these ores and minerals by smelting, leaching and electrolysis. The major copper-producing countries are Chile, Peru and China.',
		imageText : 'The image is of one of the many alchemical symbols once used to represent the element copper. It is shown against a 17th-century map of Cyprus, from where the element gets its name.\n',
		history : 'Copper beads have been excavated in northern Iraq and which are more than ten thousand years old and presumably made from native copper, nuggets of which can sometimes be found. Copper was widely used in the ancient world as bronze, its alloy with tin, which was used to make cutlery, coins, and tools. In China it was used for bells.\n' +
			'\n' +
			'Copper is not difficult to extract from it ores, but mineable deposits were relatively rare. Some, such as the copper mine at Falun, Sweden, date from the 1200s, were the source of great wealth. One way to extract the metal was to roast the sulfide ore then leach out the copper sulfate that was formed, with water. This was then trickled over scrap iron on the surface of which the copper deposited, forming a flaky layer that was easily removed.'
	},
	30: {
		ab : 'Zn',
		name : 'Zinc',
		mass : 63.929,
		masses : [
			[65.926, 27.73],
			[66.927, 4.04],
			[67.925, 18.45],
			[69.925, 0.61]
		],
		abundance : 49.17,
		color : 'blue',
		value : 30,
		origin : 'The name is derived from the German, \'zinc\', which may in turn be derived from the Persian word \'sing\', meaning stone. \n',
		appearance : 'A silvery-white metal with a blue tinge. It tarnishes in air.\n',
		uses : 'Most zinc is used to galvanise other metals, such as iron, to prevent rusting. Galvanised steel is used for car bodies, street lamp posts, safety barriers and suspension bridges.\n' +
			'\n' +
			'Large quantities of zinc are used to produce die-castings, which are important in the automobile, electrical and hardware industries. Zinc is also used in alloys such as brass, nickel silver and aluminium solder.\n' +
			'\n' +
			'Zinc oxide is widely used in the manufacture of very many products such as paints, rubber, cosmetics, pharmaceuticals, plastics, inks, soaps, batteries, textiles and electrical equipment. Zinc sulfide is used in making luminous paints, fluorescent lights and x-ray screens.',
		biological : 'Zinc is essential for all living things, forming the active site in over 20 metallo-enzymes. The average human body contains about 2.5 grams and takes in about 15 milligrams per day. Some foods have above average levels of zinc, including herring, beef, lamb, sunflower seeds and cheese.\n' +
			'\n' +
			'Zinc can be carcinogenic in excess. If freshly formed zinc(II) oxide is inhaled, a disorder called the ‘oxide shakes’ or ‘zinc chills’ can occur.',
		natural : 'Zinc is found in several ores, the principal ones being zinc blende (zinc sulfide) and calamine (zinc silicate). The principal mining areas are in China, Australia and Peru. Commercially, zinc is obtained from its ores by concentrating and roasting the ore, then reducing it to zinc by heating with carbon or by electrolysis. World production is more than 11 million tonnes a year.',
		imageText : 'An alchemical symbol for zinc is against an abstract background inspired by zinc roofing materials.\n',
		history : 'Zinc was known to the Romans but rarely used. It was first recognised as a metal in its own right in India and the waste from a zinc smelter at Zawar, in Rajasthan, testifies to the large scale on which it was refined during the period 1100 to the 1500.\n' +
			'\n' +
			'Zinc refining in China was carried out on a large scale by the 1500s. An East India Company ship which sank off the coast of Sweden in 1745 was carrying a cargo of Chinese zinc and analysis of reclaimed ingots showed them to be almost the pure metal.\n' +
			'\n' +
			'In 1668, a Flemish metallurgist, P. Moras de Respour, reported the extraction of metallic zinc from zinc oxide, but as far as Europe was concerned zinc was discovered by the German chemist Andreas Marggraf in 1746, and indeed he was the first to recognise it as a new metal.'
	},
	31: {
		ab : 'Ga',
		name : 'Gallium',
		mass : 68.926,
		masses : [
			[70.925, 39.892]
		],
		abundance : 60.108,
		color : 'lime',
		value : 31,
		origin : 'The name is derived from the Latin name for France, \'Gallia\' \n',
		appearance : 'Gallium is a soft, silvery-white metal, similar to aluminium.\n',
		uses : 'Gallium arsenide has a similar structure to silicon and is a useful silicon substitute for the electronics industry. It is an important component of many semiconductors. It is also used in red LEDs (light emitting diodes) because of its ability to convert electricity to light. Solar panels on the Mars Exploration Rover contained gallium arsenide.\n' +
			'\n' +
			'Gallium nitride is also a semiconductor. It has particular properties that make it very versatile. It has important uses in Blu-ray technology, mobile phones, blue and green LEDs and pressure sensors for touch switches.\n' +
			'\n' +
			'Gallium readily alloys with most metals. It is particularly used in low-melting alloys.\n' +
			'\n' +
			'It has a high boiling point, which makes it ideal for recording temperatures that would vaporise a thermometer.\n',
		biological : 'Gallium has no known biological role. It is non-toxic.\n',
		natural : 'It is present in trace amounts in the minerals diaspore, sphalerite, germanite, bauxite and coal. It is mainly produced as a by-product of zinc refining.\n' +
			'\n' +
			'The metal can be obtained by electrolysis of a solution of gallium(III) hydroxide in potassium hydroxide.',
		imageText : 'The image reflects on puns relating to the origin of the element’s name. Lecoq de Boisbaudran named the element after France (‘Gaul’ in Latin) and also himself, since Lecoq, which means ‘the rooster’ translates to ‘Gallus’ in Latin. A silvery metallic rooster is shown on a background of an antique map of France.\n',
		history : 'Gallium was discovered in Paris by Paul-Émile Lecoq de Boisbaudran in 1875. He observed a new violet line in the atomic spectrum of some zinc he had extracted from a sample of zinc blende ore (ZnS) from the Pyrenees. He knew it meant that an unknown element was present.\n' +
			'\n' +
			'What Boisbaudran didn’t realise was that its existence, and properties, had been predicted by Mendeleev whose periodic table showed there was a gap below aluminium which was yet to be occupied. He forecast that the missing element’s atomic weight would be around 68 and its density would be 5.9 g/cm3.\n' +
			'\n' +
			'By November of 1875, Boisbaudran had isolated and purified the new metal and shown that it was like aluminium. In December 1875 he announced it to the French Academy of Sciences.'
	},
	32: {
		ab : 'Ge',
		name : 'Germanium',
		mass : 73.921,
		masses : [
			[69.924, 20.57],
			[71.922, 27.45],
			[72.923, 7.75],
			[75.921, 7.73]
		],
		abundance : 36.5,
		color : 'purple',
		value : 32,
		origin : 'The name is derived from the Latin name for Germany, \'Germania\'. \n',
		appearance : 'A silvery-white semi-metal. It is brittle.\n',
		uses : 'Germanium is a semiconductor. The pure element was commonly doped with arsenic, gallium or other elements and used as a transistor in thousands of electronic applications. Today, however, other semiconductors have replaced it.\n' +
			'\n' +
			'Germanium oxide has a high index of refraction and dispersion. This makes it suitable for use in wide-angle camera lenses and objective lenses for microscopes. This is now the major use for this element.\n' +
			'\n' +
			'Germanium is also used as an alloying agent (adding 1% germanium to silver stops it from tarnishing), in fluorescent lamps and as a catalyst.\n' +
			'\n' +
			'Both germanium and germanium oxide are transparent to infrared radiation and so are used in infrared spectroscopes.',
		biological : 'Germanium has no known biological role. The element is non-toxic. Certain germanium compounds have low toxicity in mammals, while being effective against some bacteria. This has led some scientists to study their potential use in pharmaceuticals.\n',
		natural : 'Germanium ores are very rare. They are found in small quantities as the minerals germanite and argyrodite.\n' +
			'\n' +
			'Germanium minerals are also present in zinc ores, and commercial production of germanium is carried out by processing zinc smelter flue dust. It can also be recovered from the by-products of combustion of certain coals.',
		imageText : 'Germanium was used in early transistors similar to the one featured here.\n',
		history : 'Germanium was discovered by Clemens A. Winkler at Freiberg, Germany, in 1886. Its existence had been predicted by Mendeleev who predicted its atomic weight would be about 71 and that its density around 5.5 g/cm3.\n' +
			'\n' +
			'In September 1885 a miner working in the Himmelsfürst silver mine near Freiberg, came across an unusual ore. It was passed to Albin Weisbach at the nearby Mining Academy who certified it was a new mineral, and asked his colleague Winkler to analyse it. He found its composition to be 75% silver, 18% sulfur, and 7% he could not explain. By February 1886, he realised it was a new metal-like element and as its properties were revealed, it became clear that it was the missing element below silicon as Mendeleev had predicted. The mineral from which it came we know as argyrodite, Ag8GeS6.'
	},
	33: {
		ab : 'As',
		name : 'Arsenic',
		mass : 74.922,
		abundance : 100,
		color : 'grey',
		value : 33,
		origin : 'The name is thought to come from \'arsenikon\', the Greek name for the yellow pigment orpiment. ',
		appearance : 'Arsenic is a semi-metal. In its metallic form it is bright, silver-grey and brittle.\n',
		uses : 'Arsenic is a well-known poison. Arsenic compounds are sometimes used as rat poisons and insecticides but their use is strictly controlled.\n' +
			'\n' +
			'Surprisingly, arsenic can also have medicinal applications. In Victorian times, Dr Fowler’s Solution (potassium arsenate dissolved in water) was a popular cure-all tonic that was even used by Charles Dickens. Today, organoarsenic compounds are added to poultry feed to prevent disease and improve weight gain.\n' +
			'\n' +
			'Arsenic is used as a doping agent in semiconductors (gallium arsenide) for solid-state devices. It is also used in bronzing, pyrotechnics and for hardening shot.\n' +
			'\n' +
			'Arsenic compounds can be used to make special glass and preserve wood.\n',
		biological : 'Some scientists think that arsenic may be an essential element in our diet in very, very low doses. In small doses it is toxic and a suspected carcinogen. Once inside the body it bonds to atoms in the hair, so analysing hair samples can show whether someone has been exposed to arsenic. Some foods, such as prawns, contain a surprising amount of arsenic in a less harmful, organic form.\n',
		natural : 'A small amount of arsenic is found in its native state. It is mainly found in minerals. The most common arsenic-containing mineral is arsenopyrite. Others include realgar, orpiment and enargite. Most arsenic is produced as a by-product of copper and lead refining. It can be obtained from arsenopyrite by heating, causing the arsenic to sublime and leave behind iron(II) sulfide.\n',
		imageText : 'Prawns contain quite high levels of arsenic, in an organoarsenic form which is not harmful to health.\n',
		history : 'Arsenic was known to the ancient Egyptian, and is mentioned in one papyrus as a ways of gilding metals. The Greek philosopher Theophrastus knew of two arsenic sulfide minerals: orpiment (As2S3) and realgar (As4S4). The Chinese also knew about arsenic as the writings of Pen Ts’ao Kan-Mu. He compiled his great work on the natural world in the 1500s, during the Ming dynasty. He noted the toxicity associated with arsenic compounds and mentioned their use as pesticides in rice fields.\n' +
			'\n' +
			'A more dangerous form of arsenic, called white arsenic, has also been long known. This was the trioxide, As2O3, and was a by-product of copper refining. When this was mixed with olive oil and heated it yielded arsenic metal itself. The discovery of the element arsenic is attributed to Albertus Magnus in the 1200s.'
	},
	34: {
		ab : 'Se',
		name : 'Selenium',
		mass : 79.917,
		masses : [
			[73.922, 0.89],
			[75.919, 9.37],
			[76.920, 7.63],
			[77.917, 23.77],
			[81.917, 8.73]
		],
		abundance : 49.61,
		color : 'orange',
		value : 34,
		origin : 'The name is derived from \'selene\', the Greek name for the Moon. ',
		appearance : 'A semi-metal that can exist in two forms: as a silvery metal or as a red powder.\n',
		uses : 'The biggest use of selenium is as an additive to glass. Some selenium compounds decolourise glass, while others give a deep red colour. Selenium can also be used to reduce the transmission of sunlight in architectural glass, giving it a bronze tint. Selenium is used to make pigments for ceramics, paint and plastics.\n' +
			'\n' +
			'Selenium has both a photovoltaic action (converts light to electricity) and a photoconductive action (electrical resistance decreases with increased illumination). It is therefore useful in photocells, solar cells and photocopiers. It can also convert AC electricity to DC electricity, so is extensively used in rectifiers.\n' +
			'\n' +
			'Selenium is toxic to the scalp fungus that causes dandruff so it is used in some anti-dandruff shampoos. Selenium is also used as an additive to make stainless steel.',
		biological : 'Selenium is an essential trace element for some species, including humans. Our bodies contain about 14 milligrams, and every cell in a human body contains more than a million selenium atoms.\n' +
			'\n' +
			'Too little selenium can cause health problems, but too much is also dangerous. In excess it is carcinogenic and teratogenic (disturbs the development of an embryo or foetus).',
		natural : 'Selenium is found in a few rare minerals. Most of the world’s selenium is obtained from the anode muds produced during the electrolytic refining of copper. These muds are either roasted with sodium carbonate or sulfuric acid, or smelted with sodium carbonate to release the selenium.\n',
		imageText : 'The element is named after Selene, the Greek goddess of the moon. The image is of a crescent moon against a cratered surface.\n',
		history : 'Selenium was discovered by Jöns Jacob Berzelius at Stockholm in 1817. He had shares in a sulfuric acid works and he was intrigued by a red-brown sediment which collected at the bottom of the chambers in which the acid was made.\n' +
			'\n' +
			'At first he thought it was the element tellurium because it gave off a strong smell of radishes when heated, but he eventually realised that it was in fact a new element. He also noted that it was like sulfur and indeed had properties intermediate between sulfur and tellurium. Berzelius found that selenium was present in samples of tellurium and gave that element its characteristic smell. He also became affected by it personally – it can be absorbed through the skin – and it caused him to experience the bad breath associated with those who work with this element.'
	},
	35: {
		ab : 'Br',
		name : 'Bromine',
		mass : 78.918,
		masses : [
			[80.916, 49.31]
		],
		abundance : 50.69,
		color : 'tangerine',
		value : 35,
		origin : 'The name comes from the Greek \'bromos\' meaning stench. \n',
		appearance : 'Bromine is a deep-red, oily liquid with a sharp smell. It is toxic.\n',
		uses : 'Bromine is used in many areas such as agricultural chemicals, dyestuffs, insecticides, pharmaceuticals and chemical intermediates. Some uses are being phased out for environmental reasons, but new uses continue to be found.\n' +
			'\n' +
			'Bromine compounds can be used as flame retardants. They are added to furniture foam, plastic casings for electronics and textiles to make them less flammable. However, the use of bromine as a flame retardant has been phased out in the USA because of toxicity concerns.\n' +
			'\n' +
			'Organobromides are used in halon fire extinguishers that are used to fight fires in places like museums, aeroplanes and tanks. Silver bromide is a chemical used in film photography.\n' +
			'\n' +
			'Before leaded fuels were phased out, bromine was used to prepare 1,2-di-bromoethane, which was an anti-knock agent.\n',
		biological : 'Bromine is present in small amounts, as bromide, in all living things. However, it has no known biological role in humans. Bromine has an irritating effect on the eyes and throat, and produces painful sores when in contact with the skin.\n',
		natural : 'Bromine is extracted by electrolysis from natural bromine-rich brine deposits in the USA, Israel and China. It was the first element to be extracted from seawater, but this is now only economically viable at the Dead Sea, Israel, which is particularly rich in bromide (up to 0.5%).\n',
		imageText : 'The image intends to reflect the rich colour, liquidity and aromatic nature of the element.\n',
		history : 'Antoine-Jérôme Balard discovered bromine while investigating some salty water from Montpellier, France. He took the concentrated residue which remained after most of the brine had evaporated and passed chlorine gas into it. In so doing he liberated an orange-red liquid which he deduced was a new element. He sent an account of his findings to the French Academy’s journal in 1826.\n' +
			'\n' +
			'A year earlier, a student at Heidelberg, Carl Löwig, had brought his professor a sample of bromine which he had produced from the waters of a natural spring near his home at Keruznach. He was asked to produce more of it, and while he was doing so Balard published his results and so became known at its discoverer.'
	},
	36: {
		ab : 'Kr',
		name : 'Krypton',
		mass : 83.911,
		masses : [
			[77.920, 0.355],
			[79.916, 2.286],
			[81.913, 11.593],
			[82.914, 11.5],
			[85.911, 17.279]
		],
		abundance : 56.987,
		color : 'yellow',
		value : 36,
		origin : 'The name is derived from the Greek \'kryptos\', meaning hidden. \n',
		appearance : 'Krypton is a gas with no colour or smell. It does not react with anything except fluorine gas.\n',
		uses : 'Krypton is used commercially as a filling gas for energy-saving fluorescent lights. It is also used in some flash lamps used for high-speed photography.\n' +
			'\n' +
			'Unlike the lighter gases in its group, it is reactive enough to form some chemical compounds. For example, krypton will react with fluorine to form krypton fluoride. Krypton fluoride is used in some lasers.\n' +
			'\n' +
			'Radioactive krypton was used during the Cold War to estimate Soviet nuclear production. The gas is a product of all nuclear reactors, so the Russian share was found by subtracting the amount that came from Western reactors from the total in the air.\n' +
			'\n' +
			'From 1960 to 1983 the isotope krypton-86 was used to define the standard measure of length. One metre was defined as exactly 1,650,763.73 wavelengths of a line in the atomic spectrum of the isotope.',
		biological : 'Krypton has no known biological role.\n',
		natural : 'Krypton is one of the rarest gases in the Earth’s atmosphere. It makes up just 1 part per million by volume. It is extracted by distillation of air that has been cooled until it is a liquid.',
		imageText : 'There are many different isotopes of krypton. This symbol represents the isotope krypton-86.\n',
		history : 'Having discovered the noble gas argon, extracted from air, William Ramsay and Morris William Travers of University College, London, were convinced this must be one of a new group of elements of the periodic table. They decided others were likely to be hidden in the argon and by a process of liquefaction and evaporation they hoped it might leave behind a heavier component, and it did. It yielded krypton in the afternoon of 30th May 1898, and they were able to isolate about 25 cm3 of the new gas. This they immediately tested in a spectrometer, and saw from its atomic spectrum that it was a new element.'
	},
	37: {
		ab : 'Rb',
		name : 'Rubidium',
		mass : 84.912,
		masses : [
			[86.909, 27.83]
		],
		abundance : 72.17,
		color : 'pink',
		value : 37,
		origin : 'The name is derived form the Latin \'rubidius\', meaning deepest red. \n',
		appearance : 'A soft metal that ignites in the air and reacts violently with water.\n',
		uses : 'Rubidium is little used outside research. It has been used as a component of photocells, to remove traces of oxygen from vacuum tubes and to make special types of glass.\n' +
			'\n' +
			'It is easily ionised so was considered for use in ion engines, but was found to be less effective than caesium. It has also been proposed for use as a working fluid for vapour turbines and in thermoelectric generators.\n' +
			'\n' +
			'Rubidium nitrate is sometimes used in fireworks to give them a purple colour.\n',
		biological : 'Rubidium has no known biological role and is non-toxic. However, because of its chemical similarity to potassium we absorb it from our food, and the average person has stores of about half a gram.\n' +
			'\n' +
			'It is slightly radioactive and so has been used to locate brain tumours, as it collects in tumours but not in normal tissue.\n',
		natural : 'Rubidium occurs in the minerals pollucite, carnallite, leucite and lepidolite. It is recovered commercially from lepidolite as a by-product of lithium extraction. Potassium minerals and brines also contain rubidium and are another commercial source.',
		imageText : 'The image of an ‘electric eye’ is inspired by the use of rubidium in photocells (sensors that detect light).\n',
		history : 'The lithium potassium mineral lepidolite was discovered in the 1760s and it behaved oddly. When thrown on to glowing coals it frothed and then hardened like glass. Analysis showed it to contain lithium and potassium, but it held a secret: rubidium.\n' +
			'\n' +
			'In 1861, Robert Bunsen and Gustav Kirchhoff, of the University of Heidelberg, dissolved the ore in acid and then precipitated the potassium it contained which carried down another heavier alkali metal. By carefully washing this precipitate with boiling water they removed the more soluble potassium component and then confirmed that they really had a new element by examining the atomic spectrum of what remained. This showed two intense ruby red lines never seen before, indicating a new element, which they named after this colour.\n' +
			'\n' +
			'A sample of pure rubidium metal was eventually produced in 1928.'
	},
	38: {
		ab : 'Sr',
		name : 'Strontium',
		mass : 87.906,
		masses : [
			[83.913, 0.56],
			[85.909, 9.86],
			[86.909, 7]
		],
		abundance : 82.58,
		color : 'pinkl',
		value : 38,
		origin : 'Strontium is named after Strontian, a small town in Scotland. \n',
		appearance : 'A soft, silvery metal that burns in air and reacts with water.\n',
		uses : 'Strontium is best known for the brilliant reds its salts give to fireworks and flares. It is also used in producing ferrite magnets and refining zinc.\n' +
			'\n' +
			'Modern ‘glow-in-the-dark’ paints and plastics contain strontium aluminate. They absorb light during the day and release it slowly for hours afterwards.\n' +
			'\n' +
			'Strontium-90, a radioactive isotope, is a by-product of nuclear reactors and present in nuclear fallout. It has a half-life of 28 years. It is absorbed by bone tissue instead of calcium and can destroy bone marrow and cause cancer. However, it is also useful as it is one of the best high-energy beta-emitters known. It can be used to generate electricity for space vehicles, remote weather stations and navigation buoys. It can also be used for thickness gauges and to remove static charges from machinery handling paper or plastic.\n' +
			'\n' +
			'Strontium chloride hexahydrate is an ingredient in toothpaste for sensitive teeth.',
		biological : 'Strontium is incorporated into the shells of some deep-sea creatures and is essential to some stony corals. It has no biological role in humans and is non-toxic. Because it is similar to calcium, it can mimic its way into our bodies, ending up in our bones.\n' +
			'\n' +
			'Radioactive strontium-90, which is produced in nuclear explosions and released during nuclear plant accidents, is particularly dangerous because it can be absorbed into the bones of young children.',
		natural : 'Strontium is found mainly in the minerals celestite and strontianite. China is now the leading producer of strontium. Strontium metal can be prepared by electrolysis of the molten strontium chloride and potassium chloride, or by reducing strontium oxide with aluminium in a vacuum.',
		imageText : 'The image is of a highly abstracted metallic ‘mushroom cloud’. It alludes to the presence of strontium in nuclear fallout.\n',
		history : 'In 1787, an unusual rock which had been found in a lead mine at Strontian, Scotland, was investigated by Adair Crawford, an Edinburgh doctor. He realised it was a new mineral containing an unknown ‘earth’ which he named strontia. In 1791, another Edinburgh man, Thomas Charles Hope, made a fuller investigation of it and proved it was a new element. He also noted that it caused the flame of a candle to burn red.\n' +
			'\n' +
			'Meanwhile Martin Heinrich Klaproth in Germany was working with the same mineral and he produced both strontium oxide and strontium hydroxide.\n' +
			'\n' +
			'Strontium metal itself was isolated in 1808 at the Royal Institution in London by Humphry Davy by means of electrolysis, using the method with which he had already isolated sodium and potassium.'
	},
	39: {
		ab : 'Y',
		name : 'Yttrium',
		mass : 88.906,
		abundance : 100,
		color : 'blue',
		value : 39,
		origin : 'Yttrium is named after Ytterby, Sweden. \n',
		appearance : 'A soft, silvery metal.\n',
		uses : 'Yttrium is often used as an additive in alloys. It increases the strength of aluminium and magnesium alloys. It is also used in the making of microwave filters for radar and has been used as a catalyst in ethene polymerisation.\n' +
			'\n' +
			'Yttrium-aluminium garnet (YAG) is used in lasers that can cut through metals. It is also used in white LED lights.\n' +
			'\n' +
			'Yttrium oxide is added to the glass used to make camera lenses to make them heat and shock resistant. It is also used to make superconductors. Yttrium oxysulfide used to be widely used to produce red phosphors for old-style colour television tubes.\n' +
			'\n' +
			'The radioactive isotope yttrium-90 has medical uses. It can be used to treat some cancers, such as liver cancer.\n',
		biological : 'Yttrium has no known biological role. Its soluble salts are mildly toxic.\n',
		natural : 'Xenotime can contain up to 50% yttrium phosphate. It is mined in China and Malaysia. Yttrium also occurs in the other ‘rare earth’ minerals, monazite and bastnaesite. Yttrium metal is produced by reducing yttrium fluoride with calcium metal.\n',
		imageText : 'The radar reflects the use of yttrium in radar technology. The element also used to provide the red colour for early colour television screens, and this is the reason for the background which echoes the Warner Bros. ‘That’s all Folks!’ cartoon splash screen.\n',
		history : 'In 1787, Karl Arrhenius came across an unusual black rock in an old quarry at Ytterby, near Stockholm. He thought he had found a new tungsten mineral, and passed the specimen over to Johan Gadolin based in Finland. In 1794, Gadolin announced that it contained a new \'earth\' which made up 38 per cent of its weight. It was called an’ earth’ because it was yttrium oxide, Y2O3, which could not be reduced further by heating with charcoal.\n' +
			'\n' +
			'The metal itself was first isolated in 1828 by Friedrich Wöhler and made by reacting yttrium chloride with potassium. Yet, yttrium was still hiding other elements.\n' +
			'\n' +
			'In 1843, Carl Mosander investigated yttrium oxide more thoroughly and found that it consisted of three oxides: yttrium oxide, which was white; terbium oxide, which was yellow; and erbium oxide, which was rose-coloured.'
	},
	40: {
		ab : 'Zr',
		name : 'Zirconium',
		mass : 89.905,
		masses : [
			[90.906, 11.22],
			[91.905, 17.15],
			[93.906, 17.38],
			[95.908, 2.8]
		],
		abundance : 51.45,
		color : 'blue',
		value : 40,
		origin : 'The name is derived form the Arabic, \'zargun\', meaning gold coloured. \n',
		appearance : 'A hard, silvery metal that is very resistant to corrosion.\n',
		uses : 'Zirconium does not absorb neutrons, making it an ideal material for use in nuclear power stations. More than 90% of zirconium is used in this way. Nuclear reactors can have more than 100,000 metres of zirconium alloy tubing. With niobium, zirconium is superconductive at low temperatures and is used to make superconducting magnets.\n' +
			'\n' +
			'Zirconium metal is protected by a thin oxide layer making it exceptionally resistant to corrosion by acids, alkalis and seawater. For this reason it is extensively used by the chemical industry.\n' +
			'\n' +
			'Zirconium(IV) oxide is used in ultra-strong ceramics. It is used to make crucibles that will withstand heat-shock, furnace linings, foundry bricks, abrasives and by the glass and ceramics industries. It is so strong that even scissors and knives can be made from it. It is also used in cosmetics, antiperspirants, food packaging and to make microwave filters.\n' +
			'\n' +
			'Zircon is a natural semi-precious gemstone found in a variety of colours. The most desirable have a golden hue. The element was first discovered in this form, resulting in its name. Cubic zirconia (zirconium oxide) is a synthetic gemstone. The colourless stones, when cut, resemble diamonds.\n' +
			'\n' +
			'Zircon mixed with vanadium or praseodymium makes blue and yellow pigments for glazing pottery.',
		biological : 'Zirconium has no known biological role. It has low toxicity.\n',
		natural : 'Zirconium occurs in about 30 mineral species, the major ones being zircon and baddeleyite. More than 1.5 million tonnes of zircon are mined each year, mainly in Australia and South Africa. Most baddeleyite is mined in Brazil.\n' +
			'\n' +
			'Zirconium metal is produced commercially by first converting zircon to zirconium chloride, and then reducing the chloride with magnesium.',
		imageText : 'The Ancient Egyptians used zircon gemstones in jewellery. For the Ancient Egyptians the scarab beetle (represented here) was a symbol of regeneration and creation, conveying ideas of transformation, renewal and resurrection.\n',
		history : 'Gems that contain zirconium were known in ancient times as zircon. In 1789, the German chemist, Martin Klaproth analysed a zircon and separated zirconium in the form of its ‘earth’ zirconia, which is the oxide ZrO2.\n' +
			'\n' +
			'Klaproth failed to isolate the pure metal itself, and Humphry Davy also failed when he tried electrolysis in 1808. It was not until 1824 that the element was isolated, when the Swedish chemist Jöns Berzelius heated potassium hexafluorozirconate (K2ZrF6) with potassium metal and obtained some zirconium as a black powder.\n' +
			'\n' +
			'Totally pure zirconium was only produced in 1925 by the Dutch chemists Anton Eduard van Arkel and Jan Hendrik de Boer by the decomposition of zirconium tetraiodide (ZrI4). These days the metal is produced in bulk by heating zirconium tetrachloride (ZrCl4) with magnesium.'
	},
	41: {
		ab : 'Nb',
		name : 'Niobium',
		mass : 92.906,
		abundance : 100,
		color : 'blue',
		value : 41,
		origin : 'The name comes from Niobe from Greek mythology, who was the daughter of king Tantalus. This was chosen because of niobium\'s chemical similarity to tantalum \n',
		appearance : 'A silvery metal that is very resistant to corrosion due to a layer of oxide on its surface.\n',
		uses : 'Niobium is used in alloys including stainless steel. It improves the strength of the alloys, particularly at low temperatures. Alloys containing niobium are used in jet engines and rockets, beams and girders for buildings and oil rigs, and oil and gas pipelines.\n' +
			'\n' +
			'This element also has superconducting properties. It is used in superconducting magnets for particle accelerators, MRI scanners and NMR equipment.\n' +
			'\n' +
			'Niobium oxide compounds are added to glass to increase the refractive index, which allows corrective glasses to be made with thinner lenses.\n',
		biological : 'Niobium has no known biological role.\n',
		natural : 'The main source of this element is the mineral columbite. This mineral also contains tantalum and the two elements are mined together. Columbite is found in Canada, Brazil, Australia, Nigeria and elsewhere. Some niobium is also produced as a by-product of tin extraction.\n',
		imageText : 'The propeller blades in the icon reflect the use of niobium and its alloys in the aviation industry.\n',
		history : 'When examining minerals in the British Museum in 1801, Charles Hatchett was intrigued by a specimen labelled columbite. He suspected it contained a new metal, and he was right. He heated a sample with potassium carbonate, dissolved the product in water, added acid and got a precipitate. However, further treatment did not produce the element itself, although he named it columbium, and so it was known for many years.\n' +
			'\n' +
			'Others doubted columbium, especially after the discovery of tantalum which happened the following year. These metals occur together in nature, and are difficult to separate. In 1844 the German chemist Heinrich Rose proved that columbite contained both elements and he renamed columbium niobium.\n' +
			'\n' +
			'A sample of the pure metal was produced in 1864 by Christian Blomstrand who reduced niobium chloride by heating it with hydrogen gas.'
	},
	42: {
		ab : 'Mo',
		name : 'Molybdenum',
		mass : 97.905,
		masses : [
			[91.907, 14.53],
			[93.905, 9.15],
			[94.906, 15.8],
			[95.905, 16.67],
			[96.906, 9.60],
			[99.907, 9.82]
		],
		abundance : 24.39,
		color : 'blue',
		value : 42,
		origin : 'The name is derived from the Greek \'molybdos\' meaning lead. \n',
		appearance : 'A shiny, silvery metal.\n',
		uses : 'Molybdenum has a very high melting point so it is produced and sold as a grey powder. Many molybdenum items are formed by compressing the powder at a very high pressure.\n' +
			'\n' +
			'Most molybdenum is used to make alloys. It is used in steel alloys to increase strength, hardness, electrical conductivity and resistance to corrosion and wear. These ‘moly steel’ alloys are used in parts of engines. Other alloys are used in heating elements, drills and saw blades.\n' +
			'\n' +
			'Molybdenum disulfide is used as a lubricant additive. Other uses for molybdenum include catalysts for the petroleum industry, inks for circuit boards, pigments and electrodes.',
		biological : 'Although it is toxic in anything other than small quantities, molybdenum is an essential element for animals and plants.\n' +
			'\n' +
			'There are about 50 different enzymes used by plants and animals that contain molybdenum. One of these is nitrogenase, found in nitrogen-fixing bacteria that make nitrogen from the air available to plants. Leguminous plants have root nodules that contain these nitrogen-fixing bacteria.\n',
		natural : 'The main molybdenum ore is molybdenite (molybdenum disulfide). It is processed by roasting to form molybdenum oxide, and then reducing to the metal. The main mining areas are in the USA, China, Chile and Peru. Some molybdenum is obtained as a by-product of tungsten and copper production. World production is around 200,000 tonnes per year.',
		imageText : 'The image is of a valve wheel, reflecting the use of molybdenum alloys in valves and boilers.\n',
		history : 'The soft black mineral molybdenite (molybdenum sulfide, MoS2), looks very like graphite and was assumed to be a lead ore until 1778 when Carl Scheele analysed it and showed it was neither lead nor graphite, although he didn’t identify it.\n' +
			'\n' +
			'Others speculated that it contained a new element but it proved difficult to reduce it to a metal. It could be converted to an oxide which, when added to water, formed an acid we now know as molybdic acid, H2MoO4, but the metal itself remained elusive.\n' +
			'\n' +
			'Scheele passed the problem over to Peter Jacob Hjelm. He ground molybdic acid and carbon together in linseed oil to form a paste, heated this to red heat in and produced molybdenum metal. The new element was announced in the autumn of 1781.'
	},
	43: {
		ab : 'Tc',
		name : 'Technetium',
		mass : 98.906,
		masses : [
			[96.906],
			[97.907]
		],
		abundance : 0,
		color : 'blue',
		value : 43,
		origin : 'The name is derived from the Greek \'tekhnetos\' meaning artificial. \n',
		appearance : 'A radioactive, silvery metal that does not occur naturally.\n',
		uses : 'The gamma-ray emitting technetium-99m (metastable) is widely used for medical diagnostic studies. Several chemical forms are used to image different parts of the body.\n' +
			'\n' +
			'Technetium is a remarkable corrosion inhibitor for steel, and adding very small amounts can provide excellent protection. This use is limited to closed systems as technetium is radioactive.\n',
		biological : 'Technetium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'The metal is produced in tonne quantities from the fission products of uranium nuclear fuel. It is obtained as a grey powder.\n' +
			'\n' +
			'Early chemists puzzled over why they could not discover element number 43, but now we know why – its isotopes are relatively short-lived compared to the age of the Earth, so any technetium present when the Earth formed has long since decayed.',
		imageText : 'The symbol of a human hand reflects the fact that the element is created artificially, and its name means ‘artificial’.\n',
		history : 'Technetium long tantalised chemists because it could not be found. We now know that all its isotopes are radioactive and any mineral deposits of the element had long disappeared from the Earth’s crust. (The longest lived isotope has a half life of 4 million years.) Even so, some technetium atoms are produced as uranium undergoes nuclear fission and there is about 1 milligram of technetium in a tonne of uranium. Claims in the 1920s to have found this element, or at least to have observed its spectrum, cannot be entirely discounted.\n' +
			'\n' +
			'Technetium was discovered by Emilio Segrè in 1937 in Italy. He investigated molybdenum from California which had been exposed to high energy radiation and he found technetium to be present and separated it. Today, this element is extracted from spent nuclear fuel rods in tonne quantities.'
	},
	44: {
		ab : 'Ru',
		name : 'Ruthenium',
		mass : 101.904,
		masses : [
			[95.908, 5.54],
			[97.905, 1.87],
			[98.906, 12.76],
			[99.904, 12.6],
			[100.906, 17.06],
			[103.905, 18.62]
		],
		abundance : 31.55,
		color : 'blue',
		value : 44,
		origin : 'The name is derived from \'Ruthenia\', the Latin name for Russia ',
		appearance : 'A shiny, silvery metal.\n',
		uses : 'Many new uses are emerging for ruthenium. Most is used in the electronics industry for chip resistors and electrical contacts. Ruthenium oxide is used in the chemical industry to coat the anodes of electrochemical cells for chlorine production. Ruthenium is also used in catalysts for ammonia and acetic acid production. Ruthenium compounds can be used in solar cells, which turn light energy into electrical energy.\n' +
			'\n' +
			'Ruthenium is one of the most effective hardeners for platinum and palladium, and is alloyed with these metals to make electrical contacts for severe wear resistance. It is used in some jewellery as an alloy with platinum.\n',
		biological : 'Ruthenium has no known biological role. Ruthenium(IV) oxide is highly toxic.\n',
		natural : 'Ruthenium is one of the rarest metals on Earth. It is found uncombined in nature; however, it is more commonly found associated with other platinum metals in the minerals pentlandite and pyroxinite. It is obtained commercially from the wastes of nickel refining.',
		imageText : 'The element’s name is derived from the Latin name for Russia. The stylised Cyrillic text is based on a Soviet Russian flag from around 1921.\n',
		history : 'The Polish chemist Jedrzej Sniadecki was investigating platinum ores from South America and, in May 1808, when he discovered a new metal which he called it vestium. However, when French chemists tried to repeat his work they were unable to find it in the platinum ore they had. When Sniadecki learned of this he believed he had been mistaken and withdrew his claim.\n' +
			'\n' +
			'Then, in 1825, Gottfried Osann of the University of Dorpat (now Tartu) on the Baltic, investigated some platinum from the Ural mountains, and reported finding three new elements which he named pluranium, polinium, and ruthenium.\n' +
			'\n' +
			'While the first two of these were never to be verified, the third was genuine and in 1840 Karl Karlovich Klaus at the University of Kazan extracted, purified, and confirmed it was a new metal. He kept Osann’s name of ruthenium.'
	},
	45: {
		ab : 'Rh',
		name : 'Rhodium',
		mass : 102.905,
		abundance : 100,
		color : 'blue',
		value : 45,
		origin : 'The name is derived from the Greek "rhodon", meaning rose coloured.\n',
		appearance : 'A hard, shiny, silvery metal.\n',
		uses : 'The major use of rhodium is in catalytic converters for cars (80%). It reduces nitrogen oxides in exhaust gases.\n' +
			'\n' +
			'Rhodium is also used as catalysts in the chemical industry, for making nitric acid, acetic acid and hydrogenation reactions.\n' +
			'\n' +
			'It is used to coat optic fibres and optical mirrors, and for crucibles, thermocouple elements and headlight reflectors. It is used as an electrical contact material as it has a low electrical resistance and is highly resistant to corrosion.',
		biological : 'Rhodium has no known biological role. It is a suspected carcinogen.\n',
		natural : 'Rhodium is the rarest of all non-radioactive metals. It occurs uncombined in nature, along with other platinum metals, in river sands in North and South America. It is also found in the copper-nickel sulfide ores of Ontario, Canada.\n' +
			'\n' +
			'Rhodium is obtained commercially as a by-product of copper and nickel refining. World production is about 30 tonnes per year.',
		imageText : 'This symbol of a rose is usually found with the motto ‘Dat Rosa Mel Apibus’ (The rose gives the bees honey). It was used by the Rosicrucians, a 17th-century secret society.\n',
		history : 'Rhodium was discovered in 1803 by William Wollaston. He collaborated with Smithson Tennant in a commercial venture, part of which was to produce pure platinum for sale. The first step in the process was to dissolve ordinary platinum in aqua regia (nitric acid + hydrochloric acid). Not all of it went into solution and it left behind a black residue. (Tennant investigated this residue and from it he eventually isolated osmium and iridium.) Wollaston concentrated on the solution of dissolved platinum which also contained palladium. He removed these metals by precipitation and was left with a beautiful red solution from which he obtained rose red crystals. These were sodium rhodium chloride, Na3RhCl6. From them he eventually produced a sample of the metal itself.'
	},
	46: {
		ab : 'Pd',
		name : 'Palladium',
		mass : 105.903,
		masses : [
			[101.906, 1.02],
			[103.904, 11.14],
			[104.905, 22.33],
			[107.904, 26.46],
			[109.905, 11.72]
		],
		abundance : 27.33,
		color : 'blue',
		value : 46,
		origin : 'Palladium is named after the asteroid Pallas, in turn named after the Greek goddess of wisdom, Pallas. \n',
		appearance : 'A shiny, silvery-white metal that resists corrosion.\n',
		uses : 'Most palladium is used in catalytic converters for cars. It is also used in jewellery and some dental fillings and crowns. White gold is an alloy of gold that has been decolourised by alloying with another metal, sometimes palladium.\n' +
			'\n' +
			'It is used in the electronics industry in ceramic capacitors, found in laptop computers and mobile phones. These consist of layers of palladium sandwiched between layers of ceramic.\n' +
			'\n' +
			'Finely divided palladium is a good catalyst and is used for hydrogenation and dehydrogenation reactions. Hydrogen easily diffuses through heated palladium and this provides a way of separating and purifying the gas.',
		biological : 'Palladium has no known biological role. It is non-toxic.\n',
		natural : 'Palladium has been found uncombined in nature, in Brazil, but most is found in sulfide minerals such as braggite. It is extracted commercially as a by-product of nickel refining. It is also extracted as a by-product of copper and zinc refining.\n',
		imageText : 'The image represents the asteroid Pallas, after which the element is named. In the background are 20th-century star charts.\n',
		history : 'As early as 1700, miners in Brazil were aware of a metal they called ouro podre, ‘worthless gold,’ which is a native alloy of palladium and gold. However, it was not from this that palladium was first extracted, but from platinum, and this was achieved in 1803 by William Wollaston. He noted that when he dissolved ordinary platinum in aqua regia (nitric acid + hydrochloric acid) not all of it went into solution.\n' +
			'\n' +
			'It left a residue from which he eventually extracted palladium. He did not announce his discovery but put the new metal on sale as a ‘new silver’. Richard Chenevix purchased some, investigated it, and declared it to be an alloy of mercury and platinum. In February 1805 Wollaston revealed himself as its discoverer and gave a full and convincing account of the metal and its properties.'
	},
	47: {
		ab : 'Ag',
		name : 'Silver',
		mass : 106.905,
		masses : [
			[108.905, 48.161]
		],
		abundance : 51.839,
		color : 'blue',
		value : 47,
		origin : 'The name is derived from the Anglo-Saxon name, \'siolfur\'. \n',
		appearance : 'Silver is a relatively soft, shiny metal. It tarnishes slowly in air as sulfur compounds react with the surface forming black silver sulfide.\n',
		uses : 'Sterling silver contains 92.5% silver. The rest is copper or some other metal. It is used for jewellery and silver tableware, where appearance is important.\n' +
			'\n' +
			'Silver is used to make mirrors, as it is the best reflector of visible light known, although it does tarnish with time. It is also used in dental alloys, solder and brazing alloys, electrical contacts and batteries. Silver paints are used for making printed circuits.\n' +
			'\n' +
			'Silver bromide and iodide were important in the history of photography, because of their sensitivity to light. Even with the rise of digital photography, silver salts are still important in producing high-quality images and protecting against illegal copying. Light-sensitive glass (such as photochromic lenses) works on similar principles. It darkens in bright sunlight and becomes transparent in low sunlight.\n' +
			'\n' +
			'Silver has antibacterial properties and silver nanoparticles are used in clothing to prevent bacteria from digesting sweat and forming unpleasant odours. Silver threads are woven into the fingertips of gloves so that they can be used with touchscreen phones.\n',
		biological : 'Silver has no known biological role. Chronic ingestion or inhalation of silver compounds can lead to a condition known as argyria, which results in a greyish pigmentation of the skin and mucous membranes. Silver has antibacterial properties and can kill lower organisms quite effectively.\n',
		natural : 'Silver occurs uncombined, and in ores such as argentite and chlorargyrite (horn silver). However, it is mostly extracted from lead-zinc, copper, gold and copper-nickel ores as a by-product of mining for these metals. The metal is recovered either from the ore, or during the electrolytic refining of copper. World production is about 20,000 tonnes per year.',
		imageText : 'The symbol is based on the widely used alchemical symbol for silver. In the background is a detail from the ‘Gundestrup Cauldron’, the largest known example of European Iron Age silver work.\n',
		history : 'Slag heaps near ancient mine workings in Turkey and Greece prove that silver mining started around 3000 BC. The metal was refined by cupellation, a process invented by the Chaldeans, who lived in what is now southern Iraq. It consisted of heating the molten metal in a shallow cup over which blew a strong draft of air. This oxidised the other metals, such as lead and copper, leaving only silver unaffected.\n' +
			'\n' +
			'The rise of Athens was made possible partly through the exploitation of local silver mines at Laurium. These operated from 600 BC and right through the Roman era. In Medieval times, German mines became the main source of silver in Europe.\n' +
			'\n' +
			'Silver was also mined by the ancient civilizations of Central and South America there being rich deposits in Peru, Bolivia and Mexico.'
	},
	48: {
		ab : 'Cd',
		name : 'Cadmium',
		mass : 113.903,
		masses : [
			[105.906, 1.25],
			[107.904, 0.89],
			[109.903, 12.49],
			[110.904, 12.8],
			[111.903, 24.13],
			[112.904, 12.22],
			[115.905, 7.49]
		],
		abundance : 28.73,
		color : 'blue',
		value : 48,
		origin : 'The name is derived from the Latin \'cadmia\', the name for the mineral calamine. \n',
		appearance : 'Cadmium is a silvery metal with a bluish tinge to its surface.\n',
		uses : 'Cadmium is a poison and is known to cause birth defects and cancer. As a result, there are moves to limit its use.\n' +
			'\n' +
			'80% of cadmium currently produced is used in rechargeable nickel-cadmium batteries. However, they are gradually being phased out and replaced with nickel metal hydride batteries.\n' +
			'\n' +
			'Cadmium was often used to electroplate steel and protect it from corrosion. It is still used today to protect critical components of aeroplanes and oil platforms.\n' +
			'\n' +
			'Other past uses of cadmium included phosphors in cathode ray tube colour TV sets, and yellow, orange and red pigments.\n' +
			'\n' +
			'Cadmium absorbs neutrons and so is used in rods in nuclear reactors to control atomic fission.\n',
		biological : 'Cadmium is toxic, carcinogenic and teratogenic (disturbs the development of an embryo or foetus). On average we take in as little as 0.05 milligrams per day. But it accumulates in the body, and so on average we store about 50 milligrams.\n' +
			'\n' +
			'Before the dangers of cadmium were fully understood, welders and other metal workers were at risk of becoming ill. In 1966 some welders working on the Severn Road Bridge became ill from breathing in cadmium fumes.\n',
		natural : 'The only mineral containing significant quantities of cadmium is greenockite (cadmium sulfide). It is also present in small amounts in sphalerite. Almost all commercially produced cadmium is obtained as a by-product of zinc refining.\n',
		imageText : 'Cadmium is naturally occurring in the Earth’s crust. The image includes an alchemical symbol once used to represent ‘earth’ elements, against a background projection of the Earth.\n',
		history : 'In the early 1800s, the apothecaries of Hanover, Germany, made zinc oxide by heating a naturally occurring form of zinc carbonate called cadmia. Sometimes the product was discoloured instead of being pure white, and when Friedrich Stromeyer of Göttingen University looked into the problem he traced the discoloration to a component he could not identify, and which he deduced must be an unknown element. This he separated as its brown oxide and, by heating it with lampblack (carbon), he produced a sample of a blue-grey metal which he named cadmium after the name for the mineral. That was in 1817. Meanwhile two other Germans, Karl Meissner in Halle, and Karl Karsten in Berlin, were working on the same problem and announced their discovery of cadmium the following year.\n'
	},
	49: {
		ab : 'In',
		name : 'Indium',
		mass : 114.904,
		abundance : 95.71,
		color : 'lime',
		value : 49,
		origin : 'The name comes from the Latin \'indicium\', meaning violet or indigo. \n',
		appearance : 'A soft, silvery metal that is stable in air and water.\n',
		uses : 'Most indium is used to make indium tin oxide (ITO), which is an important part of touch screens, flatscreen TVs and solar panels. This is because it conducts electricity, bonds strongly to glass and is transparent.\n' +
			'\n' +
			'Indium nitride, phosphide and antimonide are semiconductors used in transistors and microchips.\n' +
			'\n' +
			'Indium metal sticks to glass and can be used to give a mirror finish to windows of tall buildings, and as a protective film on welders’ goggles. It has also been used to coat ball bearings in Formula 1 racing cars because of its low friction.\n' +
			'\n' +
			'An indium alloy has been used for fire-sprinkler systems in shops and warehouses because of its low melting point.\n',
		biological : 'Indium has no known biological role. It is toxic if more than a few milligrams are consumed and can affect the development of an embryo or foetus.\n',
		natural : 'Indium is one of the least abundant minerals on Earth. It has been found uncombined in nature, but typically it is found associated with zinc minerals and iron, lead and copper ores. It is commercially produced as a by-product of zinc refining.\n',
		imageText : 'The symbol used here is the Japanese kanji character ‘hon’. It means ‘origin’. Indium is named after the bright indigo line in its spectrum. The Japanese discovered that cotton was a difficult fabric to dye, except with indigo. So, indigo dye was widely used to colour cotton throughout the Edo period (1603–1867).\n',
		history : 'Indium was discovered in 1863 by Ferdinand Reich at the Freiberg School of Mines in Germany. Reich was investigating a sample of the mineral zinc blende (now known as sphalerite, ZnS) which he believed might contain the recently discovered element thallium. From it he obtained a yellow precipitate which he thought was thallium sulfide, but his atomic spectroscope showed lines that were not those of thallium. However, because he was colour-blind he asked Hieronymous Richter to look at the spectrum, and he noted a brilliant violet line, and this eventually gave rise to the name indium, from the Latin word indicum meaning violet.\n' +
			'\n' +
			'Working together Reich and Richter isolated a small sample of the new element and announced its discovery. Subsequently the two men fell out when Reich learned that when Richter, on a visit to Paris, claimed he was the discover.'
	},
	50: {
		ab : 'Sn',
		name : 'Tin',
		mass : 119.902,
		masses : [
			[111.905, 0.97],
			[113.903, 0.66],
			[114.903, 0.34],
			[115.902, 14.54],
			[116.903, 7.68],
			[117.902, 24.22],
			[118.903, 8.59],
			[121.903, 4.63],
			[123.905, 5.79]
		],
		abundance : 32.58,
		color : 'purple',
		value : 50,
		origin : 'The name comes from the Anglo-Saxon \'tin\' \n',
		appearance : 'A soft, pliable metal. Below 13°C it slowly changes to a powder form.\n',
		uses : 'Tin has many uses. It takes a high polish and is used to coat other metals to prevent corrosion, such as in tin cans, which are made of tin-coated steel. Alloys of tin are important, such as soft solder, pewter, bronze and phosphor bronze. A niobium-tin alloy is used for superconducting magnets.\n' +
			'\n' +
			'Most window glass is made by floating molten glass on molten tin to produce a flat surface. Tin salts sprayed onto glass are used to produce electrically conductive coatings.\n' +
			'\n' +
			'The most important tin salt used is tin(II) chloride, which is used as a reducing agent and as a mordant for dyeing calico and silk. Tin(IV) oxide is used for ceramics and gas sensors. Zinc stannate (Zn2SnO4) is a fire-retardant used in plastics.\n' +
			'\n' +
			'Some tin compounds have been used as anti-fouling paint for ships and boats, to prevent barnacles. However, even at low levels these compounds are deadly to marine life, especially oysters. Its use has now been banned in most countries.\n',
		biological : 'Tin has no known biological role in humans, although it may be essential to some species. The metal is non-toxic, but organo-tin compounds can be poisonous and must be handled with care. Plants easily absorb tin.\n',
		natural : 'Tin is found principally in the ore cassiterite (tin(IV) oxide). It is mainly found in the ‘tin belt’ stretching through China, Thailand and Indonesia. It is also mined in Peru, Bolivia and Brazil. It is obtained commercially by reducing the ore with coal in a furnace.\n',
		imageText : 'A common alchemical symbol for tin is shown here embossed on a ‘tin’ can. Tin cans are traditionally made from steel coated with tin.\n',
		history : 'Tin had a direct impact on human history mainly on account of bronze, although it could be used in its own right, witness a tin ring and pilgrim bottle found in an Egyptian tomb of the eighteenth dynasty (1580–1350 BC). The Chinese were mining tin around 700 BC in the province of Yunnan. Pure tin has also been found at Machu Picchu, the mountain citadel of the Incas.\n' +
			'\n' +
			'When copper was alloyed with around 5 per cent of tin it produced bronze, which not only melted at a lower temperature, so making it easier to work, but produced a metal that was much harder, and ideal for tools and weapons. The Bronze Age is now a recognised stage in the development of civilisation. How bronze was discovered we do not know, but the peoples of Egypt, Mesopotamia, and the Indus valley started using it around 3000 BC.'
	},
	51: {
		ab : 'Sb',
		name : 'Antimony',
		mass : 120.904,
		mases : [
			[122.904, 42.79]
		],
		abundance : 57.21,
		color : 'grey',
		value : 51,
		origin : 'The name derives from the Greek \'anti - monos\', meaning not alone \n',
		appearance : 'Antimony is a semi-metal. In its metallic form it is silvery, hard and brittle.\n',
		uses : 'Antimony is used in the electronics industry to make some semiconductor devices, such as infrared detectors and diodes.\n' +
			'\n' +
			'It is alloyed with lead or other metals to improve their hardness and strength. A lead-antimony alloy is used in batteries. Other uses of antimony alloys include type metal (in printing presses), bullets and cable sheathing.\n' +
			'\n' +
			'Antimony compounds are used to make flame-retardant materials, paints, enamels, glass and pottery.\n',
		biological : 'Antimony and many of its compounds are toxic.\n',
		natural : 'Antimony is not an abundant element but is found in small quantities in over 100 mineral species. It is most often found as antimony(III) sulfide. It is extracted by roasting the antimony(III) sulfide to the oxide, and then reducing with carbon. Antimony can also be found as the native metal.\n' +
			'\n' +
			'China produces 88% of the world’s antimony. Other producers are Bolivia, Russia and Tajikistan.',
		imageText : 'The symbol is the Eye of Horus, an Ancient Egyptian symbol of protection, royal power and good health. The Ancient Egyptians used antimony sulfide as a mascara.\n',
		history : 'Antimony and its compounds were known to the ancients and there is a 5,000-year old antimony vase in the Louvre in Paris. Antimony sulfide (Sb2S3) is mentioned in an Egyptian papyrus of the 16th century BC. The black form of this pigment, which occurs naturally as the mineral stibnite, was used as mascara and known as khol. The most famous user was the temptress Jezebel whose exploits are recorded in the Bible.\n' +
			'\n' +
			'Another pigment known to the Chaldean civilization, which flourished in what is now southern Iraq in the 6th and 7th centuries BC, was yellow lead antimonite. This was found in the glaze of ornamental bricks at Babylon and date from the time of Nebuchadnezzar (604–561 BC).\n' +
			'\n' +
			'Antimony became widely used in Medieval times, mainly to harden lead for type, although some was taken medicinally as a laxative pill which could be reclaimed and re-used!'
	},
	52: {
		ab : 'Te',
		name : 'Tellurium',
		mass : 129.906,
		masses : [
			[119.904, 0.09],
			[121.903, 2.55],
			[122.904, 0.89],
			[123.903, 4.74],
			[124.904, 7.07],
			[125.903, 18.84],
			[127.904, 31.74]
		],
		abundance : 34.08,
		color : 'orange',
		value : 52,
		origin : 'The name is derived from the Latin \'tellus\', meaning Earth. \n',
		appearance : 'A semi-metal usually obtained as a grey powder.\n',
		uses : 'Tellurium is used in alloys, mostly with copper and stainless steel, to improve their machinability. When added to lead it makes it more resistant to acids and improves its strength and hardness.\n' +
			'\n' +
			'Tellurium has been used to vulcanise rubber, to tint glass and ceramics, in solar cells, in rewritable CDs and DVDs and as a catalyst in oil refining. It can be doped with silver, gold, copper or tin in semiconductor applications.\n',
		biological : 'Tellurium has no known biological role. It is very toxic and teratogenic (disturbs the development of an embryo or foetus). Workers exposed to very small quantities of tellurium in the air develop ‘tellurium breath’, which has a garlic-like odour.\n',
		natural : 'Tellurium is present in the Earth’s crust only in about 0.001 parts per million. Tellurium minerals include calaverite, sylvanite and tellurite. It is also found uncombined in nature, but only very rarely. It is obtained commercially from the anode muds produced during the electrolytic refining of copper. These contain up to about 8% tellurium.\n',
		imageText : 'The Earth-like sphere in the image reflects the origin of the element’s name, after ‘tellus’, the Latin word for Earth.\n',
		history : 'Tellurium was discovered in 1783 by Franz Joseph Müller von Reichenstein at Sibiu, Romania. He became intrigued by ore from a mine near Zalatna which had a metallic sheen and which he suspected was native antimony or bismuth. (It was actually gold telluride, AuTe2.) Preliminary investigation showed neither antimony nor bismuth to be present. For three years Müller researched the ore and proved it contained a new element. He published his findings in an obscure journal and it went largely unnoticed.\n' +
			'\n' +
			'In 1796, he sent a sample to Martin Klaproth in Berlin who confirmed him findings. Klaproth produced a pure sample and decided to call it tellurium. Rather strangely, this was not the first sample of tellurium to pass through his hands. In 1789, he had been sent some by a Hungarian scientist, Paul Kitaibel who had independently discovered it.'
	},
	53: {
		ab : 'I',
		name : 'Iodine',
		mass : 126.904,
		abundance : 100,
		color : 'tangerine',
		value : 53,
		origin : 'The name is derived from the Greek \'iodes\' meaning violet. \n',
		appearance : 'A black, shiny, crystalline solid. When heated, iodine sublimes to form a purple vapour.\n',
		uses : 'Photography was the first commercial use for iodine after Louis Daguerre, in 1839, invented a technique for producing images on a piece of metal. These images were called daguerreotypes.\n' +
			'\n' +
			'Today, iodine has many commercial uses. Iodide salts are used in pharmaceuticals and disinfectants, printing inks and dyes, catalysts, animal feed supplements and photographic chemicals. Iodine is also used to make polarising filters for LCD displays.\n' +
			'\n' +
			'Iodide is added in small amounts to table salt, in order to avoid iodine deficiency affecting the thyroid gland. The radioactive isotope iodine-131 is sometimes used to treat cancerous thyroid glands.',
		biological : 'Iodine is an essential element for humans, who need a daily intake of about 0.1 milligrams of iodide. Our bodies contain up to 20 milligrams, mainly in the thyroid gland. This gland helps to regulate growth and body temperature.\n' +
			'\n' +
			'Normally we get enough iodine from the food we eat. A deficiency of iodine can cause the thyroid gland to swell up (known as goitre).\n',
		natural : 'Iodine is found in seawater, as iodide. It is only present in trace amounts (0.05 parts per million); however, it is assimilated by seaweeds. In the past iodine was obtained from seaweed.\n' +
			'\n' +
			'Now the main sources of iodine are iodate minerals, natural brine deposits left by the evaporation of ancient seas and brackish (briny) waters from oil and salt wells.\n' +
			'\n' +
			'Iodine is obtained commercially by releasing iodine from the iodate obtained from nitrate ores or extracting iodine vapour from the processed brine.',
		imageText : 'The image is of seaweed. Many species of seaweed contain iodine.\n',
		history : 'In the early 1800s, Bernard Courtois of Paris manufactured saltpetre (potassium nitrate, KNO3) and used seaweed ash as his source of potassium. One day in 1811, he added sulfuric acid and saw purple fumes which condensed to form crystals with a metallic lustre. Courtois guessed this was a new element. He gave some to Charles-Bernard Desormes and to Nicolas Clément who carried out a systematic investigation and confirmed that it was. In November 1813, they exhibited iodine at the Imperial Institute in Paris. That it really was new was proved by Joseph Gay-Lussac and confirmed by the Humphry Davy who was visiting Paris. Davy sent a report to the Royal Institution in London where it was mistakenly assumed he was the discoverer, a belief that persisted for more than 50 years.'
	},
	54: {
		ab : 'Xe',
		name : 'Xenon',
		mass : 131.904,
		masses : [
			[123.906, 0.0952],
			[125.904, 0.089],
			[127.904, 1.9102],
			[128.905, 26.4006],
			[129.904, 4.071],
			[130.905, 21.2324],
			[133.905, 10.4357],
			[135.907, 8.8573]
		],
		abundance : 26.9086,
		color : 'yellow',
		value : 54,
		origin : 'The name is derived from the Greek \'xenos\' meaning stranger. \n',
		appearance : 'A colourless, odourless gas. It is very unreactive.\n',
		uses : 'Xenon is used in certain specialised light sources. It produces a beautiful blue glow when excited by an electrical discharge. Xenon lamps have applications as high-speed electronic flash bulbs used by photographers, sunbed lamps and bactericidal lamps used in food preparation and processing. Xenon lamps are also used in ruby lasers.\n' +
			'\n' +
			'Xenon ion propulsion systems are used by several satellites to keep them in orbit, and in some other spacecraft.\n' +
			'\n' +
			'Xenon difluoride is used to etch silicon microprocessors. It is also used in the manufacture of 5-fluorouracil, a drug used to treat certain types of cancer.',
		biological : 'Xenon has no known biological role. It is not itself toxic, but its compounds are highly toxic because they are strong oxidising agents.\n',
		natural : 'Xenon is present in the atmosphere at a concentration of 0.086 parts per million by volume. It can also be found in the gases that evolve from certain mineral springs. It is obtained commercially by extraction from liquid air.\n',
		imageText : 'The ‘electro-flash’ icon reflects the use of the gas in camera flash technology. This is usually a tube filled with xenon gas, with electrodes at each end and a metal trigger plate at the middle of the tube.\n',
		history : 'Xenon was discovered in July 1898 by William Ramsay and Morris Travers at University College London. They had already extracted neon, argon, and krypton from liquid air, and wondered if it contained other gases. The wealthy industrialist Ludwig Mond gave them a new liquid-air machine and they used it to extract more of the rare gas krypton. By repeatedly distilling this, they eventually isolated a heavier gas, and when they examined this in a vacuum tube it gave a beautiful blue glow. They realised it was yet another member of the ‘inert’ group of gaseous elements as they were then known because of their lack of chemical reactivity. They called the new gas xenon. It was this gas which Neil Bartlett eventually showed was not inert by making a fluorine derivative in 1962. So far more than 100 xenon compounds have been made.\n'
	},
	55: {
		ab : 'Cs',
		name : 'Caesium',
		mass : 132.905,
		abundance : 100,
		color : 'pink',
		value : 55,
		origin : 'The name comes from the Latin \'caesius\', meaning sky blue, and derived from its flame colour. \n',
		appearance : 'Caesium is a soft, gold-coloured metal that is quickly attacked by air and reacts explosively in water.\n',
		uses : 'The most common use for caesium compounds is as a drilling fluid. They are also used to make special optical glass, as a catalyst promoter, in vacuum tubes and in radiation monitoring equipment.\n' +
			'\n' +
			'One of its most important uses is in the ‘caesium clock’ (atomic clock). These clocks are a vital part of the internetand mobile phone networks, as well as Global Positioning System (GPS) satellites. They give the standard measure of time: the electron resonance frequency of the caesium atom is 9,192,631,770 cycles per second. Some caesium clocks are accurate to 1 second in 15 million years.\n',
		biological : 'Caesium has no known biological role. Caesium compounds, such as caesium chloride, are low hazard.\n',
		natural : 'Caesium is found in the minerals pollucite and lepidolite. Pollucite is found in great quantities at Bernic Lake,Manitoba, Canada and in the USA, and from this source the element can be prepared. However, most commercialproduction is as a by-product of lithium production.\n',
		imageText : 'The symbol reflects the use of the element in highly accurate atomic clocks.\n',
		history : 'Caesium was almost discovered by Carl Plattner in 1846 when he investigated the mineral pollucite (caesium aluminium silicate). He could only account for 93% of the elements it contained, but then ran out of material to analyse. (It was later realised that he mistook the caesium for sodium and potassium.)\n' +
			'\n' +
			'Caesium was eventually discovered by Gustav Kirchhoff and Robert Bunsen in 1860 at Heidelberg, Germany. They examined mineral water from Durkheim and observed lines in the spectrum which they did not recognise, and that meant a new element was present. They produced around 7 grams of caesium chloride from this source, but were unable to produce a sample of the new metal itself. The credit for that goes to Carl Theodor Setterberg at the University of Bonn who obtained it by the electrolysis of molten caesium cyanide, CsCN.'
	},
	56: {
		ab : 'Ba',
		name : 'Barium',
		mass : 137.905,
		masses : [
			[131.905, 0.101],
			[133.905, 2.417],
			[134.906, 6.592],
			[135.905, 7.854],
			[136.906, 11.232]
		],
		abundance : 71.698,
		color : 'pinkl',
		value : 56,
		origin : 'The name comes from the Greek \'barys\', meaning heavy. \n',
		appearance : 'Barium is a soft, silvery metal that rapidly tarnishes in air and reacts with water.\n',
		uses : 'Barium is not an extensively used element. Most is used in drilling fluids for oil and gas wells. It is also used in paint and in glassmaking.\n' +
			'\n' +
			'All barium compounds are toxic; however, barium sulfate is insoluble and so can be safely swallowed. A suspension of barium sulfate is sometimes given to patients suffering from digestive disorders. This is a ‘barium meal’ or ‘barium enema’. Barium is a heavy element and scatters X-rays, so as it passes through the body the stomach and intestines can be distinguished on an X-ray.\n' +
			'\n' +
			'Barium carbonate has been used in the past as a rat poison. Barium nitrate gives fireworks a green colour.',
		biological : 'Barium has no known biological role, although barium sulfate has been found in one particular type of algae. Barium is toxic, as are its water- or acid-soluble compounds.\n',
		natural : 'Barium occurs only in combination with other elements. The major ores are barite (barium sulfate) and witherite (barium carbonate). Barium metal can be prepared by electrolysis of molten barium chloride, or by heating barium oxide with aluminium powder.\n',
		imageText : 'The image is based on x-ray radiographs of the human stomach and intestines in patients who have been given a ‘barium meal’.\n',
		history : 'In the early 1600s, Vincenzo Casciarolo, of Bologna, Italy, found some unusual pebbles. If they were heated to redness during the day, they would shine during the night. This was the mineral barite (barium sulfate, BaSO4).\n' +
			'\n' +
			'When Bologna stone, as it became known, was investigated by Carl Scheele in 1760s he realised it was the sulfate of an unknown element. Meanwhile a mineralogist, Dr William Withering, had found another curiously heavy mineral in a lead mine in Cumberland which clearly was not a lead ore. He named it witherite; it was later shown to be barium carbonate, BaCO3.\n' +
			'\n' +
			'Neither the sulfate nor the carbonate yielded up the metal itself using the conventional process of smelting with carbon. However, Humphry Davy at the Royal Institution in London produced it by the electrolysis of barium hydroxide in 1808.'
	},
	57: {
		ab : 'La',
		name : 'Lanthanum',
		mass : 138.906,
		masses : [
			[137.907, 0.09]
		],
		abundance : 99.91,
		color : 'light-blue',
		value : 57,
		origin : 'The name is derived from the Greek \'lanthanein\', meaning to lie hidden. \n',
		appearance : 'A soft, silvery-white metal. It rapidly tarnishes in air and burns easily when ignited.\n',
		uses : 'Lanthanum metal has no commercial uses. However, its alloys have a variety of uses. A lanthanum-nickel alloy is used to store hydrogen gas for use in hydrogen-powered vehicles. Lanthanum is also found in the anode of nickel metal hydride batteries used in hybrid cars.\n' +
			'\n' +
			'Lanthanum is an important component of mischmetal alloy (about 20%). The best-known use for this alloy is in ‘flints’ for cigarette lighters.\n' +
			'\n' +
			'‘Rare earth’ compounds containing lanthanum are used extensively in carbon lighting applications, such as studio lighting and cinema projection. They increase the brightness and give an emission spectrum similar to sunlight.\n' +
			'\n' +
			'Lanthanum(III) oxide is used in making special optical glasses, as it improves the optical properties and alkali resistance of the glass. Lanthanum salts are used in catalysts for petroleum refining.\n' +
			'\n' +
			'The ion La3+ is used as a biological tracer for Ca2+, and radioactive lanthanum has been tested for use in treating cancer.',
		biological : 'Lanthanum has no known biological role. Both the element and its compounds are moderately toxic.\n',
		natural : 'Lanthanum is found in ‘rare earth’ minerals, principally monazite (25% lanthanum) and bastnaesite (38% lanthanum). Ion-exchange and solvent extraction techniques are used to isolate the ‘rare earth’ elements from the minerals. Lanthanum metal is usually obtained by reducing the anhydrous fluoride with calcium.\n',
		imageText : 'The image is of a camera lens. Lanthanum is added to glass used in some camera lenses to improve the clarity of the images it can produce. The flames in the background reflect the ease with which the element burns when ignited.\n',
		history : 'Lanthanum was discovered in January 1839 by Carl Gustav Mosander at the Karolinska Institute, Stockholm. He extracted it from cerium which had been discovered in 1803. Mosander noticed that while most of his sample of cerium oxide was insoluble, some was soluble and he deduced that this was the oxide of a new element. News of his discovery spread, but Mosander was strangely silent.\n' +
			'\n' +
			'That same year, Axel Erdmann, a student also at the Karolinska Institute, discovered lanthanum in a new mineral from Låven island located in a Norwegian fjord.\n' +
			'\n' +
			'Finally, Mosander explained his delay, saying that he had extracted a second element from cerium, and this he called didymium. Although he didn’t realise it, didymium too was a mixture, and in 1885 it was separated into praseodymium and neodymium.'
	},
	58: {
		ab : 'Ce',
		name : 'Cerium',
		mass : 139.905,
		masses : [
			[135.907, 0.185],
			[137.906, 0.251],
			[141.909, 11.114]
		],
		abundance : 88.45,
		color : 'light-blue',
		value : 58,
		origin : 'Cerium is named for the asteroid, Ceres, which in turn was named after the Roman goddess of agriculture.  \n',
		appearance : 'Cerium is a grey metal. It is little used because it tarnishes easily, reacts with water and burns when heated.\n',
		uses : 'Cerium is the major component of mischmetal alloy (just under 50%). The best-known use for this alloy is in ‘flints’ for cigarette lighters. This is because cerium will make sparks when struck. The only other element that does this is iron.\n' +
			'\n' +
			'Cerium(Ill) oxide has uses as a catalyst. It is used in the inside walls of self-cleaning ovens to prevent the build-up of cooking residues. It is also used in catalytic converters. Cerium(III) oxide nanoparticles are being studied as an additive for diesel fuel to help it burn more completely and reduce exhaust emissions.\n' +
			'\n' +
			'Cerium sulfide is a non-toxic compound that is a rich red colour. It is used as a pigment.\n' +
			'\n' +
			'Cerium is also used in flat-screen TVs, low-energy light bulbs and floodlights.',
		biological : 'Cerium has no known biological role.\n',
		natural : 'Cerium is the most abundant of the lanthanides. It is more abundant than tin or lead and almost as abundant as zinc. It is found in a various minerals, the most common being bastnaesite and monazite.\n' +
			'\n' +
			'Cerium oxide is produced by heating bastnaesite ore, and treating with hydrochloric acid. Metallic cerium can be obtained by heating cerium(III) fluoride with calcium, or by the electrolysis of molten cerium oxide.',
		imageText : 'The image is based on the asteroid Ceres, after which the element is named. The background is based on an early 17th-century astronomical map.\n',
		history : 'Cerium was first identified by the Jöns Berzelius and Wilhelm Hisinger in the winter of 1803/4. Martin Klaproth independently discovered it around the same time.\n' +
			'\n' +
			'Although cerium is one of the 14 lanthanoid (aka rare earth) elements it was discovered independently of them. There are some minerals that are almost exclusively cerium salts such as cerite, which is cerium silicate. A lump of this mineral had been found in 1751 by Axel Cronstedt at a mine in Vestmanland, Sweden. He sent some to Carl Scheele to analyse it but he failed to realise it was new element. In 1803, Berzelius and Hisinger examined it themselves and proved that it contained a new element.\n' +
			'\n' +
			'It was not until 1875 that William Hillebrand and Thomas Norton obtained a pure specimen of cerium itself, by passing an electric current through the molten cerium chloride.'
	},
	59: {
		ab : 'Pr',
		name : 'Praseodymium',
		mass : 140.908,
		abundance : 100,
		color : 'light-blue',
		value : 59,
		origin : 'The name is derived from the Greek \'prasios didymos\' meaning green twin. \n',
		appearance : 'A soft, silvery metal.\n',
		uses : 'Praseodymium is used in a variety of alloys. The high-strength alloy it forms with magnesium is used in aircraft engines. Mischmetal is an alloy containing about 5% praseodymium and is used to make flints for cigarette lighters. Praseodymium is also used in alloys for permanent magnets.\n' +
			'\n' +
			'Along with other lanthanide elements, it is used in carbon arc electrodes for studio lighting and projection.\n' +
			'\n' +
			'Praseodymium salts are used to colour glasses, enamel and glazes an intense and unusually clean yellow. Praseodymium oxide is a component of didymium glass (along with neodymium). This glass is used in goggles used by welders and glassmakers, because it filters out the yellow light and infrared (heat) radiation.',
		biological : 'Praseodymium has no known biological role. It has low toxicity.\n',
		natural : 'Praseodymium occurs along with other lanthanide elements in a variety of minerals. The two principal sources are monazite and bastnaesite. It is extracted from these minerals by ion exchange and solvent extraction.\n' +
			'\n' +
			'Praseodymium metal is prepared by reducing anhydrous chloride with calcium.',
		imageText : 'The symbol is one commonly used for the astrological birth sign of Gemini (‘the twins’). The green colour, together with this symbol, reflects the origin of the element’s name, from the Greek ‘prasinos’, meaning ‘green’, and ‘didymos’, meaning ‘twin’.\n',
		history : 'Didymium was announced in 1841 by Carl Mosander. He separated if from cerium, along with lanthanum. Didymium was accepted as an element for more than 40 years but it was really a mixture of lanthanoid elements. Some chemists wondered whether didymium too might consist of more than one element, and their suspicions were confirmed when Bohuslav Brauner of Prague in 1882 showed that its atomic spectrum was not that of a pure metal. The Austrian chemist, Carl Auer von Welsbach took up the challenge and in June 1885 he succeeded in splitting didymium into its two components, neodymium and praseodymium, which he obtained as their oxides.\n' +
			'\n' +
			'A pure sample of praseodymium metal itself was first produced in 1931'
	},
	60: {
		ab : 'Nd',
		name : 'Neodymium',
		mass : 141.908,
		masses : [
			[142.910, 12.2],
			[143.910, 23.8],
			[144.913, 8.3],
			[145.913, 17.2],
			[147.917, 5.8],
			[149.921, 5.6]
		],
		abundance : 27.2,
		color : 'light-blue',
		value : 60,
		origin : 'The name is derived from the Greek \'neos didymos\' meaning new twin. \n',
		appearance : 'A silvery-white metal. It rapidly tarnishes in air.\n',
		uses : 'The most important use for neodymium is in an alloy with iron and boron to make very strong permanent magnets. This discovery, in 1983, made it possible to miniaturise many electronic devices, including mobile phones, microphones, loudspeakers and electronic musical instruments. These magnets are also used in car windscreen wipers and wind turbines.\n' +
			'\n' +
			'Neodymium is a component, along with praseodymium, of didymium glass. This is a special glass for goggles used during glass blowing and welding. The element colours glass delicate shades of violet, wine-red and grey. Neodymium is also used in the glass for tanning booths, since it transmits the tanning UV rays but not the heating infrared rays.\n' +
			'\n' +
			'Neodymium glass is used to make lasers. These are used as laser pointers, as well as in eye surgery, cosmetic surgery and for the treatment of skin cancers.\n' +
			'\n' +
			'Neodymium oxide and nitrate are used as catalysts in polymerisation reactions.\n',
		biological : 'Neodymium has no known biological role. It is moderately toxic and irritating to eyes.\n',
		natural : 'The main sources of most lanthanide elements are the minerals monazite and bastnaesite. Neodymium can be extracted from these minerals by ion exchange and solvent extraction. The element can also be obtained by reducing anhydrous neodymium chloride or fluoride with calcium.\n',
		imageText : 'The imagery and symbols used here reflect the use of neodymium in the manufacture of purple glass.\n',
		history : 'Neodymium was discovered in Vienna in 1885 by Karl Auer. Its story began with the discovery of cerium, from which Carl Gustav Mosander extracted didymium in 1839. This turned out to be a mixture of lanthanoid elements, and in 1879, samarium was extracted from didymium, followed a year later by gadolinium. In 1885, Auer obtained neodymium and praseodymium from didymium, their existence revealed by atomic spectroscopy. Didymium had been studied by Bohuslav Brauner at Prague in 1882 and was shown to vary according to the mineral from which it came. At the time he made his discovery, Auer was a research student of the great German chemist, Robert Bunsen who was the world expert on didymium, but he accepted Auer\'s discovery immediately, whereas other chemists were to remain sceptical for several years.\n' +
			'\n' +
			'A sample of the pure metal was first produced in 1925.'
	},
	61: {
		ab : 'Pm',
		name : 'Promethium',
		mass : 144.913,
		masses : [
			[146.915]
		],
		abundance : 0,
		color : 'light-blue',
		value : 61,
		origin : 'Promethium is named after Prometheus of Greek mythology who stole fire from the Gods and gave it to humans. \n',
		appearance : 'A radioactive metal.\n',
		uses : 'Most promethium is used only in research. A little promethium is used in specialised atomic batteries. These are roughly the size of a drawing pin and are used for pacemakers, guided missiles and radios. The radioactive decay of promethium is used to make a phosphor give off light and this light is converted into electricity by a solar cell.\n' +
			'\n' +
			'Promethium can also be used as a source of x-rays and radioactivity in measuring instruments.',
		biological : 'Promethium has no known biological role.\n',
		natural : 'Promethium’s longest-lived isotope has a half-life of only 18 years. For this reason it is not found naturally on Earth. It has been found that a star in the Andromeda galaxy is manufacturing promethium, but it is not known how.\n' +
			'\n' +
			'Promethium can be produced by irradiating neodymium and praseodymium with neutrons, deuterons and alpha particles. It can also be prepared by ion exchange of nuclear reactor fuel processing wastes.',
		imageText : 'The image is based on a scene from an Ancient Greek vase. It depicts the god Atlas witnessing Zeus’ punishment of Prometheus. Prometheus was chained to a rock on a mountain top. Every day an eagle tore at his body and ate his liver, and every night the liver grew back. Because Prometheus was immortal, he could not die, but he suffered endlessly.\n',
		history : 'In 1902, Bohuslav Branner speculated that there should be an element in the periodic table between neodymium and samarium. He was not to know that all its isotopes were radioactive and had long disappeared. Attempts were made to discover it and several claims were made, but clearly all were false. However, minute amounts of promethium do occur in uranium ores as a result of nuclear fission, but in amounts of less than a microgram per million tonnes of ore.\n' +
			'\n' +
			'In 1939, the 60-inch cyclotron at the University of California was used to make promethium, but it was not proven. Finally element 61 was produced in 1945 by Jacob .A. Marinsky, Lawrence E. Glendenin, and Charles D. Coryell at Oak Ridge, Tennessee. They used ion-exchange chromatography to separate it from the fission products of uranium fuel taken from a nuclear reactor.'
	},
	62: {
		ab : 'Sm',
		name : 'Samarium',
		mass : 151.920,
		masses : [
			[143.912, 3.07],
			[146.915, 14.99],
			[147.915, 11.24],
			[148.917, 13.82],
			[149.917, 7.38],
			[153.922, 22.75]
		],
		abundance : 26.75,
		color : 'light-blue',
		value : 62,
		origin : 'The name is derived from samarskite, the name of the mineral from which it was first isolated. \n',
		appearance : 'A silvery-white metal.\n',
		uses : 'Samarium-cobalt magnets are much more powerful than iron magnets. They remain magnetic at high temperatures and so are used in microwave applications. They enabled the miniaturisation of electronic devices like headphones, and the development of personal stereos. However, neodymium magnets are now more commonly used instead.\n' +
			'\n' +
			'Samarium is used to dope calcium chloride crystals for use in optical lasers. It is also used in infrared absorbing glass and as a neutron absorber in nuclear reactors. Samarium oxide finds specialised use in glass and ceramics. In common with other lanthanides, samarium is used in carbon arc lighting for studio lighting and projection.\n',
		biological : 'Samarium has no known biological role. It has low toxicity.\n',
		natural : 'Samarium is found along with other lanthanide metals in several minerals, the principal ones being monazite and bastnaesite. It is separated from the other components of the mineral by ion exchange and solvent extraction.\n' +
			'\n' +
			'Recently, electrochemical deposition has been used to separate samarium from other lanthanides. A lithium citrate electrolyte is used, and a mercury electrode. Samarium metal can also be produced by reducing the oxide with barium.',
		imageText : 'The mineral samarskite, from which samarium was first isolated, is named after Colonel Samarsky, a Russian mine official. The Soviet hammer, sickle and star are on a background that reflects the use of the element in lasers.\n',
		history : 'Samarium was one of the rare earths (aka lanthanoids) which perplexed and puzzled the chemists of the 1800s. Its history began with the discovery of cerium in 1803. This was suspected of harbouring other metals, and in 1839 Carl Mosander claimed to have obtained lanthanum and didymium from it. While he was right about lanthanum, he was wrong about didymium. In 1879, Paul-Émile Lecoq de Boisbaudran extracted didymium from the mineral samarskite. He then made a solution of didymium nitrate and added ammonium hydroxide. He observed that the precipitate which formed came down in two stages. He concentrated his attention on the first precipitate and measured its spectrum which revealed it to be a new element samarium. Samarium itself was eventually to yield other rare-earths: gadolinium in 1886 and europium in 1901.'
	},
	63: {
		ab : 'Eu',
		name : 'Europium',
		mass : 152.921,
		masses : [
			[150.920, 47.81]
		],
		abundance : 52.19,
		color : 'light-blue',
		value : 63,
		origin : 'Europium is named after Europe \n',
		appearance : 'A soft, silvery metal that tarnishes quickly and reacts with water.\n',
		uses : 'Europium is used in the printing of euro banknotes. It glows red under UV light, and forgeries can be detected by the lack of this red glow.\n' +
			'\n' +
			'Low-energy light bulbs contain a little europium to give a more natural light, by balancing the blue (cold) light with a little red (warm) light.\n' +
			'\n' +
			'Europium is excellent at absorbing neutrons, making it valuable in control rods for nuclear reactors.\n' +
			'\n' +
			'Europium-doped plastic has been used as a laser material. It is also used in making thin super-conducting alloys.',
		biological : 'Europium has no known biological role. It has low toxicity.\n',
		natural : 'In common with other lanthanides, europium is mainly found in the minerals monazite and bastnaesite. It can be prepared from these minerals. However, the usual method of preparation is by heating europium(Ill) oxide with an excess of lanthanum under vacuum.\n',
		imageText : 'The design is based on the European Union flag and monetary symbol.\n',
		history : 'Europium’s story is part of the complex history of the rare earths, aka lanthanoids. It began with cerium which was discovered in 1803. In 1839 Carl Mosander separated two other elements from it: lanthanum and one he called didymium which turned out to be a mixture of two rare earths, praseodymium and neodymium, as revealed by Karl Auer in 1879. Even so, it still harboured another rarer metal, samarium, separated by Paul-Émile Lecoq de Boisbaudran, and even that was impure. In 1886 Jean Charles Galissard de Marignac extracted gadolinium, from it, but that was still not the end of the story. In 1901, Eugène-Anatole Demarçay carried out a painstaking sequence of crystallisations of samarium magnesium nitrate, and separated yet another new element: europium.'
	},
	64: {
		ab : 'Gd',
		name : 'Gadolinium',
		mass : 157.924,
		masses : [
			[151.920, 0.2],
			[153.921, 2.18],
			[154.923, 14.8],
			[155.922, 20.47],
			[156.924, 15.65],
			[159.927, 21.86]
		],
		abundance : 24.84,
		color : 'light-blue',
		value : 64,
		origin : 'Gadolinium was named in honour of Johan Gadolin. \n',
		appearance : 'A soft, silvery metal that reacts with oxygen and water.\n',
		uses : 'Gadolinium has useful properties in alloys. As little as 1% gadolinium can improve the workability of iron and chromium alloys, and their resistance to high temperatures and oxidation. It is also used in alloys for making magnets, electronic components and data storage disks.\n' +
			'\n' +
			'Its compounds are useful in magnetic resonance imaging (MRI), particularly in diagnosing cancerous tumours.\n' +
			'\n' +
			'Gadolinium is excellent at absorbing neutrons, and so is used in the core of nuclear reactors.\n',
		biological : 'Gadolinium has no known biological role, and has low toxicity.\n',
		natural : 'In common with other lanthanides, gadolinium is mainly found in the minerals monazite and bastnaesite. It can be commercially prepared from these minerals by ion exchange and solvent extraction. It is also prepared by reducing anhydrous gadolinium fluoride with calcium metal.\n',
		imageText : 'The image reflects the past use of the element in television screens.\n',
		history : 'Gadolinium was discovered in 1880 by Charles Galissard de Marignac at Geneva. He had long suspected that the didymium reported by Carl Mosander was not a new element but a mixture. His suspicions were confirmed when Marc Delafontaine and Paul-Emile Lecoq de Boisbaudran at Paris reported that its spectral lines varied according to the source from which it came. Indeed, in 1879 they had already separated samarium from some didymium which had been extracted from the mineral samarskite, found in the Urals. In 1880, Marignac extracted yet another new rare earth from didymium, as did Paul-Émile Lecoq de Boisbaudran in 1886, and it was the latter who called it gadolinium.'
	},
	65: {
		ab : 'Tb',
		name : 'Terbium',
		mass : 158.925,
		abundance : 100,
		color : 'light-blue',
		value : 65,
		origin : 'Terbium was named after Ytterby, Sweden. \n',
		appearance : 'A soft, silvery metal.\n',
		uses : 'Terbium is used to dope calcium fluoride, calcium tungstate and strontium molybdate, all used in solid-state devices. It is also used in low-energy lightbulbs and mercury lamps. It has been used to improve the safety of medical x-rays by allowing the same quality image to be produced with a much shorter exposure time. Terbium salts are used in laser devices.\n' +
			'\n' +
			'An alloy of terbium, dysprosium and iron lengthens and shortens in a magnetic field. This effect forms the basis of loudspeakers that sit on a flat surface, such as a window pane, which then acts as the speaker.',
		biological : 'Terbium has no known biological role. It has low toxicity.\n',
		natural : 'Terbium can be recovered from the minerals monazite and bastnaesite by ion exchange and solvent extraction. It is also obtained from euxenite, a complex oxide containing 1% or more of terbium.\n' +
			'\n' +
			'The metal is usually produced commercially by reducing the anhydrous fluoride or chloride with calcium metal, under a vacuum. It is also possible to produce the metal by the electrolysis of terbium oxide in molten calcium chloride.',
		imageText : 'The abstracted compact disc symbol reflects the use of the element in the manufacture of the first rewritable compact discs.\n',
		history : 'Terbium was first isolated in 1843 by the Swedish chemist Carl Mosander at Stockholm. He had already investigated cerium oxide and separated a new element from it, lanthanum, and now he focussed his attention on yttrium, discovered in 1794, because he thought this too might harbour another element. In fact Mosander was able to obtain two other metal oxides from it: terbium oxide (yellow) and erbium oxide (rose pink) and these he announced in 1843. This was not the end of the story, however, because later that century these too yielded other rare earth elements (aka lanthanoids). Today these elements are easily separated by a process known as liquid-liquid extraction.'
	},
	66: {
		ab : 'Dy',
		name : 'Dysprosium',
		mass : 163.929,
		masses : [
			[155.924, 0.056],
			[157.924, 0.095],
			[159.925, 2.329],
			[160.927, 18.88],
			[161.927, 25.47],
			[162.929, 24.89]
		],
		abundance : 28.26,
		color : 'light-blue',
		value : 66,
		origin : 'The name is derived from the Greek \'dysprositos\', meaning hard to get. \n',
		appearance : 'A bright, silvery metallic element.\n',
		uses : 'As a pure metal it is little used, because it reacts readily with water and air. Dysprosium’s main use is in alloys for neodymium-based magnets. This is because it is resistant to demagnetisation at high temperatures. This property is important for magnets used in motors or generators. These magnets are used in wind turbines and electrical vehicles, so demand for dysprosium is growing rapidly.\n' +
			'\n' +
			'Dysprosium iodide is used in halide discharge lamps. The salt enables the lamps to give out a very intense white light.\n' +
			'\n' +
			'A dysprosium oxide-nickel cermet (a composite material of ceramic and metal) is used in nuclear reactor control rods. It readily absorbs neutrons, and does not swell or contract when bombarded with neutrons for long periods.\n',
		biological : 'Dysprosium has no known biological role. It has low toxicity.\n',
		natural : 'In common with many other lanthanides, dysprosium is found in the minerals monazite and bastnaesite. It is also found in smaller quantities in several other minerals such as xenotime and fergusonite.\n' +
			'\n' +
			'It can be extracted from these minerals by ion exchange and solvent extraction. It can also be prepared by the reduction of dysprosium trifluoride with calcium metal.',
		imageText : 'The image is a stylised depiction of a nuclear reactor, reflecting the use of the element in reactor control rods.\n',
		history : 'Dysprosium was discovered in 1886 by Paul-Émile Lecoq de Boisbaudran in Paris. Its discovery came as a result of research into yttrium oxide, first made in 1794, and from which other rare earths (aka lanthanoids) were subsequently to be extracted, namely erbium in 1843, then holmium in 1878, and finally dysprosium. De Boisbaudran’s method had involved endless precipitations carried out on the marble slab of his fireplace at home.\n' +
			'\n' +
			'Pure samples of dysprosium were not available until Frank Spedding and co-workers at Iowa State University developed the technique of ion-exchange chromatography around 1950. From then on it was possible to separate the rare earth elements in a reliable and efficient manner, although that method of separation has now been superseded by liquid-liquid exchange technology.'
	},
	67: {
		ab : 'Ho',
		name : 'Holmium',
		mass : 164.930,
		abundance : 100,
		color : 'light-blue',
		value : 67,
		origin : 'The name is derived from the Latin name for Stockholm, \'Holmia\'. \n',
		appearance : 'A bright, silvery metal.\n',
		uses : 'Holmium can absorb neutrons, so it is used in nuclear reactors to keep a chain reaction under control. Its alloys are used in some magnets.\n',
		biological : 'Holmium has no known biological role, and is non-toxic.\n',
		natural : 'Holmium is found as a minor component of the minerals monazite and bastnaesite. It is extracted from those ores that are processed to extract yttrium. It is obtained by ion exchange and solvent extraction.\n',
		imageText : 'The image is based upon the civic coat of arms of Stockholm, the city that gives the element its name.\n',
		history : 'Holmium was discovered at Geneva in 1878 by Marc Delafontaine and Louis Soret, and independently by Per Teodor Cleve at Uppsala, Sweden. Both teams were investigating yttrium, which was contaminated with traces of other rare earths (aka lanthanoids) and had already yielded erbium which was later to yield ytterbium. Cleve looked more closely at what remained after the ytterbium had been removed, and realised it must contain yet other elements because he found that its atomic weight depended on its source. He separated holmium from erbium in 1878. Delafontaine and Soret also extracted it from the same source, having seen unexplained lines in the atomic spectrum. We cannot be certain that either group had produced a pure sample of the new element because yet another rare-earth, dysprosium, was to be extracted from holmium.\n'
	},
	68: {
		ab : 'Er',
		name : 'Erbium',
		mass : 165.930,
		masses : [
			[161.929, 0.139],
			[163.929, 1.601],
			[166.932, 22.869],
			[167.932, 26.978],
			[169.935, 14.91]
		],
		abundance : 33.503,
		color : 'light-blue',
		value : 68,
		origin : 'Erbium is named after Ytterby, Sweden,  \n',
		appearance : 'A soft, silvery metallic element.\n',
		uses : 'Erbium finds little use as a metal because it slowly tarnishes in air and is attacked by water.\n' +
			'\n' +
			'When alloyed with metals such as vanadium, erbium lowers their hardness and improves their workability.\n' +
			'\n' +
			'Erbium oxide is occasionally used in infrared absorbing glass, for example safety glasses for welders and metal workers. When erbium is added to glass it gives the glass a pink tinge. It is used to give colour to some sunglasses and imitation gems.\n' +
			'\n' +
			'Broadband signals, carried by fibre optic cables, are amplified by including erbium in the glass fibre.\n',
		biological : 'Erbium has no known biological role, and has low toxicity.\n',
		natural : 'Erbium is found principally in the minerals monazite and bastnaesite. It can be extracted by ion exchange and solvent extraction.\n',
		imageText : 'The image reflects the use of the element in producing pink glazes in ceramics.\n',
		history : 'In 1843, at Stockholm, Carl Mosander obtained two new metal oxides from yttrium, which had been know since 1794. One of these was erbium oxide, which was pink. (The other was terbium oxide, which was yellow.) While erbium was one of the first lanthanoid elements to be discovered, the picture is clouded because early samples of this element must have contained other rare-earths. We know this because In1878 Jean-Charles Galissard de Marignac, working at the University of Geneva, extracted another element from erbium and called it ytterbium. (This too was impure and scandium was extracted from it a year later.)\n' +
			'\n' +
			'A sample of pure erbium metal was not produced until 1934, when Wilhelm Klemm and Heinrich Bommer achieved it by heating purified erbium chloride with potassium.'
	},
	69: {
		ab : 'Tm',
		name : 'Thulium',
		mass : 168.934,
		abundance : 100,
		color : 'light-blue',
		value : 69,
		origin : 'The name comes from Thule, the ancient name for Scandinavia. ',
		appearance : 'A bright, silvery metal.\n',
		uses : 'When irradiated in a nuclear reactor, thulium produces an isotope that emits x-rays. A ‘button’ of this isotope is used to make a lightweight, portable x-ray machine for medical use. Thulium is used in lasers with surgical applications.\n',
		biological : 'Thulium has no known biological role. It is non-toxic.\n',
		natural : 'Thulium is found principally in the mineral monazite, which contains about 20 parts per million. It is extracted by ion exchange and solvent extraction. The metal is obtained by reducing the anhydrous fluoride with calcium, or reducing the oxide with lanthanum.\n',
		imageText : 'The image reflects the origin of the element’s name, and suggests a distant region to the far north (ultima Thule).\n',
		history : 'Thulium was first isolated in 1879 as its oxide by Per Teodor Cleve at the University of Uppsala, Sweden. The discoveries of the many rare earth elements (aka lanthanoid) began with yttrium in 1794. This was contaminated with these chemically similar elements. Indeed the early chemists were unaware they were there. In 1843, erbium and terbium were extracted from yttrium, and then, in 1874, Cleve looked more closely at erbium and realised that it must contain yet other elements because he observed that its atomic weight varied slightly depending on the source from which it came. He extracted thulium from it in 1879.\n' +
			'\n' +
			'In 1911, the American chemist Theodore William Richards performed 15,000 recrystallisations of thulium bromate in order to obtain an absolutley pure sample of the element and so determine exactly its atomic weight.'
	},
	70: {
		ab : 'Yb',
		name : 'Ytterbium',
		mass : 173.939,
		masses : [
			[167.934, 0.12],
			[169.935, 2.98],
			[170.936, 14.09],
			[171.936, 21.68],
			[172.938, 16.10],
			[175.943, 13.00]
		],
		abundance : 32.03,
		color : 'light-blue',
		value : 70,
		origin : 'Ytterbium is named after Ytterby, Sweden. \n',
		appearance : 'A soft, silvery metal. It slowly oxidises in air, forming a protective surface layer.\n',
		uses : 'Ytterbium is beginning to find a variety of uses, such as in memory devices and tuneable lasers. It can also be used as an industrial catalyst and is increasingly being used to replace other catalysts considered to be too toxic and polluting.\n',
		biological : 'Ytterbium has no known biological role. It has low toxicity.\n',
		natural : 'In common with many lanthanide elements, ytterbium is found principally in the mineral monazite. It can be extracted by ion exchange and solvent extraction.\n',
		imageText : 'The image is based on ancient Swedish rock carvings.\n',
		history : 'Ytterbium was isolated in 1878 by Jean Charles Galissard de Marignac at the University of Geneva. The story began with yttrium, discovered in 1794, which was contaminated with other rare-earth elements (aka lanthanoids). In 1843, erbium and terbium were extracted from it, and then in 1878, de Marignac separated ytterbium from erbium. He heated erbium nitrate until it decomposed and then extracted the residue with water and obtained two oxides: a red one which was erbium oxide, and a white one which he knew must be a new element, and this he named ytterbium. Even this was eventually shown to contain another rare earth, lutetium, in 1907.\n' +
			'\n' +
			'A tiny amount of ytterbium metal was made in 1937 by heating ytterbium chloride and potassium together but was impure. Only in 1953 was a pure sample obtained.'
	},
	71: {
		ab : 'Lu',
		name : 'Lutetium',
		mass : 174.941,
		masses : [
			[175.943, 2.60]
		],
		abundance : 97.40,
		color : 'light-blue',
		value : 71,
		origin : 'The name derives from the Romans\' name for Paris, \'Lutetia\'. \n',
		appearance : 'A silvery-white, hard, dense metal.\n',
		uses : 'Lutetium is little used outside research. One of its few commercial uses is as a catalyst for cracking hydrocarbons in oil refineries.\n',
		biological : 'Lutetium has no known biological role. It has low toxicity.\n',
		natural : 'In common with many other lanthanides, the main source of lutetium is the mineral monazite. It is extracted, with difficulty, by reducing the anhydrous fluoride with calcium metal.\n',
		imageText : 'The image is based on the civic coat of arms for the city of Paris (Latin name ‘Lutetia’), which gives the element its name.\n',
		history : 'The honour of discovering lutetium went to Georges Urbain at the Sorbonne in Paris, because he was the first to report it. The story began with the discovery of yttrium in 1794 from which several other elements – the rare earths (aka lanthanoids) – were to be separated, starting with erbium in 1843 and ending with lutetium in 1907.\n' +
			'\n' +
			'Other chemists, namely Karl Auer in Germany and Charles James in the USA, were about to make the same discovery. Indeed James, who was at the University of New Hampshire, was ahead of Urbain and had extracted quite a lot of the new metal, but he delayed publishing his research. A sample of pure lutetium metal itself was not made until 1953.'
	},
	72: {
		ab : 'Hf',
		name : 'Hafnium',
		mass : 177.944,
		masses : [
			[173.940, 0.16],
			[175.941, 5.26],
			[176.943, 18.6],
			[177.944, 27.28],
			[178.946, 13.62]
		],
		abundance : 27.28,
		color : 'blue',
		value : 72,
		origin : 'The name is derived from the Latin name for Copenhagen, \'Hafnia\' \n',
		appearance : 'A shiny, silvery metal that resists corrosion and can be drawn into wires.\n',
		uses : 'Hafnium is a good absorber of neutrons and is used to make control rods, such as those found in nuclear submarines. It also has a very high melting point and because of this is used in plasma welding torches.\n' +
			'\n' +
			'Hafnium has been successfully alloyed with several metals including iron, titanium and niobium.\n' +
			'\n' +
			'Hafnium oxide is used as an electrical insulator in microchips, while hafnium catalysts have been used in polymerisation reactions.',
		biological : 'Hafnium has no known biological role, and it has low toxicity.\n',
		natural : 'Most zirconium ores contain around 5% hafnium. The metal can be prepared by reducing hafnium tetrachloride with sodium or magnesium.\n',
		imageText : 'The image is based on the civic coat of arms for the city of Copenhagen, which gives the element its name.\n',
		history : 'In 1911, Georges Urbain reported the discovery of the missing element below zirconium in the periodic table, but he was wrong and the search continued. It was finally discovered by George Charles de Hevesy and Dirk Coster at the University of Copenhagen in 1923. It was found in a zirconium mineral, a Norwegian zircon, but it had proved very difficult to separate it from zirconium and this explained why hafnium remained undiscovered for so long.\n' +
			'\n' +
			'Other zirconium minerals were now examined by Hevesy, and some were found to contain as much as five per cent of hafnium. (It meant the atomic weight of zirconium was wrong and hafnium-free material had to be produced in order for this to be determined.)\n' +
			'\n' +
			'The first pure sample of hafnium itself was made in 1925 by decomposing hafnium tetra-iodide over a hot tungsten wire.'
	},
	73: {
		ab : 'Ta',
		name : 'Tantalum',
		mass : 180.948,
		masses : [
			[179.947, 0.012]
		],
		abundance : 99.988,
		color : 'blue',
		value : 73,
		origin : 'The name is derived from the legendary Greek figure King Tantalus. \n',
		appearance : 'A shiny, silvery metal that is very resistant to corrosion.\n',
		uses : 'One of the main uses of tantalum is in the production of electronic components. An oxide layer which forms on the surface of tantalum can act as an insulating (dielectric) layer. Because tantalum can be used to coat other metals with a very thin layer, a high capacitance can be achieved in a small volume. This makes tantalum capacitors attractive for portable electronics such as mobile phones.\n' +
			'\n' +
			'Tantalum causes no immune response in mammals, so has found wide use in the making of surgical implants. It can replace bone, for example in skull plates; as foil or wire it connects torn nerves; and as woven gauze it binds abdominal muscle.\n' +
			'\n' +
			'It is very resistant to corrosion and so is used in equipment for handling corrosive materials. It has also found uses as electrodes for neon lights, AC/DC rectifiers and in glass for special lenses.\n' +
			'\n' +
			'Tantalum alloys can be extremely strong and have been used for turbine blades, rocket nozzles and nose caps for supersonic aircraft.',
		biological : 'Tantalum has no known biological role. It is non-toxic.\n',
		natural : 'Tantalum is sometimes, but only rarely, found uncombined in nature. It occurs mainly in the mineral columbite-tantalite, which also contains other metals including niobium. It is mined in many places including Australia, Canada and Brazil. There are several complicated steps involved in separating the tantalum from the niobium. A lot of tantalum is obtained commercially as a by-product of tin extraction.\n',
		imageText : 'An image of an abstracted human skull, banded with strips or ‘plates’. This reflects the use of the element in medical prosthetics. The background design is based on a scene from an Ancient Greek vase depicting the mythological figure Tantalus, a reference to the origin of the element’s name.\n',
		history : ''
	},
	74: {
		ab : 'W',
		name : 'Tungsten',
		mass : 183.951,
		masses : [
			[179.947, 0.12],
			[181.948, 26.5],
			[182.950, 14.31],
			[185.954, 28.43]
		],
		abundance : 30.64,
		color : 'blue',
		value : 74,
		origin : 'The name is derived from the Swedish \'tung sten\' meaning heavy stone. \n',
		appearance : 'A shiny, silvery-white metal.\n',
		uses : 'Tungsten was used extensively for the filaments of old-style incandescent light bulbs, but these have been phased out in many countries. This is because they are not very energy efficient; they produce much more heat than light.\n' +
			'\n' +
			'Tungsten has the highest melting point of all metals and is alloyed with other metals to strengthen them. Tungsten and its alloys are used in many high-temperature applications, such as arc-welding electrodes and heating elements in high-temperature furnaces.\n' +
			'\n' +
			'Tungsten carbide is immensely hard and is very important to the metal-working, mining and petroleum industries. It is made by mixing tungsten powder and carbon powder and heating to 2200°C. It makes excellent cutting and drilling tools, including a new ‘painless’ dental drill which spins at ultra-high speeds.\n' +
			'\n' +
			'Calcium and magnesium tungstates are widely used in fluorescent lighting.\n',
		biological : 'Tungsten is the heaviest metal to have a known biological role. Some bacteria use tungsten in an enzyme to reduce carboxylic acids to aldehydes.\n',
		natural : 'The principal tungsten-containing ores are scheelite and wolframite. The metal is obtained commercially by reducing tungsten oxide with hydrogen or carbon.\n',
		imageText : 'The symbol used reflects the once common use of the element in light bulbs.\n',
		history : 'More than 350 years ago, porcelain makers in China incorporated a unique peach colour into their designs by means of a tungsten pigment that was not known in the West. Indeed it was not for another century that chemists in Europe became aware of it. In 1779, Peter Woulfe examined a mineral from Sweden and concluded it contained a new metal, but he did not separate it. Then in 1781, Wilhelm Scheele investigated it and succeeded in isolating an acidic white oxide and which he rightly deduced was the oxide of a new metal.\n' +
			'\n' +
			'The credit for discovering tungsten goes to the brothers, Juan and Fausto Elhuyar, who were interested in mineralogy and were based at the Seminary at Vergara, in Spain, 1783 they produced the same acidic metal oxide and even reduced it to tungsten metal by heating with carbon.'
	},
	75: {
		ab : 'Re',
		name : 'Rhenium',
		mass : 186.956,
		masses : [
			[184.953, 37.4]
		],
		abundance : 62.6,
		color : 'blue',
		value : 75,
		origin : 'The name is derived from the Latin name for the Rhine, \'Rhenus\'. \n',
		appearance : 'A metal with a very high melting point.  Tungsten is the only metallic element with a higher melting point.\n',
		uses : 'Rhenium is used as an additive to tungsten- and molybdenum-based alloys to give useful properties. These alloys are used for oven filaments and x-ray machines. It is also used as an electrical contact material as it resists wear and withstands arc corrosion.\n' +
			'\n' +
			'Rhenium catalysts are extremely resistant to poisoning (deactivation) and are used for the hydrogenation of fine chemicals. Some rhenium is used in nickel alloys to make single-crystal turbine blades.',
		biological : 'Rhenium has no known biological role.\n',
		natural : 'Rhenium is among the rarest metals on Earth. It does not occur uncombined in nature or as a compound in a mineable mineral species. It is, however, widely spread throughout the Earth’s crust to the extent of about 0.001 parts per million. Commercial production of rhenium is by extraction from the flue dusts of molybdenum smelters.\n',
		imageText : 'The symbol is based on the coat of arms of Mainz, the capital of the German state of Rhineland-Palatinate.\n',
		history : ''
	},
	76: {
		ab : 'Os',
		name : 'Osmium',
		mass : 191.961,
		masses : [
			[183.952, 0.02],
			[185.954, 1.59],
			[186.956, 1.96],
			[187.956, 13.24],
			[188.958, 16.15],
			[189.958, 26.26]
		],
		abundance : 40.78,
		color : 'blue',
		value : 76,
		origin : 'The name is derived from the Greek word \'osme\', meaning smell. \n',
		appearance : 'A shiny, silver metal that resists corrosion. It is the densest of all the elements and is twice as dense as lead.\n',
		uses : 'Osmium has only a few uses. It is used to produce very hard alloys for fountain pen tips, instrument pivots, needles and electrical contacts. It is also used in the chemical industry as a catalyst.\n',
		biological : 'Osmium has no known biological role. The metal is not toxic, but its oxide is volatile and very toxic, causing lung, skin and eye damage.\n',
		natural : 'Osmium occurs uncombined in nature and also in the mineral osmiridium (an alloy with iridium). Most osmium is obtained commercially from the wastes of nickel refining.\n',
		imageText : 'The image suggests the use of the element in making high-quality pen nibs.\n',
		history : 'In 1803, Smithson Tennant added platinum to dilute aqua regia, which is a mixture of nitric and hydrochloric acids, and observed that not all the metal went into solution. Earlier experimenters had assumed that the residue was graphite, but he suspected it was something else, and he began to investigate it. By a combination of acid and alkali treatments he eventually separated it into two new metal elements, which he named iridium and osmium, naming the latter on account of the strong odour it gave off. Its name is derived from osme the Greek word for smell. Although it was recognised as a new metal, little use was made of it because it was rare and difficult to work with, although it was extremely hard wearing and for several years it was used for pen nibs and gramophone needles.\n'
	},
	77: {
		ab : 'Ir',
		name : 'Iridium',
		mass : 192.963,
		masses : [
			[190.961, 37.3]
		],
		abundance : 62.7,
		color : 'blue',
		value : 77,
		origin : 'The name is derived from the Greek goddess of the rainbow, Iris. \n',
		appearance : 'Iridium is a hard, silvery metal. It is almost as unreactive as gold. It has a very high density and melting point.\n',
		uses : 'Iridium is the most corrosion-resistant material known. It is used in special alloys and forms an alloy with osmium, which is used for pen tips and compass bearings. It was used in making the standard metre bar, which is an alloy of 90% platinum and 10% iridium. It is also used for the contacts in spark plugs because of its high melting point and low reactivity.\n',
		biological : 'Iridium has no known biological role, and has low toxicity.\n',
		natural : 'Iridium is one of the rarest elements on Earth. It is found uncombined in nature in sediments that were deposited by rivers. It is commercially recovered as a by-product of nickel refining.\n' +
			'\n' +
			'A very thin layer of iridium exists in the Earth’s crust. It is thought that this was caused by a large meteor or asteroid hitting the Earth. Meteors and asteroids contain higher levels of iridium than the Earth’s crust. The impact would have caused a huge dust cloud depositing the iridium all over the world. Some scientists think that this could be the same meteor or asteroid impact that wiped out the dinosaurs.',
		imageText : 'Iridium salts are highly coloured. The iridescent wings of the dragonfly represent both the origin of the element’s name and its strongly coloured salts.\n',
		history : 'Iridium was discovered together with osmium in1803 by Smithson Tennant in London. When crude platinum was dissolved in dilute aqua regia, which is a mixture of nitric and hydrochloric acids, it left behind a black residue thought to be graphite. Tennant thought otherwise, and by treating it alternately with alkalis and acids he was able to separate it into two new elements. These he announced at the Royal Institution in London, naming one iridium, because its salts were so colourful and the other osmium because it had a curious odour (see osmium).\n' +
			'\n' +
			'Despite its seeming intractability, a group of chemists, including the great Humphry Davy, demonstrated in 1813 that iridium would indeed melt like other metals. To achieve this they exposed it to the powerful current generated by a large array of batteries.'
	},
	78: {
		ab : 'Pt',
		name : 'Platinum',
		mass : 194.965,
		masses : [
			[189.960, 0.012],
			[191.961, 0.782],
			[193.963, 32.86],
			[195.965, 25.21],
			[197.968, 7.356]
		],
		abundance : 33.78,
		color : 'blue',
		value : 78,
		origin : 'The name is derived from the Spanish \'platina\', meaning little silver. \n',
		appearance : 'A shiny, silvery-white metal as resistant to corrosion as gold.\n',
		uses : 'Platinum is used extensively for jewellery. Its main use, however, is in catalytic converters for cars, trucks and buses. This accounts for about 50% of demand each year. Platinum is very effective at converting emissions from the vehicle’s engine into less harmful waste products.\n' +
			'\n' +
			'Platinum is used in the chemicals industry as a catalyst for the production of nitric acid, silicone and benzene. It is also used as a catalyst to improve the efficiency of fuel cells.\n' +
			'\n' +
			'The electronics industry uses platinum for computer hard disks and thermocouples.\n' +
			'\n' +
			'Platinum is also used to make optical fibres and LCDs, turbine blades, spark plugs, pacemakers and dental fillings.\n' +
			'\n' +
			'Platinum compounds are important chemotherapy drugs used to treat cancers.',
		biological : 'Platinum has no known biological role. It is non-toxic.\n',
		natural : 'Platinum is found uncombined in alluvial deposits. Most commercially produced platinum comes from South Africa, from the mineral cooperite (platinum sulfide). Some platinum is prepared as a by-product of copper and nickel refining.\n',
		imageText : 'The image is based on Mayan character glyphs. The Mayans used platinum in jewellery.\n',
		history : 'Probably the oldest worked specimen of platinum is that from an ancient Egyptian casket of the 7th century BC, unearthed at Thebes and dedicated to Queen Shapenapit. Otherwise this metal was unknown in Europe and Asia for the next two millennia, although on the Pacific coast of South America, there were people able to work platinum, as shown by burial goods dating back 2000 years.\n' +
			'\n' +
			'In 1557 an Italian scholar, Julius Scaliger, wrote of a metal from Spanish Central America that could not be made to melt and was no doubt platinum. Then, in 1735, Antonio Ulloa encountered this curious metal, but as he returned to Europe his ship was captured by the Royal Navy and he ended up in London. There, members of the Royal Society were most interested to hear about the new metal, and by the 1750s, platinum was being reported and discussed throughout Europe.'
	},
	79: {
		ab : 'Au',
		name : 'Gold',
		mass : 196.967,
		masses : [
			[197.968]
		],
		abundance : 100,
		color : 'blue',
		value : 79,
		origin : 'The name is the Anglo-Saxon word for the metal and the symbol comes from the Latin ‘aurum’, gold. \n',
		appearance : 'A soft metal with a characteristic yellow colour. It is chemically unreactive, although it will dissolve in aqua regia (a mixture of nitric and hydrochloric acids).\n',
		uses : 'Most mined gold is stored as bullion. It is also, however, used extensively in jewellery, either in its pure form or as an alloy. The term ‘carat’ indicates the amount of gold present in an alloy. 24-carat is pure gold, but it is very soft. 18- and 9-carat gold alloys are commonly used because they are more durable.\n' +
			'\n' +
			'The metal is also used for coinage, and has been used as standard for monetary systems in some countries.\n' +
			'\n' +
			'Gold can be beaten into very thin sheets (gold leaf) to be used in art, for decoration and as architectural ornament. Electroplating can be used to cover another metal with a very thin layer of gold. This is used in gears for watches, artificial limb joints, cheap jewellery and electrical connectors. It is ideal for protecting electrical copper components because it conducts electricity well and does not corrode (which would break the contact). Thin gold wires are used inside computer chips to produce circuits.\n' +
			'\n' +
			'Dentists sometimes use gold alloys in fillings, and a gold compound is used to treat some cases of arthritis.\n' +
			'\n' +
			'Gold nanoparticles are increasingly being used as industrial catalysts. Vinyl acetate, which is used to make PVA (for glue, paint and resin), is made using a gold catalyst.',
		biological : 'Gold has no known biological role, and is non-toxic.\n',
		natural : 'Gold is one of the few elements to occur in a natural state. It is found in veins and alluvial deposits. About 1500 tonnes of gold are mined each year. About two-thirds of this comes from South Africa and most of the rest from Russia.\n' +
			'\n' +
			'Seawater contains about 4 grams of gold in 1,000,000 tonnes of water. Overall this is a huge amount of gold stored in the oceans but, because the concentration is so low, attempts to reclaim this gold have always failed.',
		imageText : 'In this image a traditional alchemical symbol for the element is used. It is also used as a sun symbol, and much of the mythology around gold relates to the sun. Early alchemists were obsessed by gold and pursued their desire to transmute base metals (usually lead) into gold. The image in the background is based on a symbolic representation of an alchemist’s ‘laboratory’.\n',
		history : 'Gold has been known since prehistoric times and was one of the first metals to be worked, mainly because it was to be found as nuggets or as particles in the beds of streams. Such was the demand that by 2000 BC the Egyptians began mining gold. The death mask of Tutankhamen, who died in 1323 BC, contained 100 kg of the metal. The royal graves of ancient Ur (modern Iraq), which flourished from 3800 to 2000 BC, also contained gold objects.\n' +
			'\n' +
			'The minting of gold coins began around 640 BC in the Kingdom of Lydia (situated in what is now modern Turkey) using electrum, a native alloy of gold and silver. The first pure gold coins were minted in the reign of King Croesus, who ruled from 561–547 BC.'
	},
	80: {
		ab : 'Hg',
		name : 'Mercury',
		mass : 201.971,
		masses : [
			[195.966, 0.15],
			[197.967, 9.97],
			[198.968, 16.87],
			[199.968, 23.1],
			[200.970, 13.18],
			[203.973, 6.87]
		],
		abundance : 29.86,
		color : 'blue',
		value : 80,
		origin : 'Mercury is named after the planet, Mercury. \n',
		appearance : 'A liquid, silvery metal.\n',
		uses : 'Mercury has fascinated people for millennia, as a heavy liquid metal. However, because of its toxicity, many uses of mercury are being phased out or are under review.\n' +
			'\n' +
			'It is now mainly used in the chemical industry as catalysts. It is also used in some electrical switches and rectifiers.\n' +
			'\n' +
			'Previously its major use was in the manufacture of sodium hydroxide and chlorine by electrolysis of brine. These plants will all be phased out by 2020. It was also commonly used in batteries, fluorescent lights, felt production, thermometers and barometers. Again, these uses have been phased out.\n' +
			'\n' +
			'Mercury easily forms alloys, called amalgams, with other metals such as gold, silver and tin. The ease with which it amalgamates with gold made it useful in recovering gold from its ores. Mercury amalgams were also used in dental fillings.\n' +
			'\n' +
			'Mercuric sulfide (vermilion) is a high-grade, bright-red paint pigment, but is very toxic so is now only used with great care.\n',
		biological : 'Mercury has no known biological role, but is present in every living thing and widespread in the environment. Every mouthful of food we eat contains a little mercury.\n' +
			'\n' +
			'Our daily intake is less than 0.01 milligrams (about 0.3 grams in a lifetime), and this we can cope with easily. However, in much higher doses it is toxic and one form of mercury – methylmercury – is particularly dangerous. It can accumulate in the flesh of fish and be eaten by people, making them ill.\n',
		natural : 'Mercury rarely occurs uncombined in nature, but can be found as droplets in cinnabar (mercury sulfide) ores. China and Kyrgyzstan are the main producers of mercury. The metal is obtained by heating cinnabar in a current of air and condensing the vapour.\n',
		imageText : 'The image is of a traditional alchemical symbol for mercury. This is also an astrological symbol for the planet Mercury. The dragon or serpent in the background comes from early alchemical drawings and is often associated with the element.\n',
		history : 'Cinnabar (aka vermilion, mercury sulfide, HgS), was used as a bright red pigment by the Palaeolithic painters of 30,000 years ago to decorate caves in Spain and France. Cinnabar would yield up its mercury simply on heating in a crucible, and the metal fascinated people because it was a liquid that would dissolve gold. The ancients used in on a large scale to extract alluvial gold from the sediment of rivers. The mercury dissolved the gold which could be reclaimed by distilling off the mercury.\n' +
			'\n' +
			'The Almadén deposit in Spain provided Europe with its mercury. In the Americas, it was the Spanish conquerors who exploited the large deposits of cinnabar at Huancavelica in order to extract gold. In 1848 the miners of the Californian Gold Rush used mercury from the New Almaden Mines of California.\n' +
			'\n' +
			'Although highly toxic, mercury had many uses, as in thermometers, but these are now strictly curtained.'
	},
	81: {
		ab : 'Tl',
		name : 'Thallium',
		mass : 204.974,
		masses : [
			[202.972, 29.52]
		],
		abundance : 70.48,
		color : 'lime',
		value : 81,
		origin : 'Thallium is derived from the Greek \'thallos\', meaning a green twig. \n',
		appearance : 'A soft, silvery-white metal that tarnishes easily.\n',
		uses : 'The use of thallium is limited as it is a toxic element. Thallium sulfate was employed as a rodent killer – it is odourless and tasteless – but household use of this poison has been prohibited in most developed countries.\n' +
			'\n' +
			'Most thallium is used by the electronics industry in photoelectric cells. Thallium oxide is used to produce special glass with a high index of refraction, and also low melting glass that becomes fluid at about 125K.\n' +
			'\n' +
			'An alloy of mercury containing 8% thallium has a melting point 20°C lower than mercury alone. This can be used in low temperature thermometers and switches.',
		biological : 'Thallium has no known biological role. It is very toxic and there is evidence that the vapour is both teratogenic (disturbs the development of an embryo or foetus) and carcinogenic. It can displace potassium around the body affecting the central nervous system.\n',
		natural : 'Thallium is found in several ores. One of these is pyrites, which is used to produce sulfuric acid. Some thallium is obtained from pyrites, but it is mainly obtained as a by-product of copper, zinc and lead refining.\n' +
			'\n' +
			'Thallium is also present in manganese nodules found on the ocean floor.',
		imageText : 'The image reflects the origin of the element’s name (from Greek ‘thallos’, meaning ‘a green shoot or twig’), its toxicity and its use in the manufacture of reflective glass.\n',
		history : 'The discovery of thallium was controversial. William Crookes of the Royal College of Science in London was the first to observe a green line in the spectrum of some impure sulfuric acid, and realised that it meant a new element. He announced his discovery in March 1861 in Chemical News. However, he did very little research into it.\n' +
			'\n' +
			'Meanwhile, in 1862, Claude-August Lamy of Lille, France, began to research thallium more thoroughly and even cast a small ingot of the metal itself. The French Academy now credited him its discovery. He sent the ingot to the London International Exhibition of 1862, where it was acclaimed as a new metal and he was awarded a medal. Crookes was furious and so the exhibition committee awarded him a medal as well.'
	},
	82: {
		ab : 'Pb',
		name : 'Lead',
		mass : 207.977,
		masses : [
			[203.973, 1.4],
			[205.974, 24.1],
			[206.976, 22.1]
		],
		abundance : 52.4,
		color : 'purple',
		value : 82,
		origin : 'The name comes from the Anglo-Saxon word for the metal, \'lead\' \n',
		appearance : 'A dull, silvery-grey metal. It is soft and easily worked into sheets.\n',
		uses : 'This easily worked and corrosion-resistant metal has been used for pipes, pewter and paint since Roman times. It has also been used in lead glazes for pottery and, in this century, insecticides, hair dyes and as an anti-knocking additive for petrol. All these uses have now been banned, replaced or discouraged as lead is known to be detrimental to health, particularly that of children.\n' +
			'\n' +
			'Lead is still widely used for car batteries, pigments, ammunition, cable sheathing, weights for lifting, weight belts for diving, lead crystal glass, radiation protection and in some solders.\n' +
			'\n' +
			'It is often used to store corrosive liquids. It is also sometimes used in architecture, for roofing and in stained glass windows.',
		biological : 'Lead has no known biological role. It can accumulate in the body and cause serious health problems. It is toxic, teratogenic (disturbs the development of an embryo or foetus) and carcinogenic.\n' +
			'\n' +
			'Daily intake of lead from all sources is about 0.1 milligrams. The average human body stores about 120 milligrams of lead in the bones.\n',
		natural : 'Lead is chiefly obtained from the mineral galena by a roasting process. At least 40% of lead in the UK is recycled from secondary sources such as scrap batteries and pipes.\n',
		imageText : 'Lead has been known to, and used by, humans for many centuries. This long history is reflected in the image by the use of an early alchemical symbol for lead and carved Ancient Roman characters.\n',
		history : 'Lead has been mined for more than 6,000 years, and the metal and its compounds have been used throughout history. Small lead nuggets have been found in pre-Columbian Peru, Yucatan, and Guatemala.\n' +
			'\n' +
			'The Greeks mined lead on a large scale from 650 onwards and not only knew how to obtain the metal but how to covert this to white lead. Because of its superb covering power, this was the basis of paints for more than 2000 years, until the middle of the last century.\n' +
			'\n' +
			'The Romans employed lead on a large scale, mining it mainly in Spain and Britain, and using it also for water pipes, coffins, pewter tableware, and to debase their silver coinage. While its mining declined in the Dark Ages it reappeared in Medieval times and found new uses, such as pottery glazes, bullets, and printing type. In the last century it was a fuel additive.'
	},
	83: {
		ab : 'Bi',
		name : 'Bismuth',
		mass : 208.980,
		abundance : 100,
		color : 'grey',
		value : 83,
		origin : 'The name come from the German \'Bisemutum\' a corruption of \'Weisse Masse\' meaning white mass. \n',
		appearance : 'Bismuth is a high-density, silvery, pink-tinged metal.\n',
		uses : 'Bismuth metal is brittle and so it is usually mixed with other metals to make it useful. Its alloys with tin or cadmium have low melting points and are used in fire detectors and extinguishers, electric fuses and solders.\n' +
			'\n' +
			'Bismuth oxide is used as a yellow pigment for cosmetics and paints, while bismuth(III) chloride oxide (BiClO) gives a pearly effect to cosmetics. Basic bismuth carbonate is taken in tablet or liquid form for indigestion as ‘bismuth mixture’.',
		biological : 'Bismuth has no known biological role, and is non-toxic.\n',
		natural : 'Bismuth occurs as the native metal, and in ores such as bismuthinite and bismite. The major commercial source of bismuth is as a by-product of refining lead, copper, tin, silver and gold ores.\n',
		imageText : 'The image includes an alchemical symbol used to represent the element. In the background are drawings of ancient chemistry apparatus.\n',
		history : 'Bismuth was discovered by an unknown alchemist around 1400 AD. Later that century it was alloyed with lead to make cast type for printers and decorated caskets were being crafted in the metal. Bismuth was often confused with lead; it was likewise a heavy metal and melted at a relatively low temperature making it easy to work. Georgius Agricola in the early 1500s speculated that it was a distinctly different metal, as did Caspar Neuman in the early 1700s, but proof that it was so finally came in 1753 thanks to the work of Claude-François Geoffroy.\n' +
			'\n' +
			'Bismuth was used as an alloying metal in the bronze of the Incas of South America around 1500 AD. Bismuth was not mined as ore but appears to have occurred as the native metal.'
	},
	84: {
		ab : 'Po',
		name : 'Polonium',
		mass : 208.982,
		masses : [
			[209.983]
		],
		abundance : 0,
		color : 'orange',
		value : 84,
		origin : 'Polonium is named after Poland, the native country of Marie Curie, who first isolated the element. \n',
		appearance : 'A silvery-grey, radioactive semi-metal.\n',
		uses : 'Polonium is an alpha-emitter, and is used as an alpha-particle source in the form of a thin film on a stainless steel disc. These are used in antistatic devices and for research purposes.\n' +
			'\n' +
			'A single gram of polonium will reach a temperature of 500°C as a result of the alpha radiation emitted. This makes it useful as a source of heat for space equipment.\n' +
			'\n' +
			'It can be mixed or alloyed with beryllium to provide a source of neutrons.',
		biological : 'Polonium has no known biological role. It is highly toxic due to its radioactivity.\n',
		natural : 'Polonium is a very rare natural element. It is found in uranium ores but it is uneconomical to extract it. It is obtained by bombarding bismuth-209 with neutrons to give bismuth-210, which then decays to form polonium. All the commercially produced polonium in the world is made in Russia.\n',
		imageText : 'An image based on Luna E-1, the first spacecraft of the Soviet ‘Luna’ programme. Later Luna spacecraft carried ‘Lunokhod’ rovers to the moon. These were the first rovers to explore the moon’s surface and were powered by polonium.\n',
		history : 'Uranium ores contain minute traces of polonium at levels of parts per billion. Despite this, in 1898 Marie Curie and husband Pierre Curie extracted some from pitchblende (uranium oxide, U3O8) after months of painstaking work. The existence of this element had been forecast by the Mendeleev who could see from his periodic table that there might well be the element that followed bismuth and he predicted it would have an atomic weight of 212. The Curies had extracted the isotope polonium-209 and which has a half-life of 103 years.\n' +
			'\n' +
			'Before the advent of nuclear reactors, the only source of polonium was uranium ore but that did not prevent its being separated and used in anti-static devices. These relied on the alpha particles that polonium emits to neutralise electric charge.'
	},
	85: {
		ab : 'At',
		name : 'Astatine',
		mass : 209.987,
		masses : [
			[210.987]
		],
		abundance : 0,
		color : 'tangerine',
		value : 85,
		origin : 'The name comes from the Greek \'astatos\', meaning unstable. \n',
		appearance : 'Astatine is a dangerously radioactive element.\n',
		uses : 'There are currently no uses for astatine outside of research. The half-life of the most stable isotope is only 8 hours, and only tiny amounts have ever been produced.\n' +
			'\n' +
			'A mass spectrometer has been used to confirm that astatine behaves chemically like other halogens, particularly iodine.\n',
		biological : 'Astatine has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Astatine can be obtained in a variety of ways, but not in weighable amounts. Astatine-211 is made in nuclear reactors by the neutron bombardment of bismuth-200.',
		imageText : 'The image is based around the familiar radiation hazard symbol and reflects the unstable and reactive nature of the element.\n',
		history : 'In 1939, two groups came near to discovering this element in mineral samples. Horia Hulubei and Yvette Cauchois analysed mineral samples using a high-resolution X-ray apparatus and thought they had detected it. Meanwhile, Walter Minder observed the radioactivity of radium and said it appeared have another element present. He undertook chemical tests which suggested it was like iodine.\n' +
			'\n' +
			'Element 85 was convincingly produced for the first time at the University of California in 1940 by Dale R. Corson, K.R. Mackenzie, and Emilio Segré. Their astatine was made by bombarding bismuth with alpha particles. Although they reported their discovery, they were unable to carry on with their research due to World War II and the demands of the Manhattan project which diverted all researchers of radioactive materials towards the making of nuclear weapons.'
	},
	86: {
		ab : 'Rn',
		name : 'Radon',
		mass : 210.991,
		masses : [
			[222.018],
			[220.011]
		],
		abundance : 0,
		color : 'yellow',
		value : 86,
		origin : 'The name is derived from radium, as it was first detected as an emission from radium during radioactive decay. \n',
		appearance : 'Radon is a colourless and odourless gas. It is chemically inert, but radioactive.\n',
		uses : 'Radon decays into radioactive polonium and alpha particles. This emitted radiation made radon useful in cancer therapy. Radon was used in some hospitals to treat tumours by sealing the gas in minute tubes, and implanting these into the tumour, treating the disease in situ. Other, safer treatments are now more commonly used.\n' +
			'\n' +
			'In some places, high concentrations of radon can build up indoors, escaping from the ground or from granite buildings. Home testing kits are available which can be sent away for analysis.\n',
		biological : 'Radon has no known biological role. It is, however, thought that it may have had a significant role in evolution. This is because it is responsible for much of the Earth’s background radiation that can lead to genetic modifications.\n',
		natural : 'Radon is produced naturally from the decay of the isotope radium-226, which is found in rocks. It was first discovered as a radioactive gas produced from radium as it decayed. There is a detectable amount in the Earth’s atmosphere.\n',
		imageText : 'An image based around the familiar radiation hazard symbol. The background image reflects the fact that detectable amounts of radon can build up in houses.\n',
		history : 'In 1899, Ernest Rutherford and Robert B. Owens detected a radioactive gas being released by thorium. That same year, Pierre and Marie Curie detected a radioactive gas emanating from radium. In1900, Friedrich Ernst Dorn at Halle, Germany, noted that a gas was accumulating inside ampoules of radium. They were observing radon. That from radium was the longer-lived isotope radon-222 which has a half-life 3.8 days, and was the same isotope which the Curies has observed. The radon that Rutherford detected was radon-220 with a half-life of 56 seconds.\n' +
			'\n' +
			'In 1900, Rutherford devoted himself to investigating the new gas and showed that it was possible to condense it to a liquid. In 1908, William Ramsay and Robert Whytlaw-Gray at University College, London, collected enough radon to determine its properties and reported that it was the heaviest gas known.'
	},
	87: {
		ab : 'Fr',
		name : 'Francium',
		mass : 223.020,
		abundance : 0,
		color : 'pink',
		value : 87,
		origin : 'Francium is named after France. \n',
		appearance : 'An intensely radioactive metal.\n',
		uses : 'Francium has no uses, having a half life of only 22 minutes.\n',
		biological : 'Francium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Francium is obtained by the neutron bombardment of radium in a nuclear reactor. It can also be made by bombarding thorium with protons.\n',
		imageText : 'The image reflects the ancient cultural ‘Gallic’ iconography of France, the country that gives the element its name.\n',
		history : 'Mendeleev said there should be an element like caesium waiting to be discovered. Consequently, there were claims, denials, and counterclaims by scientists who said they had found it. During the 1920s and 30s, these claims were made on the basis of unexplained radioactivity in minerals, or new lines in their X-ray spectra, but all eventually turned out not to be evidence of element 87.\n' +
			'\n' +
			'Francium was finally discovered in 1939 by Marguerite Perey at the Curie Institute in Paris. She had purified a sample of actinium free of all its known radioactive impurities and yet its radioactivity still indicated another element was present, and which she rightly deduced was the missing element 87. Others challenged her results too, and it was not until after World War II that she was accepted as the rightful discoverer in 1946.'
	},
	88: {
		ab : 'Ra',
		name : 'Radium',
		mass : 226.025,
		masses : [
			[223.019],
			[224.020],
			[228.031]
		],
		abundance : 0,
		color : 'pinkl',
		value : 88,
		origin : 'The name is derived from the Latin \'radius\', meaning ray. \n',
		appearance : 'A soft, shiny and silvery radioactive metal.\n',
		uses : 'Radium now has few uses, because it is so highly radioactive.\n' +
			'\n' +
			'Radium-223 is sometimes used to treat prostate cancer that has spread to the bones. Because bones contain calcium and radium is in the same group as calcium, it can be used to target cancerous bone cells. It gives off alpha particles that can kill the cancerous cells.\n' +
			'\n' +
			'Radium used to be used in luminous paints, for example in clock and watch dials. Although the alpha rays could not pass through the glass or metal of the watch casing, it is now considered to be too hazardous to be used in this way.\n',
		biological : 'Radium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Radium is present in all uranium ores, and could be extracted as a by-product of uranium refining. Uranium ores from DR Congo and Canada are richest in radium. Today radium is extracted from spent fuel rods from nuclear reactors. Annual production of this element is fewer than 100 grams per year.\n',
		imageText : 'The image represents the former use of radium in luminous paint used for clock and watch dials.\n',
		history : 'Radium was discovered in 1898 by Marie Curie and Pierre Curie. They managed to extract 1 mg of radium from ten tonnes of the uranium ore pitchblende (uranium oxide, U3O8), a considerable feat, given the chemically methods of separation available to them. They identified that it was a new element because its atomic spectrum revealed new lines. Their samples glowed with a faint blue light in the dark, caused by the intense radioactivity exciting the surrounding air.\n' +
			'\n' +
			'The metal itself was isolated by Marie Curie and André Debierne in 1911, by means of the electrolysis of radium chloride. At Debierne’s suggestion, they used a mercury cathode in which the liberated radium dissolved. This was then heated to distil off the mercury leaving the radium behind.'
	},
	89: {
		ab : 'Ac',
		name : 'Actinium',
		mass : 227.028,
		abundance : 0,
		color : 'green',
		value : 89,
		origin : 'The name is derived from the Greek \'actinos\', meaning a ray. \n',
		appearance : 'Actinium is a soft, silvery-white radioactive metal. It glows blue in the dark because its intense radioactivity excites the air around it.\n',
		uses : 'Actinium is a very powerful source of alpha rays, but is rarely used outside research.\n',
		biological : 'Actinium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Actinium used for research purposes is made by the neutron bombardment of radium-226. Actinium also occurs naturally in uranium ores.\n',
		imageText : 'The Greek symbol ‘alpha’ and metallic ‘rays’ are representative of the element as a source of alpha radiation, and also the origin of its name.\n',
		history : 'This element was discovered in 1899 by André Debierne at Paris. He extracted it from the uranium ore pitchblende (uranium oxide, U3O8) in which it occurs in trace amounts. In 1902, Friedrich Otto Giesel independently extracted it from the same mineral and, unaware it was already known, gave it the named emanium.\n' +
			'\n' +
			'Actinium extracted from uranium ores is the isotope actinium-227 which has half-life of 21.7 years. It occurs naturally as one of the sequence of isotopes that originate with the radioactive decay of uranium-235. A tonne of pitchblende contains around 150 mg of actinium.'
	},
	90: {
		ab : 'Th',
		name : 'Thorium',
		mass : 232.038,
		masses : [
			[230.033]
		],
		abundance : 100,
		color : 'green',
		value : 90,
		origin : 'Thorium is named after Thor, the Scandinavian god of war. \n',
		appearance : 'A weakly radioactive, silvery metal.\n',
		uses : 'Thorium is an important alloying agent in magnesium, as it imparts greater strength and creep resistance at high temperatures. Thorium oxide is used as an industrial catalyst.\n' +
			'\n' +
			'Thorium can be used as a source of nuclear power. It is about three times as abundant as uranium and about as abundant as lead, and there is probably more energy available from thorium than from both uranium and fossil fuels. India and China are in the process of developing nuclear power plants with thorium reactors, but this is still a very new technology.\n' +
			'\n' +
			'Thorium dioxide was formerly added to glass during manufacture to increase the refractive index, producing thoriated glass for use in high-quality camera lenses.',
		biological : 'Thorium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Thorium is found as the minerals thorite, uranothorite and thorianite. It is also found in monazite, which is the most important commercial source. Several methods are used to produce the metal, such as reducing thorium oxide with calcium or electrolysis of the fluoride.\n',
		imageText : 'The imagery used here is that associated with Thor, the Norse god connected with thunder. It includes Thor’s hammer (Mjolnir).\n',
		history : 'In 1829, Jöns Jakob Berzelius of the Royal Karolinska Institute, Stockholm extracted thorium from a rock specimen sent to him by an amateur mineralogist who had discovered it near Brevig and realised that it had not previously been reported. The mineral turned out to be thorium silicate, and it is now known as thorite. Berzelius even produced a sample of metallic thorium by heating thorium fluoride with potassium, and confirmed it as a new metal.\n' +
			'\n' +
			'The radioactivity of thorium was first demonstrated in 1898 by Gerhard Schmidt and confirmed by Marie Curie. Thorium, like uranium, survives on Earth because it has isotopes with long half-lives, such as the predominant one, thorium-232, whose half life is 14 billion years.'
	},
	91: {
		ab : 'Pa',
		name : 'Protactinium',
		mass : 231.036,
		abundance : 100,
		color : 'green',
		value : 91,
		origin : 'The name is derived from the Greek \'protos\', meaning first, as a prefix to the element actinium, which is produced through the radioactive decay of proactinium. \n',
		appearance : 'A silvery, radioactive metal.\n',
		uses : 'Protactinium is little used outside of research.\n',
		biological : 'Protactinium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Small amounts of protactinium are found naturally in uranium ores. It is also found in spent fuel rods from nuclear reactors, from which it is extracted.\n',
		imageText : 'The icon is based on the Japanese monogram for ‘ichi’ – number one. This reflects the origin of the element’s name from the Greek ‘protos’, meaning first.\n',
		history : 'Mendeleev said there should be an element between thorium and uranium, but it evaded detection. Then, in 1900, William Crookes separated an intensely radioactive material from uranium, but did not identify it. In 1913, Kasimir Fajans and Otto Göhring showed that this new element decayed by beta-emission and it existed only fleetingly. We now know it is a member of the sequence of elements through which uranium decays. It was the isotope protactinium-234, which has a half-life of 6 hours 42 minutes.\n' +
			'\n' +
			'A longer-lived isotope was separated from the uranium ore pitchblende (uranium oxide, U3O8) in 1918 by Lise Meitner at the Kaiser-Wilhelm Institute in Berlin. This was the longer-lived isotope protactinium-231, also coming from uranium, and its half-life is 32,500 years.\n' +
			'\n' +
			'In 1934, Aristid von Grosse reduced protactinium oxide to protactinium metal by decomposing its iodide (PaF5) on a heated filament.'
	},
	92: {
		ab : 'U',
		name : 'Uranium',
		mass : 238.051,
		masses : [
			[233.040],
			[234.041, 0.0054],
			[235.044, 0.7204],
			[236.046]
		],
		abundance : 99.2742,
		color : 'green',
		value : 92,
		origin : 'Uranium was named after the planet Uranus. \n',
		appearance : 'A radioactive, silvery metal.\n',
		uses : 'Uranium is a very important element because it provides us with nuclear fuel used to generate electricity in nuclear power stations. It is also the major material from which other synthetic transuranium elements are made.\n' +
			'\n' +
			'Naturally occurring uranium consists of 99% uranium-238 and 1% uranium-235. Uranium-235 is the only naturally occurring fissionable fuel (a fuel that can sustain a chain reaction). Uranium fuel used in nuclear reactors is enriched with uranium-235. The chain reaction is carefully controlled using neutron-absorbing materials. The heat generated by the fuel is used to create steam to turn turbines and generate electrical power.\n' +
			'\n' +
			'In a breeder reactor uranium-238 captures neutrons and undergoes negative beta decay to become plutonium-239. This synthetic, fissionable element can also sustain a chain reaction.\n' +
			'\n' +
			'Uranium is also used by the military to power nuclear submarines and in nuclear weapons.\n' +
			'\n' +
			'Depleted uranium is uranium that has much less uranium-235 than natural uranium. It is considerably less radioactive than natural uranium. It is a dense metal that can be used as ballast for ships and counterweights for aircraft. It is also used in ammunition and armour.',
		biological : 'Uranium has no known biological role. It is a toxic metal.\n',
		natural : 'Uranium occurs naturally in several minerals such as uranite (pitchblende), brannerite and carnotite. It is also found in phosphate rock and monazite sands. World production of uranium is about 41,000 tonnes per year.\n' +
			'\n' +
			'Extracted uranium is converted to the purified oxide, known as yellow-cake. Uranium metal can be prepared by reducing uranium halides with Group 1 or Group 2 metals, or by reducing uranium oxides with calcium or aluminium.',
		imageText : 'The image is based around the common astrological symbol for the planet Uranus.\n',
		history : 'In the Middle Ages, the mineral pitchblende (uranium oxide, U3O8) sometimes turned up in silver mines, and in 1789 Martin Heinrich Klaproth of Berlin investigated it. He dissolved it in nitric acid and precipitated a yellow compound when the solution was neutralised. He realised it was the oxide of a new element and tried to produce the metal itself by heating the precipitate with charcoal, but failed.\n' +
			'\n' +
			'It fell to Eugène Peligot in Paris to isolate the first sample of uranium metal which he did in 1841, by heating uranium tetrachloride with potassium.\n' +
			'\n' +
			'The discovery that uranium was radioactive came only in 1896 when Henri Becquerel in Paris left a sample of uranium on top of an unexposed photographic plate. It caused this to become cloudy and he deduced that uranium was giving off invisible rays. Radioactivity had been discovered.'
	},
	93: {
		ab : 'Np',
		name : 'Neptunium',
		mass : 237.048,
		masses : [
			[236.047]
		],
		abundance : 0,
		color : 'green',
		value : 93,
		origin : 'Neptunium was named after the planet Neptune. \n',
		appearance : 'A radioactive metal.\n',
		uses : 'Neptunium is little used outside research. The isotope neptunium-237 has been used in neutron detectors.\n',
		biological : 'Neptunium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Neptunium is obtained as a by-product from nuclear reactors. It is extracted from the spent uranium fuel rods. Trace quantities occur naturally in uranium ores.\n',
		imageText : 'The symbol used is a representation of the trident belonging to the Roman god Neptune.\n',
		history : 'In early 1934, Enrico Fermi in Italy tried to produce elements 93 and 94 by bombarding uranium with neutrons, and claimed success. Ida Tacke-Noddack questioned Fermi’s claim, pointing out he had failed to do a complete analysis, and all that he had found were fission products of uranium. (Fermi had in fact discovered nuclear fission but not realised it.) In 1938, Horia Hulubei and Yvette Cauchois claimed to have discovered element 93, but the claim was also criticised on the grounds that element 93 did not occur naturally.\n' +
			'\n' +
			'Neptunium was first made in 1940 by Edwin McMillan and Philip Abelson at Berkeley, California. It came from a uranium target that had been bombarded with slow neutrons and which then emitted unusual beta-rays indicating a new isotope. Abelson proved there was indeed a new element present'
	},
	94: {
		ab : 'Pu',
		name : 'Plutonium',
		mass : 244.064,
		masses : [
			[238.050],
			[239.052],
			[240.054],
			[241.057],
			[242.059]
		],
		abundance : 0,
		color : 'green',
		value : 94,
		origin : 'Plutonium, is named after the then planet Pluto, following from the two previous elements uranium and neptunium. \n',
		appearance : 'A radioactive, silvery metal.\n',
		uses : 'Plutonium was used in several of the first atomic bombs, and is still used in nuclear weapons. The complete detonation of a kilogram of plutonium produces an explosion equivalent to over 10,000 tonnes of chemical explosive.\n' +
			'\n' +
			'Plutonium is also a key material in the development of nuclear power. It has been used as a source of energy on space missions, such as the Mars Curiosity Rover and the New Horizons spacecraft on its way to Pluto.\n',
		biological : 'Plutonium has no known biological role. It is extremely toxic due to its radioactivity.\n',
		natural : 'The greatest source of plutonium is the irradiation of uranium in nuclear reactors. This produces the isotope plutonium-239, which has a half-life of 24,400 years.\n' +
			'\n' +
			'Plutonium metal is made by reducing plutonium tetrafluoride with calcium.',
		imageText : 'The image is inspired by Robert Oppenheimer’s quote, following the first atomic bomb test in the Nevada desert. ‘We knew the world would not be the same. A few people laughed, a few people cried. Most people were silent. I remembered the line from the Hindu scripture, the Bhagavad-Gita. Vishnu is trying to persuade the Prince that he should do his duty and to impress him takes on his multi-armed form and says, “Now I am become Death, the destroyer of worlds.” I suppose we all thought that, one way or another.’\n',
		history : 'Plutonium was first made in December 1940 at Berkeley, California, by Glenn Seaborg, Arthur Wahl, Joseph Kennedy, and Edwin McMillan. They produced it by bombarding uranium-238 with deuterium nuclei (alpha particles). This first produced neptunium-238 with a half-life of two days, and this decayed by beta emission to form element 94 (plutonium). Within a couple of months element 94 had been conclusively identified and its basic chemistry shown to be like that of uranium.\n' +
			'\n' +
			'To begin with, the amounts of plutonium produced were invisible to the eye, but by August 1942 there was enough to see and weigh, albeit only 3 millionths of a gram. However, by 1945 the Americans had several kilograms, and enough plutonium to make three atomic bombs, one of which exploded over Nagasaki in August 1945.'
	},
	95: {
		ab : 'Am',
		name : 'Americium',
		mass : 243.061,
		masses : [
			[241.057]
		],
		abundance : 0,
		color : 'green',
		value : 95,
		origin : 'Americium is named for America where it was first made. \n',
		appearance : 'Americium is a silvery, shiny radioactive metal.\n',
		uses : 'Americium is commonly used in smoke alarms, but has few other uses.\n' +
			'\n' +
			'It has the potential to be used in spacecraft batteries in the future. Currently plutonium is used but availability is poor so alternatives are being considered.\n' +
			'\n' +
			'It is of interest as part of the decay sequence that occurs in nuclear power production.\n',
		biological : 'Americium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Americium occurs naturally in uranium minerals, but only in trace amounts. The main source of the element is the neutron bombardment of plutonium in nuclear reactors. A few grams are produced in this way each year.\n' +
			'\n' +
			'It is also formed when nuclear weapons are detonated.',
		imageText : 'The image reflects both the origin of the element’s name and its presence in domestic smoke alarms.\n',
		history : 'This element was in fact discovered after curium, the element which follows it in the periodic table. However, it did once exist on Earth having been produced for millions of years in natural nuclear reactors in Oklo, Gabon. These ceased to function a billion years ago, and as the longest lived isotope is americium-247, with a half-life of 7370 years, none has survived to the present day. Americium was first made late in 1944 at the University of Chicago by a team which included Glenn Seaborg, Ralph James, Leon Morgan, and Albert Ghiorso. The americium was produced by bombarding plutonium with neutrons in a nuclear reactor. This produced isotope americium-241, which has a half-life of this is 432 years.\n'
	},
	96: {
		ab : 'Cm',
		name : 'Curium',
		mass : 247.070,
		masses : [
			[243.061],
			[244.063],
			[245.065],
			[246.067],
			[248.072]
		],
		abundance : 0,
		color : 'green',
		value : 96,
		origin : 'Curium is named in honour of Pierre and Marie Curie. \n',
		appearance : 'A radioactive metal that is silver in colour. It tarnishes rapidly in air.\n',
		uses : 'Curium has been used to provide power to electrical equipment used on space missions.\n',
		biological : 'Curium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Curium can be made in very small amounts by the neutron bombardment of plutonium in a nuclear reactor. Minute amounts may exist in natural deposits of uranium. Only a few grams are produced each year.\n',
		imageText : 'The image shows a satellite in orbit around the Earth, reflecting the use of curium in satellite technology.\n',
		history : 'Curium was first made by the team of Glenn Seaborg, Ralph James, and Albert Ghiorso in 1944, using the cyclotron at Berkeley, California. They bombarded a piece of the newly discovered element plutonium (isotope 239) with alpha-particles. This was then sent to the Metallurgical Laboratory at the University of Chicago where a tiny sample of curium was eventually separated and identified. However, news of the new element was not disclosed until after the end of World War II. Most unusually, it was first revealed by Seaborg when he appeared as the guest scientist on a radio show for children on 11 November 1945. It was officially announced the following week.\n'
	},
	97: {
		ab : 'Bk',
		name : 'Berkelium',
		mass : 247.070,
		mases : [
			[249.075]
		],
		abundance : 0,
		color : 'green',
		value : 97,
		origin : 'Berkelium was named after the town Berkeley, California, where it was first made. \n',
		appearance : 'Berkelium is a radioactive, silvery metal.\n',
		uses : 'Because it is so rare, berkelium has no commercial or technological use at present.\n',
		biological : 'Berkelium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Less than a gram of berkelium is made each year. It is made in nuclear reactors by the neutron bombardment of plutonium-239.\n',
		imageText : 'An abstract metal symbol is against a background of vibrant colours representing the creation of the element in nuclear reactors.\n',
		history : 'Berkelium was first produced in December 1949, at the University of California at Berkeley, and was made by Stanley Thompson, Albert Ghiorso, and Glenn Seaborg. They took americium-241, which had first been made in 1944, and bombarded it with helium nuclei (alpha particles) for several hours in the 60-inch cyclotron. The americium itself had been produced by bombarding plutonium with neutrons.\n' +
			'\n' +
			'The Berkeley team dissolved the target in acid and used ion exchange to separate the new elements that had been created. This was the isotope berkelium-243 which has a half-life of about 5 hours. It took a further nine years before enough berkelium had been made to see with the naked eye, and even this was only a few micrograms. The first chemical compound, berkelium dioxide, BkO2, was made in 1962.'
	},
	98: {
		ab : 'Cf',
		name : 'Californium',
		mass : 252.082,
		abundance : 0,
		color : 'green',
		value : 98,
		origin : 'Californium is named for the university and state of California, where the element was first made. \n',
		appearance : 'Californium is a radioactive metal.\n',
		uses : 'Californium is a very strong neutron emitter. It is used in portable metal detectors, for identifying gold and silver ores, to identify water and oil layers in oil wells and to detect metal fatigue and stress in aeroplanes.\n',
		biological : 'Californium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Californium did not exist in weighable amounts until ten years after its discovery. It is prepared, in milligram amounts only, by the neutron bombardment of plutonium-239.\n',
		imageText : 'The image is based on the state flag of California and features a grizzly bear (a symbol of great strength) and a lone star.\n',
		history : 'Californium was first made in 1950 at Berkeley, California, by a team consisting of Stanley Thompson, Kenneth Street Jr., Albert Ghiorso, and Glenn Seaborg. They made it by firing helium nuclei (alpha particles) at curium-242. The process yielded the isotope californium-245 which has a half-life of 44 minutes. Curium is intensely radioactive and it had taken the team three years to collect the few milligrams needed for the experiment, and even so only a few micrograms of this were used. Their endeavours produced around 5,000 atoms of californium, but there was enough to show it really was a new element.\n'
	},
	99: {
		ab : 'Es',
		name : 'Einsteinium',
		mass : 251.080,
		masses : [
			[249.075],
			[250.076],
			[252.082]
		],
		abundance : 0,
		color : 'green',
		value : 99,
		origin : 'Einsteinium is named after the renowned physicist Albert Einstein. \n',
		appearance : 'A radioactive metal, only a few milligrams of which are made each year.\n',
		uses : 'Einsteinium has no uses outside research.\n',
		biological : 'Einsteinium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Einsteinium can be obtained in milligram quantities from the neutron bombardment of plutonium in a nuclear reactor.\n',
		imageText : 'The design is inspired by the work of Albert Einstein and images collected from early particle accelerators, such as those at Cern and Fermilab. The arrows are from one of these annotated (and unattributed) images indicating the direction of collisions. An abstracted ‘collider’ pattern is shown in the background.\n',
		history : 'Einsteinium was discovered in the debris of the first thermonuclear explosion which took place on a Pacific atoll, on 1 November 1952. Fall-out material, gathered from a neighbouring atoll, was sent to Berkeley, California, for analysis. There it was examined by Gregory Choppin, Stanley Thompson, Albert Ghiorso, and Bernard Harvey. Within a month they had discovered and identified 200 atoms of a new element, einsteinium, but it was not revealed until 1955.\n' +
			'\n' +
			'The einsteinium had formed when some uranium atoms had captured several neutrons and gone through a series of capture and decay steps resulting in einsteinium-253, which has a half-life of 20.5 days.\n' +
			'\n' +
			'By 1961, enough einsteinium had been collected to be visible to the naked eye, and weighed, although it amounted to mere 10 millionths of a gram.'
	},
	100: {
		ab : 'Fm',
		name : 'Fermium',
		mass : 257.095,
		abundance : 0,
		color : 'green',
		value : 100,
		origin : 'Fermium is named after the nuclear physicist Enrico Fermi. \n',
		appearance : 'A radioactive metal obtained only in microgram quantities.\n',
		uses : 'Fermium has no uses outside research.\n',
		biological : 'Fermium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Fermium can be obtained, in microgram quantities, from the neutron bombardment of plutonium in a nuclear reactor.\n',
		imageText : 'The image aims to suggest a self-propagating nuclear chain reaction, such as occurs in nuclear reactors and atomic bombs.\n',
		history : 'Fermium was discovered in 1953 in the debris of the first thermonuclear explosion which took place on a Pacific atoll on 1 November 1952. In this a uranium-238 bomb was used to provide the heat necessary to trigger a thermonuclear explosion. The uranium-238 had been exposed to such a flux of neutrons that some of its atoms had captured several of them, thereby forming elements of atomic numbers 93 to 100, and among the last of these was an isotope of element 100, fermium-255. News of its discovery was kept secret until 1955.\n' +
			'\n' +
			'Meanwhile a group at the Nobel Institute in Stockholm had independently made a few atoms of fermium by bombarding uranium-238 with oxygen nuclei and obtained fermium-250, which has a half-life of 30 minutes.'
	},
	101: {
		ab : 'Md',
		name : 'Mendelevium',
		mass : 258.098,
		masse : [
			[260.104]
		],
		abundance : 0,
		color : 'green',
		value : 101,
		origin : 'Mendelevium is named for Dmitri Mendeleev who produced one of the first periodic tables. \n',
		appearance : 'A radioactive metal, of which only a few atoms have ever been created.\n',
		uses : 'Mendelevium is used only for research.\n',
		biological : 'Mendelevium has no known biological role.\n',
		natural : 'Mendelevium does not occur naturally. It is made by bombarding einsteinium with alpha particles (helium ions).\n',
		imageText : 'The image is inspired by, and based on, a photograph of Dimitri Mendeleev and an early version of the periodic table.\n',
		history : 'Seventeen atoms of mendelevium were made in 1955 by Albert Ghiorso, Bernard Harvey, Gregory Chopin, Stanley Thompson, and Glenn Seaborg. They were produced during an all-night experiment using the cyclotron at Berkeley, California. In this, a sample of einsteinium-253 was bombarded with alpha-particles (helium nuclei) and mendelevium-256 was detected. This had a half-life of around 78 minutes. Further experiments yielded several thousand atoms of mendelevium, and today it is possible to produce millions of them. The longest lived isotope is mendelevium-260 which has a half-life of 28 days.\n'
	},
	102: {
		ab : 'No',
		name : 'Nobelium',
		mass : 259.101,
		abundance : 0,
		color : 'green',
		value : 102,
		origin : 'Nobelium is named for Alfred Nobel, the founder of the Nobel prize. \n',
		appearance : 'Nobelium is a radioactive metal. Only a few atoms have ever been made. Its half-life is only 58 minutes.\n',
		uses : 'Nobelium has no uses outside research.\n',
		biological : 'Nobelium has no known biological role. It is toxic due to its radioactivity.\n',
		natural : 'Nobelium is made by bombarding curium with carbon in a device called a cyclotron.\n',
		imageText : 'Nobelium is named after Alfred Nobel. The image features a Japanese ideograph (or virtue word) with various meanings including ‘master teacher’ and ‘noble’ - a pun on the origin of the element’s name. The background features imagery suggestive of particle ‘trails’ like those produced when radiation passes through a cloud chamber.\n',
		history : 'This element’s history is one of controversy. In 1956, a team led by Georgy Flerov at the Institute of Atomic Energy, Moscow, synthesised element 102 by bombarding plutonium with oxygen and got atoms of element 102, isotope-252. However, they did not report their success.\n' +
			'\n' +
			'In 1957, the Nobel Institute of Physics in Stockholm announced isotope-253 which had been made by bombarding curium with carbon. Then in 1958, Albert Ghiorso at the Lawrence Berkeley Laboratory (LBL) claimed isotope-254, also made by bombarding curium with carbon. These claims were challenged by the Russians.\n' +
			'\n' +
			'In 1962-63, the Russian Joint Institute of Nuclear Research, based at Dubna, synthesised isotopes 252 to 256. Ghiorso still insisted his group were the first to discover element 102, and so began years of recrimination, finally ending in the International Union of Pure and Applied Chemists deciding in favour of the Russians being the discoverers.'
	},
	103: {
		ab : 'Lr',
		name : 'Lawrencium',
		mass : 262.110,
		abundance : 0,
		color : 'green',
		value : 103,
		origin : 'Lawrencium is named after Ernest O. Lawrence the inventor of the cyclotron. \n',
		appearance : 'A radioactive metal of which only a few atoms have ever been created.\n',
		uses : 'Lawrencium has no uses outside research.\n',
		biological : 'Lawrencium has no known biological role.\n',
		natural : 'Lawrencium does not occur naturally. It is produced by bombarding californium with boron.\n',
		imageText : 'The element is named after Ernest Lawrence, who invented the cyclotron particle accelerator. This was designed to accelerate sub-atomic particles around a circle until they have enough energy to smash into an atom and create a new atom. This image is based on the abstract particle trails produced in a cyclotron.\n',
		history : 'This element had a controversial history of discovery. In 1958, the Lawrence Berkeley Laboratory (LBL) bombarded curium with nitrogen and appeared to get element 103, isotope-257. In 1960, they bombarded californium with boron hoping to get isotope-259 but the results were inconclusive. In 1961, they bombarded curium with boron and claimed isotope-257.\n' +
			'\n' +
			'In 1965, the Soviet Union’s Joint Institute for Nuclear Research (JINR) successfully bombarded americium with oxygen and got isotope-256. They also checked the LBL’s work, and claimed it was inaccurate. The LBL then said their product must have been isotope-258. The International Unions of Pure and Applied Chemistry awarded discovery to the LBL.'
	},	
	104: {
		ab : 'Rf',
		name : 'Rutherfordium',
		mass : 265.117,
		abundance : 0,
		color : 'blue',
		value : 104,
		origin : 'Rutherfordium is named in honour of New Zealand Chemist Ernest Rutherford, one of the first to explain the structure of atoms. \n',
		appearance : 'A radioactive metal that does not occur naturally. Relatively few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'Rutherfordium has no known biological role.\n',
		natural : 'Rutherfordium is a transuranium element. It is created by bombarding californium-249 with carbon-12 nuclei.\n',
		imageText : 'The abstract metallic symbol and background are inspired by imagery from early and modern particle accelerators.\n',
		history : 'In 1964, a team led by Georgy Flerov at the Russian Joint Institute for Nuclear Research (JINR) in Dubna, bombarded plutonium with neon and produced element 104, isotope 259. They confirmed their findings in 1966.\n' +
			'\n' +
			'In 1969, a team led by Albert Ghiorso at the Californian Lawrence Berkeley Laboratory (LBL) made three successful attempts to produce element 104: by bombarding curium with oxygen to get isotope-260, californium with carbon to get isotope-257, and californium with carbon to get isotope-258.\n' +
			'\n' +
			'A dispute over priority of discovery followed and eventually, in 1992, the International Unions of Pure and Applied Chemistry (IUPAC) concluded that both the Russian and American researchers had been justified in making their claims. IUPAC decided element 104 would be called rutherfordium.'
	},
	105: {
		ab : 'Db',
		name : 'Dubnium',
		mass : 268.126,
		abundance : 0,
		color : 'blue',
		value : 105,
		origin : 'Dubnium is named for the Russian town Dubna. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'Dubnium has no known biological role.\n',
		natural : 'Dubnium does not occur naturally. It is a transuranium element created by bombarding californium-249 with nitrogen-15 nuclei.\n',
		imageText : 'The image features a stylised Cyrillic character version of ‘Dubna’, the Russian town after which the element is named. It is set against an abstracted ‘fractal particle’ background.\n',
		history : 'In 1968, a team led by Georgy Flerov at the Russian Joint Institute for Nuclear Research (JINR) bombarded americium with neon and made an isotope of element 105. In 1970, a team led by Albert Ghiorso at the American Lawrence Berkeley Laboratory (LBL) bombarded californium with neon and obtained isotope 261. They disputed the claim of the JINR people. The two groups gave it different names. The Russians called it neilsbohrium, while the Americans called it hahnium, both being derived from the names of prominent nuclear scientists.\n' +
			'\n' +
			'Eventually, the International Union of Pure and Applied Chemistry (IUPAC) decided it should be called dubnium.'
	},
	106: {
		ab : 'Sg',
		name : 'Seaborgium',
		mass : 271.134,
		abundance : 0,
		color : 'blue',
		value : 106,
		origin : 'Seaborgium is named for Glenn T. Seaborg, who was instrumental in producing several transuranium elements. \n',
		appearance : 'A radioactive metal that does not occur naturally. Only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'Seaborgium has no known biological role.\n',
		natural : 'Seaborgium is a transuranium element. It is created by bombarding californium-249 with oxygen-18 nuclei.\n',
		imageText : 'The icon is an abstracted atomic symbol. The background is inspired by imagery from early and modern particle accelerators.\n',
		history : 'In 1970, a team led by Albert Ghiorso at the Californian Lawrence Berkeley National Laboratory (LBNL) bombarded californium with oxygen and was successful in producing element 106, isotope 263. In 1974, a team led by Georgy Flerov and Yuri Oganessian at the Russian Joint Institute for Nuclear Research (JINR) bombarded lead with chromium and obtained isotopes 259 and 260.\n' +
			'\n' +
			'In September 1974, a team led by Ghiorso at LBNL produced isotope 263, with a half-life of 0.8 seconds, by bombarding californium with oxygen. Several atoms of seaborgium have since been made by this method which produces one seaborgium atom per hour.'
	},
	107: {
		ab : 'Bh',
		name : 'Bohrium',
		mass : 272.138,
		abundance : 0,
		color : 'blue',
		value : 107,
		origin : 'Bohrium is named for the Danish atomic physicist Niels Bohr \n',
		appearance : 'Bohrium is a highly radioactive metal.\n',
		uses : 'At present, bohrium is of research interest only.\n',
		biological : 'Bohrium has no known biological role.\n',
		natural : 'Bohrium does not occur naturally and only a few atoms have ever been made. It will probably never be isolated in observable quantities. It was created by the so-called ‘cold fusion’ method. This involved the bombardment of bismuth with atoms of chromium.\n',
		imageText : 'The abstracted symbol and patterns are based on the, now iconic, atomic model proposed by Niels Bohr in 1913.\n',
		history : 'In 1975 a team led by Yuri Oganessian at the Russian Joint Institute for Nuclear Research (JINR) in Dubna, bombarded bismuth with chromium and produced element 107, isotope-261. They published the results of their successful run in 1976 and submitted a discovery claim.\n' +
			'\n' +
			'In 1981, a team led by Peter Armbruster and Gottfried Münzenberg at the German nuclear research institute the Geselleschaft für Schwerionenforschung (GSI) bombarded bismuth with chromium and they succeeded in making a single atom of isotope 262. Now followed a period of negotiation to establish who discovered elements 107 first and thereby had the right to name it.\n' +
			'\n' +
			'The International Union of Pure and Applied Chemistry (IUPAC) said that the GSI should be awarded the discovery because they had the more credible submission, but that the JINR were probably the first to make it.'
	},
	108: {
		ab : 'Hs',
		name : 'Hassium',
		mass : 270.134,
		abundance : 0,
		color : 'blue',
		value : 108,
		origin : 'The name is derived from the German state of Hesse where Hassium was first made. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present it is only used in research.\n',
		biological : 'Hassium has no known biological role.\n',
		natural : 'Hassium does not occur naturally and it will probably never be isolated in observable quantities. It is created by bombarding lead with iron atoms\n',
		imageText : 'The image is inspired by the coat of arms for the German state of Hesse, which gives the element its name.\n',
		history : 'There are 15 known isotopes of hassium with mass numbers 263 to 277, with isotope-276 having the longest half-life of 1.1 hour. The first attempt to synthesize element 108 took place in 1978 at Russia’s Joint Institute for Nuclear Research (JINR) in Dubna, where a team headed by Yuri Oganessian and Vladimir Utyonkov bombarded radium with calcium and got isotope 270. In 1983, they obtained other isotopes: by bombarding bismuth with manganese they got isotope 263, by bombarding californium with neon they got isotope 270, and by bombarding lead with iron they got isotope 264.\n' +
			'\n' +
			'In 1984, at Germany’s Gesellschaft für Schwerionenforschung (GSI) in Darmstadt, a team headed by Peter Armbruster and Gottfried Münzenberg bombarded lead with iron and synthesised isotope 265. Their data which was considered more reliable than that from JINR and so they were allowed to name the element which they did, basing it on Hesse, the state in which the GSI is located.'
	},
	109: {
		ab : 'Mt',
		name : 'Meitnerium',
		mass : 276.152,
		abundance : 0,
		color : 'blue',
		value : 109,
		origin : 'Meitnerium is named for the Austrian physicist Lise Meitner. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present it is only used in research.\n',
		biological : 'Meitnerium has no known biological role.\n',
		natural : 'Fewer than 10 atoms of meitnerium have ever been made, and it will probably never be isolated in observable quantities. It is made by bombarding bismuth with iron atoms.\n',
		imageText : 'This abstract image is inspired by magnified images of atomic particles.\n',
		history : 'There are 7 isotopes of meitnerium with mass numbers in the range 266 to 279. The longest lived is isotope 278 with a half-life of 8 seconds. Meitnerium was first made in 1982 at the German nuclear research facility, the Gesellschaft für Schwerionenforschung (GSI), by a group headed by Peter Armbruster and Gottfried Münzenberg. They bombarded a target of bismuth with accelerated iron ions. After a week, a single atom of element 109, isotope 266, was detected. This underwent radioactive decay after 5 milliseconds.'
	},
	110: {
		ab : 'Ds',
		name : 'Darmstadtium',
		mass : 281.165,
		abundance : 0,
		color : 'blue',
		value : 110,
		origin : 'Darmstadtium is named after Darmstadt, Germany, where the element was first produced. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'Darmstadtium has no known biological role.\n',
		natural : 'A man-made element of which only a few atoms have ever been created. It that is formed by fusing nickel and lead atoms in a heavy ion accelerator.\n',
		imageText : 'Darmstadtium is highly radioactive, so the image is based on an abstracted atomic model and trails of sub-atomic particles.\n',
		history : 'There are 15 known isotopes of darmstadtium, isotopes 267-281, and the heaviest is the longest-lived, with a half-life of 4 minutes.\n' +
			'\n' +
			'There were several attempts to make element 110 at the Joint Institute for Nuclear Research (JINR) at Dubna in Russia, and at the German Geselleschaft für Schwerionenforschung (GSI) at Darmstadt, but all were unsuccessful. Then Albert Ghiorso and his team at the Lawrence Berkeley National Laboratory (LBNL), California, obtained isotope 267 by bombarding bismuth with cobalt, but they could not confirm their findings.\n' +
			'\n' +
			'In 1994, a team headed by Yuri Oganessian and Vladimir Utyonkov at the JINR made isotope-273 by bombarding plutonium with sulfur. The same year, a team headed by Peter Armbruster and Gottfried Munzenberg at the GSI bombarded lead with nickel and synthesised isotope 269. The latter group’s evidence was deemed more reliable and confirmed by others around the world, so they were allowed to name element 110.'
	},
	111: {
		ab : 'Rg',
		name : 'Roentgenium',
		mass : 280.165,
		abundance : 0,
		color : 'blue',
		value : 111,
		origin : 'The name roentgenium (Rg) was proposed by the GSI team in honour of the German physicist Wilhelm Conrad Röntgen, and was accepted as a permanent name on November 1, 2004 \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'Roentgenium has no known biological role.\n',
		natural : 'A man-made element of which only a few atoms have ever been created. It is made by fusing nickel and bismuth atoms in a heavy ion accelerator.\n',
		imageText : 'Roentgenium is named after Wilhelm Conrad Röntgen, the discoverer of x-rays. The image is based on an early x-ray tube. The background design is inspired by x-ray astronomy and particle accelerators.\n',
		history : 'There are seven known isotopes of the element: 272, 274 and 278-282. The longest lived is isotope 281 which has a half-life of 22.8 seconds. In 1986, physicists at the Russian Joint Institute for Nuclear Research (JINR), bombarded bismuth with nickel hoping to make element 111, but they failed to detect any atoms of element 111. In 1994, a team led by Peter Armbruster and Gottfred Munzenberg at the German Geselleschaft für Schwerionenforschung (GSI), were successful when they bombarded bismuth with nickel and they obtained few atoms of isotope 272. It had a half-life of 1.5 milliseconds.'
	},
	112: {
		ab : 'Cn',
		name : 'Copernicium',
		mass : 285.177,
		abundance : 0,
		color : 'blue',
		value : 112,
		origin : 'Copernicium is named for the Renaissance scientist Nicolaus Copernicus \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made. It is thought to be unreactive and more like a noble gas than a metal.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Copernicium is a man-made element of which only a few atoms have ever been made. It is formed by fusing lead and zinc atoms in a heavy ion accelerator.\n',
		imageText : 'Although copernicium was only recently ‘discovered’, it is named after Nicolaus Copernicus, an influential 16th century astronomer. This image brings together a 17th century star chart, concentric rings inspired by the solar system, a silvery metallic form, and the ground plan of the heavy ion accelerator where the element was first created.\n',
		history : 'The first atoms of element 112 were announced by Sigurd Hofmann and produced at the Gesellschaft fur Schwerionenforschung (GSI) at Darmstadt, Germany, in 1996. Isotope-277 had been produced by bombarding lead for two weeks with zinc travelling at 30,000 km per second. Isotope-277 had a half-life of 0.24 milliseconds.\n' +
			'\n' +
			'Since then, other isotopes of copernicium have been made. Isotope-285 was observed as part of the decay sequence of flerovium (element 114) produced at the Joint Institute for Nuclear Research (JINR) at Dubna, Russia, as was isotope-284 which was observed as part of the decay sequence of livermorium (element 116).'
	},
	113: {
		ab : 'Nh',
		name : 'Nihonium',
		mass : 284.179,
		masses : [
			[286.182]
		],
		abundance : 0,
		color : 'lime',
		value : 113,
		origin : 'The name refers to the Japanese name for Japan. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Unknown\n',
		imageText : 'The image reflects the naming of the element and uses the traditional Japanese kanji characters ‘ni’ and ‘hon’ that make up Japan\'s name meaning ‘sun origin’. The image also features the sun emblem from the Japanese flag and various schematics representing particle accelerator structure.\n',
		history : 'IUPAC confirmed the discovery (by scientists from RIKEN (The Institute of Physical and Chemical Research) in Japan) in 2015. This entry will be updated when more information is available.\n'
	},
	114: {
		ab : 'Fl',
		name : 'Flerovium',
		mass : 289.190,
		abundance : 0,
		color : 'purple',
		value : 114,
		origin : 'Named after the Russian physicist Georgy Flerov who founded the Joint Institute for Nuclear Research where the element was discovered. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Flerovium can be formed in nuclear reactors.\n',
		imageText : 'The image features an abstracted form inspired by the colonnade of the Joint Institute for Nuclear Research (JINR), where the element was discovered. The two main colours represent the creation of the element from calcium and plutonium. The background features abstracted particle trails and sections from the ground plan of the accelerator at JINR.\n',
		history : 'There are four known isotopes of flerovium with mass numbers 286-289. The longest-lived is 289 and it has a half-life of 2.6 seconds. Nuclear theory suggests that isotope 298, with 184 neutrons, should be much more stable but that has yet to be made.\n' +
			'\n' +
			'Despite several attempts to make element 114, it was only in 1998 that a team led by Yuri Oganessian and Vladimir Utyonkov at the Joint Institute for Nuclear Research (JINR) in Russia produced it by bombarding plutonium with calcium. It needed 5 billion billion (5 x 1018) atoms of calcium to be fired at the target to produce a single atom of flerovium, in an experiment lasting 40 days. A few more two atoms were produced the following year.'
	},
	115: {
		ab : 'Mc',
		name : 'Moscovium',
		mass : 288.193,
		masses : [
			[289.194]
		],
		abundance : 0,
		color : 'grey',
		value : 115,
		origin : 'The name refers to the Moscow region, where the Joint Institute of Nuclear Research is based. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Unknown',
		imageText : 'The image reflects the naming of the element in that it employs abstracted details of traditional architecture from the Moscow region featuring both onion dome forms and other architectural features. The image also features abstracted particle trails.\n',
		history : 'IUPAC confirmed the discovery (by scientists from the Joint Institute for Nuclear Research in Dubna, Russia, the Lawrence Livermore National Laboratory in California, USA, and Oak Ridge National Laboratory in Tennessee, USA) in 2015. This entry will be updated when more information is available.'
	},
	116: {
		ab : 'Lv',
		name : 'Livermorium',
		mass : 293,
		abundance : 0,
		color : 'orange',
		value : 116,
		origin : 'Named after the Lawrence Livermore National Laboratory. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Livermorium does not occur naturally. It is made by bombarding curium atoms with calcium. The most stable isotope has a half-life of about 53 milliseconds.\n',
		imageText : 'The image features an abstract form inspired by images from NIF Target Chamber at the Lawrence Livermore National Laboratory. The two colours in the image represent the two elements that collide to form livermorium – calcium and curium.\n',
		history : 'Four isotopes of this element have been produced and they have mass numbers 290-293. The longest-lived is 293 with a half-life of 61 milliseconds.\n' +
			'\n' +
			'There were several attempts to make element 116 but all were unsuccessful until 2000 when researchers at the Joint International Nuclear Research (JINR) in Russia, led by Yuri Oganessian, Vladimir Utyonkov, and Kenton Moody observed it. Because the discovery was made using essential target material supplied by the Lawrence Livermore National Laboratory (LLNL) in the USA, it was decided to name it after that facility.\n' +
			'\n' +
			'In1999, the Lawrence Berkeley National Laboratory in California had announced the discovery of element 116 but then it was discovered that evidence had simply been concocted by one of their scientists, and so the claim had to be withdrawn.'
	},
	117: {
		ab : 'Ts',
		name : 'Tennessine',
		mass : 292.207,
		masses : [
			[294.210]
		],
		abundance : 0,
		color : 'tangerine',
		value : 117,
		origin : 'The name refers to the US state of Tennessee. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Unknown\n',
		imageText : 'The image reflects the naming of the element in that it employs an abstracted version of the Tennessee state flag which features three white stars on a blue and red background. The image also features abstracted particle trails and various graphics representing particle accelerator structure.\n',
		history : 'IUPAC confirmed the discovery (by scientists from the Joint Institute for Nuclear Research in Dubna, Russia, the Lawrence Livermore National Laboratory in California, USA, and Oak Ridge National Laboratory in Tennessee, USA) in 2015. This entry will be updated when more information is available.\n'
	},
	118: {
		ab : 'Og',
		name : 'Oganesson',
		mass : 294.214,
		abundance : 0,
		color : 'yellow',
		value : 118,
		origin : 'The name recognises the Russian nuclear physicist Yuri Oganessian for his contributions to transactinide element research. \n',
		appearance : 'A highly radioactive metal, of which only a few atoms have ever been made.\n',
		uses : 'At present, it is only used in research.\n',
		biological : 'It has no known biological role.\n',
		natural : 'Unknown\n',
		imageText : 'The image reflects the naming of the element after scientist Yuri Oganessian who is considered the world\'s leading researcher in superheavy elements and islands of stability. The image features a graphic interpretation of the island of stability based on a 3D graphic of nuclear shell structure which also features in the image.\n',
		history : 'IUPAC confirmed the discovery (by scientists from the Joint Institute for Nuclear Research in Dubna, Russia, and the Lawrence Livermore National Laboratory in California, USA) in 2015. This entry will be updated when more information is available.\n'
	}
};
