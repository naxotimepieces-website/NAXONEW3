"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════
// SHARED: Brand, Data, Components
// ═══════════════════════════════════════════

const BRAND = {
  navy: "#1a2744", gold: "#c9a84c", cream: "#f5f0e8",
  warmWhite: "#faf8f4", charcoal: "#2a2a2a", stone: "#8a8172", deepNavy: "#0f1a30",
};

const WATCHES = [
  {id: 157, brand: "Omega", model: "De Ville Floral Dial Ref. 111.0107", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "29mm", case_material: "Stainless Steel", dial: "Silver Floral", strap: "Grey Leather", tag: "", desc: "For sale is an Omega De Ville “Engraved Dial” Ref. 111.0107 floral dial.\n\nAmazing beauty this is, with a silver floral textured dial paired with black roman numerals and leaf hands.\n\nDefinitely a piece that’s perfectly suited as a daily casual piece as well for those who can’t help just being naturally stylish.\n\nManual winding movement.", img: "/watch-157-omega-deville-floral.jpeg", sold: false},
  {id: 158, brand: "Seiko", model: "Exceline Rectangular Roman", era: "1980s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Leather", tag: "", desc: "For sale is a vintage Seiko Exceline.\n\nJust look at the design on the case shape, so elegantly paired with the blue hands and numerals. Especially that subtle design in the middle of the dial. Just perfect\n\nQuartz movement.", img: "/watch-158-seiko-exceline.jpeg", sold: false},
  {id: 159, brand: "Seiko", model: "Quartz Tank Gold Roman", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "White Roman", strap: "Brown Leather", tag: "", desc: "For sale is a vintage Seiko tank.\n\nA piece that’s very sought after because of its shape and size, it brings similarity to a Cartier tank, but for 1/10th of the price!\n\nUnder the Seiko line there has been many different versions of a tank style but for this design, I feel the shape really does bring out the vibe of the tank. From the cabochon crown, to the case shape having the curves at the sides. Just so\n\nQuartz movement.", img: "/watch-159-seiko-quartz-tank.jpeg", sold: false},
  {id: 160, brand: "Seiko", model: "Dolce Octagonal Art Deco 10K Gold", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "10K Gold Capped", dial: "Black & Gold", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Seiko Dolce “Art Deco” 10K Gold.\n\nQuite a unique piece, different from the other dolce design. The case is 10K gold-capped.\n\nThe dial is definitely the star of the show, with a subtle floral embossed pattern and around it, it has a brushed golden ring for the roman numerals and minute track, topped with golden Breguet hands.\n\nDefinitely a piece not to be missed!\n\nQuartz movement.", img: "/watch-160-seiko-dolce-octagonal.jpeg", sold: false},
  {id: 161, brand: "Omega", model: "De Ville Ellipse Waffle Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "Gold Waffle", strap: "Black Leather", tag: "", desc: "For sale is an Omega De Ville ellipse shaped.\n\nThis is a very clean watch, with a rare waffle looking dial. Its shape has the vibe of the Ellipse which became one of most defining watches of the Patek line up.\n\nAn interesting feature is that there’s no crown to it, which really makes it very sleek looking.\n\nQuartz movement.\nOriginal bracelet.", img: "/watch-161-omega-deville-ellipse.jpeg", sold: false},
  {id: 162, brand: "Universal Genève", model: "Tonneau Gradient Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Brown Fumé", strap: "Black Leather", tag: "", desc: "For sale is a Universal Genève piece.\n\nLovely Fumé Dial in Dark Brown, which was the first thing that caught my attention already. This piece was made in the 70s which uses the Caliber: Universal Genève 1-42.\n\nThe dial at the 11 o’clock has some dirt on it. Scratches visible on the watch.\n\nManual winding movement.", img: "/watch-162-ug-tonneau-fume.jpeg", sold: false},
  {id: 163, brand: "Omega", model: "De Ville Red Vignette Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Red Vignette", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a vintage Omega De Ville red vignette dial.\n\nSomething very similar to the Rolex Cellini, but for one tenth of the price!\nIts condition is quite clean, and it’s a manual winding piece, lastly that red vignette dial which fades to black is striking.", img: "/watch-163-omega-deville-red-vignette.jpeg", sold: false},
  {id: 164, brand: "Omega", model: "De Ville Gold Champagne Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Champagne", strap: "Black Leather", tag: "", desc: "For sale is a vintage Omega De Ville.\n\nWhat more can I say for this piece here, simple, clean and classic. Champagne coloured dial, in very minty condition for its age..\n\nManual winding.", img: "/watch-164-omega-deville-champagne.jpeg", sold: false},
  {id: 165, brand: "Universal Genève", model: "Altesse Extra-Plat Starry Night", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "30mm", case_material: "Stainless Steel", dial: "Blue Starry Night", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Universal Genève “Altesse Extra-Plat” starry night.\n\nA piece I was super happy to pick up! An extra-plat (French for ultra-thin) version and to top it off, the dial, beautifully looking like a “starry night” lacquer dial.\n\nThe whole piece is unpolished, comes with the original strap and buckle tool!\n\nManual winding movement.", img: "/watch-165-ug-altesse-starry.jpeg", sold: false},
  {id: 166, brand: "Seiko", model: "Dolce Gold Roman Marble Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "30mm", case_material: "Gold Plated", dial: "Cream Roman", strap: "Taupe Leather", tag: "", desc: "For sale is a Seiko Dolce black marble.\n\nInsane condition here, I would say it’s as close as it can get to a NOS piece. unpolished condition with the original blue sticker case back still intact.\n\nThe dial is so captivating under lighting and paired with the Roman numerals. This is a marble-dial Dolce with gold roman numerals, It comes with a micro ribbon-esque bezel design, giving that lil rugged feel to the watch.\n\nA piece here is not to be missed!\n\nQuartz movement.", img: "/watch-166-seiko-dolce-gold-roman.jpeg", sold: false},
  {id: 167, brand: "Longines", model: "Square Silver Dial Roman", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver Roman", strap: "Black Leather", tag: "", desc: "For sale is a vintage Longines flat square.\n\nIs a simple piece, which makes it easy to wear it on a daily basis. With Roman numeral marking at the 12 3 6 9 o clock. Uses a manual winding movement.", img: "/watch-167-longines-square.jpeg", sold: false},
  {id: 168, brand: "Seiko", model: "Quartz Oval Gold Grey Dial", era: "1980s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "Grey Roman", strap: "Black Leather", tag: "", desc: "For sale is a sought after, oval shaped Seiko piece!\n\nThis piece here can be worn or stacked with any tennis bracelet etc. Definitely can be worn by a female or even a male wrist!\n\nThe shape of the oval-ish and the gold coloured case matches well with the Roman numerals.\n\nQuartz movement.", img: "/watch-168-seiko-oval-gold-grey.jpeg", sold: false},
  {id: 169, brand: "Seiko", model: "Dolce Arabic White Marble Dial", era: "1980s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "30mm", case_material: "Stainless Steel", dial: "White Marble", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Seiko Dolce white marble.\n\nThis is one of the nicest combo I have ever seen Seiko did. The white stone marble, paired so well with the blue hands and numerals. These numerals also pop up, as they weren’t printed on to the dial itself.\n\nQuartz movement.", img: "/watch-169-seiko-dolce-white-marble.jpeg", sold: false},
  {id: 170, brand: "Seiko", model: "Acier Octagonal Pair", era: "1980s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "White & Blue Textured", strap: "Brown Croc-Embossed Leather", tag: "", desc: "For sale is a Seiko Acier.\n\nIt comes in 2 different colour variants. One of the them is the clean white dial while the other one is a blue textured dial.\n\nThese pieces were made under the acier collection, a collection that was produced for 2 years and also was in the Seiko catalog, after the 2 years it was combined and moved over to the Credor line up.\n\nThe case shape also features a very interesting a sort of a stepped case at the sides, making it quite a simple and clean watch that can be worn with any outfit.\n\nQuartz movement.", img: "/watch-170-seiko-acier-pair.jpeg", sold: false},
  {id: 171, brand: "Omega", model: "De Ville ‘Emerald’ Andrew Grima", era: "1970s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Brown Linen", strap: "Taupe Leather", tag: "", desc: "For sale is an Omega De Ville ‘Emerald’ Andrew Grima.\n\nIt all began in 1969, Omega commissioned London-based artist jeweler Andrew Grima to design a collection of watches, About Time.\n\nThe original collection was a huge success and later in the 70s Omega launched a range of watches inspired by Grima’s work. Under the series of watches they were more affordable and marketed through the De Ville, Constellation and Jeux d’Or ranges.\n\nThis watch is an Omega De Ville ‘Emerald’ so called for the shape of the Gem cut Rock Crystal. The dial is textured linen dial.\n\nManual winding.", img: "/watch-171-omega-deville-emerald.jpeg", sold: false},
  {id: 146, brand: "Universal Genève", model: "Automatic Date Gold Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "34mm", case_material: "Gold Plated", dial: "", strap: "", tag: "", desc: "A piece of beauty.\n\nThis is an UG model that was one of the last few pieces produced before the whole brand was discontinued.\n\nThere were about 1000 pieces that were produced and came onto the market, but today very few appear and it was our pleasure to come across it, I knew we had to bring it home immediately!\n\nThis piece to me the beauty is at the back, where it features a stunning micro rotor, with an open case-back for you to view it!", img: "/watch-146-ug-automatic-date-gold.jpeg", sold: false},
  {id: 147, brand: "Omega", model: "Square Honeycomb Dial Gold", era: "1950s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Filled", dial: "Waffle", strap: "", tag: "", desc: "For sale is this rare configuration Omega cioccolatone!\n\nA rare and highly collectible Omega “Cioccolatone” from the early 1950s, featuring the bold “Grand Tank Carre” which basically is an oversized square case.\n\nThe dial itself is a rare waffle dial with a sub seconds at the bottom. What makes this piece quite uncommon is that usually for this model it was always made in 14/18k solid gold, but for this particular piece it was instead crafted via 14k gold filled! Watch comes with an original omega buckle too.", img: "/watch-147-omega-cioccolatone.jpeg", sold: false},
  {id: 148, brand: "Seiko", model: "Two-Tone Small Seconds Arabic", era: "1987", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Steel & Gold", dial: "Arabic", strap: "", tag: "", desc: "A piece that is understated on the wrist but unforgettable in the books of Seiko history!\n\nIt was a significant revelation for collectors when they discovered Seiko’s brief dabble into using Swiss movements for the “Mech” collection (MC) in the 1980s.\n\nFeatured in the 1987 JDM catalog, the MC series was crafted for those with an appreciation for the intricate charm of mechanical watches.\n\nThis piece here was both giving vintage vibes while having a minimalist dial layout with sub-seconds positioned just above the 6 o’clock mark.\n\nThe heart of this watch is the Swiss calibre 138.001 from Fabrique d’horlogerie de Fontainemelon (FHF), a surprising yet captivating choice that adds to its allure.", img: "/watch-148-seiko-mc-small-seconds.jpeg", sold: false},
  {id: 149, brand: "Omega", model: "De Ville Rectangular Roman", era: "1973", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "", dial: "Roman", strap: "", tag: "", desc: "For sale is this vintage Omega De Ville.\n\nThis is such a lovely looking piece dating it back to 1973 where the tank shape are curves and boxy too. What’s even better is that the case is unpolished, how crazy is that!\n\nComes with an original omega buckle.", img: "/watch-149-omega-deville-rectangular.jpeg", sold: false},
  {id: 150, brand: "Omega", model: "Speedmaster Ladies Mother-of-Pearl Orange", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "", dial: "Mother-of-Pearl, Orange Markers", strap: "", tag: "", desc: "A recently sold Omega Speedmaster, didn’t even have time to post it yet and it was snap up at the pop up event!\n\nComes with a beautiful mother of pearl dial and paired with orange hour markers.", img: "/watch-150-omega-speedmaster-ladies-mop.jpeg", sold: true},
  {id: 151, brand: "Universal Genève", model: "Pink Salmon Dial Gold Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Salmon Pink", strap: "Pink Leather", tag: "", desc: "For sale is this Universal Genève on a rare salmon Dial!\n\nAmazing slim C-shape case profile with that curves on the sides. The gold case paired so well with that insanely rare salmon dial. Thin case profile if you are looking for something that can hide under the sleeves.\n\nI added the pink strap so that it matches perfectly with the overall colour contrast.", img: "/watch-151-ug-salmon-gold.jpeg", sold: false},
  {id: 152, brand: "Omega", model: "Constellation Automatic Chronometer Date", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "35mm", case_material: "", dial: "", strap: "", tag: "", desc: "This is a piece, many of you have been asking us to bring in, so here it is finally!\n\nThe Constellation is an exclusive line of Omega watches with a dressy design and a high-precision movement.\n\nThe collection is designed more like a dress watch.\n\nIt is a classic vintage Omega watch, along with the Seamaster, and is particularly famous for its case shape, known as the C-line case.", img: "/watch-152-omega-constellation-date.jpeg", sold: false},
  {id: 153, brand: "Omega", model: "Seamaster Black Gilt Dial Small Seconds", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "33mm", case_material: "", dial: "Black Gilt", strap: "", tag: "", desc: "This is an amazing vintage Omega Seamaster. It really does have that beautiful gilt dial making it extremely sexy looking.\n\nWith a sub seconds at the 6 o clock mark, the indices have that patina colour on it. The dial also has that black textured finish on it, Arabic indexes are distributed at 12, 3, and 9 o’clock, which emphasizes the classic vintage impression in combination with the dolphin hand.", img: "/watch-153-omega-seamaster-gilt.jpeg", sold: false},
  {id: 154, brand: "Rolex", model: "Day-Date Diamond Dial President Ref. 18038", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Cal. 3055", case_size: "36mm", case_material: "18k Yellow Gold", dial: "Champagne, Diamond Markers", strap: "President Bracelet", tag: "", desc: "For sale is a Rolex Day Date with factory diamonds ref 18038!\n\nThe 18038 model represented a step forward in watchmaking technology, introducing the Caliber 3055 movement. This new caliber brought the much-appreciated quickset date feature to the Day-Date line, allowing for easier adjustment of the date display.\n\nIn general the day date piece aka the president watch was seen on the wrists of world leaders, businessmen, and cultural icons. Its presence in boardrooms and on red carpets alike further cemented its reputation as the “President’s Watch” among luxury timepieces.\n\nThere are many dial options in the market, but I chose this piece because of the beautiful champagne dial that matches perfectly with the factory diamonds ref, especially those 2 lil baguettes that sit on the 6 and 9 o clock\n\nAvailable now.\n\nComes with Rolex service card.", img: "/watch-154-rolex-day-date-18038.jpeg", sold: true},
  {id: 155, brand: "Shellman", model: "World Time Minute Repeater Cloisonné", era: "1990s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz Minute Repeater", case_size: "37mm", case_material: "Stainless Steel", dial: "Cloisonné Enamel", strap: "", tag: "Rare Find", desc: "Finally I got my hands on this! The best value for money - to have a combo of a worldtimer, minute repeater and cloisonné enamel dial, where can I find another?\n\nShellman Co., Ltd, was established in 1971 in Tokyo, Japan.\nBeing a leading dealer for vintage watches such as Patek Philippe.\n\nIn 1996 they launch their own brand of watches with quartz movement to give an opportunity to enjoy complicated functions as a minute repeater.\n\nWith a 37mm stainless steel case, this model is very easy to wear. The proportions are perfect.\n\nWhat’s special about this watch is definitely the cloisonné enamel dial, which is something you’ll see only in much higher end watches, thus making it very value for money! It’s super pretty in person and you can see the skills from the Japanese artist. For those who know to make this dial is definitely not an easy process, as it breaks easily.\n\nThe blue version is part of the first series released in 2002 made in a limited edition of 999 pieces. This variant is in permanent exhibition at the International Watch Museum in La Chaux-de-Fonds, Switzerland.\n\nFull set, box and papers and manual.", img: "/watch-155-shellman-world-time-cloisonne.jpeg", sold: true},
  {id: 156, brand: "Omega", model: "Genève Automatic Date Gold", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Gold Plated", dial: "", strap: "", tag: "", desc: "For sale is a vintage ladies Omega Geneve.\n\nThe gold plating over the bezel has oxidised over time and given it a slight change in colour, which I feel it’s quite a nice match to the vibe of the watch.\n\nAutomatic movement.", img: "/watch-156-omega-geneve-gold.jpeg", sold: false},
  {id: 138, brand: "Ebel", model: "Red Dial Diamond Bezel Ref. 1567", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "", case_size: "", case_material: "18k Gold", dial: "Red Vignette, Diamond Markers", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Ebel ref 1567 in 18k gold.\n\nWith the recent news of Ebel being acquired by Chanel and FPJ , it definitely has made people more aware of the brand and are more interested in buying Ebel pieces with the bet that it will rise with value over time!\n\nOver here we have a factory set bezel and dial. Just look at that vignette red dial with the factory diamonds on it, at a fraction of how much a Cellini would cost you!\n\nCased in 18k solid gold , the case is kept in an unpolished condition with the original strap still intact.", img: "/watch-138-ebel-red-diamond.jpeg", sold: false},
  {id: 137, brand: "Cartier", model: "Tank Louis 18K YG", era: "1960s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "18k Yellow Gold", dial: "White Roman", strap: "Olive Grey Leather", tag: "", desc: "For sale is a Vintage Cartier Tank Louis from the 60s.\n\nThe dial, signed PARIS at 6 o’clock, is in amazing condition. The later on Cartier Louis watches produced afterwards read ‘SWISS’. This is important, as watches that pre-date the 1972 Cartier buy-out made the Paris dial more collectible.\n\nThis classic looking Cartier Tank Louis has all the hallmarks of the brand, which include the white dial with black Roman numerals, no hidden signature, and railroad track.\n\nCased in 18k yellow gold.", img: "/watch-137-cartier-tank-louis-paris.jpeg", sold: false},
  {id: 140, brand: "Universal Genève", model: "White Shadow Date Gay Frères Bracelet", era: "1960s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Cream Roman", strap: "Gay Frères Bracelet", tag: "", desc: "For sale is a Vintage Universal Geneve white shadow with Gay Frères bracelet!\n\nDuring the late 60s , Gérald Genta designed this particular piece ref 866101. Which features the iconic C case shape.\n\nInside has UG’s own in-house 2-66 micro-rotor calibre, one of the slimmest automatic movements ever produced during that period of time!\n\nHeld together was a bracelet by Gay Frères. The house behind the bracelets of Rolex, Patek and AP.", img: "/watch-140-ug-white-shadow-date.jpeg", sold: false},
  {id: 141, brand: "Cartier", model: "Panthère Steel Date Ref. 1300", era: "1980s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Steel Bracelet", tag: "", desc: "For sale is a Vintage Cartier Panthère  ref 1300 in the “jumbo” size.\n\nRoman numerals, blued hands, and that unmistakable design all from the 80s! Definitely a classic that suit both men and ladies.\n\nQuartz movement.", img: "/watch-141-cartier-panthere.jpeg", sold: false},
  {id: 136, brand: "Universal Genève", model: "Tank Allongee", era: "1960s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black Roman", strap: "Black Lizard-Embossed Leather", tag: "Rare Find", desc: "For sale is a Rare Vintage Universal Geneve “tank allongee”\n\nThis is a piece that you definitely don’t see often. It’s a tank but yet its size is being stretched out, where the word allongee comes in. A French word with a translation to long and narrow, elongated.\n\nThis piece goes all the way back to the 60s and the dial is well preserved with an unpolished case.\n\nDefinitely not a piece to miss out on!\n\nManual winding.", img: "/watch-136-ug-tank-allongee.jpeg", sold: false},
  {id: 135, brand: "Seiko", model: "Wooden Octagonal Case Roman", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "32mm", case_material: "Wood & Gold Tone", dial: "Wood Roman", strap: "Brown Leather", tag: "Rare Find", desc: "A piece you definitely have not seen before!\n\nThe complete watch is made up of wood material. Only a handful of them exist till date which made this piece a hard to come by watch!\n\nThe case, also made of wood, is shaped in an octagonal shape which made it have a decent amount of wrist presence sitting on it.", img: "/watch-135-seiko-wood-octagon.jpeg", sold: false},
  {id: 131, brand: "Favre-Leuba", model: "Malachite Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Malachite Green", strap: "Green Leather", tag: "Rare Find", desc: "Something you definitely don’t see very often!\n\nFor sale is a Vintage Favre Leuba with a printed on Malachite dial! For a fraction of how much a real stone dial will cost , this piece is definitely a good alternative.\n\nWith a coin edge bezel around it , in very mint condition , this piece is also manual winding.", img: "/watch-131-favre-leuba-malachite.jpeg", sold: false},
  {id: 142, brand: "Favre-Leuba", model: "Daymatic Gold", era: "1958", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Gold Plated", dial: "Gold Brushed", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Favre Leuba.\n\nIt has a c case shape with feature a date marker.\nThe Daymatic line was launched in 1958 with bigger size variants releasing later on.\n\nSomething cool about this piece is that it is serial number 1 , making it the first piece out of the factory!", img: "/watch-142-favre-leuba-daymatic.jpeg", sold: false},
  {id: 143, brand: "Universal Genève", model: "Oval Black Ribbed", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black Ribbed", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Universal Geneve from the 70s.\n\nBeautifully shaped cased with that architectural touch around it. A striped dial which has patina across the dial which matches perfectly with the colour of the case.\n\nSomething that’s uncommon , and definitely shouldn’t be missed out on!\n\nManual winding.", img: "/watch-143-ug-oval-ribbed.jpeg", sold: false},
  {id: 144, brand: "Union", model: "Soleure Melted Case", era: "1960s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Grey Brushed", strap: "Brown Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Union Soleure watch from the 60s.\n\nThis was a brand from Germany which did not survive the quartz crisis and later on was absorbed by Longines. They made quite nice looking chronographs movements but here we have is something equally as beautiful!\n\nA very unique looking case shape with wavy lines around it. The dial itself has a grey tone with a brushed finished on it and have been untouched for years.\n\nComes with the original tag!\n\nManual winding.", img: "/watch-144-union-soleure.jpeg", sold: false},
  {id: 145, brand: "Seiko Credor", model: "6020-5450", era: "1980s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Steel & Gold", dial: "Champagne", strap: "Two-Tone Bracelet", tag: "", desc: "Rare Credor with Original Bracelet", img: "/watch-145-credor-6020-5450.jpeg", sold: false},
  {id: 139, brand: "Favre-Leuba", model: "Blue Vignette Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Blue Vignette", strap: "Blue Croc-Embossed Leather", tag: "", desc: "For sale is an interesting Blue Vignette dial on a Favre Leuba.\n\nSomething different from your everyday watch , yet a classy piece to wear for any occasion. It is matched with a wonderful blue strap. And of course, a manual winding piece!", img: "/watch-139-favre-leuba-blue-vignette.jpeg", sold: false},
  {id: 132, brand: "Seiko", model: "Vintage \"S\" Snake Logo", era: "1950s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Cream Patina", strap: "Black Leather", tag: "", desc: "For sale is a Classic Vintage Seiko watch from the 50s.\n\nWith its patina dial , it becomes slightly yellow and cream looking. The top of the dial has the Seiko logo , but not any logo , it is the snake S, which have been quite popular. These pieces back then were only sold in the Japanese domestic market.\n\nManual winding.", img: "/watch-132-seiko-snake-s.jpeg", sold: false},
  {id: 130, brand: "Waltham", model: "17 Jewels Fluted Bezel", era: "1960s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Waltham in ladies sizing.\n\nSmall but perfect for everyday use. Has the 12 3 6 9 numerals on the dial with a T Swiss T at the bottom , indicating that it was once filled with tritium on the lume plots.\n\nManual winding.", img: "/watch-130-waltham-ladies.jpeg", sold: false},
  {id: 133, brand: "Gallet", model: "Tortoiseshell Dial Gold Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Tortoiseshell", strap: "Black Leather", tag: "", desc: "A Gallet with a tortoiseshell dial and small seconds subdial.", img: "/watch-133-gallet-tortoise-gold.jpeg", sold: false},
  {id: 134, brand: "Gallet", model: "Tortoiseshell Dial Steel Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black Tortoiseshell", strap: "Black Leather", tag: "", desc: "A Gallet with a tortoiseshell dial and small seconds subdial.", img: "/watch-134-gallet-tortoise-steel.jpeg", sold: false},
  {id: 119, brand: "Seiko", model: "Diver 6105 Automatic", era: "", price: 0, priceRange: "", style: "Diver", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Black", strap: "Black Rubber", tag: "", desc: "For sale is a Vintage Seiko Ref 6105-8000 in the slim diver case.\n\nThis is a second series version. The 6105 earned its reputation in the field during the Vietnam War, for its build quality, reliability, and ability to survive extreme heat, humidity, and constant exposure to the elements.\n\nWith the Seiko 6105-8000, you have the true successor to the 62MAS and a piece that set the design language for the brand’s other diver watches.\n\nWatch only.", img: "/watch-119-seiko-6105-diver.jpeg", sold: false},
  {id: 114, brand: "Seiko", model: "Asterisk Yukisaburo Watanabe", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold & Steel", dial: "White Roman", strap: "Black Croc-Embossed Leather", tag: "Rare Find", desc: "For sale is a Seiko Asterisk. Everyone knows the other version where there’s a lid that can flip open but here’s another one that people don’t really see often too!\n\nProduction for the asterisk models were for 3 years only , as it was an collab between Seiko and the artist, Yukisaburo Watanabe.\n\nDefinitely a unique piece that you wouldn’t bump into someone on the streets while wearing the same watch. Reminiscent of the iconic Jaeger-LeCoultre Reverso, which boast a reversible design. What I would call it , my lil fidget spinner\n\nComes with the original strap and deployment clasp! Something even rarer than the watch itself.", img: "/watch-114-seiko-asterisk.jpeg", sold: false},
  {id: 116, brand: "Universal Genève", model: "Triple Calendar Moonphase", era: "1940s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Champagne", strap: "Navy Croc-Embossed Leather", tag: "Rare Find", desc: "For sale is a Rare Vintage Universal Geneve Triple calendar!\n\nThe brand that is coming back alive , Universal Genève. One of the great names that understood complications. This piece dating back to the late 40s and early 50s.\n\nThe moon phase sits low end on the dial, a celestial anchor beneath the main time. A moon phase + triple calendar + day/date function - what more can you ask!\n\nSuper value for money piece.\n\nGold plated.", img: "/watch-116-ug-triple-calendar.jpeg", sold: false},
  {id: 120, brand: "Cartier", model: "Tank Solo Pink Ref. 3170", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Stainless Steel", dial: "Pink Sunburst Roman", strap: "Pink Croc-Embossed Leather", tag: "", desc: "For sale is a Cartier Tank Solo Pink ref 3170.\n\nThe Tank is one of the most recognizable designs with its rectangular case and its classic black and white Roman numeral dial , this one here is different! It’s all about that pink sunburst\n\nThe reference may be modern, but a less frequently encountered dial gives a completely different level of character to the watch.\n\nComes with the original pink Cartier strap and deployment clasp!\n\nThis piece comes with the original papers and booklet with the CD.", img: "/watch-120-cartier-tank-solo-pink.jpeg", sold: false},
  {id: 123, brand: "Cartier", model: "Tank Basculante Ref. 2405", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Stainless Steel", dial: "Grey Textured Arabic", strap: "Blue Croc-Embossed Leather", tag: "", desc: "For sale is a Cartier Tank Basculante Ref 2405.\n\nA hidden gem , where you definitely can play hide and seek with! A tank concept with Cartier takes on a reverso.\n\nRef. 2405 is a later production model featuring a rarer grey textured dial. This is also a larger case size version.\n\nComes with the Cartier service papers and stickers still intact with the pouch along with it.", img: "/watch-123-cartier-tank-basculante.jpeg", sold: false},
  {id: 124, brand: "Tiffany & Co.", model: "Mark Coupe Small Seconds", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "Silver White Roman", strap: "Beige Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Tiffany & Co. Mark Coupe in its small size!\n\nWith the recent hype coming from Daniel Roth pieces, here’s a piece which has a similar design concept from it but with a fraction of the price of a DR.\n\nThe iconic double-ellipse cases is definitely a stunning one on the wrist. This version here is the smaller size one.\n\nIt comes with the original Tiffany strap and buckle!", img: "/watch-124-tiffany-mark-coupe.jpeg", sold: false},
  {id: 125, brand: "IWC", model: "Schaffhausen Automatic Date Ref. R814A", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "35mm", case_material: "Stainless Steel", dial: "Silver Sunburst", strap: "Black Leather", tag: "", desc: "For sale is a Vintage IWC from the 70s ref R814A.\n\nSomething a little different from what we usually bring in an IWC R814A with a lovely cushion-shaped case. With a silver white sunburst dial on it.\n\nSize at 35mm the cushion case gives a slightly bigger presence on the wrist.\n\nIf yall like more IWC pieces do let us know, as the first one we had sold quite fast and I may bring in more!", img: "/watch-125-iwc-r814a.jpeg", sold: false},
  {id: 112, brand: "Seiko", model: "Marvel Zodiac Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Cream Zodiac", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Seiko Marvel Zodiac Watch.\n\nThe Seiko marvel line was launch by Seiko at the Suwa factory. Seiko’s first mechanical watch designed completely in-house from scratch, marking the true beginning of modern Japanese watchmaking.\n\nThis dial is what made this watch rarer than the other piece in the marvel line up. Featuring the 12 zodiacs , all around the dial outermost. This dial design was made only for a short production span.\n\nAnd one other thing I like from this era of watches , the S logo is actually the snake version, quite a cool looking design that you have to take a closer look to see.\n\nManual winding.", img: "/watch-112-seiko-marvel-zodiac.jpeg", sold: false},
  {id: 113, brand: "Zenith", model: "Gold Textured Guilloché Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "", case_size: "", case_material: "Gold Plated", dial: "Champagne Guilloché", strap: "Brown Lizard-Embossed Leather", tag: "", desc: "For sale is a rare vintage Zenith from the 50s.\n\nSomething interesting about this piece was that this was a French Zenith and the dial was made from the Besancon factory. Zenith in Besançon closed its doors in the middle of the 1970’s. It made wristwatches and pocket watches.\n\nZenith permitted the brand wider and freer distribution in the french market as it was not subject to customs quotas.\n\nJust look at the dial , so well preserved and the inner circle has a beautiful guilloché dial design.", img: "/watch-113-zenith-guilloche.jpeg", sold: false},
  {id: 110, brand: "Ulysse Nardin", model: "Baignoire Case Grey Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Grey Brushed", strap: "Black Leather", tag: "", desc: "A piece that you definitely don’t see often!\n\nThis is a Vintage Ulysse Nardin baignoire case shape. Smooth curves and a grey brushed dial , paired with the Roman numeral index at the top and bottom.\n\nWhat more can we ask from this classic brand in that elegant shape\n\nManual winding.", img: "/watch-110-ulysse-nardin-baignoire.jpeg", sold: false},
  {id: 111, brand: "Longines", model: "Tank \"Chocolate Bar\"", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "28mm", case_material: "Gold Plated", dial: "White Roman", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Longines Tank “chocolate bar”\n\nWhy I say chocolate bar , just look at the case.  Not your ordinary tank case , but instead with nice smooth curves in a case size looking like a chocolate bar.\n\nClassic style, where there’s a white coloured dial with Roman numerals, inner minutes’ rail track.\n\nManual winding.", img: "/watch-111-longines-chocolate-bar.jpeg", sold: false},
  {id: 121, brand: "Cartier", model: "Must de Cartier Vendôme Ronde", era: "1980s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Gold Plated", dial: "Cream Arabic", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Cartier Must Vendome Ronde from the 80s.\n\nThe piece perfectly represents the spirit of the “Must de Cartier” line launched to offer accessible and modern luxury. The dial is clean with Arabic numeral on it.\n\nThis is the bigger size version.", img: "/watch-121-cartier-must-vendome-ronde.jpeg", sold: false},
  {id: 115, brand: "Seiko", model: "Quartz Gold Roman Tank", era: "1980s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "White Roman", strap: "Black Croc-Embossed Leather", tag: "", desc: "Rare Design for this Seiko Mini Tank", img: "/watch-115-seiko-mini-tank.jpeg", sold: false},
  {id: 117, brand: "Milus", model: "Tonneau Roman White", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Leather", tag: "", desc: "Any shape but circles\n\nFor sale is a Vintage Milus cased in a classic tonneau-shaped case, with a white dial featuring black Roman numerals.\n\nThis is definitely a perfect candidate for a daily casual piece but equally suitable as a dress watch if gold is something you don’t like.\n\nManual winding.", img: "/watch-117-milus-tonneau.jpeg", sold: false},
  {id: 118, brand: "Eska", model: "St. Moritz Black Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black Stone", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Vintage ladies size Eska “St. Moritz”\n\nA clean black stone dial paired with the gold-tone hands. Definitely a chic classic everyday piece.\n\nUnder the St moritz there were alot of stone dial that were made and beside this piece here , I do have another stone dial piece coming - so stay tuned for that!\n\nManual winding.", img: "/watch-118-esko-st-moritz.jpeg", sold: false},
  {id: 129, brand: "Yema", model: "Paris Oval Bathtub Gold", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Brown Sunburst", strap: "Tan Leather", tag: "", desc: "For sale is a Vintage Yema Bathtub shape.\n\nCurves all around it , and a light brown sunburst dial. Simple yet so classic. The original Yema caseback sticker is still at the back!\n\nManual winding.", img: "/watch-129-yema-oval.jpeg", sold: false},
  {id: 128, brand: "Citizen", model: "Claire Cocktail 19 Jewels", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver Sunburst", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Citizen Watch , looking like a cocktail watch. In my eyes , it felt more like a whole UFO shaped body. Petite in its own shape and ways , it is paired with a white sunburst dial.\n\nManual winding.", img: "/watch-128-citizen-claire.jpeg", sold: false},
  {id: 127, brand: "Tiffany & Co.", model: "Round Roman Mesh Bracelet", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Steel Mesh Bracelet", tag: "", desc: "For sale is a Vintage Tiffany n Co watch.\n\nThis is a minimalist round case, with a white dial, and Roman numeral indices.\n\nComing along with an original black leather strap. It enhances the classic appeal, making it suitable for a wide variety of fits from suits to casual wear.", img: "/watch-127-tiffany-round-roman.jpeg", sold: false},
  {id: 126, brand: "Citizen", model: "Phynox 17 Jewels", era: "1950s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "30mm", case_material: "Stainless Steel", dial: "Cream", strap: "Brown Leather", tag: "", desc: "For sale is a Vintage Citizen dress watch!\n\nDefinitely a wallet friendly piece and something that’s value for money! A Japan domestic model , with gold index on the dial to give it a contrast to the white background on the dial.\n\nManual winding.", img: "/watch-126-citizen-phynox.jpeg", sold: true},
  {id: 96, brand: "Universal Genève", model: "Golden Janus 18K Rose Gold Solid Platinum", era: "1994", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Platinum & 18k Rose Gold", dial: "Silver Brushed", strap: "Brown Croc-Embossed Leather", tag: "Rare Find", desc: "Presenting to you Universal Geneve Golden Janus.\n\nIn 1994 Universal Geneve released this to commemorate their 100th anniversary.\n\nThey hired Vincent Calabrese to design it. He dedicates himself to the development of movements and complex function modules for numerous watch brands. Example , the movement for the Corum Golden Bridge or even the latest mad edition aka M.A.D.3 .\n\nThis piece is limited to 150pcs. It features a rectangular shaped case with a hinge allowing the case to be lifted and flipped over similar to the Jaeger-LeCoultre Reverso.\n\nIt is solid platinum with the rotating part made up of solid 18k rose gold. The front dial is time only and the other side shows the time with a jump hour feature , day and night indicator and a sub date.\n\nDefinitely a piece that shows Universal Geneve rich legacy and craftsmanships for its timepieces! Honestly was so happy to see the revival of the brand itself.\n\nAvailable now. Original strap and deployment buckle.", img: "/watch-96-ug-golden-janus.jpeg", sold: false},
  {id: 90, brand: "Seiko", model: "Le Vent Crescent Moon Sayoko Yamaguchi", era: "1990s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "Blue / Champagne", strap: "Black Leather", tag: "Rare Find", desc: "HOLYYYY MOOOOON!!\n\nLast year this was a piece which I had the honour to buy and sell a few times!\n\nPresenting to you reference 1F20-5J60 aka LE VENT. This was the first Seiko designed by a woman. Sayoko Yamaguchi, an internationally renowned Japanese model and actress.\n\nThere were other pieces in the collection but this crescent moon series has to be the crowd favourite! A grand total of 3 different variants were made. All 3 variants added up, less than 1000 pcs were produced.\n\nThese 2 reference number are just xx apart from each other.\n\nThe blue variant is definitely the hottest model among the 3.\n\nGotta catch em all! Don’t miss out on this opportunity", img: "/watch-90-seiko-le-vent-moon.jpeg", sold: false},
  {id: 102, brand: "Jaeger-LeCoultre", model: "Master Ultra Thin Ref. 145.8.79", era: "1990s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver Sunburst", strap: "Green Croc-Embossed Leather", tag: "", desc: "For sale is this Vintage stainless steel Jaeger-LeCoultre Master Ultra Thin Ref. 145.8.79, from the 90s.\n\nThe JLC’s case measures just 5.4mm thick, making it one of the thinnest watches of the 90s. The dial has a silver sunburst with applied numerals on the 3 6 9 12 oclock.\n\nThis is definitely an elegant and understated piece to wear on the wrist!", img: "/watch-102-jlc-master-ultra-thin.jpeg", sold: false},
  {id: 104, brand: "Seiko", model: "Blackdiamond Collection Roman", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "32mm", case_material: "Steel & Gold Tone", dial: "White Roman / Black", strap: "Black Leather", tag: "", desc: "One watch , Two faces.\n\nA rare restock for this particular piece! Seiko The Black Diamond Collection.\n\nA reversible piece , a playful yet elegant one on the wrist.\nOn one side, a classic Roman numeral dial. On the other, a sleek, silverish sunburst black face.\n\nCased in a two-tone case brushed steel paired with a gold-tone bezel.", img: "/watch-104-seiko-blackdiamond.jpeg", sold: false},
  {id: 99, brand: "Jaeger-LeCoultre", model: "Tonneau Roman Gold", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Yellow Gold", dial: "White Roman", strap: "Grey Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Jaeger-LeCoultre dress watch.\n\nThis time in a beautiful and timeless tonneau shaped model. An absolute classic with the white roman numeral dial and yellow gold case. There is just no going wrong with this one.\n\nManual winding.", img: "/watch-99-jlc-tonneau-roman.jpeg", sold: false},
  {id: 100, brand: "Rolex", model: "Oysterdate Roman Dial Ref. 6917", era: "", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "", case_size: "26mm", case_material: "Steel & 18k White Gold", dial: "White Roman", strap: "Jubilee Bracelet", tag: "", desc: "For sale is a Vintage Ladies Rolex Ref 6917.\n\nThis piece stands out with its timeless 26 mm stainless steel case topped by a fluted 18k white gold bezel. Its classic white dial features the Roman numerals, gold-tone hands. Lastly it’s complimented by the classic stainless steel Jubilee bracelet.\n\nWatch only.", img: "/watch-100-rolex-lady-oysterdate-6917.jpeg", sold: false},
  {id: 103, brand: "Omega", model: "De Ville Mini \"UFO\"", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver", strap: "Steel Bracelet", tag: "", desc: "For sale is an Omega mini case “UFO”.\n\nThis piece is an Omega that sold in the 70s , you can tell with the characteristics from the 70s such as the retro-futuristic cushion-shaped case , making it look like a “UFO”.\n\nFun fact Omega named this line up as “De Ville,” is derived from the French word meaning “urban.” It incorporates a retro-futuristic design typical of the 1970s, reflecting the design trends of that era.\n\nThe dial features a silver dial. A rarer piece because of the small case variant.\nWatch comes with the original bracelet too!", img: "/watch-103-omega-deville-mini-ufo.jpeg", sold: false},
  {id: 92, brand: "Omega", model: "De Ville Quartz Black Oval Ref. 191.0093", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "Black Waffle", strap: "Black Leather", tag: "", desc: "For sale is an Omega De Ville from 1970s , ref 191.0093.\n\nA rare ellipse shaped, rare for not only its dial, but also its shape. This model features an unusual design without a classic crown, giving it a clean, modern form.\n\nThe black dial with a unique waffle texture creates an elegant and timeless color combination with the gold case!\n\nComes with an original omega buckle.", img: "/watch-92-omega-deville-waffle-oval.jpeg", sold: false},
  {id: 106, brand: "Seiko", model: "Oval “Baignoire” Silver Roman", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Rare Vintage Seiko “baignoire”.\n\nTook them out from my personal collection, these ain’t the usual common noie version that you see in the market.\n\nThe case shape is more stretch out and has more curves, somehow it gives a closer vibe to the baignoire.\n\nThe dial compared to the gold variant , I prefer this one! It features a blue Roman numerals index and hands which matches the clean white face at the back.", img: "/watch-106-seiko-baignoire-silver.jpeg", sold: false},
  {id: 107, brand: "Seiko", model: "Oval “Baignoire” Gold Roman", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Tone", dial: "White Roman", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Rare Vintage Seiko “baignoire”.\n\nTook them out from my personal collection, these ain’t the usual common noie version that you see in the market.\n\nThe case shape is more stretch out and has more curves, somehow it gives a closer vibe to the baignoire.\n\nThe whole case gives the classic Cartier vibe to it. Cases in a gold tone case with a black and white Roman numerals dial and hands.", img: "/watch-107-seiko-baignoire-gold.jpeg", sold: false},
  {id: 109, brand: "Omega", model: "Blue Textured Oval", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Blue Textured", strap: "Blue Leather", tag: "", desc: "For sale is a Vintage Omega Geneve oval-shaped watch.\n\nA rarer variant, the combo of both the gold-plated case and blue dial together.\n\nThe eye-catching dial has a blue base with an elaborate textured finish. Adorned with gold Roman hour markers, the omega logo, and the hour and minute hands, giving it a refined appearance. This was under the Omega’s dress line.\n\nManual winding.", img: "/watch-109-omega-geneve-blue-textured.jpeg", sold: false},
  {id: 91, brand: "Favre-Leuba", model: "Onyx Cushion Rope Bezel", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black Lacquer", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is this Vintage Favre leuba piece!\n\nFirst of all , just look at that case  , it’s just so beautiful.\n\nRibbon/braided looking case that’s so popular and hard to come by. Whats even better is that the case has oxidise and changed colours , which perfectly compliments the dial!\n\nThe dial is a black lacquer with Roman numerals at the 12 oclock. And did I mention the dial is SOOOOO CLEAN", img: "/watch-91-favre-leuba-onyx-rope.jpeg", sold: false},
  {id: 97, brand: "Juvenia", model: "Black Dial Diamond Oval", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black, Diamond Markers", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Juvenia with 4 small diamonds.\n\nBeen posting a lot of black dials recently and this one is quite interesting. When the light hits the dial , the colour will become slightly grey , but when you look at it straight it become black.\n\nWith 4 small diamonds at the 3 6 9 12 o clock.\n\nManual winding.", img: "/watch-97-juvenia-black-diamond.jpeg", sold: false},
  {id: 98, brand: "Longines", model: "150th Anniversary Octagon Black Roman", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black Roman", strap: "Gold Link Bracelet", tag: "", desc: "For sale is a Vintage Longines 150th anniversary octagon.\n\nA classical Roman numeral font with a sub-second dial at the 6 o’clock. This was a release for the 150th anniversary of the Longines brand. Made in 2 sizes , this is the smaller version.\n\nManual winding.", img: "/watch-98-longines-octagon-black.jpeg", sold: false},
  {id: 101, brand: "Seiko Credor", model: "Seiko Credor Pair", era: "1980s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "Textured Silver", strap: "Mesh Bracelet", tag: "", desc: "Very underrated and undervalued Seiko Credor Integrated bracelet!", img: "/watch-101-seiko-credor-pair.jpeg", sold: false},
  {id: 105, brand: "Seiko", model: "Ladies Cocktail Blue Dial Bracelet", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Pale Blue Sunburst", strap: "Integrated Bracelet", tag: "", desc: "For sale is a Vintage Seiko ladies piece from the 70s!\n\nJust look at that beautiful finishes on the bracelet. A small and simple everyday piece , with a silver sunburst dial.\n\nManual winding.", img: "/watch-105-seiko-ladies-blue.jpeg", sold: false},
  {id: 108, brand: "Favre-Leuba", model: "Gold Cushion TV Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "New", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Gold Brushed", strap: "Brown Ostrich-Embossed Leather", tag: "", desc: "For sale is a Vintage Favre Leuba Cushion TV case.\n\nSomething you don’t see often , especially the cushion looking case with nice curves to it. TV case size , paired together with a clean brush finish on the dial itself.\n\nComes with the original strap , buckle , tag.\n\nAvailable now.", img: "/watch-108-favre-leuba-cushion-tv.jpeg", sold: false},
  {id: 94, brand: "Favre-Leuba", model: "Gold Oval", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Champagne", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Oval Favre Leuba.\n\nCased in an oval which gives off that baignoire vibe without hurting the wallet! Instead of a champagne dial , they used a lemon coloured dial which matches perfectly with the case.\n\nManual winding piece which makes the watch really value for money.", img: "/watch-94-favre-leuba-gold-oval.jpeg", sold: false},
  {id: 95, brand: "Sacom", model: "Black Roman Tonneau", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black & White Roman", strap: "Brown Leather", tag: "", desc: "For sale is a Vintage Sacom tonneau shaped\n\nThe dial is quite unique , with some form of black texture on it. Classic white and black dial combo , cased in a tonneau cases - perfect for all occasions.\n\nSacom is a vintage Swiss watch brand founded in the early 70s in the historic watchmaking town of Biel-Bienne, Switzerland.\n\nManual winding.", img: "/watch-95-sacom-tonneau.jpeg", sold: false},
  {id: 93, brand: "Universal Genève", model: "Türler Double Signed", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Croc-Embossed Leather", tag: "", desc: "Double Signed", img: "/watch-93-ug-turler-double-signed.jpeg", sold: false},
  {id: 70, brand: "Grand Seiko", model: "Hi-Beat Day-Date Black Dial Ref. 5646-7000", era: "", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Black / Grey", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Grand Seiko Ref 5646-7000.\n\nThe final model in the mechanical Grand Seiko line. The most beloved series in GS history.\n\nThis particular piece is eye-catching with its elegant appearance, featuring an original blackish/grey dial with sharp hands and indices.\n\nThe dial has aged beautifully, resembling the gloomy night sky. The case back engraving and GS medallion are still intact and in beautiful condition.\n\nThe movement is the practical high-beat automatic “Cal.5646A” with hacking function and quick change.\n\nThe day of the week is displayed in both Japanese and English wording.\n\nDon’t miss out on an opportunity to get this , classic and practical grand Seiko piece!", img: "/watch-70-grand-seiko-hibeat.jpeg", sold: false},
  {id: 86, brand: "Girard-Perregaux", model: "Ellipse Ref. 4582", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "18k Gold & Lapis", dial: "Gold Stardust", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Vintage Girard Perregaux Ellipse ref 4582.\n\nHardly ever seen on the internet with this combo of blue and gold together!\n\nThe blue is some type of stone that I am still trying to figure out but it matches perfect with that gold stardust + diamond dial.\n\nThe shape - well definitely the classic ellipse shape that everyone loves . Additionally the piece still has its original strap and the manufacturer sticker on it!\n\nManual winding.", img: "/watch-86-gp-ellipse-lapis.jpeg", sold: false},
  {id: 87, brand: "Girard-Perregaux", model: "Ellipse Ref. 4679", era: "", price: 0, priceRange: "", style: "Dress", condition: "New", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black Lacquer", strap: "Black Croc Leather", tag: "", desc: "For sale is this Rare New Old Stock Girard Perregaux ref 4679.\n\nA piece that was tuck aside for years in a safe , where no one was looking until now! NOS piece , with that beautiful ellipse shape and that “onyx” aka black lacquer dial.\n\nThe diamonds on it made it so classy looking further more that lugs elevated the whole watch look!\n\nSooo sooo untouched , until the gold plating of the watch had change colour. Strap and buckle is still unworn.\n\nManual winding.", img: "/watch-87-gp-ellipse-onyx.jpeg", sold: false},
  {id: 80, brand: "Omega", model: "Copper Dial Small Seconds", era: "1940s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Copper", strap: "Tan Leather", tag: "Rare Find", desc: "A piece that caught my eye while scrolling Instagram , the dangers of doom scrolling…\n\nFrom England to Europe to finally back home here in Singapore! It being a possible piece unique caught my attention and why so? - just look at the dial and case combination , absolutely stunning.\n\nThe case has that X lug design , popular back in the 30/40s in creating these art deco designs. Furthermore that orangey copper dial is another beautiful aspect, which is also uncommon to find on an Omega.\n\nThe dial was from Lemerich&Co , Swiss dial manufacturer based in La Chaux-de-Fonds. They supplied dials to several major brands, including Rolex, Omega, and others.", img: "/watch-80-omega-copper-dial.jpeg", sold: false},
  {id: 74, brand: "Omega", model: "Constellation Automatic Chronometer Arrow Marker", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Silver Brushed", strap: "Black Croc-Embossed Leather", tag: "", desc: "A clean classic piece and an all time crowd favourite!\n\nFor sale is a Vintage Omega Constellation. The case itself has that beautiful dog legged case which is hard to come by.\n\nThe dial is still clean and has the brushed finish in the middle , it comes with the rare configuration of the arrowhead markers which also makes it striking on the dial itself.", img: "/watch-74-omega-constellation-arrow.jpeg", sold: false},
  {id: 75, brand: "Vintage Snoopy", model: "Running Snoopy Pair", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Gold Tone", dial: "Slide Display", strap: "Tan Leather", tag: "", desc: "Who says watches can’t be fun!\n\nPicked up this two watches today , a lil TGIF joy. Especially for those who love snoooopy.\n\nHow crazy to find this 2 pieces in their new old stock condition. It comes with that original heart shape cases followed by the small details such as the snoopy marking on the strap itself.\n\nMost importantly the coooool feature on how to see the time - you gotta slide it to view it!\n\nAvailable now.\n\nTwo pieces , once gone , they don’t come back ever.", img: "/watch-75-snoopy-pair.jpeg", sold: false},
  {id: 85, brand: "Omega", model: "De Ville Dynamic Brown Automatic", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Gold Plated", dial: "Brown Sunburst", strap: "Tan Patent Leather", tag: "Rare Find", desc: "For sale is this vintage Omega De Ville Dynamic.\n\nPreserve in its original strap and buckle. It’s a dynamic that u don’t see often! Smaller in size but that diallllll . In that beautiful dark orange-ish sunburst , it matches the hands and strap so perfectly.", img: "/watch-85-omega-deville-dynamic.jpeg", sold: false},
  {id: 72, brand: "Longines", model: "Cream Dial Small Seconds", era: "1930-1940s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "31mm", case_material: "Stainless Steel", dial: "Cream Breguet", strap: "Brown Leather", tag: "", desc: "For sale is a Vintage Longines Tre Tacche is a military-style watch from the late 1930s to 1940s.\n\nIt’s known for the 31mm stainless steel stepped case and that beautiful looking Breguet numeral. The raised silver Breguet numerals on a brushed dial gives an elegant and yet very playful vibe.\n\nIt definitely has the vibe of the Patek 96 but this Longines is a wallet friendly option!", img: "/watch-72-longines-tre-tacche.jpeg", sold: false},
  {id: 73, brand: "Longines", model: "Gold Roman Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Gold Roman", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Longines Roman Numeral.\n\nA very beautiful piece which honestly you don’t see often is that it comes with the original papers!\n\nAnd whats even better? - the condition I would say is very very mint , you still see the brush finishes on it, the case is unpolished.\n\nManual winding.", img: "/watch-73-longines-roman-papers.jpeg", sold: false},
  {id: 71, brand: "Omega", model: "De Ville Prestige Ref. 48035101", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Black Radial", strap: "Black Leather", tag: "", desc: "For sale is an Omega De Ville prestige ref 48035101.\n\nThe stainless steel tonneau-shaped retains its clean, dressy form. With the original black dial is in excellent condition.\n\nIt features a two-tone radial finish with different finishes on the center and outer edge, which changes its appearance depending on how the light hits it.\n\nOmega’s “De Ville” originally started as a line within the Seamaster series and later became an independent collection.\n\nAs its name, which means “street corner” in French, suggests, it is characterized by its urban and sophisticated design. Among them, the Prestige line was developed as an elegant dress model incorporating classical elements.\n\nAvailable now.\n\nWatch only. With original buckle and strap.", img: "/watch-71-omega-deville-prestige.jpeg", sold: false},
  {id: 89, brand: "Omega", model: "De Ville Gold Oval Ref. 551.052", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Gold Plated", dial: "Gold", strap: "Black Croc Leather", tag: "", desc: "For sale is a Vintage Omega De Ville ref 551.052.\n\nIt has a small case, the Omega De Ville Lady 551.052 stands out as an ideal watch for small wrists. Giving a minimalist dial design with its baton indices, offering a simple yet sophisticated look.\n\nComes with an original omega box. And original papers!", img: "/watch-89-omega-deville-lady-gold.jpeg", sold: false},
  {id: 88, brand: "Omega", model: "De Ville Blue Roman Rectangular", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Blue Roman", strap: "Black Leather", tag: "", desc: "For sale is an Vintage Omega De Ville.\n\nChocolate bar case shape , with a circle crystal to read the time! Suitable for both man and ladies , has that beautiful blue dial at the background where it compliments perfectly with the white roman numeral!", img: "/watch-88-omega-deville-blue-roman.jpeg", sold: false},
  {id: 77, brand: "Omega", model: "De Ville Gold Roman Tank", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Gold Roman", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Omega De ville Tank.\n\nSomething different compared to the other De ville tanks!\nWhere the case has the hammered finishes at the sides making it quite interesting. Paired together with the classic brushed finishes on the dial , this is definitely a classic piece for everyday wear.\n\nComes with the original strap and buckle.\n\nManual winding.", img: "/watch-77-omega-deville-tank.jpeg", sold: false},
  {id: 81, brand: "Universal Genève", model: "Black Dial Gold Bracelet", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black", strap: "Gold Integrated Bracelet", tag: "Rare Find", desc: "Starting to fall in love with this integrated bracelet and how the gold changes colour over time!", img: "/watch-81-ug-gold-bracelet.jpeg", sold: false},
  {id: 76, brand: "Longines", model: "Gold Square Rope Bezel Ref. 817 4333", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Gold Plated", dial: "Gold Linen", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Longines ref 817 4333.\n\nIt has that beautiful ribbon design bezel around it which makes it so unique, back then the brand tried different case style. Additionally the dial , instead of just a champagne dial it has that amazing gold linen dial to match the whole watch design.\n\nManual winding.", img: "/watch-76-longines-rope-bezel.jpeg", sold: false},
  {id: 78, brand: "Longines", model: "Gold Textured Cushion on Bracelet", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Gold Textured", strap: "Gold Integrated Bracelet", tag: "", desc: "Interesting case and bracelet style… both available now. In new old stock condition.\n\nI guess integrated bracelet is the new in thing", img: "/watch-78-longines-gold-cushion-bracelet.jpeg", sold: false},
  {id: 79, brand: "Longines", model: "Burgundy Roman Gold Mesh Bracelet", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "", case_size: "", case_material: "Gold Plated", dial: "Burgundy Roman", strap: "Gold Mesh Bracelet", tag: "", desc: "Interesting case and bracelet style… both available now. In new old stock condition.\n\nI guess integrated bracelet is the new in thing", img: "/watch-79-longines-burgundy-mesh.jpeg", sold: false},
  {id: 82, brand: "Seiko", model: "Rectangular Silver Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver Brushed", strap: "Brown Leather", tag: "", desc: "From the factory of Daini Seikosha , out of the two factory this was known for producing one of Seiko most iconic creation which was the King Seiko line.\n\nThis piece here is un touched and unpolished. The caseback still has the sharp line finishes on it. And the sides are kept clean with that unique design.\n\nDial has a light grey / whiteish brush strokes on it.\n\nManual winding.", img: "/watch-82-seiko-daini-rect.jpeg", sold: false},
  {id: 83, brand: "Longines", model: "Flagship Blue Sunburst Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Blue Sunburst", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Longines Flagship in blue sunburst dial!\n\nFor all the ladies looking for the simple and classy watch - here it is! It can’t go wrong with that blue sunburst dial.\n\nManual winding.", img: "/watch-83-longines-flagship-blue.jpeg", sold: false},
  {id: 84, brand: "Longines", model: "Gold Cushion Small TV Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Gold", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is this Vintage Ladies Longines.\n\nA little dainty gold piece! A tv case ish shape while the crystal has an oval form. I felt the thicccck indexes helped made the dial seem a little bigger - for those who felt small watches are harder to tell time , I think this piece would fix the problem.\n\nManual winding.", img: "/watch-84-longines-gold-tv.jpeg", sold: false},
  {id: 54, brand: "Movado", model: "Triple Date Calendar 14K Ref. 14788", era: "1940s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "", case_size: "", case_material: "14k Gold", dial: "Champagne Patina", strap: "Brown Croc-Embossed Leather", tag: "", desc: "For sale is a Movado Triple Calendar , packed with so much value and gooooodness! This piece is a Calendograf ref. 14788. Cased in 14k gold.\n\nWith a beautiful long chamfer lugs and that applied breguet numerals both together paired so well with the orange patina in the middle.\n\nSecond pic is the exact same watch it’s a poster from the late 1940s Movado advertorial describing the functionality of the Calendograf models - “The Second, The Minute, The Hour, The Day, The Date, The Month”.\n\nMovado is thus establishing itself on the more technical end of the horological spectrum.", img: "/watch-54-movado-calendograf.jpeg", sold: false},
  {id: 63, brand: "Omega", model: "De Ville Jumbo Case \"UFO\" Ref. 166.155", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Blue Tapestry", strap: "Steel Bracelet", tag: "", desc: "For sale is an Omega Jumbo case “UFO” ref 166.155. Japan edition.\n\nThis piece is an Omega that originally sold as a Japanese special edition. It was a piece from the 70s , you can tell with the characteristics from the 70s such as the retro-futuristic cushion-shaped case , making it look like a “UFO”.\n\nFun fact Omega named this line up as “De Ville,” is derived from the French word meaning “urban.” It incorporates a retro-futuristic design typical of the 1970s, reflecting the design trends of that era.\n\nThe dial features a rare tapestry design with vertical stripes. Watches comes with the original bracelet too!", img: "/watch-63-omega-deville-ufo.jpeg", sold: false},
  {id: 52, brand: "IWC", model: "International Watch Company R810AD", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Silver Brushed", strap: "Tan Leather", tag: "", desc: "For sale is a IWC International watch company R810AD.\n\nThis is a 1970s IWC fitted with the automatic caliber 8541B movement, a popular old IWC movement among vintage watch enthusiasts.\n\nIs a cool example in stainless steel where the vertically brushed dial is very attractive with prominent hour markers.\n\nAutomatic.\n\nWatch only.", img: "/watch-52-iwc-r810ad.jpeg", sold: false},
  {id: 50, brand: "Franck Muller", model: "Cintrée Curvex Ref. 2251 18K", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "18k Gold", dial: "Cream Guilloché", strap: "Pink Croc-Embossed Leather", tag: "", desc: "For sale is a Franck Muller Ref 2251.\n\nCutesy small size , perfect for ladies with the beautiful pen caseback showcasing that engraving on it.\n\nFitted in a 18k gold case , manual winding movement.\n\nWatch only.", img: "/watch-50-franck-muller-cintree.jpeg", sold: false},
  {id: 51, brand: "Cartier", model: "Pasha GMT Automatic Ref. 2377", era: "", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "Automatic", case_size: "35mm", case_material: "Stainless Steel", dial: "Silver Globe Grid", strap: "Steel Bracelet", tag: "", desc: "For sale is a Cartier Pasha ref 2377.\n\nWhich feature a whiteish silver dial, and is decorated with a raised, intricate globe grid of latitude and longitude lines.\n\nIts 35mm case is well proportioned which fits both female and male wrists.\n\nAttached to the Original Cartier bracelet.\n\nAutomatic.\n\nWatch only.", img: "/watch-51-cartier-pasha-gmt.jpeg", sold: false},
  {id: 60, brand: "Longines", model: "Bullseye Two-Tone Tropical Dial", era: "1940s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "34mm", case_material: "Stainless Steel", dial: "Copper & Black", strap: "Dark Brown Leather", tag: "", desc: "For sale is an amazing rare Longines Bull eye from 1940s!\n\nIn that beautiful warm copper dial colour hehe , cases in a stainless steel case which measures 34mm in diameter, a well-proportioned case size.\n\nThe piece was made during Longines’ wartime production years. 1930-1940s.", img: "/watch-60-longines-bullseye.jpeg", sold: false},
  {id: 68, brand: "Omega", model: "Seamaster Arabic Ref 2639-14", era: "1950s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "34mm", case_material: "Stainless Steel", dial: "Cream Arabic", strap: "Tan Croc-Embossed Leather", tag: "", desc: "For sale is a Vintage Omega ref 2639-14. Fresh out of serviceeee!\n\nThe world of vintage Omega Seamasters is vast and filled with interesting and unique references and this ref. 2639 has so many charming elements to it, that is hard to favor just one!\n\nThis watch stands out with its distinctive Arabic numeral dial, a feature rarely seen during the 1950s, adding a unique touch to its classic design.", img: "/watch-68-omega-seamaster-2639.jpeg", sold: false},
  {id: 66, brand: "Avalon", model: "14K Gold Salmon Dial", era: "1940s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "14k Gold", dial: "Salmon", strap: "Tan Leather", tag: "", desc: "For sale is a Vintage 14K Gold Avalon.\n\nI have been buying solid gold pieces recently and came around this one and I felt it was quite a nice piece to get! The case is 14k gold and is placed with a beautiful salmon dial, is beautiful paired with this purple ish patina hands.\n\nThe Avalon Watch Co. name dates back to the 1940s and 1950s, using Swiss manual-wind movements.\n\nManual winding.", img: "/watch-66-avalon-14k-salmon.jpeg", sold: false},
  {id: 65, brand: "Omega", model: "De Ville Lapis Lazuli Ref. 511.0471", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Lapis Blue", strap: "Black Leather", tag: "", desc: "For sale is an Omega De ville vintage ref 511.0471.\n\nOut of the 3-4 different dial combinations for this particular reference, this one is my favourite and also the rarest one!\n\nThe deep blue hues of the Lapis Lazuli Stone dial adds an element of beauty, imagining you vibing under a starry night this dial would have represented that moment.\n\nManual winding.", img: "/watch-65-omega-deville-lapis.jpeg", sold: false},
  {id: 69, brand: "Omega", model: "Genève Blue Tank Case Ref. 511.0469", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind Cal. 625", case_size: "25mm", case_material: "Gold Plated", dial: "Blue", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is an Omega Geneve Tank Case Ref 511.0469!\n\nThe 25mm“Tank” shaped case has a polished chamfered edge leading to hooded lugs, and a lug-to-lug length of 33.5mm and a case thickness of just 6.5mm sits comfortably on your wrist.\n\nAnd just look at that dial with a blue hue. Tooo beautiful, the dial colour may be hard to see in photo but in person it matches perfectly with the gold case.\n\nManual winding. Cal625", img: "/watch-69-omega-geneve-tank-blue.jpeg", sold: false},
  {id: 56, brand: "Mystère de Rochas", model: "Burgundy Oval", era: "1978", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Burgundy", strap: "Burgundy Lizard-Embossed Leather", tag: "", desc: "For sale is this beautiful oval shaped watch from Mystère de Rochas!\n\nTook me awhile to finally find this piece. The brand Mystère de Rochas, is a French perfume launched in 1978.\n\nSmall production of these watches were made. With that amazing burgundy red dial it reminds me of the design from “Must de Cartier” of the same era\n\nThe watch was made in France. Manual-winding, oval case, with that striking red dial - what more can we ask for?\n\nAvailable now.", img: "/watch-56-rochas-burgundy-oval.jpeg", sold: false},
  {id: 59, brand: "Maurice Guerdat", model: "Bathtub Oval Black Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Maurice Guerdat , in a Bathtub looking shape. It has a black lacquer dial giving that onyx vibes to the watch.\n\nA brand from Swiss in the 70s which created bold modernist designs. Very under the radar and at a very reasonable price tag for the shape + mechanical movement + dial.\n\nAvailable now.", img: "/watch-59-guerdat-bathtub.jpeg", sold: false},
  {id: 67, brand: "Omega", model: "Onyx Bathtub", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is an Omega “Onyx” looking dial in that beautiful bathtub shape!\n\nNot commonly seen particularly for the dial , this piece is beautiful black with no cracks or anything giving that “onyx” look to it.\n\nClean white hands and the white omega logo , matches perfectly with any outfit for any occasion.\n\nManual winding.", img: "/watch-67-omega-onyx-bathtub.jpeg", sold: false},
  {id: 55, brand: "Universal Genève", model: "Gold Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Gold", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Universal Geneve with that unique case shape!\n\nMy first time seeing this type of case shape , kinda of unique don’t you think? With the case shape look being an “eye”\n\nManual winding.", img: "/watch-55-ug-eye-case.jpeg", sold: false},
  {id: 57, brand: "Longines", model: "Square Roman White Ref. 4284", era: "1970s", price: 0, priceRange: "", style: "Art Deco", condition: "", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "White Roman", strap: "Tan Leather", tag: "", desc: "For sale is a Longines ref 4284 , clean classic piece.\n\nHas the stepped case around the corners paired with that clean white Roman numeral dial.\n\nManual winding.", img: "/watch-57-longines-4284-roman.jpeg", sold: false},
  {id: 58, brand: "Longines", model: "Square Roman Black Ref. 5086", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Steel & Gold", dial: "Black Roman", strap: "Black Leather", tag: "", desc: "For sale is a Longines ref 5086 Black Roman numeral dial.\n\nThe flat glass sits seamlessly flush with the case, and that stepped case at the corners made the watch looks slightly bigger making it suitable for both male and female’s wrist.\n\nManual winding.", img: "/watch-58-longines-5086-black.jpeg", sold: false},
  {id: 61, brand: "Baume & Mercier", model: "Tank Art Deco Black Dial", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black Brushed", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Baume Mercier Tank watch.\n\nFitted with art deco ish style with the stepped case at the side. More so just look at the dial , you gotta look at it in person to see that beautiful grey brush finishing on it!\n\nManual winding.", img: "/watch-61-baume-mercier-tank.jpeg", sold: false},
  {id: 62, brand: "Juvenia", model: "Lapis Starry Blue Cushion", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Starry Blue", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Juvenia Starry blue!\n\nMy first time coming across this piece, is a blue lacquer dial but the dial has some marking which gives the starry feeling.\n\nCase and movement has the fab suisse marking on the case which indicate this piece was for the French market.\n\nManual winding.", img: "/watch-62-juvenia-starry-blue.jpeg", sold: false},
  {id: 64, brand: "Universal Genève", model: "White Roman Round", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Patent Leather", tag: "", desc: "For sale is a Universal Geneve Manual winding mini size.\n\nA cutie lil piece for those who like their watches small , in this simple Roman numeral tone on the dial. Classic piece that can’t go wrong with any outfit!\n\nManual winding.", img: "/watch-64-ug-mini-roman.jpeg", sold: false},
  {id: 53, brand: "Seiko", model: "Socie “Onyx” Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Black Onyx", strap: "Black Lizard-Embossed Leather", tag: "", desc: "For sale is a Seiko Socie “onyx” dial.\n\nThe socie line created a lot of different beautiful ladies model , and this was one of them!\n\nIt comes with the clean “onyx” looking black dial , cased inside a beautiful ribbon shape outer case. Simple classic piece for any time of the day!\n\nManual winding.", img: "/watch-53-seiko-socie-onyx.jpeg", sold: true},
  {id: 49, brand: "Piaget", model: "Automatic Blue Dial Cushion Ref. 13423 18K WG", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "18k White Gold", dial: "Turquoise Lacquer", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is this beautiful Piaget Ref 13423.\n\nThe piece showcases Piaget’s artistry, this rare automatic timepiece features a mesmerizing lacquer dial cyan/turquoise colour!\n\nEncased in 18k white gold (hallmarked “750” on the signed case). No hour markers, no distractions - just a date window at 3 o’clock and sharp dauphine hands slicing through dial.\n\nWatch only.", img: "/watch-49-piaget-cyan-cushion.jpeg", sold: false},
  {id: 46, brand: "Jaeger-LeCoultre", model: "Reverso Duetto Q2568403", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Stainless Steel, Diamond-Set", dial: "Silver Guilloché / Black Reverse", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a JLC Reverso Duetto Q2568403.\n\nThe Reverso offers two entirely different personalities within a single watch.\n\nThe front dial features a silvered guilloché finish with black Arabic numerals, giving the Art Deco balance. Reverse the case, and the watch transforms into a black sunray dial framed by diamond-set case, something for the night to shine!\n\nThis fits the theme of the duetto which instead of displaying a second time zone, it provided two different aesthetic expressions at the same time. The design often incorporated precious materials and diamonds on the second dial.\n\nFull set. Box and papers.", img: "/watch-46-jlc-reverso-duetto.jpeg", sold: false},
  {id: 44, brand: "Gérald Genta", model: "Mother-of-Pearl Diamond Bezel 18K", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "18k Rose Gold", dial: "Mother-of-Pearl", strap: "Pink Croc-Embossed Leather", tag: "", desc: "For sale is this beautiful looking Gerald Genta Heart\n\nIt’s cased in an 18K rose gold lil heart-shaped and a shimmering mother-of-pearl dial, accented with a diamond-set bezel and vibrant pink leather strap.\n\nBelieved to be the only piece that exist thus far!\n\nQuartz movement.", img: "/watch-44-genta-mop-diamond.jpeg", sold: false},
  {id: 41, brand: "Cartier", model: "Santos 100 Medium", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Pink Croc-Embossed Leather", tag: "", desc: "For sale is this beautiful Cartier Santos 100 ref 2878.\n\nIn 1904 Louis Francois Cartier created a watch for his friend and aviation pioneer Alberto Santos Dumont that he could wear when flying. This is how the Santos came to existence as one of the world’s first wristwatches.\n\nThis is a piece that has both history and proportion.\n\nLaunched for the 100th anniversary of the mythical Santos, the iconic design of the maison.\n\nThe dial is pristine, and pops gorgeously. The steel case is in excellent condition as well. Paired with the classic blue cabochon stone.\n\nCase size is in medium so it fits perfectly for both female and male users!\n\nFull set. Box and papers", img: "/watch-41-cartier-santos-100.jpeg", sold: false},
  {id: 42, brand: "Seiko Credor", model: "Ref. 6020-5440 Blue Sunburst Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Stainless Steel", dial: "Blue Sunburst", strap: "Integrated Steel Bracelet", tag: "", desc: "For sale is this insanely rare Seiko Credor ref 6020-5440.\n\nA square tv ellipse with its stepped bezel and an integrated bracelet. The dark blue sunburst dial with horizontal stripes and the style of bracelet might remind many of the Patek Philippe Nautilus.\n\nThe piece was released around the time of the Locomotive which has proven Genta provenance. Seiko definitely took lots of inspiration from genta himself which is seen in many of their integrated designs!\n\nThis piece even has the original blue sticker case back on it and in its unpolished condition this is definitely a piece that I feel won’t ever come by again!", img: "/watch-42-seiko-credor-blue.jpeg", sold: false},
  {id: 38, brand: "Jaeger-LeCoultre", model: "Master Marine Automatic Egg-shaped", era: "1958", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "", case_material: "Stainless Steel", dial: "Silver", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is this lil egg head from jaeger lecoultre , master mariner!\n\nThis Master Mariner from LeCoultre features a funky egg-shaped dial that you don’t see often.\n\nThis line of watches was introduced in 1958 to celebrate Jaeger’s 125th anniversary. In the same year, Jaeger introduced the Geophysic range which eclipsed the more niche Master Mariner and this line seems to have been mostly forgotten.\n\nThis pieces here comes with the date function and tritium indexes ,In amazing unpolished condition.\n\nWatch only.", img: "/watch-38-jlc-master-mariner.jpeg", sold: false},
  {id: 47, brand: "Longines", model: "Octagonal 150th Anniversary Roman Gold", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Steel & Gold", dial: "Mother-of-Pearl Roman", strap: "Tan Leather", tag: "", desc: "For sale is a Rare Longines Octagon 150th Anniversary.\n\nThe mother-of-pearls are one of the rarer versions and especially rare in the bigger case size!\n\nTalking about condition? This piece here could say is the cleanest one I ever seen, even the blue case back sticker is still on it!\n\nComes with box.\n\nManual winding.", img: "/watch-47-longines-octagon-roman.jpeg", sold: false},
  {id: 48, brand: "Longines", model: "Octagonal 150th Anniversary Arabic Steel", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Mother-of-Pearl Arabic", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is another piece of Longines 150th anniversary Mother of Pearl dial, this time in Breguet numerals.\n\nEqually as rare as the Roman numeral version, making it a joy to be able to get hold of both of them!\n\nIt is easy to mistake it as a pure white dial , but from the different angles you can see it’s iridescent. A unique rainbow sheen is created when light reflects from it!\n\nComes with box.\n\nManual winding.", img: "/watch-48-longines-octagon-arabic.jpeg", sold: false},
  {id: 30, brand: "Universal Genève", model: "White Shadow Blue Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Microrotor", case_size: "", case_material: "Stainless Steel", dial: "Blue", strap: "Steel Mesh Bracelet", tag: "", desc: "For sale is an early 1970s Universal Geneve White Shadow.\n\nSome may be wondering the design , why does it look so similar to the Patek Ellipse??\n\nWell in fact the legendary Gerald Geneta did design. But it wasn’t the Patek that he design instead it was this beautiful piece of Universal Geneve!\n\nWhat is hidden inside is that beautiful microrotor movement , which was a legend because of how thin it was for that era.\n\nPaired beautifully is the integrated bracelet, how buttery silky smoooooth it is , u gotta try it on to experience!", img: "/watch-30-ug-white-shadow.jpeg", sold: false},
  {id: 40, brand: "Rolex", model: "Oysterdate Ref. 6694 Mickey Mouse Dial", era: "", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "Manual Wind", case_size: "34mm", case_material: "Stainless Steel", dial: "Mickey Mouse (Aftermarket)", strap: "Oyster Bracelet", tag: "", desc: "The best watch to start a Rolex vintage collection is the Rolex Oysterdate 6694. What more can you ask for? It is sporty, wearable, an oyster case, Rolex DNA, useful date complication, tons of value.\n\nAnd furthermore this piece here comes together with an after market Mickey Mouse dial! Super fun and playful dial that you can swap around with.\n\nWatch only.", img: "/watch-40-rolex-oysterdate-6694.jpeg", sold: false},
  {id: 39, brand: "Cartier", model: "Santos Vendôme Two-Tone Burgundy", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "32mm", case_material: "18k Gold & Steel", dial: "Burgundy", strap: "Two-Tone Bracelet", tag: "", desc: "For sale is a beautiful Cartier Santos Vendôme featuring a rich Burgundy dial — a really elegant and uncommon configuration.\n\nThis piece is highly sought after compared to the more common white Roman dials. The deep burgundy dial, a signature color for Cartier, highlights the brand’s dedication to creating unique and memorable timepieces.\n\nThis example is the large size, measuring 32mm. The case is 18k gold and stainless steel, powered by a quartz movement.\n\nWatch only.", img: "/watch-39-cartier-santos-vendome.jpeg", sold: false},
  {id: 43, brand: "Baume & Mercier", model: "Oval Lapis Blue Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Blue Lacquer", strap: "Black Leather", tag: "", desc: "For sale is this beautiful Vintage Baume and Mercier.\n\nFitted in that cute little oval shape case is a blue lacquer dial which has that starry blue dial effect on it! Paired together with a blue cabochon crown.\n\nThe piece comes with the original strap and buckle.\n\nManual winding.", img: "/watch-43-baume-mercier-oval.jpeg", sold: false},
  {id: 32, brand: "Omega", model: "De Ville \"Emerald\" by Andrew Grima", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Black Striped", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is an Omega De Ville “Emerald” by Andrew Grima\n\nAndrew Grima was one of the most fashionable and refined jewelry designers of the 60s. This piece features a striking crystal that looks like a finely cut gemstone, which is where the nickname emerald came about.\n\nThe dial itself is very subtle with only the Omega logo and the De Ville branding at six o’clock.\n\nManual winding.", img: "/watch-32-omega-deville-emerald.jpeg", sold: false},
  {id: 35, brand: "Universal Genève", model: "Türler Double Signed Roman Dial", era: "1960s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Leather", tag: "", desc: "For sale is a Universal Geneve double signed turler!\n\nAn interesting shape watch as it’s a little curved, a sleek mid century design Universal Geneve man’s dress model circa 1960’s.\n\nFeaturing a brushed finish stainless steel case. With round white gloss dial with printed Roman figues and black baton hands. Dial is a double signed with retailer turler at the bottom!\n\nManual winding.", img: "/watch-35-ug-turler-roman.jpeg", sold: false},
  {id: 36, brand: "Seiko", model: "Chariot Ref. 2220-3430 Hexagonal Silver Dial", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver Brushed", strap: "Black Leather", tag: "", desc: "For sale is an Seiko chariot 2220-3430.\n\nIt features a vertical brushed silver dial with minimal printing for a minimalist aesthetic.\n\nComplementing the sleek dial is a hexagon case that gives the watch its true character.\n\nManual winding.", img: "/watch-36-seiko-chariot-hex.jpeg", sold: false},
  {id: 31, brand: "Longines", model: "Art Deco Case", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Tone", dial: "Champagne", strap: "Brown Leather", tag: "", desc: "For sale a Vintage Longines Art deco case shape.\n\nSmall sub seconds at the bottom with a beautiful case shape.\n\nManual winding movement.", img: "/watch-31-longines-art-deco.jpeg", sold: false},
  {id: 37, brand: "Longines", model: "Gold Curved Case", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Tone", dial: "Gold", strap: "Grey Leather", tag: "", desc: "For sale is this vintage longines with a nice curved case.\n\nJust look at those curves… it’s a beauty by itself. And how the light shines across it , the gold just shines so beautifully under it.\n\nManual winding.", img: "/watch-37-longines-gold-curved.jpeg", sold: false},
  {id: 33, brand: "Seiko", model: "Contemporary Basic Spirit Arabic 5S21-5A00", era: "1980s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Palladium Plated", dial: "Off-White Arabic", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is a Seiko Spirit sweep seconds Arabic numeral.\n\nThe Seiko 5S21-5A00 was launched under the Seiko’s spirit collection in the 80s. The goal was to create timeless yet focusing on the basic time telling function.\n\nThe watch features an off white Arabic dial and finished off with a blue sword hands.\n\nThe dial is cased within a palladium plated case that is gives the case a silvery-white appearance.\n\nThe best part!! It uses not any quartz but the calibre 5s21! Which when you look at the second hands you will be able to admire the hypnotic sweep that is comparable with spring drive.\n\nQuartz movement.", img: "/watch-33-seiko-spirit-arabic.jpeg", sold: false},
  {id: 34, brand: "Seiko", model: "Contemporary Basic Spirit Roman 5S21-5A00", era: "1980s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Steel & Gold", dial: "White Roman", strap: "Black Leather", tag: "", desc: "For sale is a Seiko Spirit sweep seconds Roman numeral.\n\nThe Seiko 5S21-5A00 was launched under the Seiko’s spirit collection in the 80s. The goal was to create timeless yet focusing on the basic time telling function.\n\nThe watch features a Roman numeral dial with the blue train track on the outside of the Roman numeral , which also matches the blue hands of the watch.\n\nThe best part!! It uses not any quartz but the calibre 5s21! Which when you look at the second hands you will be able to admire the hypnotic sweep that is comparable with spring drive.\n\nQuartz movement.", img: "/watch-34-seiko-spirit-roman.jpeg", sold: false},
  {id: 45, brand: "Universal Genève", model: "Oval Collection", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "", dial: "", strap: "", tag: "", desc: "UG Colourful Beans!", img: "/watch-45-ug-oval-collection.jpeg", sold: false},
  {id: 21, brand: "Rolex", model: "Cellini Red Vignette Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Cal. 1600", case_size: "", case_material: "18k Yellow Gold", dial: "Red Gradient", strap: "Black Leather", tag: "", desc: "For sale is a gorgeous Rolex Cellini in 18k gold with red vignette dial!\n\nIt houses the hand-wound Cal. 1600, which has an ultra-slim profile creating an elegant presence on the wrist.\n\nThe red vignette dial transits from a lighter centre to a deeper tone toward the perimeter, forming a refined vignette effect.\n\nWatch comes with an original Rolex buckle.", img: "/watch-21-rolex-cellini-red.jpeg", sold: false},
  {id: 13, brand: "Rolex", model: "Datejust Linen Dial ref. 16013", era: "1987", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Cal. 3035", case_size: "36mm", case_material: "Steel & Gold", dial: "Gold Linen", strap: "Jubilee Bracelet", tag: "", desc: "For sale is an Vintage Rolex Datejust linen dia ref 16013.\n\nThe successor of Datejust 1601, the 16013 Datejust line which is powered by a new caliber 3035 that already has quick-set date function.\n\nThe linen dial shines beautifully across lighting and it offers the perfect combination to the two-tone case and is adorned with complete yellow gold baton indices, Also dont forget the 18k yellow gold fluted bezel making this watch more elegant.\n\nThis watch serial dates it back to the year 1987.\n\nWatch only.", img: "/watch-13-rolex-datejust-linen.jpeg", sold: false},
  {id: 19, brand: "Cartier", model: "Must de Cartier Tank", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Brown", strap: "Brown Croc-Embossed Leather", tag: "", desc: "A Must de Cartier Tank with a brown sunburst dial and a blue cabochon crown, on a brown croc-embossed strap.", img: "/watch-19-cartier-tank-must-brown.jpeg", sold: true},
  {id: 27, brand: "Omega", model: "Seamaster Automatic Honeycomb", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "30mm", case_material: "Gold Capped", dial: "Cream Honeycomb", strap: "Brown Leather", tag: "", desc: "A vintage Omega Seamaster Automatic with a honeycomb-textured cream dial and gold-capped case.", img: "/watch-27-omega-seamaster-honeycomb.jpeg", sold: true},
  {id: 14, brand: "Tudor", model: "Prince Oysterdate Linen ref. 75203N", era: "1980s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "", case_size: "", case_material: "Steel & Gold", dial: "Gold Linen", strap: "Jubilee Bracelet", tag: "", desc: "The sister to Rolex, for sale is a Vintage Tudor linen dial.\n\nA very charming Tudor Prince Oysterdate reference 75203N and gorgeous linen dial circa 1980s, and freshly out of the servicing oven\n\nThis is a fantastic watch on bracelet, looks good, feels good and won’t break the bank.\n\nWatch only.", img: "/watch-14-tudor-prince-oysterdate.jpeg", sold: false},
  {id: 20, brand: "Rolex", model: "Cellini Blue Dial", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Cal. 1600", case_size: "", case_material: "18k Yellow Gold", dial: "Blue Gradient", strap: "Black Croc-Embossed Leather", tag: "", desc: "Matching perfectly with the other red piece we have, this piece in a blue vignette dial!\n\nIt features an elegant cushion-shaped 18K yellow-gold case housing the hand-wound Cal. 1600 movement.\n\nThe ultra slim case profile allows the watch to sit naturally under a tailored cuff.\n\nThe dial for this has a more subtle vibe compared to the red, it shines with a vignette effect, shifting subtly in tone under different angle and lighting.", img: "/watch-20-rolex-cellini-blue.jpeg", sold: false},
  {id: 24, brand: "Exaequo", model: "Salvador Dalí Softwatch Green", era: "1990s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "Green", strap: "Green Croc-Embossed Leather", tag: "", desc: "This Salvador Dalí Softwatch by Exaequo is inspired by Dali's painting \"The Disintegration of the Persistence of Memory\". It’s a piece which always finds its way linking somehow to the Cartier crash! But how the Cartier crash design was made that’s another story\n\nThe brand was launch in 1990 and fast forward 8 years later, Exaequo eventually had to closed down in 1998 owing to a lack of permission to use Salvador Dalí's name on the watches. Which made these Dali stamped logos a rare piece to obtain them!\n\nSimilarly to the blue version, this green coloured one is equally as rare as they made very little of the coloured versions with the Dali stamp on it!\n\nThis comes with the original straps and buckle. A super fun and interesting watch that will surely spark conversations!", img: "/watch-24-softwatch-green.jpeg", sold: false},
  {id: 28, brand: "Longines", model: "Octagonal Mother-of-Pearl 150th Anniversary", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "", movement: "Manual Wind", case_size: "", case_material: "Steel & Gold", dial: "Mother-of-Pearl", strap: "Double Curb-Chain Bracelet", tag: "", desc: "For sale is an Longines octagon 150th anniversary Roman numeral dial.\n\nAnother piece! But this time is a Roman numeral dial variant! And what’s even better this piece is full set - how crazy it’s is!! The original box paper and the strap is still preserved!\nCurrently is on an aftermarket bracelet chain.\n\nManual winding movement.", img: "/watch-28-longines-octagon.jpeg", sold: false},
  {id: 25, brand: "Omega", model: "Genève Oval Floral Guilloche dial Ref. 511.416.", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Tone", dial: "Gold Textured", strap: "Black Leather", tag: "", desc: "For sale is a Vintage Omega Geneve Oval Floral Guilloche dial Ref. 511.416.\n\nThis is definitely a piece of art from the 70s!\nThe Guilloche sort dial is such a beauty to the eyes as well as the champagne sunburst color and floral motive, giving such an elegant look. Definitely not forgetting the beautiful oval case shap, perfect on both male and female wrist!\n\nIt used an manual wind cal. 625.\n\nAvailable now.", img: "/watch-25-omega-geneve-gold.jpeg", sold: false},
  {id: 26, brand: "Omega", model: "Genève Oval Floral Guilloche dial Ref. 511.416", era: "1970s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Steel", dial: "Blue Textured", strap: "Blue Lizard-Embossed Leather", tag: "", desc: "For sale is a Vintage Omega Geneve Oval Floral Guilloche dial Ref. 511.416.\n\nThis is definitely a piece of art from the 70s!\nThe Guilloche sort dial is such a beauty to the eyes as well as the champagne sunburst color and floral motive, giving such an elegant look. Definitely not forgetting the beautiful oval case shap, perfect on both male and female wrist!\n\nAs the blue dials variant are always rarer, there have been some patina on the center of it, which could fade to a tropical patina floral dial overtime.\n\nIt used an manual wind cal. 625.", img: "/watch-26-omega-geneve-blue-roman.jpeg", sold: false},
  {id: 10, brand: "Tudor", model: "Glamour Date Ref M55000-0067", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Automatic", case_size: "36mm", case_material: "Stainless Steel", dial: "Black", strap: "Steel Bracelet", tag: "", desc: "For sale is an Tudor glamour date! Ref M55000-0067\n\nIt’s giving the Rolex Explorer 1 vibes at a quarter of the price, a classic 36MM size, and it comes with the bracelet that allows you to dress it up a bit more. It’s a whole lotta watch for the money.\n\nThe dial itself I love me some classic black dial with an oversized Tudor font and that sweet “smile” with the self winding printing.", img: "/watch-10-tudor-glamour-date.jpeg", sold: false},
  {id: 11, brand: "Omega", model: "Seamaster Automatic Chronometer 120m", era: "1990s", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "Automatic Cal. 1120", case_size: "", case_material: "Stainless Steel", dial: "Blue Wave", strap: "Steel Bracelet", tag: "", desc: "For sale is an Omega Seamaster 120m.\n\nThis was a piece before the Aqua terra, the automatic version were produce from the mid 90s till 2003 where the first generation aqua terra came out!\n\nThe dial itself has that blue wavy design that comes with a date feature on it, paired along with an in house caliber 1120.\n\nWatch only.", img: "/watch-11-omega-seamaster-chrono.jpeg", sold: false},
  {id: 12, brand: "Omega", model: "Constellation Mother-Of-Pearl", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Quartz", case_size: "", case_material: "Steel & Gold", dial: "Mother-of-Pearl", strap: "Two-Tone Bracelet", tag: "", desc: "For sale is a Vintage Omega Constellation Mother of Pearl dial.\n\nIt features a luminous Mother of Pearl dial that softly reflects light from every angle. The dial indexes has applied pyramid hour markers and the iconic Constellation star at the 6 o’clock.\n\nBeside the mop itself I love how this piece has that patina at the bottom corners of the dial creating that sunset / sunrise feeling on the dial itself! Paired beautifully with a gold Roman numeral bezel.\n\nWatch only.", img: "/watch-12-omega-constellation.jpeg", sold: false},
  {id: 15, brand: "Rolex", model: "Oysterdate Precision Linen Dial Ref. 6694", era: "", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "Manual Wind Cal. 1210", case_size: "34mm", case_material: "Stainless Steel", dial: "Silver Linen", strap: "Oyster Bracelet", tag: "", desc: "For sale is a Rolex Linen Dial Ref6694.\n\nThe ref 6694 has got to be everyone favourite first Rolex piece when they go into the hobby!\n\nIts hand wound caliber 1210 covered by a beautiful 34mm Oyster steel case. Especially showing off that beautiful linen dial and steel hour marks. Surrounded by a smooth bezel. Topping it of with an amazing Oyster bracelet. What more can I ask for\n\nWatch only.", img: "/watch-15-rolex-oysterdate-precision.jpeg", sold: false},
  {id: 16, brand: "Rolex", model: "Oyster Perpetual Date Black Gilt Dial Ref. 1500", era: "", price: 0, priceRange: "", style: "Sport", condition: "Used", movement: "", case_size: "34mm", case_material: "Stainless Steel", dial: "Black", strap: "Oyster Bracelet", tag: "", desc: "Guilty pleasure hehe, Rolex 1500 with black gilt dial.\n\nWatch only.", img: "/watch-16-rolex-oyster-perpetual-date.jpeg", sold: false},
  {id: 17, brand: "Cartier", model: "Must de Cartier Vendome SM", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "", case_size: "", case_material: "Gold Plated", dial: "Cream & Black Roman", strap: "Black Croc-Embossed Leather", tag: "", desc: "For sale is an Must De Cartier Vendome Sm size.\n\nBesides the Roman numeral at the 12 3 6 9 o clock, what makes this piece interesting would be that “hidden” Cartier logo.\n\nAs the line shines onto the dial from different angel that’s when you can see the logo on it. It felt like I was wearing 2 different watches under 2 different settings\n\nWatch only.", img: "/watch-17-cartier-must-vendome.jpeg", sold: false},
  {id: 18, brand: "Universal Genève", model: "Tonneau Silver Ref. 842117", era: "1960s", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "Silver Sunburst", strap: "Black Textured Leather", tag: "", desc: "For sale is this beautiful Universal Geneve Rectangular Tonneau grey dial Ref 842117.\n\nMade in 60s, An elegant tonneau-shaped watch, with softly rounded edges and elegant hooded lugs.\n\nIts original sunburst grey dial, combined with the shape of the stainless steel case and the Universal Genève cal. 42 hand-wound mechanical movement, gives this timepiece a refined and distinctive presence on the wrist. Perfect for a unisex fit!", img: "/watch-18-ug-tonneau.jpeg", sold: false},
  {id: 22, brand: "Vulcain", model: "Tiger-Eye Pair", era: "", price: 0, priceRange: "", style: "Dress", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Gold Plated", dial: "Brown Gradient", strap: "Brown Leather", tag: "", desc: "Perfect Pair!", img: "/watch-22-vulcain-pair.jpeg", sold: false},
  {id: 23, brand: "Exaequo", model: "Salvador Dalí Softwatch Blue", era: "1990s", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Quartz", case_size: "", case_material: "Gold Plated", dial: "Blue", strap: "Blue Croc-Embossed Leather", tag: "", desc: "This Salvador Dalí Softwatch by Exaequo is inspired by Dali's painting \"The Disintegration of the Persistence of Memory\". It’s a piece which always finds its way linking somehow to the Cartier crash! But how the Cartier crash design was made that’s another story\n\nThe brand was launch in 1990 and fast forward 8 years later, Exaequo eventually had to closed down in 1998 owing to a lack of permission to use Salvador Dalí's name on the watches. Which made these Dali stamped logos a rare piece to obtain them!\n\nThis piece here is also a rarer sort variant with the dial having the Swiss made marking on it.\n\nThis comes with the original straps and buckle. A super fun and interesting watch that will surely spark conversations!", img: "/watch-23-softwatch-blue.jpeg", sold: false},
  {id: 29, brand: "Cartier", model: "Tank Steel SM", era: "", price: 0, priceRange: "", style: "Art Deco", condition: "Used", movement: "Manual Wind", case_size: "", case_material: "Stainless Steel", dial: "White Roman", strap: "Black Leather", tag: "", desc: "Classic!", img: "/watch-29-cartier-tank-steel.jpeg", sold: false},
  { id:1, brand:"Omega", model:"Seamaster De Ville Crosshair", era:"1960s", price:0, priceRange:"S$800–1,200", style:"Dress", condition:"Good", movement:"Automatic", case_size:"34mm", case_material:"Stainless Steel", dial:"Crosshair Silver", strap:"Calf Leather", tag:"Classic Pick", desc:"Omega first introduced the Ref. 166.020 in 1962, combining the sporty character of the Seamaster line with the dress-style elegance of the newly introduced De Ville range. This particular example features a distinctive crosshair dial in a non-luminous configuration — no luminescent accents on the numerals or hands, giving it a clean, refined look. Powered by the self-winding Calibre 562 with a semi-quick date-change mechanism: advance the date manually by moving the hands back and forth between 9 PM and 1 AM.", img:"/watch-1-omega-seamaster-deville.jpeg", sold:false },
  { id:2, brand:"Omega", model:"Genève Blue Breguet", era:"1970s", price:0, priceRange:"S$600–900", style:"Dress", condition:"Excellent", movement:"Manual Wind", case_size:"35×30mm", case_material:"Stainless Steel", dial:"Blue Metallic", strap:"Calf Leather", tag:"Just In", desc:"A beautiful Omega Genève from the 1970s — an era when Omega experimented freely with bold designs. The Genève line was all about simplicity, creativity, and accessible pricing, which gave Omega room to push boundaries without fear of failure. This piece suits both male and female wrists thanks to its balanced case proportions. The case is mostly flat on the front with edges sloping down towards hooded lugs. And the dial — full Breguet numerals paired with a blue metallic sunburst pattern. An absolute stunner.", img:"/watch-2-omega-geneve-blue.jpeg", sold:false },
  { id:3, brand:"Omega", model:"De Ville Ellipse Roman", era:"1970s", price:0, priceRange:"S$500–800", style:"Dress", condition:"Unpolished", movement:"Quartz", case_size:"33mm", case_material:"Stainless Steel", dial:"White Roman", strap:"Lizard", tag:"", desc:"A vintage Omega De Ville in the iconic ellipse shape, in unpolished condition with Roman numerals on the dial. An interesting detail: this model doesn't have a traditional crown — instead, it uses a push-button function to move the hands, which gives it a cleaner, more minimalist look. Quartz movement.", img:"/watch-3-omega-deville-ellipse.jpeg", sold:false },
  { id:4, brand:"Tudor", model:"Black Bay Heritage 41mm", era:"2010s", price:0, priceRange:"S$3,500–4,200", style:"Diver", condition:"Full Set", movement:"Automatic", case_size:"41mm", case_material:"Stainless Steel", dial:"Black Gilt", strap:"Leather", tag:"Full Set", desc:"Tudor Black Bay Heritage Ref. 79230N — and it's worth noting how balanced this watch looks without a date window. But it gets even better: gilt accents on the dial top things off beautifully. The Black Bay collection has grown considerably since the original burgundy bezel model with an ETA movement, evolving to house the in-house Calibre MT5602 from 2015 onwards. This one comes as a full set — box, papers, and even the hand tag.", img:"/watch-4-tudor-black-bay.jpeg", sold:false },
  { id:5, brand:"Seiko", model:"Moon (Sayoko Yamaguchi)", era:"1990s", price:0, priceRange:"S$1,200–1,800", style:"Art Deco", condition:"Mint", movement:"Quartz", case_size:"28mm", case_material:"Stainless Steel", dial:"Cream", strap:"Calf Leather", tag:"Collector's Piece", desc:"An iconic piece by Seiko, remarkable not only for its melting-clock shape but for being the first Seiko designed by a woman — Sayoko Yamaguchi. An internationally renowned Japanese model and actress, she was commissioned by Seiko in the '90s to create a collection specifically designed for women, by women. These have become highly sought-after by collectors, and rumour has it that across all three moon variants, only around 1,000 pieces were produced — making them extremely limited. In mint condition, steel variant.", img:"/watch-5-seiko-sayoko.jpeg", sold:false },
  { id:6, brand:"Omega", model:"De Ville Ellipse Mesh", era:"1970s", price:0, priceRange:"S$500–700", style:"Dress", condition:"Good", movement:"Manual Wind", case_size:"31mm", case_material:"Stainless Steel", dial:"White Cream Sunburst", strap:"Mesh Bracelet", tag:"Just In", desc:"A vintage Omega De Ville in the ellipse shape — slightly smaller than the Universal Genève equivalent, but it absolutely delivers that classic ellipse aesthetic. Paired with a white cream sunburst dial and an interesting fish-scale-textured mesh bracelet that adds real character. Manual winding movement.", img:"/watch-6-omega-deville-ellipse-mesh.jpeg", sold:false },
  { id:7, brand:"Longines", model:"Sympathie", era:"1950s", price:0, priceRange:"S$400–600", style:"Art Deco", condition:"Restored", movement:"Manual Wind", case_size:"29mm", case_material:"Gold Filled", dial:"Black Enamel", strap:"Lizard", tag:"", desc:"The Longines Sympathie — a charming piece with its cushion-shaped case and pointed design. Classic, beautiful, and beloved by many collectors. Fun fact: the name \"Sympathie\" was actually a nickname given by collectors, not by Longines themselves. A piece definitely not to be missed.", img:"/watch-7-longines-sympathie.jpeg", sold:false },
  { id:8, brand:"Universal Genève", model:"White Shadow Ellipse", era:"1960s", price:0, priceRange:"S$1,000–1,500", style:"Dress", condition:"Good", movement:"Automatic", case_size:"34mm", case_material:"Stainless Steel", dial:"Silver Sunburst", strap:"Milanese Mesh", tag:"Rare Find", desc:"A Universal Genève White Shadow in the ellipse shape, housing a unique automatic microrotor calibre — the smallest of its era. Everyone needs an integrated bracelet in their collection, and this one delivers with a gorgeous sunburst dial and a different kind of wearability that's hard to match.", img:"/watch-8-ug-white-shadow.jpeg", sold:false },
  { id:9, brand:"Seiko", model:"Trapezoid", era:"1970s", price:0, priceRange:"S$300–500", style:"Dress", condition:"Good", movement:"Manual Wind", case_size:"30mm", case_material:"Gold Plated", dial:"Two-Tone", strap:"Calf Leather", tag:"Entry Pick", desc:"A trapezoid-shaped Seiko with a unique design language — the dial styling is reminiscent of the Longines Gilbert Albert, and the dial itself features two distinct shades that catch the light differently. Manual winding. A true conversation starter.", img:"/watch-9-seiko-trapezoid.jpeg", sold:false },
];

const ARTICLES = [
  { id:1, title:"The Seiko You Didn't Know About", subtitle:"How Seiko's JDM-only Asterisk line quietly rivalled the Jaeger-LeCoultre Reverso", category:"Deep Dive", date:"28 Mar 2026", readTime:"5 min", img:"/journal-seiko-asterisk.jpeg", featured:true, body:[
    {type:"text",content:"If you've ever browsed a vintage watch market in Singapore, you've probably walked past a Seiko Asterisk without knowing it. And that's exactly what makes it special — it's the watch that even watch people don't know about."},
    {type:"text",content:"Released exclusively for the Japanese domestic market in the mid-1980s, the Asterisk line was Seiko's answer to a question nobody outside Japan was asking: what if we made a reversible-case dress watch, but priced it for everyday wear?"},
    {type:"heading",content:"The Reverso Connection"},
    {type:"text",content:"The parallels to Jaeger-LeCoultre's iconic Reverso are impossible to ignore. Both feature rectangular cases that flip to reveal a second face. But while the Reverso was born from the polo fields and carries a five-figure price tag, the Asterisk was designed for the Tokyo salaryman — elegant, functional, and affordable."},
    {type:"text",content:"The Asterisk's case is gold-plated with a white dial featuring Roman numerals, housed in a slim profile that slides under a shirt cuff with ease. Flip it over and you'll find a second dial — some models mirror the front, others feature a simpler design for discreet time-checking during meetings."},
    {type:"heading",content:"Why It Matters Now"},
    {type:"text",content:"In a market obsessed with Rolex Submariners and Omega Speedmasters, the Asterisk represents something different: genuine horological creativity from a brand that had nothing to prove. Seiko wasn't trying to compete with JLC — they were solving a design problem in their own way."},
    {type:"text",content:"Today, Asterisks are hard to find in good condition. Compare that scarcity to a vintage Reverso, which starts north of S$5,000, and you begin to see why collectors in the know are quietly snapping these up."},
    {type:"heading",content:"What to Look For"},
    {type:"text",content:"The reversing mechanism should click firmly into place in both positions — any looseness suggests wear. Check the gold plating on the case edges, as this is where wear shows first. The crystal should be clean, though minor scratches can be polished out."},
    {type:"text",content:"If you find one with the original box and papers, you've struck gold. But even without, a well-preserved Asterisk is a conversation starter that punches well above its weight."},
  ]},
  { id:2, title:"Why Neo-Vintage Is the Smartest Entry Into Watches", subtitle:"Forget saving for a Submariner — here's why watches from the '50s to '90s are the sweet spot", category:"Opinion", date:"20 Mar 2026", readTime:"6 min", img:"/journal-titus-neovintage.jpeg", featured:false, body:[
    {type:"text",content:"There's a common trajectory in the watch world: you start by wanting a Rolex, realize you can't afford one, and either give up or buy a homage. But there's a third path that more collectors are discovering — neo-vintage."},
    {type:"heading",content:"What Is Neo-Vintage?"},
    {type:"text",content:"Neo-vintage refers to watches from roughly the 1950s to the 1990s — old enough to have character and history, but recent enough to be reliable daily wearers. Think pre-quartz Omega Seamasters, 1980s Seiko dress watches, and Cartier Tanks from the Must de Cartier era."},
    {type:"text",content:"These are watches from heritage brands, built during periods of genuine innovation, available at prices that won't require a bank loan. A beautiful Omega De Ville from the 1970s can be had for under S$500. A Seiko King Quartz that rivalled Swiss chronometers? Under S$300."},
    {type:"heading",content:"The Value Proposition"},
    {type:"text",content:"Unlike modern luxury watches where you're paying for marketing budgets and brand ambassadors, neo-vintage prices reflect the actual watchmaking. You're getting heritage, craftsmanship, and design at a fraction of what the same brands charge today."},
    {type:"text",content:"And unlike true vintage (pre-1950s), neo-vintage watches are robust enough for regular wear. Parts are still available, movements are well-documented, and a good watchmaker can keep them running for decades more."},
    {type:"heading",content:"Hidden Gems: Brands You Should Know"},
    {type:"text",content:"Some of the most interesting neo-vintage finds come from brands that don't get the spotlight today. Take Titus, often seen as \"Solvil et Titus\" — a brand that was widely sold during the Cold War era and was particularly popular in the Soviet Union. We recently handled a stunning Titus piece that stood out not just for its GMT hand and month-day complication, but because every numeral on the dial was written in Farsi. It's a perfect example of the kind of unique, historically rich timepiece you can only find in the neo-vintage space."},
    {type:"text",content:"These are the watches that tell stories — not just about watchmaking, but about the world they were made for. A Farsi-dial Titus sold in the Middle East during the Cold War carries more narrative weight than any modern limited edition ever could."},
    {type:"heading",content:"Why Now Is the Time"},
    {type:"text",content:"The neo-vintage market is still relatively under the radar compared to modern luxury or true vintage. Prices are accessible, the variety is extraordinary, and there's a real thrill in discovering a piece that most people have never seen before. Whether you're a first-time buyer or a seasoned collector looking for something different, neo-vintage is where the magic is."},
  ]},
  { id:3, title:"Cartier Tank Must: A Buyer's Guide", subtitle:"Everything you need to know before buying your first Must de Cartier Tank", category:"Guide", date:"12 Mar 2026", readTime:"8 min", img:"/journal-cartier-tank.jpeg", featured:false, body:[
    {type:"text",content:"The Cartier Tank is one of the most recognizable watch designs ever created — and for good reason. Designed by Louis Cartier in 1917, the Tank was inspired by the geometric lines of Renault tanks used in World War I. Its clean rectangular case, Roman numeral dial, and blue cabochon crown have remained virtually unchanged for over a century, making it one of the most enduring designs in all of horology."},
    {type:"heading",content:"A Brief History"},
    {type:"text",content:"The original Tank was presented to General John Pershing of the American Expeditionary Force in 1918. Commercial production began in 1919, and the watch quickly became a symbol of understated elegance. Over the decades, Cartier expanded the Tank family with variations like the Tank Française, Tank Américaine, and Tank Solo — but it was the Must de Cartier line, launched in the late 1970s, that truly democratized the design."},
    {type:"text",content:"The \"Must\" program was Cartier's masterstroke in making luxury accessible. By using vermeil cases (sterling silver with gold plating) instead of solid gold, and quartz movements instead of mechanical, Cartier brought the Tank's iconic design to a much wider audience without sacrificing the essence of what made it special."},
    {type:"heading",content:"Must vs. Cartier: What's the Difference?"},
    {type:"text",content:"The Must de Cartier Tank uses a vermeil case rather than solid gold, and the movements are typically quartz. But don't let the \"entry level\" label fool you — these are genuine Cartier watches, made in Switzerland, with the same iconic design DNA as their solid gold siblings. The dials come in a stunning variety of colours and patterns — from the classic white Roman to the coveted tricolour and checkered variants."},
    {type:"heading",content:"What to Look For When Buying"},
    {type:"text",content:"Case condition is everything. The vermeil finish wears over time, particularly on the edges and around the crown. Light wear adds character and patina; heavy wear may require replating, which can be costly. Always check that the blue sapphire cabochon crown is intact and original — replacements are a telltale sign of a less carefully maintained piece."},
    {type:"text",content:"Dial condition varies widely. The lacquered dials (tricolour, solid colours) are generally more durable than the painted dials. Look for even colour with no flaking or discoloration. Spider-web cracking on lacquered dials, while sometimes considered charming, does affect value."},
    {type:"heading",content:"The Iconic Dial Variants"},
    {type:"text",content:"The Must Tank came in an extraordinary range of dial designs. The classic white Roman is the most common and versatile. The tricolour — with diagonal stripes of gold, silver, and copper — is the most iconic and commands the highest prices. Then there are the solid-colour dials: burgundy, blue, black, and green, each with its own following. Rarer still are the checkered and wood-grain dials, which surface occasionally and generate real excitement among collectors."},
    {type:"heading",content:"Why the Must Tank Is a Smart Buy"},
    {type:"text",content:"In a world of oversized sport watches, the Must Tank is a breath of fresh air. It's slim enough to slide under any cuff, elegant enough for any occasion, and carries the weight of over a century of Cartier design heritage. At current market prices, it remains one of the most accessible ways to own a genuine piece of luxury watchmaking history."},
  ]},
  { id:4, title:"Behind the Booth: Our Katong Square Pop-Up", subtitle:"What it's really like running a 3-day watch pop-up in Singapore", category:"Behind the Scenes", date:"6 Mar 2026", readTime:"5 min", img:"/journal-katong-popup.jpeg", featured:false, body:[
    {type:"text",content:"Friday, Saturday, Sunday — three days of early mornings, starting the setup at 9 AM, unloading suitcases and trays of watches before the crowd arrives. That's The Retro Factory at Katong Square."},
    {type:"heading",content:"The Setup"},
    {type:"text",content:"Every pop-up begins the same way: lay the navy tablecloth, position the watch trays, arrange the display cases, and hope the weather cooperates. Katong Square is outdoors, which means hot and sunny days are part of the deal — but honestly, the energy makes it all worth it."},
    {type:"heading",content:"The People"},
    {type:"text",content:"The best part of any pop-up is always the people. We get amazing customers and watch enthusiasts from all walks of life, as well as regulars who come back every month. There's the uncle who shares his love, passion, and decades of knowledge about vintage watches. The student buying their very first vintage piece. The couple picking out a matching pair. Each interaction reminds us why we do this."},
    {type:"heading",content:"More Than Just Selling"},
    {type:"text",content:"A Naxo pop-up isn't just about buying and selling. We help customers change watch batteries, swap out straps, and assist with whatever they need. We chat about the latest watch news, discuss new finds, and sometimes we bring out our precious hard-to-find pieces — the ones that aren't for sale — just to share them with fellow enthusiasts."},
    {type:"text",content:"One of the highlights is our special roll-the-dice game, where customers get a chance to win a discount on their purchase. It adds a bit of fun and always gets people laughing."},
    {type:"heading",content:"The Vibe"},
    {type:"text",content:"Hot sun, cold sake, great conversations, and watches with stories to tell. That's The Retro Factory in a nutshell. If you haven't visited one yet, come find us at the next one — we'd love to meet you."},
  ]},
  { id:5, title:"5 Watches Under S$1,000 That Look Like a Million Bucks", subtitle:"Affordable neo-vintage picks that punch way above their weight", category:"Guide", date:"25 Feb 2026", readTime:"6 min", img:"/journal-under1000.jpeg", featured:false, body:[
    {type:"text",content:"You don't need deep pockets to wear something special. Here are some watches we regularly stock that deliver serious style and heritage — all for under S$1,000."},
    {type:"heading",content:"1. Seiko Dolce (S$250–350)"},
    {type:"text",content:"Seiko's Japan-only Dolce line is criminally underrated. Thin cases, beautiful dials, and the kind of quiet refinement you'd expect from a watch costing three times as much. The two-tone models are particularly striking, and the build quality punches well above its modest price point."},
    {type:"text",content:"Worth noting: Seiko also produced the Exceline and Tisse lines — both designed as ladies' models. The Exceline shares the same DNA as the Dolce but in more petite proportions, while the Tisse offered a slightly more contemporary aesthetic. If you're looking for a matching pair or a gift, these sister lines are excellent options in a similar price range."},
    {type:"heading",content:"2. Omega De Ville (S$500–1,000)"},
    {type:"text",content:"The Omega De Ville range from the late '70s through the '80s is one of the best value propositions in vintage watches. Available in both quartz and manual-winding variants, these offer genuine Swiss luxury branding and elegant designs at a fraction of what Omega charges today. The quartz models are ultra-reliable daily wearers, while the manual-wind versions appeal to purists who enjoy the ritual of winding their watch each morning."},
    {type:"text",content:"Case shapes range from classic round to the distinctive cushion and ellipse forms. Dials come in everything from clean white with Roman numerals to textured black with gold indices. Whatever your style, there's a De Ville that fits — and at these prices, you might end up with more than one."},
    {type:"heading",content:"3. Citizen Exceed (S$500–700)"},
    {type:"text",content:"Often overlooked in favour of Seiko, Citizen's Exceed line is one of the best-kept secrets in Japanese watchmaking. Launched as Citizen's premium dress watch range, the Exceed was designed to compete with the finest Swiss offerings — and it delivered. These watches feature incredibly thin profiles, sapphire crystals, and titanium or stainless steel cases with exceptional finishing."},
    {type:"text",content:"What makes the Exceed special is the attention to detail: mirror-polished cases, finely printed dials, and a wearing experience that feels far more expensive than it is. Some models even featured eco-drive movements decades before solar-powered watches became mainstream. For the price, you're getting a level of craftsmanship that most brands can't touch."},
  ]},
];

const MILESTONES = [
  {year:"2023",title:"The Spark",desc:"Two classmates at Temasek Polytechnic discover a shared love for vintage watches."},
  {year:"2024",title:"Naxo Is Born",desc:"Officially launches with hand-picked Seiko and Omega pieces."},
  {year:"2024",title:"First Pop-Up",desc:"Our debut pop-up draws a crowd of curious collectors."},
  {year:"2024",title:"100 Watches Sold",desc:"A milestone that proved this wasn't just a hobby."},
  {year:"2025",title:"500+ Watches",desc:"Collection expands to Cartier, Longines, JLC, and more."},
  {year:"2026",title:"Going Online",desc:"We launch naxotimepieces.com."},
];

// ─── Shared Components ───

function useIsMobile() {
  const[mobile,setMobile]=useState(false);
  useEffect(()=>{const check=()=>setMobile(window.innerWidth<768);check();window.addEventListener("resize",check);return()=>window.removeEventListener("resize",check)},[]);
  return mobile;
}

// Line-icon set (24px grid, stroke-based, same family). Use: <Icon name="tag" size={28} color={BRAND.gold}/>
const ICONS={
  instagram:'<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  send:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  tag:'<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  box:'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  battery:'<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/>',
  wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',
  gem:'<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  drop:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  dial:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
};
function Icon({name,size=24,color="currentColor",stroke=1.5}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display:"block",flexShrink:0,color}} dangerouslySetInnerHTML={{__html:ICONS[name]||""}}/>;
}

function Reveal({children,delay=0,direction="up"}) {
  const ref=useRef(null); const[v,setV]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:0.08,rootMargin:"0px 0px -40px 0px"});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  const transforms={up:"translateY(40px)",down:"translateY(-40px)",left:"translateX(40px)",right:"translateX(-40px)",scale:"scale(0.95)"};
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0) translateX(0) scale(1)":(transforms[direction]||transforms.up),transition:`all 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`}}>{children}</div>;
}

function Counter({end,suffix="",duration=2000}) {
  const[count,setCount]=useState(0);const ref=useRef(null);const started=useRef(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;const s=performance.now();const step=(n)=>{const p=Math.min((n-s)/duration,1);setCount(Math.floor(p*end));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}},{threshold:0.5});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[end,duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Nav({scrolled,currentPage,navigate}) {
  const links=["Home","Shop","About","Journal","Events","Servicing","Contact"];
  const mobile=useIsMobile();
  const[menuOpen,setMenuOpen]=useState(false);
  return (
    <nav style={{background:scrolled?"rgba(26,39,68,0.97)":"rgba(26,39,68,0.85)",backdropFilter:"blur(12px)",transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)",borderBottom:`1px solid rgba(201,168,76,${scrolled?"0.15":"0.08"})`}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:scrolled?60:68,transition:"height 0.5s ease"}}>
        <a onClick={()=>{navigate("home");setMenuOpen(false)}} style={{cursor:"pointer",display:"flex",alignItems:"center"}}>
          <img src="/naxo-logo-white.png" alt="Naxo Timepieces" style={{height:mobile?36:48,objectFit:"contain",transition:"height 0.3s"}}/>
        </a>
        {mobile?<>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",color:BRAND.gold,fontSize:24,cursor:"pointer",padding:8,transition:"transform 0.3s",transform:menuOpen?"rotate(90deg)":"rotate(0deg)"}}>{menuOpen?"✕":"☰"}</button>
          <div style={{position:"absolute",top:"100%",left:0,right:0,background:"rgba(26,39,68,0.98)",backdropFilter:"blur(12px)",borderBottom:`1px solid rgba(201,168,76,0.15)`,padding:menuOpen?"16px 0":"0",maxHeight:menuOpen?"400px":"0",opacity:menuOpen?1:0,overflow:"hidden",transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)"}}>
            {links.map((l,li)=>{const key=l.toLowerCase();return(
              <a key={l} onClick={()=>{navigate(key==="home"?"home":key);setMenuOpen(false)}} style={{display:"block",padding:"14px 24px",fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:currentPage===(key==="home"?"home":key)?BRAND.gold:"rgba(255,255,255,0.7)",textDecoration:"none",letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",transition:`all 0.3s ease ${li*0.05}s`,transform:menuOpen?"translateX(0)":"translateX(-20px)",opacity:menuOpen?1:0}}>{l}</a>
            )})}
          </div>
        </>:
        <div style={{display:"flex",gap:32,alignItems:"center"}}>
          {links.map(l=>{const key=l.toLowerCase();return(
            <a key={l} onClick={()=>navigate(key==="home"?"home":key)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:currentPage===(key==="home"?"home":key)?BRAND.gold:"rgba(255,255,255,0.65)",textDecoration:"none",letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",transition:"color 0.3s"}}
            onMouseEnter={e=>e.target.style.color=BRAND.gold} onMouseLeave={e=>{if(currentPage!==(key==="home"?"home":key))e.target.style.color="rgba(255,255,255,0.65)"}}>{l}</a>
          )})}
        </div>}
      </div>
    </nav>
  );
}

function Footer({navigate}) {
  const m=useIsMobile();
  const brands=[
    {src:"/brand-omega.png",name:"Omega"},
    {src:"/brand-rolex.png",name:"Rolex"},
    {src:"/brand-tudor.png",name:"Tudor"},
    {src:"/brand-cartier.png",name:"Cartier"},
    {src:"/brand-longines.png",name:"Longines"},
    {src:"/brand-universal.png",name:"Universal Genève",scale:1.35},
    {src:"/brand-favreleuba.png",name:"Favre Leuba",scale:0.95},
    {src:"/brand-patek.png",name:"Patek Philippe"},
    {src:"/brand-seiko.png",name:"Seiko"},
    {src:"/brand-grandseiko.png",name:"Grand Seiko"},
    {src:"/brand-credor.png",name:"Credor"},
  ];
  const links=[["Shop","shop"],["About","about"],["Journal","journal"],["Events","events"],["Servicing","servicing"],["Contact","contact"]];
  return (
    <footer style={{background:BRAND.deepNavy,borderTop:`1px solid rgba(201,168,76,0.12)`}}>
      {/* Brand logos row */}
      <div style={{borderBottom:`1px solid rgba(201,168,76,0.08)`,padding:"32px 0"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 60px"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:"rgba(245,240,232,0.3)",letterSpacing:4,textTransform:"uppercase",textAlign:"center",marginBottom:24}}>Brands We Carry</div>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:m?20:36}}>
            {brands.map(b=>(
              <img key={b.name} src={b.src} alt={b.name} style={{height:(m?20:26)*(b.scale||1),objectFit:"contain",opacity:0.35,filter:"brightness(0) invert(1)",transition:"opacity 0.3s"}}
                onMouseEnter={e=>e.target.style.opacity="0.75"}
                onMouseLeave={e=>e.target.style.opacity="0.35"}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Main footer row */}
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"28px 20px":"36px 60px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr 1fr",gap:m?28:0,alignItems:"center"}}>
        <a onClick={()=>navigate("home")} style={{cursor:"pointer"}}>
          <img src="/naxo-logo-white.png" alt="Naxo Timepieces" style={{height:36,objectFit:"contain"}}/>
        </a>
        <div style={{display:"flex",justifyContent:m?"flex-start":"center",gap:m?16:28,flexWrap:"wrap"}}>
          {links.map(([label,key])=>(
            <a key={key} onClick={()=>navigate(key)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(245,240,232,0.4)",letterSpacing:2,textTransform:"uppercase",cursor:"pointer",transition:"color 0.3s",textDecoration:"none"}}
              onMouseEnter={e=>e.target.style.color=BRAND.gold}
              onMouseLeave={e=>e.target.style.color="rgba(245,240,232,0.4)"}>{label}</a>
          ))}
        </div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(245,240,232,0.25)",letterSpacing:1,textAlign:m?"left":"right"}}>© 2026 Naxo Timepieces</div>
      </div>
    </footer>
  );
}

function PageHero({tag,title,titleGold,subtitle}) {
  const[loaded,setLoaded]=useState(false);const m=useIsMobile();useEffect(()=>{setTimeout(()=>setLoaded(true),100)},[]);
  return(
    <section style={{paddingTop:100,paddingBottom:60,background:`linear-gradient(160deg,${BRAND.deepNavy} 0%,${BRAND.navy} 60%,#1e3255 100%)`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)`,backgroundSize:"80px 80px"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"60px 20px 30px":"80px 40px 40px",position:"relative"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:6,textTransform:"uppercase",marginBottom:24,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.2s"}}>{tag}</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,5vw,64px)",color:BRAND.cream,fontWeight:700,lineHeight:1.08,margin:"0 0 24px",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(40px)",transition:"all 1s ease 0.4s"}} dangerouslySetInnerHTML={{__html:titleGold?`${title} <span style="color:${BRAND.gold};font-style:italic">${titleGold}</span>`:title}}/>
        {subtitle&&<p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"rgba(245,240,232,0.5)",maxWidth:480,lineHeight:1.7,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(30px)",transition:"all 0.8s ease 0.6s"}}>{subtitle}</p>}
      </div>
    </section>
  );
}

function GoldButton({children,onClick,ghost=false}) {
  return <button onClick={onClick} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,letterSpacing:3,textTransform:"uppercase",background:ghost?"transparent":BRAND.gold,color:ghost?BRAND.cream:BRAND.navy,border:ghost?`1px solid rgba(245,240,232,0.25)`:"none",padding:"16px 36px",cursor:"pointer",fontWeight:600,transition:"all 0.3s",position:"relative",zIndex:5}}
  onMouseEnter={e=>{if(ghost){e.target.style.borderColor=BRAND.gold;e.target.style.color=BRAND.gold}else{e.target.style.background="#d4b45e"}}}
  onMouseLeave={e=>{if(ghost){e.target.style.borderColor="rgba(245,240,232,0.25)";e.target.style.color=BRAND.cream}else{e.target.style.background=BRAND.gold}}}>{children}</button>;
}

// ═══════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════

function HomePage({navigate,openWatch}) {
  const[loaded,setLoaded]=useState(false);const[hovId,setHovId]=useState(null);const[sellHov,setSellHov]=useState(null);const m=useIsMobile();
  useEffect(()=>{setTimeout(()=>setLoaded(true),100)},[]);
  const FEATURED_IDS=[54,63,52,50,51,60,68,66,65];const featured=FEATURED_IDS.map(id=>WATCHES.find(w=>w.id===id)).filter(w=>w&&!w.sold);

  return(<>
    {/* HERO */}
    <section style={{position:"relative",minHeight:"100vh",overflow:"hidden",background:BRAND.deepNavy}}>
      {/* Full bleed background image with overlay */}
      <div style={{position:"absolute",inset:0,backgroundImage:`url('/hero-watches.jpeg')`,backgroundSize:"cover",backgroundPosition:"center"}}/>
      {/* Scrim: dark behind the text, photo shows at full strength on the right */}
      <div style={{position:"absolute",inset:0,background:m?"rgba(15,26,48,0.72)":"linear-gradient(90deg,rgba(15,26,48,0.9) 0%,rgba(15,26,48,0.62) 40%,rgba(15,26,48,0.12) 75%,rgba(15,26,48,0.05) 100%)"}}/>
      {/* Gold grain overlay */}
      <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:`radial-gradient(circle at 1px 1px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      {/* Left side gold accent bar */}
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,transparent,${BRAND.gold},transparent)`,opacity:0.6}}/>

      {/* Main content — padded top to clear fixed header (marquee ~34px + nav ~68px) */}
      <div style={{position:"relative",zIndex:2,maxWidth:1400,margin:"0 auto",padding:m?"102px 20px 140px":"110px 60px 160px",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {/* Top label */}
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:"all 0.7s ease 0.1s",marginBottom:m?24:32,display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:40,height:1,background:BRAND.gold}}/>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.gold,letterSpacing:6,textTransform:"uppercase"}}>Est. 2023 · Singapore</span>
        </div>

        {/* Giant editorial headline */}
        <div style={{maxWidth:m?"100%":700}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:BRAND.cream,lineHeight:1,margin:"0 0 40px",opacity:loaded?1:0,transition:"all 1s ease 0.3s"}}>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)"}}>Vintage watches</span>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)"}}>you'll <span style={{color:BRAND.gold,fontStyle:"italic"}}>actually</span></span>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)"}}>want to wear.</span>
          </h1>

          {/* Subtitle + CTA */}
          <div style={{opacity:loaded?1:0,transition:"all 0.8s ease 0.7s"}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?16:19,color:"rgba(245,240,232,0.55)",lineHeight:1.75,maxWidth:420,margin:"0 0 36px"}}>
              Neo-vintage watches from the 1950s to the 1990s, inspected and authenticated before they reach you. Based in Singapore.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <GoldButton onClick={()=>navigate("shop")}>Browse Collection</GoldButton>
              <GoldButton ghost onClick={()=>navigate("about")}>Our Story</GoldButton>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,20,45,0.85)",backdropFilter:"blur(12px)",borderTop:`1px solid rgba(201,168,76,0.2)`}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:m?"16px 20px":"28px 60px",display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:m?16:0}}>
          {[{n:500,s:"+",l:"Watches Sold"},{n:30,s:"+",l:"Pop-Ups Held"},{n:15,s:"",l:"Brands Curated"},{n:1300,s:"+",l:"Happy Collectors"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center",padding:m?0:"0 40px",borderRight:!m&&i<3?`1px solid rgba(201,168,76,0.15)`:"none"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?26:36,color:BRAND.gold,fontWeight:700,lineHeight:1}}><Counter end={s.n} suffix={s.s}/></div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:"rgba(245,240,232,0.45)",letterSpacing:3,textTransform:"uppercase",marginTop:6}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURED COLLECTION */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:60}}>
          <div>
            
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4vw,56px)",color:BRAND.navy,fontWeight:700,margin:0}}>Just in</h2>
          </div>
          <a onClick={()=>navigate("shop")} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.navy,letterSpacing:3,textTransform:"uppercase",textDecoration:"none",borderBottom:`1px solid ${BRAND.gold}`,paddingBottom:4,cursor:"pointer"}}>View All →</a>
        </div>
        {/* Brand pills */}
        <div style={{display:"flex",gap:8,marginBottom:48,flexWrap:"wrap",overflowX:m?"auto":"visible"}}>
          {["All","Seiko","Omega","Cartier","Longines","Universal Genève","Rolex"].map((cat,i)=>(
            <button key={cat} onClick={()=>navigate("shop")} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",background:i===0?BRAND.navy:"transparent",color:i===0?BRAND.cream:BRAND.navy,border:`1px solid ${i===0?BRAND.navy:"rgba(26,39,68,0.2)"}`,padding:"10px 24px",cursor:"pointer",transition:"all 0.3s"}}>{cat}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(3,1fr)",gap:24}}>
          {featured.map((w,i)=>(
            <div key={w.id} onMouseEnter={()=>setHovId(w.id)} onMouseLeave={()=>setHovId(null)} onClick={()=>openWatch(w.id)} style={{position:"relative",cursor:"pointer",overflow:"hidden",background:BRAND.cream}}>
              <div style={{width:"100%",paddingBottom:"100%",background:`url('${w.img}') center 20%/cover`,transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",transform:hovId===w.id?"scale(1.05)":"scale(1)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 24px 24px",background:"linear-gradient(transparent,rgba(15,26,48,0.85))"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>{[w.era,w.style].filter(Boolean).join(" · ")}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600}}>{w.brand}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(245,240,232,0.7)",marginBottom:8}}>{w.model}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.gold,fontWeight:600}}>{w.price>0?"S$"+w.price.toLocaleString():"Enquire"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* SELL YOUR WATCH */}
    <section style={{background:`linear-gradient(160deg,${BRAND.deepNavy} 0%,${BRAND.navy} 100%)`,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?32:80,alignItems:"center",position:"relative"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:20}}>Buy · Trade · Consign</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4vw,52px)",color:BRAND.cream,fontWeight:700,lineHeight:1.1,margin:"0 0 24px"}}>Got a watch sitting<br/>in a drawer?</h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"rgba(245,240,232,0.55)",lineHeight:1.8,marginBottom:40,maxWidth:440}}>We buy, trade, and consign — Seiko, Omega, Cartier, Rolex and more. Send us photos on WhatsApp and you'll get an honest number, not a lowball.</p>
          <div style={{display:"flex",gap:16}}>
            <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20get%20a%20quote%20for%20my%20watch.","_blank")}>Get a Quote</GoldButton>
            <GoldButton ghost onClick={()=>navigate("howitworks")}>How It Works</GoldButton>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {[{icon:"cash",title:"Sell",desc:"Get a fair cash offer. No lowballing — we value your timepiece honestly."},{icon:"repeat",title:"Trade",desc:"Swap your current piece towards something new from our collection."},{icon:"box",title:"Consign",desc:"Let us sell it for you. We handle photos, listing, and buyer communication."}].map((s,i)=>(
            <div key={s.title} onMouseEnter={()=>setSellHov(i)} onMouseLeave={()=>setSellHov(null)} style={{display:"flex",alignItems:"center",gap:24,padding:"28px 32px",background:sellHov===i?"rgba(201,168,76,0.08)":"rgba(245,240,232,0.03)",border:`1px solid ${sellHov===i?"rgba(201,168,76,0.3)":"rgba(245,240,232,0.06)"}`,transition:"all 0.4s",cursor:"pointer",transform:sellHov===i?"translateX(8px)":"translateX(0)"}}>
              <div style={{width:48,display:"flex",justifyContent:"center",flexShrink:0}}><Icon name={s.icon} size={28} color={BRAND.gold} stroke={1.4}/></div>
              <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.cream,fontWeight:600,marginBottom:6}}>{s.title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"rgba(245,240,232,0.5)",lineHeight:1.6}}>{s.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* TRUST SIGNALS */}
    <section style={{background:BRAND.cream,padding:"80px 0",borderTop:`1px solid rgba(201,168,76,0.1)`}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:52}}>
          
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Why people buy from us</h2>
        </div></Reveal>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:m?16:24}}>
          {[
            {icon:"shield",title:"Checked before listing",desc:"Every piece is personally inspected and authenticated before it reaches you."},
            {icon:"tag",title:"Fair prices",desc:"Ask us what a watch costs and you'll get a straight answer. No hidden fees, no hard sell."},
            {icon:"repeat",title:"Buy, trade, consign",desc:"Sell outright, trade up, or let us sell it for you."},
            {icon:"pin",title:"See it in person",desc:"View watches by appointment at Far East Plaza, or find us at a pop-up."},
          ].map((t,i)=>(
            <Reveal key={i} delay={i*0.08}><div style={{textAlign:"center",padding:m?"24px 16px":"32px 24px"}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><Icon name={t.icon} size={30} color={BRAND.gold} stroke={1.4}/></div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:BRAND.navy,fontWeight:700,marginBottom:10}}>{t.title}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7,margin:0}}>{t.desc}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* EVENTS */}
    <section style={{background:BRAND.cream,padding:"100px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.navy,fontWeight:700,margin:"0 0 48px"}}>Find us at a pop-up</h2>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:24}}>
          {[{title:"Rolling Good Old Times",date:"21–22 Nov 2026",loc:"Fountain Square, Clarke Quay",note:"12PM–10PM"},{title:"The Retro Factory",date:"4–6 Dec 2026",loc:"Katong Square",note:"11AM–10PM"}].map((ev,i)=>(
            <div key={i} onClick={()=>navigate("events")} style={{border:`1px solid rgba(26,39,68,0.12)`,padding:40,position:"relative",background:BRAND.warmWhite,cursor:"pointer",transition:"all 0.4s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=BRAND.gold} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(26,39,68,0.12)"}>
              {ev.note&&<div style={{position:"absolute",top:16,right:16,background:BRAND.gold,padding:"6px 14px",fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.navy,letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>{ev.note}</div>}
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>{ev.date}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.navy,fontWeight:700,marginBottom:8}}>{ev.title}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone}}>{ev.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{background:BRAND.deepNavy,padding:"100px 0",textAlign:"center",position:"relative"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 2px 2px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:600,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4vw,52px)",color:BRAND.cream,fontWeight:700,lineHeight:1.15,margin:"0 0 24px"}}>See one you like?</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"rgba(245,240,232,0.55)",lineHeight:1.7,marginBottom:40}}>DM us on Instagram or WhatsApp, or send a message through the form. Looking for something specific? Tell us and we'll keep an eye out.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <GoldButton onClick={()=>navigate("contact")}>Contact Us</GoldButton>
          <GoldButton ghost onClick={()=>navigate("shop")}>Browse Watches</GoldButton>
        </div>
      </div>
    </section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: SHOP
// ═══════════════════════════════════════════

function ShopPage({navigate,openWatch,F,setF}) {
  const m=useIsMobile();
  const{brand,style,sort,showSold,q}=F;
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const[hovId,setHovId]=useState(null);
  const pool=WATCHES.filter(w=>showSold||!w.sold);
  const brandCounts=Object.entries(pool.reduce((a,w)=>{a[w.brand]=(a[w.brand]||0)+1;return a},{})).sort((a,b)=>a[0].localeCompare(b[0]));
  const STYLES=["Dress","Diver","Sport","Art Deco"];
  let f=pool.filter(w=>{if(brand!=="All"&&w.brand!==brand)return false;if(style!=="All"&&w.style!==style)return false;if(q){const s=q.toLowerCase();return(w.brand+" "+w.model+" "+w.era+" "+w.style).toLowerCase().includes(s)}return true});
  if(sort==="Brand A–Z")f=[...f].sort((a,b)=>a.brand.localeCompare(b.brand));
  const selS={fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.navy,background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.15)`,padding:"10px 12px",outline:"none",cursor:"pointer",minWidth:m?0:170,flex:m?"1 1 45%":"0 0 auto"};
  const chip=(label,onX)=><button key={label} onClick={onX} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.navy,background:"rgba(201,168,76,0.16)",border:"none",padding:"5px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>{label}<span style={{fontSize:15,lineHeight:1,opacity:0.6}}>×</span></button>;
  const active=brand!=="All"||style!=="All"||q;

  return(<>
    <PageHero tag="The Collection" title="In the case right now" titleGold="" subtitle="Everything we currently have, plus the pieces that have already found a home. Open any watch for the full details."/>
    {/* Filters */}
    <section style={{background:BRAND.cream,borderBottom:`1px solid rgba(26,39,68,0.08)`,position:m?"static":"sticky",top:92,zIndex:50}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"16px 20px":"16px 40px"}}>
        <div style={{display:"flex",alignItems:"center",gap:m?10:14,flexWrap:"wrap"}}>
          <input type="text" placeholder="Search watches" value={q} onChange={e=>set("q",e.target.value)} style={{padding:"10px 14px",fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.navy,background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.15)`,outline:"none",width:m?"100%":240,letterSpacing:0.5}}/>
          <select aria-label="Brand" value={brand} onChange={e=>set("brand",e.target.value)} style={selS}>
            <option value="All">All brands</option>
            {brandCounts.map(([b,n])=><option key={b} value={b}>{b} ({n})</option>)}
          </select>
          <select aria-label="Style" value={style} onChange={e=>set("style",e.target.value)} style={selS}>
            <option value="All">All styles</option>
            {STYLES.map(x=><option key={x} value={x}>{x}</option>)}
          </select>
          <select aria-label="Sort" value={sort} onChange={e=>set("sort",e.target.value)} style={selS}>
            {["Newest","Brand A–Z"].map(o=><option key={o}>{o}</option>)}
          </select>
          {!m&&<div style={{flex:1}}/>}
          <label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.stone,display:"flex",alignItems:"center",gap:8,cursor:"pointer",width:m?"100%":"auto"}}><input type="checkbox" checked={showSold} onChange={e=>set("showSold",e.target.checked)} style={{accentColor:BRAND.gold,width:16,height:16}}/>Include sold</label>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginTop:12}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.stone,letterSpacing:1}}>{f.length} {f.length===1?"watch":"watches"}</span>
          {brand!=="All"&&chip(brand,()=>set("brand","All"))}
          {style!=="All"&&chip(style,()=>set("style","All"))}
          {q&&chip("“"+q+"”",()=>set("q",""))}
          {active&&<button onClick={()=>setF(p=>({...p,brand:"All",style:"All",q:""}))} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone,background:"none",border:"none",borderBottom:`1px solid ${BRAND.gold}`,cursor:"pointer",padding:"2px 0"}}>Clear all</button>}
        </div>
      </div>
    </section>
    {/* Grid */}
    <section style={{padding:"48px 0 100px",background:BRAND.warmWhite}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        {f.length===0?<div style={{textAlign:"center",padding:"100px 0",fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:BRAND.stone}}>No watches found — try adjusting filters</div>:
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(3,1fr)",gap:20}}>
          {f.map((w,i)=>(
            <div key={w.id} onMouseEnter={()=>setHovId(w.id)} onMouseLeave={()=>setHovId(null)} onClick={()=>openWatch(w.id)} style={{display:"flex",flexDirection:"column",cursor:"pointer",overflow:"hidden",background:BRAND.cream}}>
              <div style={{width:"100%",paddingBottom:"100%",position:"relative",overflow:"hidden",flexShrink:0}}>
                <div style={{position:"absolute",inset:0,background:`url('${w.img}') center 20%/cover`,transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",transform:hovId===w.id?"scale(1.05)":"scale(1)"}}/>
                {w.tag&&!w.sold&&<div style={{position:"absolute",top:10,left:10,background:w.tag==="Just In"?BRAND.gold:BRAND.navy,color:w.tag==="Just In"?BRAND.navy:BRAND.gold,fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",padding:"4px 10px",fontWeight:600}}>{w.tag}</div>}
                {w.sold&&<div style={{position:"absolute",inset:0,background:"rgba(15,26,48,0.35)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:m?14:18,color:BRAND.cream,letterSpacing:m?4:6,textTransform:"uppercase",padding:m?"8px 18px":"10px 28px",border:"2px solid rgba(245,240,232,0.6)",fontWeight:700}}>Sold</span></div>}
              </div>
              <div style={{padding:m?"12px 12px 16px":"16px 16px 20px",borderTop:`1px solid rgba(201,168,76,${hovId===w.id?"0.4":"0.1"})`,transition:"border-color 0.4s",background:BRAND.cream,flex:1,display:"flex",flexDirection:m?"column":"row",justifyContent:m?"flex-start":"space-between",alignItems:m?"flex-start":"flex-start",gap:m?2:0}}>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?9:10,color:BRAND.gold,letterSpacing:m?2:3,textTransform:"uppercase",marginBottom:4}}>{[w.era,w.style].filter(Boolean).join(" · ")}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?14:16,color:BRAND.navy,fontWeight:600,lineHeight:1.3}}>{w.brand}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?12:13,color:BRAND.stone,marginTop:2,lineHeight:1.3}}>{w.model}</div>
                </div>
                <div style={{textAlign:m?"left":"right",flexShrink:0,marginLeft:m?0:8,marginTop:m?6:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?12:13,color:w.sold?BRAND.stone:BRAND.gold,fontWeight:600,textDecoration:w.sold?"line-through":"none"}}>{w.sold?"Sold":"Enquire"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </section>
    {/* Sourcing CTA */}
    <section style={{background:BRAND.navy,padding:"60px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
        <div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.cream,fontWeight:700,margin:"0 0 8px"}}>Looking for something specific?</h3><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.5)",margin:0}}>We source watches on request. Tell us what you're after.</p></div>
        <GoldButton onClick={()=>navigate("contact")}>Request a Watch</GoldButton>
      </div>
    </section>
  </>);
}

// ─── Marquee Banner ───
function MarqueeBanner({navigate}) {
  // Switches itself to the December event from 23 Nov (SGT)
  const[afterClarke,setAfterClarke]=useState(false);
  useEffect(()=>{setAfterClarke(Date.now()>=Date.UTC(2026,10,22,16,0))},[]);
  const NEXT=afterClarke?"Next up: The Retro Factory, Katong Square, 4–6 Dec":"Next up: Rolling Good Old Times, Clarke Quay, 21–22 Nov";
  const items=[NEXT,"Buy · Sell · Trade · Consign · Repair",NEXT,"Buy · Sell · Trade · Consign · Repair"];
  const text=items.join("   /   ");
  return(
    <div style={{background:BRAND.gold,overflow:"hidden",padding:"8px 0",cursor:"pointer"}} onClick={()=>navigate("events")}>
      <div className="marquee-track" style={{display:"flex",whiteSpace:"nowrap"}}>
        {[...Array(4)].map((_,i)=>(
          <span key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.navy,letterSpacing:2,textTransform:"uppercase",paddingRight:80,flexShrink:0}}>{text}</span>
        ))}
      </div>
    </div>
  );
}


function GalleryScroll({photos}) {
  const scrollRef=useRef(null);const m=useIsMobile();const[isDragging,setIsDragging]=useState(false);const[startX,setStartX]=useState(0);const[scrollLeft,setScrollLeft]=useState(0);
  const onDown=(e)=>{setIsDragging(true);setStartX((e.pageX||e.touches?.[0]?.pageX||0)-scrollRef.current.offsetLeft);setScrollLeft(scrollRef.current.scrollLeft)};
  const onUp=()=>setIsDragging(false);
  const onMove=(e)=>{if(!isDragging)return;e.preventDefault();const x=(e.pageX||e.touches?.[0]?.pageX||0)-scrollRef.current.offsetLeft;scrollRef.current.scrollLeft=scrollLeft-(x-startX)*1.5};
  return(
    <div ref={scrollRef} onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp} onMouseMove={onMove} onTouchStart={onDown} onTouchEnd={onUp} onTouchMove={onMove}
      style={{display:"flex",gap:m?12:16,padding:"20px 40px",overflowX:"auto",cursor:isDragging?"grabbing":"grab",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
      <style>{`.gallery-scroll::-webkit-scrollbar{display:none}`}</style>
      {photos.map((src,i)=>{const h=m?220:[280,320,260,300,240,310,270,290,250,320,280][i%11];return(
        <div key={i} style={{flexShrink:0,width:m?260:360,height:h,borderRadius:4,overflow:"hidden",position:"relative",transform:`translateY(${i%2===0?0:30}px)`,pointerEvents:isDragging?"none":"auto"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`url('${src}')`,backgroundPosition:"center",backgroundSize:"cover",transition:"transform 0.6s cubic-bezier(0.22,1,0.36,1)"}}
            onMouseEnter={e=>{if(!isDragging)e.currentTarget.style.transform="scale(1.08)"}}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          />
        </div>
      )})}
    </div>
  );
}

// ═══════════════════════════════════════════
// PAGE: ABOUT
// ═══════════════════════════════════════════

function AboutPage({navigate}) {
  const m=useIsMobile();
  return(<>
    <PageHero tag="Our Story" title="It started between lectures" titleGold="" subtitle="Naxo started with two friends who couldn't stop looking at watch listings. Now we run pop-ups and sell to people who feel the same way."/>
    {/* Story */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?32:80,alignItems:"center"}}>
      <Reveal><div style={{borderLeft:`3px solid ${BRAND.gold}`,paddingLeft:40}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,2.5vw,36px)",color:BRAND.navy,fontWeight:600,lineHeight:1.4,fontStyle:"italic",marginBottom:32}}>"We believe every watch tells a story, good or bad. It's a legacy handed down from one owner to the next, and we get to pass it on."</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase"}}>— The Founders</div></div></Reveal>
      <Reveal delay={0.2}><div><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.85,marginBottom:24}}>We were classmates at Temasek Polytechnic and found out we were equally into old watches. First we swapped finds between lectures. Then we started staying up late to hunt for the next one together.</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.85}}>Naxo is what that turned into. We think a watch with real history shouldn't need a huge budget, and that buying one shouldn't feel like walking into a shop where nobody talks to you. So we keep it simple: honest condition notes, fair prices, and pop-ups where you can pick a watch up and ask us anything.</p></div></Reveal>
    </div></section>
    {/* Photo Gallery - Horizontal Scroll Parallax */}
    <section style={{background:BRAND.cream,padding:"100px 0 80px",overflow:"hidden"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:56}}>
          
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.navy,fontWeight:700,margin:0}}>The crew</h2>
        </div></Reveal>
      </div>
      <GalleryScroll photos={["/gallery-1.jpeg","/gallery-2.jpeg","/gallery-3.jpeg","/gallery-4.jpeg","/gallery-5.jpeg","/gallery-6.jpeg","/gallery-7.jpeg","/gallery-8.jpeg","/gallery-9.jpeg","/gallery-10.jpeg","/gallery-11.jpeg"]}/>
    </section>
    {/* Timeline */}
    <section style={{background:BRAND.navy,padding:"100px 0",position:"relative"}}><div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 1.5px 1.5px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      <div style={{maxWidth:900,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:64}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.cream,fontWeight:700,margin:0}}>How we got here</h2></div></Reveal>
        <div style={{position:"relative"}}><div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"rgba(201,168,76,0.25)",transform:"translateX(-50%)"}}/>
          {MILESTONES.map((m,i)=>{const isL=i%2===0;return(<Reveal key={i} delay={i*0.08}><div style={{display:"grid",gridTemplateColumns:"1fr 50px 1fr",alignItems:"center",marginBottom:40}}>
            <div style={{textAlign:"right",paddingRight:28,opacity:isL?1:0}}>{isL&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:BRAND.gold,fontWeight:700,letterSpacing:2,marginBottom:6}}>{m.year}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600,marginBottom:6}}>{m.title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(245,240,232,0.5)",lineHeight:1.6}}>{m.desc}</div></>}</div>
            <div style={{display:"flex",justifyContent:"center"}}><div style={{width:12,height:12,borderRadius:"50%",background:BRAND.navy,border:`2px solid ${BRAND.gold}`,zIndex:2}}/></div>
            <div style={{paddingLeft:28,opacity:isL?0:1}}>{!isL&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:BRAND.gold,fontWeight:700,letterSpacing:2,marginBottom:6}}>{m.year}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600,marginBottom:6}}>{m.title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(245,240,232,0.5)",lineHeight:1.6}}>{m.desc}</div></>}</div>
          </div></Reveal>)})}
        </div>
      </div>
    </section>
    {/* Values */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:64}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.navy,fontWeight:700,margin:0}}>What we care about</h2></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:24}}>
        {[{i:"shield",t:"Checked first",d:"Every watch is inspected and authenticated before we list it."},{i:"search",t:"Picked, not stocked",d:"Pieces with character and history, not volume."},{i:"users",t:"Built on people",d:"Most of our sales start with a conversation, not a checkout."},{i:"tag",t:"Fair prices",d:"Heritage brands without the heritage markup."}].map((v,i)=>(
          <Reveal key={i} delay={i*0.1}><div style={{padding:"40px 28px",textAlign:"center",border:`1px solid rgba(26,39,68,0.06)`,background:BRAND.warmWhite}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><Icon name={v.i} size={30} color={BRAND.gold} stroke={1.4}/></div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:600,marginBottom:12}}>{v.t}</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7}}>{v.d}</p>
          </div></Reveal>
        ))}
      </div>
    </div></section>
    {/* CTA */}
    <section style={{background:BRAND.deepNavy,padding:"80px 0",textAlign:"center"}}><div style={{maxWidth:600,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3.5vw,44px)",color:BRAND.cream,fontWeight:700,margin:"0 0 24px"}}>Let's find you a watch.</h2>
      <div style={{display:"flex",gap:16,justifyContent:"center"}}><GoldButton onClick={()=>navigate("shop")}>Browse Collection</GoldButton><GoldButton ghost onClick={()=>navigate("contact")}>Contact Us</GoldButton></div>
    </div></section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: JOURNAL
// ═══════════════════════════════════════════

function JournalPage({navigate}) {
  const m=useIsMobile();
  const[cat,setCat]=useState("All");const[reading,setReading]=useState(null);const[hovId,setHovId]=useState(null);
  const CATS=["All","Deep Dive","Guide","Behind the Scenes","Opinion"];
  const filtered=ARTICLES.filter(a=>cat==="All"||a.category===cat);

  if(reading) return(<>
    <section style={{paddingTop:64,background:BRAND.navy}}><div style={{width:"100%",height:"45vh",minHeight:300,background:`url('${reading.img}') center/cover`,position:"relative"}}><div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(15,26,48,0.7) 100%)"}}/></div></section>
    <section style={{background:BRAND.warmWhite,padding:"60px 0 100px"}}><div style={{maxWidth:720,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <button onClick={()=>setReading(null)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.gold,background:"none",border:"none",cursor:"pointer",letterSpacing:2,textTransform:"uppercase",marginBottom:40,padding:0}}>← Back to Journal</button>
      <div style={{display:"flex",gap:12,marginBottom:24}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.navy,letterSpacing:3,textTransform:"uppercase",background:BRAND.cream,padding:"5px 14px",border:`1px solid rgba(26,39,68,0.08)`}}>{reading.category}</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone}}>{reading.date} · {reading.readTime}</span></div>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4vw,48px)",color:BRAND.navy,fontWeight:700,lineHeight:1.15,margin:"0 0 16px"}}>{reading.title}</h1>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:BRAND.stone,fontStyle:"italic",margin:"0 0 48px"}}>{reading.subtitle}</p>
      <div style={{width:60,height:2,background:BRAND.gold,marginBottom:48}}/>
      {reading.body.map((b,i)=>b.type==="heading"?<h2 key={i} style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:BRAND.navy,fontWeight:600,margin:"48px 0 20px"}}>{b.content}</h2>:<p key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.9,margin:"0 0 24px"}}>{b.content}</p>)}
      <div style={{display:"flex",justifyContent:"center",gap:8,margin:"60px 0 48px"}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:BRAND.gold,opacity:0.4+i*0.2}}/>)}</div>
      <div style={{textAlign:"center"}}><GoldButton onClick={()=>setReading(null)}>Browse More Articles</GoldButton></div>
    </div></section>
  </>);

  return(<>
    <PageHero tag="Stories & Insights" title="What we've learned about watches" titleGold="" subtitle="Buying guides and behind-the-scenes stories from the world of neo-vintage watches."/>
    <section style={{background:BRAND.cream,borderBottom:`1px solid rgba(26,39,68,0.06)`,position:"sticky",top:60,zIndex:50}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"16px 40px",display:"flex",gap:8,alignItems:"center"}}>
        {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",padding:"8px 20px",background:cat===c?BRAND.navy:"transparent",color:cat===c?BRAND.cream:BRAND.navy,border:`1px solid ${cat===c?BRAND.navy:"rgba(26,39,68,0.12)"}`,cursor:"pointer",transition:"all 0.25s"}}>{c}</button>)}
        <div style={{flex:1}}/><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone}}>{filtered.length} articles</span>
      </div>
    </section>
    <section style={{padding:"60px 0 100px",background:BRAND.warmWhite}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(3,1fr)",gap:24}}>
          {filtered.map((a,i)=>(
            <Reveal key={a.id} delay={i*0.06}><div onClick={()=>{setReading(a);window.scrollTo(0,0)}} onMouseEnter={()=>setHovId(a.id)} onMouseLeave={()=>setHovId(null)} style={{cursor:"pointer",overflow:"hidden",border:`1px solid ${hovId===a.id?"rgba(201,168,76,0.4)":"rgba(26,39,68,0.06)"}`,background:BRAND.cream,transition:"all 0.5s",transform:hovId===a.id?"translateY(-5px)":"translateY(0)"}}>
              <div style={{position:"relative",overflow:"hidden"}}><div style={{width:"100%",paddingBottom:"62%",background:`url('${a.img}') center/cover`,transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",transform:hovId===a.id?"scale(1.05)":"scale(1)"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:`linear-gradient(transparent,${BRAND.cream})`}}/><div style={{position:"absolute",top:16,left:16,background:"rgba(15,26,48,0.7)",backdropFilter:"blur(4px)",padding:"4px 12px",fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase"}}>{a.category}</div></div>
              <div style={{padding:"0 24px 28px",marginTop:-20,position:"relative"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.navy,fontWeight:600,lineHeight:1.3,margin:"0 0 10px"}}>{a.title}</h3><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.stone}}>{a.date} · {a.readTime}</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:hovId===a.id?BRAND.gold:BRAND.navy,letterSpacing:2,textTransform:"uppercase",transition:"color 0.3s"}}>Read →</span></div></div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: EVENTS
// ═══════════════════════════════════════════

function EventsPage({navigate}) {
  const m=useIsMobile();
  const[expIdx,setExpIdx]=useState(null);
  const upcoming=[
    {title:"Rolling Good Old Times",date:"21–22 Nov 2026",time:"12PM–10PM",loc:"Clarke Quay",addr:"Fountain Square, Clarke Quay",note:"",status:"soon"},
    {title:"The Retro Factory",date:"4–6 Dec 2026",time:"11AM–10PM",loc:"Katong Square",addr:"E Coast Rd, #86-88, Singapore 428788",note:"",status:"soon"},
  ];
  const past=[
    {title:"Vintage Tidings (Kerbside & Co)",date:"14–15 Nov 2026",loc:"778A North Bridge Road",recap:"Two days at Kerbside & Co on North Bridge Road."},
    {title:"The Retro Factory",date:"6–8 Nov 2026",loc:"Katong Square",recap:"Our monthly Retro Factory pop-up, 11AM–10PM daily."},
    {title:"SMUSA Bizneyland",date:"27–28 Oct 2026",loc:"SMU T-Junction",recap:"Back at SMU for another round of the student-run market."},
    {title:"Retro Kulture",date:"4 Oct 2026",loc:"Kapo Factory Building",recap:"A one-day market at Kapo Factory Building, Tai Seng."},
    {title:"The Retro Factory",date:"2–4 Oct 2026",loc:"Katong Square",recap:"Our October Retro Factory pop-up at Katong Square."},
    {title:"SMUSA Bizneyland",date:"Sep 2026",loc:"SMU",recap:"An exciting student-run market at SMU. Great energy from a young crowd discovering vintage watches for the first time."},
    {title:"CSNC Block Party (Common Man Coffee Roasters)",date:"Aug 2026",loc:"52 Chin Swee Rd",recap:"A vibrant block party hosted by Common Man Coffee Roasters. Coffee, community, and vintage watches — a great combination."},
    {title:"SIJE — Singapore International Jewellery Exhibition",date:"Jul 2026",loc:"Marina Bay Sands",recap:"A prestigious exhibition at MBS alongside fine jewellery brands. A new crowd for us and a great platform for the brand."},
    {title:"Earthtopia Festival",date:"May 2026",loc:"Fort Canning Park",recap:"A sustainability-focused outdoor festival at Fort Canning. The neo-vintage ethos resonated well — buying less, buying better."},
    {title:"Matsuri Vintage Market (Sake Matsuri Festival)",date:"Mar 2026",loc:"F1 Pit Building",recap:"A massive vintage market during the Sake Matsuri Festival. Great turnout, great sake, and plenty of watch conversations."},
    {title:"Hammock Market",date:"Jan 2026",loc:"Aperia Mall",recap:"A flea market vibe at Aperia Mall. Casual, fun, and a good mix of first-time visitors and returning collectors."},
    {title:"m/m Bar (Wine & Watches Event)",date:"Jan 2026",loc:"Circular Road",recap:"An intimate Wine & Watches evening at m/m Bar. Fine wine, fine watches, and great company."},
    {title:"Temasek Polytechnic (Alumni Returns)",date:"Jan 2026",loc:"Tampines",recap:"Back at our alma mater for the Alumni Returns event. Full circle moment for us."},
    {title:"Resurrack Market (Christmas Edition)",date:"Dec 2025",loc:"Bugis Street Art Lane",recap:"The Christmas edition of Resurrack — festive energy and holiday gift shoppers made this one special."},
    {title:"Temasek Polytechnic (Alumni Returns)",date:"Dec 2025",loc:"Tampines",recap:"Our first time setting up at TP where it all began. Emotional, nostalgic, and packed with familiar faces."},
    {title:"Fronds & Finds",date:"Nov 2025",loc:"Katong",recap:"A yoga studio turned pop-up event space. Unexpected venue, unexpectedly amazing turnout."},
    {title:"Curbside Crafters (Curated Vendors)",date:"Oct 2025",loc:"North Bridge Road",recap:"A curated vendor market alongside fellow independent brands. Great synergy and new customers."},
    {title:"Resurrack (Planet Racks Event)",date:"Jun 2025",loc:"Bugis Street Art Lane",recap:"Our first time at Resurrack's Planet Racks event. The Bugis Street Art Lane setting gave it real character."},
    {title:"Middle Child Bar (Father's Day Event)",date:"Jun 2025",loc:"Bencoolen",recap:"A Father's Day pop-up at Middle Child Bar. Lots of sons and daughters picking out watches for dad."},
  ];

  return(<>
    <PageHero tag="Pop-Ups & Events" title="Come try one on" titleGold="" subtitle="We believe watches should be seen, held, and tried on."/>
    {/* Upcoming */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0 100px"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.navy,fontWeight:700,margin:"0 0 48px"}}>Coming up</h2></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:24}}>
        {upcoming.map((ev,i)=>(
          <Reveal key={i} delay={i*0.1}><div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",background:BRAND.cream,border:`1px solid rgba(26,39,68,0.06)`}}>
            <div style={{padding:48,display:"flex",alignItems:"center",justifyContent:"center",background:BRAND.cream,minHeight:300}}>
              <div style={{textAlign:"center"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:64,color:BRAND.gold,fontWeight:700,lineHeight:1}}>{ev.date.split(" ")[0]}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone,letterSpacing:2,marginTop:8}}>{ev.date.split(" ").slice(1).join(" ")}</div>
              {ev.note&&<div style={{marginTop:20,display:"inline-block",background:BRAND.gold,padding:"8px 20px",fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.navy,letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>{ev.note}</div>}</div>
            </div>
            <div style={{padding:"48px 40px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:ev.status==="now"?"#2d6a4f":BRAND.gold,padding:"6px 16px",fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:ev.status==="now"?"#fff":BRAND.navy,letterSpacing:3,textTransform:"uppercase",fontWeight:600,marginBottom:20,alignSelf:"flex-start"}}>
                {ev.status==="now"&&<span style={{width:8,height:8,borderRadius:"50%",background:"#6ee7a0",animation:"pulse 1.5s ease infinite"}}/>}{ev.status==="now"?"Happening Now":"Coming Soon"}
              </div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:BRAND.navy,fontWeight:700,margin:"0 0 20px"}}>{ev.title}</h3>
              <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:"16px 32px",marginBottom:24}}>
                <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Time</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.navy,fontWeight:600}}>{ev.time}</div></div>
                <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Venue</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.navy,fontWeight:600}}>{ev.loc}</div></div>
              </div>
              {ev.addr&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.stone}}>{ev.addr}</div>}
            </div>
          </div></Reveal>
        ))}
      </div>
    </div></section>
    {/* Past */}
    <section style={{background:BRAND.navy,padding:"100px 0",position:"relative"}}><div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 1.5px 1.5px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <Reveal><div style={{marginBottom:60}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.cream,fontWeight:700,margin:"0 0 20px"}}>Past pop-ups</h2><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.5)",lineHeight:1.7,maxWidth:600}}>Aside from The Retro Factory at Katong Square — which we host monthly — here are the other events and pop-ups we've been part of.</p></div></Reveal>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {past.map((ev,i)=>(
            <Reveal key={i} delay={i*0.06}><div onClick={()=>setExpIdx(expIdx===i?null:i)} style={{background:"rgba(245,240,232,0.04)",border:`1px solid rgba(201,168,76,${expIdx===i?"0.3":"0.08"})`,cursor:"pointer",transition:"all 0.4s",overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:m?"1fr 70px 30px":"1fr 140px 160px 40px",alignItems:"center",padding:"22px 28px",gap:20}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600,margin:0}}>{ev.title}</h3>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.gold,letterSpacing:2}}>{ev.date}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(245,240,232,0.45)"}}>{ev.loc}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,textAlign:"center",transform:expIdx===i?"rotate(45deg)":"rotate(0deg)",transition:"transform 0.3s"}}>+</div>
              </div>
              <div style={{maxHeight:expIdx===i?120:0,opacity:expIdx===i?1:0,transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"rgba(245,240,232,0.55)",lineHeight:1.7,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(201,168,76,0.1)`,paddingTop:20}}>{ev.recap}</p>
              </div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
    {/* Event CTA */}
    <section style={{background:BRAND.deepNavy,padding:"80px 0",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.04,backgroundImage:`radial-gradient(circle at 2px 2px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:560,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3vw,40px)",color:BRAND.cream,fontWeight:700,lineHeight:1.2,margin:"0 0 20px"}}>Want us at your event?</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"rgba(245,240,232,0.5)",marginBottom:36,lineHeight:1.7}}>We're open to collaborations — markets, corporate events, private viewings. Drop us a message.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="https://www.instagram.com/naxotimepieces/" target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",background:"transparent",color:BRAND.cream,border:`1px solid rgba(201,168,76,0.4)`,padding:"14px 28px",cursor:"pointer",fontWeight:600,transition:"all 0.3s",textDecoration:"none"}}
            onMouseEnter={e=>{e.target.style.background=BRAND.gold;e.target.style.color=BRAND.navy;e.target.style.borderColor=BRAND.gold}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=BRAND.cream;e.target.style.borderColor="rgba(201,168,76,0.4)"}}>Instagram</a>
          <a href="https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20enquire%20about%20having%20you%20at%20our%20event." target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",background:"transparent",color:BRAND.cream,border:`1px solid rgba(201,168,76,0.4)`,padding:"14px 28px",cursor:"pointer",fontWeight:600,transition:"all 0.3s",textDecoration:"none"}}
            onMouseEnter={e=>{e.target.style.background=BRAND.gold;e.target.style.color=BRAND.navy;e.target.style.borderColor=BRAND.gold}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=BRAND.cream;e.target.style.borderColor="rgba(201,168,76,0.4)"}}>WhatsApp</a>
        </div>
      </div>
    </section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: HOW IT WORKS
// ═══════════════════════════════════════════

function HowItWorksPage({navigate}) {
  const m=useIsMobile();
  const[openHiwFaq,setOpenHiwFaq]=useState(null);
  const steps=[
    {num:"01",title:"Send Us Your Watch Details",desc:"DM us on Instagram, Telegram, or WhatsApp with photos of your watch — front, back, and any close-ups of the dial, case, and movement if possible. Include the brand, model, and any known history about the piece."},
    {num:"02",title:"We Assess & Make an Offer",desc:"Our team will evaluate your watch based on its condition, rarity, market demand, and authenticity. We'll get back to you within 24–48 hours with a fair and transparent offer — or a consignment proposal if that's a better fit."},
    {num:"03",title:"Choose Your Option",desc:"You can sell outright for immediate cash, trade towards another watch in our collection, or consign with us and we'll handle the listing, photography, and sale on your behalf."},
    {num:"04",title:"Meet Up & Complete the Deal",desc:"We'll arrange a meet-up at our location at Mu Templar Service Centre (Far East Plaza, #02-20A) or at one of our pop-up events. Payment is made on the spot — fast, simple, no hassle."},
  ];

  return(<>
    <PageHero tag="Sell · Trade · Consign" title="How selling to us works" titleGold="" subtitle="Thinking about selling, trading, or consigning a watch? Here's the process, start to finish."/>
    
    {/* Steps */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0 100px"}}><div style={{maxWidth:900,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      {steps.map((s,i)=>(
        <Reveal key={i} delay={i*0.1}><div style={{display:"flex",gap:m?20:40,alignItems:"flex-start",paddingBottom:40,marginBottom:40,borderBottom:i<steps.length-1?`1px solid rgba(26,39,68,0.08)`:"none"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?36:56,color:BRAND.gold,fontWeight:700,lineHeight:1,flexShrink:0,opacity:0.4}}>{s.num}</div>
          <div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:m?20:24,color:BRAND.navy,fontWeight:600,margin:"0 0 12px"}}>{s.title}</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?16:18,color:BRAND.charcoal,lineHeight:1.8,margin:0}}>{s.desc}</p>
          </div>
        </div></Reveal>
      ))}
    </div></section>

    {/* Options comparison */}
    <section style={{background:BRAND.cream,padding:"80px 0"}}><div style={{maxWidth:1200,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:56}}>
        
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(28px,5vw,36px)":"clamp(32px,3.5vw,44px)",color:BRAND.navy,fontWeight:700,margin:0}}>Three ways to work with us</h2>
      </div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(3,1fr)",gap:24}}>
        {[
          {title:"Sell",icon:"cash",points:["Immediate cash payment","Fair market valuation","No listing or waiting","Meet up and done"]},
          {title:"Trade",icon:"repeat",points:["Swap towards any piece in our collection","Top-up or credit the difference","Upgrade or change your style","Same-day exchange"]},
          {title:"Consign",icon:"box",points:["We handle everything — photos, listing, sale","Your watch gets maximum exposure","Competitive commission rate","Payment upon sale"]},
        ].map((opt,i)=>(
          <Reveal key={i} delay={i*0.1}><div style={{padding:m?"32px 24px":"40px 32px",background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.06)`,textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><Icon name={opt.icon} size={34} color={BRAND.gold} stroke={1.3}/></div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:BRAND.navy,fontWeight:600,marginBottom:20}}>{opt.title}</h3>
            {opt.points.map((p,j)=><p key={j} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,margin:"0 0 8px"}}><span style={{color:BRAND.gold,marginRight:10}}>—</span>{p}</p>)}
          </div></Reveal>
        ))}
      </div>
    </div></section>

    {/* FAQ */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0"}}><div style={{maxWidth:800,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(24px,5vw,32px)":"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Questions people ask</h2>
      </div></Reveal>
      {[
        {q:"What brands do you buy?",a:"We buy Seiko, Omega, Cartier, Longines, Universal Genève, Tudor, Rolex, JLC, and more. If you're unsure, just send us photos and we'll let you know."},
        {q:"How do you determine the price?",a:"We consider the brand, model, condition, completeness (box/papers), current market value, and demand. Our offers are based on real market data — no lowballing."},
        {q:"How long does consignment take?",a:"It depends on the piece. Popular models can sell within days, while niche pieces may take a few weeks. We'll give you an honest estimate upfront."},
        {q:"Can I sell a watch that needs repair?",a:"Yes — we buy watches in all conditions, including those needing servicing. The offer will reflect the cost of repair, but we're happy to take them off your hands."},
        {q:"Is there a minimum value?",a:"We're open to all price ranges. Whether it's a S$100 Seiko or a S$5,000 Rolex, we're happy to chat."},
      ].map((faq,i)=>(
        <Reveal key={i} delay={i*0.05}><div onClick={()=>setOpenHiwFaq(openHiwFaq===i?null:i)} style={{background:BRAND.cream,border:`1px solid ${openHiwFaq===i?"rgba(201,168,76,0.3)":"rgba(26,39,68,0.06)"}`,cursor:"pointer",overflow:"hidden",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:m?15:17,color:BRAND.navy,fontWeight:600,margin:0}}>{faq.q}</h3><span style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,transform:openHiwFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s",flexShrink:0,marginLeft:16}}>+</span></div>
          <div style={{maxHeight:openHiwFaq===i?200:0,opacity:openHiwFaq===i?1:0,transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(26,39,68,0.06)`,paddingTop:20}}>{faq.a}</p></div>
        </div></Reveal>
      ))}
    </div></section>

    {/* CTA */}
    <section style={{background:BRAND.deepNavy,padding:"80px 0",textAlign:"center"}}><div style={{maxWidth:560,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(24px,5vw,32px)":"clamp(28px,3vw,40px)",color:BRAND.cream,fontWeight:700,lineHeight:1.2,margin:"0 0 20px"}}>Ready when you are.</h2>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"rgba(245,240,232,0.5)",marginBottom:36,lineHeight:1.7}}>Send us your watch details and we'll get back to you within 24 hours.</p>
      <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
        <GoldButton onClick={()=>navigate("contact")}>Contact Us</GoldButton>
        <GoldButton ghost onClick={()=>navigate("shop")}>Browse Our Collection</GoldButton>
      </div>
    </div></section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════

function ContactPage({navigate}) {
  const m=useIsMobile();
  const[form,setForm]=useState({name:"",email:"",type:"",message:""});const[sent,setSent]=useState(false);const[hovCh,setHovCh]=useState(null);const[openFaq,setOpenFaq]=useState(null);
  const channels=[{name:"Instagram",handle:"@naxotimepieces",icon:"instagram",link:"https://www.instagram.com/naxotimepieces/"},{name:"Telegram",handle:"@naxotimepiecessg",icon:"send",link:"https://t.me/naxotimepiecessg"},{name:"WhatsApp",handle:"Chat with us",icon:"chat",link:"https://wa.me/6588255367"},{name:"Email",handle:"naxotimepieces@gmail.com",icon:"mail",link:"mailto:naxotimepieces@gmail.com"},{name:"Carousell",handle:"@naxotimepieces",icon:"bag",link:"https://www.carousell.sg/u/naxotimepieces/"},{name:"TikTok",handle:"@naxotimepieces",icon:"music",link:"https://www.tiktok.com/@naxotimepieces"},{name:"Facebook",handle:"Naxo Timepieces",icon:"facebook",link:"https://www.facebook.com/share/1YAru9ssGW/?mibextid=wwXIfr"}];
  const faqs=[{q:"Are your watches authentic?",a:"Yes — every watch is carefully inspected and authenticated. We stand behind everything we sell."},{q:"Do you ship internationally?",a:"On a case-by-case basis. Drop us a message with your location."},{q:"How does consignment work?",a:"Send us photos. We'll value, photograph, list, and sell. Competitive commission."},{q:"Do you do repairs?",a:"We work with trusted watchmakers for servicing, crystals, and straps."}];
  const inpStyle={width:"100%",padding:"14px 18px",fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.navy,background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.12)`,outline:"none",letterSpacing:0.5};

  return(<>
    <PageHero tag="Get In Touch" title="Let's talk watches" titleGold="" subtitle="Whether you're looking for a specific piece, want to consign, or just want to geek out — we'd love to hear from you."/>
    {/* Channels */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0"}}><div style={{maxWidth:1200,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}>
        
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Where to find us</h2>
      </div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:16,marginBottom:16}}>
        {channels.slice(0,4).map((ch,i)=>(
          <Reveal key={ch.name} delay={i*0.06}><a href={ch.link} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setHovCh(i)} onMouseLeave={()=>setHovCh(null)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:m?"24px 16px":"32px 24px",background:hovCh===i?BRAND.cream:BRAND.warmWhite,border:`1px solid ${hovCh===i?"rgba(201,168,76,0.4)":"rgba(26,39,68,0.06)"}`,transition:"all 0.4s",cursor:"pointer",textDecoration:"none",transform:hovCh===i?"translateY(-4px)":"translateY(0)"}}>
            <div style={{marginBottom:14}}><Icon name={ch.icon} size={28} color={BRAND.gold} stroke={1.4}/></div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?16:18,color:BRAND.navy,fontWeight:600,marginBottom:4}}>{ch.name}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:hovCh===i?BRAND.gold:BRAND.stone,transition:"color 0.3s"}}>{ch.handle}</div>
          </a></Reveal>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:m?"repeat(3,1fr)":"repeat(3,1fr)",gap:16}}>
        {channels.slice(4).map((ch,i)=>(
          <Reveal key={ch.name} delay={(i+4)*0.06}><a href={ch.link} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setHovCh(i+4)} onMouseLeave={()=>setHovCh(null)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:m?"20px 12px":"28px 24px",background:hovCh===i+4?BRAND.cream:BRAND.warmWhite,border:`1px solid ${hovCh===i+4?"rgba(201,168,76,0.4)":"rgba(26,39,68,0.06)"}`,transition:"all 0.4s",cursor:"pointer",textDecoration:"none",transform:hovCh===i+4?"translateY(-4px)":"translateY(0)"}}>
            <div style={{marginBottom:12}}><Icon name={ch.icon} size={24} color={BRAND.gold} stroke={1.4}/></div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?14:16,color:BRAND.navy,fontWeight:600,marginBottom:4}}>{ch.name}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:hovCh===i+4?BRAND.gold:BRAND.stone,transition:"color 0.3s"}}>{ch.handle}</div>
          </a></Reveal>
        ))}
      </div>
    </div></section>
    {/* Form */}
    <section style={{background:BRAND.cream,padding:"100px 0"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1.2fr",gap:m?32:80,alignItems:"start"}}>
      <Reveal><div>
        
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:"0 0 24px"}}>Drop us a message</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:BRAND.charcoal,lineHeight:1.8,marginBottom:40}}>We'll get back to you within 24 hours.</p>
        <div style={{padding:"28px 32px",background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.06)`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.navy,fontWeight:600,marginBottom:8}}>Visit Us — By Appointment</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7}}>Mu Templar Service Centre<br/>Far East Plaza, #02-20A<br/>14 Scotts Road, Singapore 228213</div>
        </div>
      </div></Reveal>
      <Reveal delay={0.15}><div style={{padding:"48px 44px",background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.06)`}}>
        {sent?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{display:"flex",justifyContent:"center",marginBottom:24}}><Icon name="check" size={44} color={BRAND.gold} stroke={1.3}/></div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.navy,fontWeight:700,margin:"0 0 12px"}}>Message Sent</h3><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone}}>We'll get back to you within 24 hours.</p></div>:
        <><div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:24,marginBottom:24}}>
          <div><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>Your Name</label><input type="text" placeholder="e.g. John" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inpStyle}/></div>
          <div><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>Email</label><input type="email" placeholder="john@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inpStyle}/></div>
        </div>
        <div style={{marginBottom:24}}><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>What's This About?</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={{...inpStyle,cursor:"pointer"}}><option value="">Select...</option>{["Interested in a watch","Looking to sell/consign","Sourcing request","Repair/servicing","Collaboration","General question"].map(t=><option key={t}>{t}</option>)}</select></div>
        <div style={{marginBottom:32}}><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>Message</label><textarea placeholder="Tell us what you're looking for..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{...inpStyle,resize:"vertical",minHeight:120}}/></div>
        <button onClick={async()=>{try{await fetch("https://formspree.io/f/xaqlrrwa",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.name,email:form.email,type:form.type,message:form.message})});setSent(true)}catch(e){setSent(true)}}} style={{width:"100%",fontFamily:"'Cormorant Garamond',serif",fontSize:15,letterSpacing:3,textTransform:"uppercase",background:BRAND.gold,color:BRAND.navy,border:"none",padding:"18px 40px",cursor:"pointer",fontWeight:600,transition:"all 0.3s"}} onMouseEnter={e=>e.target.style.background="#d4b45e"} onMouseLeave={e=>e.target.style.background=BRAND.gold}>Send Enquiry</button></>}
      </div></Reveal>
    </div></section>
    {/* Location */}
    <section style={{background:BRAND.navy,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 1.5px 1.5px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?32:60,alignItems:"center"}}>
        <Reveal><div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Visit Us</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.cream,fontWeight:700,margin:"0 0 32px",lineHeight:1.15}}>Where we are</h2>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(201,168,76,0.12)",border:`1px solid rgba(201,168,76,0.25)`,padding:"10px 20px",marginBottom:32}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:BRAND.gold}}/>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>By Appointment Only</span>
          </div>
          <div style={{marginBottom:40}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:BRAND.cream,fontWeight:600,marginBottom:8}}>Mu Templar Service Centre</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.6)",lineHeight:1.8}}>Far East Plaza<br/>14 Scotts Road, #02-20A<br/>Singapore 228213</div>
          </div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.45)",lineHeight:1.8,marginBottom:32,borderLeft:`2px solid rgba(201,168,76,0.3)`,paddingLeft:20}}>We operate out of Mu Templar Service Centre at Far East Plaza. Visits are by appointment only — drop us a DM on Instagram or Telegram to schedule a viewing.</p>
          <div style={{display:"flex",gap:12}}>
            <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20book%20an%20appointment%20to%20view%20watches.","_blank")}>Book an Appointment</GoldButton>
            <GoldButton ghost onClick={()=>window.open("https://www.google.com/maps/dir//Far+East+Plaza+14+Scotts+Rd+Singapore+228213","_blank")}>Get Directions</GoldButton>
          </div>
        </div></Reveal>
        <Reveal delay={0.15}><div style={{position:"relative",overflow:"hidden",border:`1px solid rgba(201,168,76,0.15)`}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7889!2d103.8313!3d1.3066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a7d0e1e937%3A0x8c3b3e5c2d3a1b0c!2sFar%20East%20Plaza!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg" width="100%" height="460" style={{border:0,display:"block",filter:"grayscale(0.6) contrast(1.1)"}} allowFullScreen="" loading="lazy" title="Location"/>
          <div style={{position:"absolute",bottom:20,left:20,right:20,background:"rgba(15,26,48,0.9)",backdropFilter:"blur(8px)",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:BRAND.cream,fontWeight:600}}>Mu Templar Service Centre</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(245,240,232,0.5)"}}>Far East Plaza #02-20A</div></div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase",border:`1px solid rgba(201,168,76,0.3)`,padding:"6px 14px"}}>Appointment Only</div>
          </div>
        </div></Reveal>
      </div>
    </section>
    {/* FAQ */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}><div style={{maxWidth:800,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:56}}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Quick answers</h2></div></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {faqs.map((faq,i)=>(
          <Reveal key={i} delay={i*0.05}><div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{background:BRAND.cream,border:`1px solid ${openFaq===i?"rgba(201,168,76,0.3)":"rgba(26,39,68,0.06)"}`,cursor:"pointer",overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:BRAND.navy,fontWeight:600,margin:0}}>{faq.q}</h3><span style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s",flexShrink:0,marginLeft:16}}>+</span></div>
            <div style={{maxHeight:openFaq===i?200:0,opacity:openFaq===i?1:0,transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(26,39,68,0.06)`,paddingTop:20}}>{faq.a}</p></div>
          </div></Reveal>
        ))}
      </div>
    </div></section>
  </>);
}

// ═══════════════════════════════════════════
// MAIN APP — Router
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// PAGE: SERVICING
// ═══════════════════════════════════════════

function ServicingPage({navigate}) {
  const m=useIsMobile();const[openFaq,setOpenFaq]=useState(null);
  const services=[
    {icon:"battery",title:"Battery Replacement",price:"From S$15",desc:"Quick and clean battery swap for quartz watches. We use quality cells and test the watch thoroughly before returning it to you.",time:"Same day"},
    {icon:"wrench",title:"Basic Service",price:"From S$80",desc:"Full movement clean, oil, and regulation. Includes case and bracelet clean. Ideal for watches that are running slow or losing time.",time:"3–5 days"},
    {icon:"gear",title:"Full Overhaul",price:"From S$180",desc:"Complete disassembly, ultrasonic clean, lubrication, and reassembly of all components. Recommended every 3–5 years for mechanical watches.",time:"1–2 weeks"},
    {icon:"gem",title:"Case Polishing",price:"From S$40",desc:"Light polishing of case and bracelet to restore lustre. We take a conservative approach — we won't over-polish vintage pieces.",time:"2–3 days"},
    {icon:"link",title:"Bracelet & Strap",price:"From S$20",desc:"Bracelet sizing, pin replacement, and strap changes. We carry a range of quality leather and NATO straps if you need a replacement.",time:"Same day"},
    {icon:"shield",title:"Authentication & Valuation",price:"From S$30",desc:"Full inspection and authentication report for your watch. Useful for insurance, resale, or just peace of mind about what you own.",time:"1–2 days"},
    {icon:"drop",title:"Pressure Testing",price:"From S$25",desc:"Water resistance testing for dive and sport watches. Essential after any service or if you plan to wear your watch near water.",time:"Same day"},
    {icon:"dial",title:"Dial Restoration",price:"Quote on request",desc:"Cleaning and light restoration of dials. We work carefully to preserve patina while removing dirt and damage. Pricing depends on condition.",time:"1–2 weeks"},
  ];

  const faqs=[
    {q:"Do I need an appointment?",a:"Yes — we operate by appointment at Mu Templar Service Centre, Far East Plaza #02-20A. DM us on WhatsApp or Instagram to book a slot. Drop-ins may be accommodated depending on availability."},
    {q:"How do I get a quote for my watch?",a:"Send us a few photos of your watch via WhatsApp with a brief description of the issue. We'll give you an honest assessment and quote before any work begins."},
    {q:"Do you service all watch brands?",a:"We specialise in vintage and neo-vintage pieces — Seiko, Omega, Longines, Cartier, Universal Genève, and similar. We also handle Tudor and Rolex for basic services. Some modern watches may be better served by authorised centres."},
    {q:"Will servicing affect my watch's value?",a:"Done correctly, servicing maintains and can improve value. We're experienced with vintage pieces and take a conservative approach — preserving originality wherever possible."},
    {q:"What's your turnaround time?",a:"It varies by service type. Battery replacements and strap changes are often same day. Full overhauls can take 1–2 weeks. We'll give you a realistic timeframe when you drop off your watch."},
    {q:"Do you offer a warranty on servicing?",a:"Yes — all our service work comes with a 6-month movement warranty. If the issue reoccurs within that period, we'll take another look at no charge."},
  ];

  return(<>
    <PageHero tag="Watch Care" title="Keep it running" titleGold="" subtitle="From battery swaps to full overhauls — we'll tell you honestly what your watch needs."/>

    {/* Services Grid */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:64}}>
          
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.navy,fontWeight:700,margin:"0 0 16px"}}>Services & pricing</h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:BRAND.stone,maxWidth:560,margin:"0 auto",lineHeight:1.7}}>All prices are indicative. Final quotes are given after inspection. We work on vintage and neo-vintage timepieces with care and honesty.</p>
        </div></Reveal>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(2,1fr)",gap:2,background:"rgba(26,39,68,0.06)"}}>
          {services.map((s,i)=>(
            <Reveal key={i} delay={i*0.05}><div style={{background:BRAND.warmWhite,padding:m?"28px 24px":"36px 40px",transition:"all 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=BRAND.cream}
              onMouseLeave={e=>e.currentTarget.style.background=BRAND.warmWhite}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,flexWrap:"wrap",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <Icon name={s.icon} size={26} color={BRAND.gold} stroke={1.4}/>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?17:20,color:BRAND.navy,fontWeight:700}}>{s.title}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.gold,fontWeight:600}}>{s.price}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:2,textTransform:"uppercase",marginTop:2}}>{s.time}</div>
                </div>
              </div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,margin:0}}>{s.desc}</p>
            </div></Reveal>
          ))}
        </div>
        <Reveal><div style={{marginTop:48,background:BRAND.navy,padding:m?"28px 24px":"40px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?20:26,color:BRAND.cream,fontWeight:700,marginBottom:8}}>Not sure what your watch needs?</div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.6)",margin:0}}>Send us photos and we'll advise for free — no obligation.</p>
          </div>
          <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20enquire%20about%20watch%20servicing.","_blank")}>Get a Free Quote</GoldButton>
        </div></Reveal>
      </div>
    </section>

    {/* Process */}
    <section style={{background:BRAND.cream,padding:"100px 0"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:64}}>
          
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.navy,fontWeight:700}}>How a repair works</h2>
        </div></Reveal>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(4,1fr)",gap:m?24:0}}>
          {[
            {step:"01",title:"Contact Us",desc:"Send us photos of your watch via WhatsApp with a brief description of the issue."},
            {step:"02",title:"Get a Quote",desc:"We'll assess and give you an honest quote before any work begins. No surprises."},
            {step:"03",title:"Drop It Off",desc:"Bring your watch to us at Far East Plaza #02-20A by appointment."},
            {step:"04",title:"Collect & Enjoy",desc:"We'll notify you when it's ready. Pick up in person or arrange delivery."},
          ].map((s,i)=>(
            <Reveal key={i} delay={i*0.1}><div style={{textAlign:"center",padding:m?"0":"0 32px",borderRight:!m&&i<3?`1px solid rgba(201,168,76,0.2)`:"none"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:48,color:"rgba(201,168,76,0.2)",fontWeight:700,marginBottom:16}}>{s.step}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:700,marginBottom:12}}>{s.title}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7,margin:0}}>{s.desc}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:56}}>
          
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700}}>FAQ</h2>
        </div></Reveal>
        {faqs.map((faq,i)=>(
          <Reveal key={i} delay={i*0.05}><div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{background:BRAND.cream,border:`1px solid ${openFaq===i?"rgba(201,168,76,0.3)":"rgba(26,39,68,0.06)"}`,cursor:"pointer",overflow:"hidden",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:m?15:17,color:BRAND.navy,fontWeight:600,margin:0}}>{faq.q}</h3>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s",flexShrink:0,marginLeft:16}}>+</span>
            </div>
            <div style={{maxHeight:openFaq===i?200:0,opacity:openFaq===i?1:0,transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(26,39,68,0.06)`,paddingTop:20}}>{faq.a}</p>
            </div>
          </div></Reveal>
        ))}
        <Reveal><div style={{textAlign:"center",marginTop:48}}>
          <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20book%20a%20watch%20service.","_blank")}>Book a Service</GoldButton>
        </div></Reveal>
      </div>
    </section>
  </>);
}

// ─── Chat mascot: floats bottom-right, links to WhatsApp, rotates what it says every 5s ───
const MASCOT_LINES=[
  {t:"Need more information?",m:"Hi Naxo! I'd like to know more."},
  {t:"Chat with us!",m:"Hi Naxo! I'd like to know more."},
  {t:"Watch needs servicing?",m:"Hi Naxo! I'd like to enquire about watch servicing."},
  {t:"Looking for something specific?",m:"Hi Naxo! I'm looking for a specific watch."},
  {t:"Got a watch to sell or trade?",m:"Hi Naxo! I'd like to get a quote for my watch."},
  {t:"Can't decide? Ask us!",m:"Hi Naxo! I need help choosing a watch."},
  {t:"Tick tock… still thinking it over?",m:"Hi Naxo! I'm interested in one of your watches."},
  {t:"Catch us at our next pop-up!",m:"Hi Naxo! When is your next pop-up?"},
];
function MascotWidget() {
  const m=useIsMobile();const[i,setI]=useState(0);const[talking,setTalking]=useState(false);
  useEffect(()=>{const id=setInterval(()=>setI(x=>(x+1)%MASCOT_LINES.length),5000);return()=>clearInterval(id)},[]);
  useEffect(()=>{if(i===0)return;setTalking(true);const t=setTimeout(()=>setTalking(false),1600);return()=>clearTimeout(t)},[i]);
  const line=MASCOT_LINES[i];const W=m?84:98;const H=Math.round(W*421/374);const img="url('/mascot-chat.png')";
  // Eyelid + mouth positions are % of the mascot image (374x421 source)
  const lid=(l,t,w,h)=>({position:"absolute",left:l+"%",top:t+"%",width:w+"%",height:h+"%",borderRadius:"50%",background:"#f9f0d2"});
  return(
    <a className="mascot-btn" href={"https://wa.me/6588255367?text="+encodeURIComponent(line.m)} target="_blank" rel="noopener noreferrer" aria-label="Chat with Naxo on WhatsApp"
      style={{position:"fixed",bottom:m?10:18,right:m?8:20,zIndex:90,display:"flex",flexDirection:"column",alignItems:"flex-end",textDecoration:"none",WebkitTapHighlightColor:"transparent"}}>
      <div key={i} className="mascot-bubble" style={{position:"relative",background:"#fff",borderRadius:18,padding:m?"8px 14px":"10px 18px",boxShadow:"0 4px 18px rgba(0,0,0,0.14)",fontFamily:"'Cormorant Garamond',serif",fontWeight:600,fontSize:m?14:16,color:BRAND.navy,maxWidth:m?190:240,textAlign:"center",lineHeight:1.25,marginBottom:10,marginRight:m?4:8,animationDelay:i===0?"2s":"0s"}}>
        {line.t}
        <span style={{position:"absolute",bottom:-6,right:W*0.35,width:14,height:14,background:"#fff",transform:"rotate(45deg)",borderRadius:2}}/>
      </div>
      <div className={talking?"mascot-talking":""} style={{position:"relative",width:W,height:H}}>
        <div className="mascot-body" style={{position:"absolute",inset:0,filter:"drop-shadow(0 6px 8px rgba(0,0,0,0.28))"}}>
          <div aria-hidden="true" style={{position:"absolute",inset:0,backgroundImage:img,backgroundSize:"100% 100%"}}/>
          {/* mouth: a clipped copy of the artwork that opens and closes while it talks */}
          <div aria-hidden="true" style={{position:"absolute",left:"36.9%",top:"39.9%",width:"31.6%",height:"15.2%",overflow:"hidden",WebkitMaskImage:"radial-gradient(ellipse at 50% 45%,#000 58%,transparent 100%)",maskImage:"radial-gradient(ellipse at 50% 45%,#000 58%,transparent 100%)"}}>
            <div className="mascot-mouth-wrap" style={{position:"absolute",inset:0}}>
              <div style={{position:"absolute",width:"316.5%",height:"657%",left:"-116.9%",top:"-262.5%",backgroundImage:img,backgroundSize:"100% 100%"}}/>
            </div>
          </div>
          {/* blink: cartoon snap-blink every few seconds */}
          <div aria-hidden="true" className="mascot-eyelid" style={lid(37.9,24.9,12.9,12.9)}><span style={{position:"absolute",left:"10%",top:"46%",width:"80%",height:"30%",borderBottom:"2.5px solid #260d0d",borderRadius:"0 0 50% 50%"}}/></div>
          <div aria-hidden="true" className="mascot-eyelid" style={{...lid(54,26.6,11.8,13.8),animationDelay:"0.02s"}}><span style={{position:"absolute",left:"10%",top:"46%",width:"80%",height:"30%",borderBottom:"2.5px solid #260d0d",borderRadius:"0 0 50% 50%"}}/></div>
        </div>
      </div>
    </a>
  );
}

function WatchPage({navigate,openWatch,goBack,watchId}) {
  const m=useIsMobile();
  const w=WATCHES.find(x=>x.id===watchId);
  if(!w)return(<section style={{padding:"200px 20px 120px",textAlign:"center",background:BRAND.warmWhite}}>
    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:BRAND.stone,marginBottom:24}}>We couldn't find that watch.</p>
    <GoldButton onClick={()=>navigate("shop")}>Back to the collection</GoldButton></section>);
  const related=[...WATCHES.filter(x=>x.id!==w.id&&!x.sold&&x.brand===w.brand),...WATCHES.filter(x=>x.id!==w.id&&!x.sold&&x.brand!==w.brand&&x.style===w.style)].slice(0,4);
  const name=w.brand+" "+w.model;
  const lab={fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:2,textTransform:"uppercase",marginBottom:4};
  return(<>
    <section style={{background:BRAND.warmWhite,paddingTop:m?118:140,paddingBottom:m?60:100}}>
      <div style={{maxWidth:1300,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <a onClick={goBack} style={{display:"inline-block",fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.navy,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",borderBottom:`1px solid ${BRAND.gold}`,paddingBottom:3,marginBottom:m?20:36}}>← Back to the collection</a>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1.1fr 1fr",gap:m?28:64,alignItems:"start"}}>
          <div style={{position:m?"relative":"sticky",top:m?0:130,background:BRAND.cream,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            <img src={w.img} alt={name} style={{width:"100%",height:"auto",maxHeight:m?"none":"82vh",objectFit:"contain",display:"block"}}/>
            {w.sold&&<div style={{position:"absolute",top:16,left:16,background:BRAND.navy,color:BRAND.cream,fontFamily:"'Cormorant Garamond',serif",fontSize:12,letterSpacing:3,textTransform:"uppercase",padding:"6px 14px"}}>Sold</div>}
          </div>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:4,textTransform:"uppercase",marginBottom:10}}>{[w.era,w.style].filter(Boolean).join(" · ")}</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:m?34:46,color:BRAND.navy,fontWeight:700,lineHeight:1.1,margin:"0 0 8px"}}>{w.brand}</h1>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?20:24,color:BRAND.stone,margin:"0 0 28px",lineHeight:1.3}}>{w.model}</p>
            {!w.sold?<div style={{marginBottom:32}}><GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27m%20interested%20in%20the%20"+encodeURIComponent(name),"_blank")}>Enquire Now</GoldButton></div>:
            <div style={{padding:"20px 24px",background:BRAND.cream,border:`1px solid rgba(201,168,76,0.25)`,marginBottom:32}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:600,marginBottom:6}}>This piece has found a new home</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone,margin:"0 0 16px"}}>Interested in something similar? We can source one for you.</p>
              <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%20saw%20the%20"+encodeURIComponent(name)+"%20is%20sold.%20Can%20you%20source%20a%20similar%20piece%3F","_blank")}>Contact Us to Source</GoldButton>
            </div>}
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.8,margin:"0 0 36px",whiteSpace:"pre-line"}}>{w.desc}</p>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.gold,letterSpacing:4,textTransform:"uppercase",marginBottom:16,paddingBottom:12,borderBottom:`1px solid rgba(201,168,76,0.25)`}}>Specifications</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"18px 32px"}}>
              {[["Movement",w.movement],["Case size",w.case_size],["Material",w.case_material],["Dial",w.dial],["Strap",w.strap],["Condition",w.condition]].filter(([l,v])=>v).map(([l,v])=><div key={l}><div style={lab}>{l}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:BRAND.navy,fontWeight:600,lineHeight:1.4}}>{v}</div></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
    {related.length>0&&<section style={{background:BRAND.cream,padding:m?"48px 0 56px":"72px 0 90px"}}>
      <div style={{maxWidth:1300,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?26:32,color:BRAND.navy,fontWeight:700,margin:"0 0 28px"}}>You might also like</h2>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:m?14:20}}>
          {related.map(r=><div key={r.id} onClick={()=>openWatch(r.id)} style={{cursor:"pointer",background:BRAND.warmWhite}}>
            <div style={{width:"100%",paddingBottom:"100%",position:"relative"}}><div style={{position:"absolute",inset:0,background:`url('${r.img}') center 20%/cover`}}/></div>
            <div style={{padding:"12px 14px 16px"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:BRAND.navy,fontWeight:600}}>{r.brand}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone,marginTop:2,lineHeight:1.3}}>{r.model}</div></div>
          </div>)}
        </div>
      </div>
    </section>}
  </>);
}
export default function NaxoApp() {
  const[page,setPage]=useState("home");const[scrolled,setScrolled]=useState(false);const[transitioning,setTransitioning]=useState(false);
  const[watchId,setWatchId]=useState(null);
  const[F,setF]=useState({brand:"All",style:"All",sort:"Newest",showSold:false,q:""});
  const pageRef=useRef(page);pageRef.current=page;
  const prevPage=useRef("shop");const savedY=useRef(0);const inApp=useRef(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  const go=(p,o={})=>{setTransitioning(true);setTimeout(()=>{setPage(p);if(o.id!=null)setWatchId(o.id);setTimeout(()=>window.scrollTo({top:o.restore?savedY.current:0,behavior:"instant"}),40);setTimeout(()=>setTransitioning(false),50)},300)};
  useEffect(()=>{
    const mt=window.location.hash.match(/^#watch-(\d+)$/);
    if(mt){setWatchId(+mt[1]);setPage("watch")}
    const pop=()=>{const x=window.location.hash.match(/^#watch-(\d+)$/);
      if(x)go("watch",{id:+x[1]});
      else if(pageRef.current==="watch")go(prevPage.current||"shop",{restore:true})};
    window.addEventListener("popstate",pop);return()=>window.removeEventListener("popstate",pop)},[]);
  const navigate=(p)=>{if(p===page)return;if(window.location.hash)window.history.pushState(null,"",window.location.pathname);go(p)};
  const openWatch=(id)=>{savedY.current=window.scrollY;if(pageRef.current!=="watch")prevPage.current=pageRef.current;inApp.current=true;window.history.pushState(null,"","#watch-"+id);go("watch",{id})};
  const goBack=()=>{if(inApp.current&&window.location.hash)window.history.back();else{if(window.location.hash)window.history.replaceState(null,"",window.location.pathname);go("shop")}};
  const pages={home:HomePage,shop:ShopPage,about:AboutPage,journal:JournalPage,events:EventsPage,contact:ContactPage,howitworks:HowItWorksPage,servicing:ServicingPage,watch:WatchPage};
  const Page=pages[page]||HomePage;

  return(
    <div style={{background:BRAND.warmWhite,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(201,168,76,0.3);color:#1a2744}
        input::placeholder,textarea::placeholder{color:rgba(138,129,114,0.5)}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes waPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
      `}</style>
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100}}>
        <MarqueeBanner navigate={navigate}/>
        <Nav scrolled={scrolled} currentPage={page==="watch"?"shop":page} navigate={navigate}/>
      </div>
      <div style={{opacity:transitioning?0:1,transform:transitioning?"translateY(12px)":"translateY(0)",transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)"}}>
        <Page navigate={navigate} openWatch={openWatch} goBack={goBack} watchId={watchId} F={F} setF={setF}/>
      </div>
      <Footer navigate={navigate}/>

      <MascotWidget/>
    </div>
  );
}
