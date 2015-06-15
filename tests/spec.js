describe('Appliances App', function() {
		var startItUp = function (test) {
			browser.get('http://localhost:3000').then( function () {
				test();
			});
		}

		var crawlToRandomQuestion = function (test) {
			startItUp(function () {
				var next = function () {
					$$('.answer').then(function (answers) { 
						var r = Math.floor((Math.random() * answers.length))
						answers[r].click()
						element(by.id('next')).click()
						var b = Math.floor((Math.random() * 2))
						console.log(b, !!b)
						if (!!b) 
							next()
						else 
							test()
					});
				}
	
			});
		}

		var crawlToResults = function (test) {
			startItUp(function () {
				var next = function () {
					console.log("next");
					$$('.answer').then(function (answers) { 
						var r = Math.floor((Math.random() * answers.length))
						answers[r].click()
						element(by.id('next')).click().then(function () {
							element(by.id('next')).isPresent().then(function (p) {
								console.log("p", p)
								if (!!p) 
									next()
								else 
									test()

							});


						})

					});
				}
				next();
			});
		}
	describe('Questions', function() {

		describe('when next is selected and there is no answer', function() {
			it('should not go to the next question or results', function() {
				//browser.get('http://localhost:3000').then( function () {
				startItUp(function () {
					var question = element(by.id('questionText')).getText()
					element(by.id('next')).click()
					expect(element(by.id('questionText')).getText()).toEqual(question)	

				});
				//});
			});
		});


		describe('when next is selected and there is an answer', function() {
			it('should go to the next question or results', function() {
				browser.get('http://localhost:3000').then( function () {
					var question = element(by.id('questionText')).getText()
					$$('.answer').then(function (answers) { 
						var r = Math.floor((Math.random() * answers.length))
						answers[r].click()
						element(by.id('next')).click()
						expect(element(by.id('questionText')).getText()).toNotEqual(question)
					});
				});
			});
		});


	});

	describe('Results', function() {

		describe('when user navigates to results', function() {
			it('there should be no more than 3 results', function() {
				//browser.get('http://localhost:3000').then( function () {
				crawlToResults(function () {
					var results = element.all(by.repeater("a in appliances | filter:{score : '!null'} | byPrice:price | orderBy:'score' | limitTo:3"))
					expect(results.count() <= 3).toBeTruthy();
				});
				//});
			});
		});
	});

	describe('Navigation', function() {

		
		describe('when next is selected and it is an old question', function() {
			it('the number of navigation elements should stay the same', function() {
				browser.get('http://localhost:3000').then( function () {
					var question = element(by.id('questionText')).getText()
					$$('.answer').then(function (answers) { 
						var r = Math.floor((Math.random() * answers.length))
						answers[r].click()
						element(by.id('next')).click()
						var navigationCount = element.all(by.repeater('q in questionsData.scoringQuestions | orderByOrder')).count()
						expect(element(by.id('questionText')).getText()).toNotEqual(question)
						element(by.id('previous')).click()
						expect(element(by.id('questionText')).getText()).toEqual(question)
						$$('.answer').then(function (answers) { 
							var r = Math.floor((Math.random() * answers.length))
							answers[r].click()
							element(by.id('next')).click()
							expect( element.all(by.repeater('q in questionsData.scoringQuestions | orderByOrder')).count() ).toEqual(navigationCount)
						});	
					});				
				});
			});
		});


		describe('when next is selected and it is a new question', function() {
			it('the number of navigation elements should increase by one', function() {
				browser.get('http://localhost:3000').then( function () {
					var navigationCount = element.all(by.repeater('q in questionsData.scoringQuestions | orderByOrder')).count()
					$$('.answer').then(function (answers) { 
						var r = Math.floor((Math.random() * answers.length))
						answers[r].click()
						element(by.id('next')).click()
						expect( element.all(by.repeater('q in questionsData.scoringQuestions | orderByOrder')).count() ).toNotEqual(navigationCount)
					});
				});
			});
		});


	});

});