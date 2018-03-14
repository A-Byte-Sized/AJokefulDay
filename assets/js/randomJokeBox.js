---
---
function createDiv(className, content) {
		var temp = document.createElement('div');
		temp.className = className;
		temp.append(content);
		return temp;
	}
function createButton(url, className, icon, text) {
	var innerDiv = document.createElement('div');
	innerDiv.className = className;
	innerDiv.innerHTML += '<b class="icon-'+icon+'"></b> '+text;
	
	var button = document.createElement('a');
	button.setAttribute('href', url);
	
	button.append(innerDiv);
	return button;
}
function createJokeUnit(jokeText, jokeID) {
	var jokeTextDiv = createDiv('joke-text', "");
	jokeTextDiv.innerHTML += jokeText;
	
	var jokeButtonShareDiv = createButton("http://twitter.com/share?text="+jokeText.replace(new RegExp('<br>', 'g')," ")+"&url=http://ajokefulday.ml/&hashtags=ajokefulday,bestcornyjokes", 'joke-share', 'share', 'Share');
	var jokeButtonRefreshDiv = createButton("javascript:location.reload();", 'joke-refresh', 'refresh', 'Refresh')
	
	var jokeButtonsDiv = createDiv('joke-buttons', jokeButtonShareDiv);
	jokeButtonsDiv.append(jokeButtonRefreshDiv);
	
	var jokeUnitDiv = createDiv('joke-unit', jokeTextDiv);
	jokeUnitDiv.append(jokeButtonsDiv);
	
	return jokeUnitDiv;		
}
function generateRandomJokes(numberOfJokes, type) {
	var jokes = grabValidJokes(type);
	
	var	jokesLength = jokes.length;
	var divRandomJokes = $(".joke-lockup");
	while (numberOfJokes > 0) {
		var randomIndex = Math.floor(Math.random() * jokesLength);
		divRandomJokes.append(createJokeUnit(jokes[randomIndex].text, randomIndex));
		jokes.splice(randomIndex, 1);
		numberOfJokes--;
		jokesLength--;
	}
}
function grabValidJokes(type) {
	var oneLiner={{ site.data.one-liner | jsonify }};
	var traditional={{ site.data.traditional | jsonify }};
	var jokes;
	switch(type) {
		case -1:
			HTMLCollection.prototype.concat = Array.prototype.concat;
			jokes = oneLiner.concat(traditional);
			break;
		case 0:
			jokes = oneLiner;
			break;
		case 1:
			jokes = traditional;
			break;
	}
	return jokes;
}