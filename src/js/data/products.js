export const products = [
  { id:'pineapple-sriracha', name:'Pineapple Sriracha', kicker:'Sunshine with a mean streak', price:14, heat:2, color:'#e9b638', ink:'#11100d', description:'Roasted pineapple lands first. Fermented red pepper follows with a bright, tidy burn.', ingredients:['Pineapple','Red pepper','Garlic','Rice vinegar'], pairings:['Wings','Tacos','Eggs','Grilled fish'], glyph:'✹' },
  { id:'habanero-garlic', name:'Habanero Garlic', kicker:'Sharp, hot, absolutely awake', price:14, heat:4, color:'#e9512d', ink:'#fff3dc', description:'Charred habanero heat anchored by enough garlic to make subtlety file a complaint.', ingredients:['Habanero','Garlic','Carrot','Lime'], pairings:['Burgers','Noodles','Beans','Pizza'], glyph:'▲' },
  { id:'cherry-garlic', name:'Cherry Garlic', kicker:'Dark fruit. Savory finish.', price:15, heat:3, color:'#9f2135', ink:'#fff3dc', description:'Tart cherry, black pepper, and roasted garlic make smoke taste suspiciously sophisticated.', ingredients:['Sour cherry','Garlic','Ancho','Molasses'], pairings:['Ribs','Cheese','Mushrooms','Duck'], glyph:'●' },
  { id:'peach-chipotle', name:'Smoked Peach Chipotle', kicker:'Campfire fruit for grown-ups', price:15, heat:3, color:'#e87935', ink:'#11100d', description:'Ripe peach and smoked chipotle. Sweet enough to invite in, smoky enough to stay late.', ingredients:['Peach','Chipotle','Onion','Cider vinegar'], pairings:['Pork','Corn','Tofu','Sandwiches'], glyph:'◆' }
];

export const bundles = [
  {id:'three-pack', name:'The Loud Three', size:3, price:38, savings:5},
  {id:'six-pack', name:'Kitchen Insurance', size:6, price:72, savings:12},
  {id:'mix-pack', name:'Build Your Own Trouble', size:4, price:52, savings:6}
];

export const getProduct = id => products.find(product => product.id === id) || products[0];
